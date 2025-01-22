const express = require('express');
const router = express.Router();
const { createTransaction } = require('../services/transactionService');

router.post('/', async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    const resultado = await createTransaction(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Error en la ruta de transacciones:', error);
    
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }
    
    if (error.message === 'Producto sin stock disponible') {
      return res.status(400).json({
        success: false,
        error: 'Producto sin stock disponible'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router;