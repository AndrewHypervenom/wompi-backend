const Transaccion = require('../models/Transaccion');
const Producto = require('../models/Producto');
const wompiApi = require('./api');

class TransaccionService {
  // Elimina el 'const' y usa el método directo de la clase
  async createTransaction(data) {
    try {
      const wompiTransaction = await wompiApi.post('/transactions', {
        amount_in_cents: data.monto * 100,
        currency: 'COP',
        customer_email: data.email,
        reference: `ORDER-${Date.now()}`,
        payment_method: {
          type: 'CARD',
          token: data.cardToken,
          installments: 1
        }
      });

      const transaccion = new Transaccion({
        productoId: data.productoId,
        wompiId: wompiTransaction.data.id,
        estado: wompiTransaction.data.status,
        monto: data.monto,
        telefono: data.telefono,
        direccionEntrega: data.direccionEntrega,
        ciudad: data.ciudad,
        codigoPostal: data.codigoPostal
      });

      await transaccion.save();
      return { transaccion, wompiData: wompiTransaction.data };
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  async updateTransactionStatus(transactionId) {
    const transaccion = await Transaccion.findById(transactionId);
    if (!transaccion) {
      throw new Error('Transacción no encontrada');
    }

    const wompiStatus = await wompiApi.getTransaction(transaccion.wompiId);
    const estadoAnterior = transaccion.estado;
    transaccion.estado = wompiStatus.data.status;
    await transaccion.save();

    if (wompiStatus.data.status === 'APPROVED' && estadoAnterior !== 'APPROVED') {
      const producto = await Producto.findById(transaccion.productoId);
      if (producto) {
        producto.stock -= 1;
        await producto.save();
      }
    }

    return { transaccion, wompiData: wompiStatus.data };
  }
}

module.exports = new TransaccionService();