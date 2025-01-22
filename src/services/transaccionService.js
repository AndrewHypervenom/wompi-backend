const Transaccion = require('../models/Transaccion');
const Producto = require('../models/Producto');
const wompiApi = require('./api');

class TransaccionService {
  // Elimina el 'const' y usa el método directo de la clase
  async createTransaction(data) {
    try {
      const { productoId, monto, telefono, direccionEntrega, ciudad, codigoPostal } = data;
  
      // Validar que todos los campos requeridos estén presentes
      if (!productoId || !monto || !telefono || !direccionEntrega || !ciudad || !codigoPostal) {
        throw new Error('Faltan campos requeridos');
      }
  
      // Verificar que el producto existe y tiene stock
      const producto = await Producto.findById(productoId);
      if (!producto) {
        throw new Error('Producto no encontrado');
      }
      if (producto.stock <= 0) {
        throw new Error('Producto sin stock disponible');
      }
  
      // Crear la transacción
      const transaccion = new Transaccion({
        productoId,
        estado: 'PENDIENTE',
        monto,
        telefono,
        direccionEntrega,
        ciudad,
        codigoPostal
      });
  
      // Guardar la transacción
      const nuevaTransaccion = await transaccion.save();
      
      return {
        success: true,
        data: nuevaTransaccion
      };
    } catch (error) {
      console.error('Error en createTransaction:', error);
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