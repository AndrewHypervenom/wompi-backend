const Transaccion = require('../models/Transaccion');
const Producto = require('../models/Producto');

const createTransaction = async (data) => {
  try {
    const { productoId, monto, telefono, direccionEntrega, ciudad, codigoPostal } = data;

    // Validar producto y stock
    const producto = await Producto.findById(productoId);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    if (producto.stock <= 0) {
      throw new Error('Producto sin stock disponible');
    }

    // Crear transacción
    const transaccion = await Transaccion.create({
      productoId,
      estado: 'PENDIENTE',
      monto,
      telefono,
      direccionEntrega,
      ciudad,
      codigoPostal
    });

    return {
      success: true,
      data: transaccion
    };
  } catch (error) {
    console.error('Error en createTransaction:', error);
    throw error;
  }
};

module.exports = {
  createTransaction
};