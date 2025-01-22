const express = require('express');
const router = express.Router();
const Transaccion = require('../models/Transaccion');

router.post('/', async (req, res) => {
  try {
    const { productoId, monto, telefono, direccionEntrega, ciudad, codigoPostal } = req.body;

    const transaccion = new Transaccion({
      productoId,
      estado: 'PENDIENTE',
      monto,
      telefono,
      direccionEntrega,
      ciudad,
      codigoPostal
    });

    const nuevaTransaccion = await transaccion.save();

    res.status(201).json({
      success: true,
      data: nuevaTransaccion
    });

  } catch (error) {
    console.error('Error al crear transacción:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear la transacción'
    });
  }
});

module.exports = router;