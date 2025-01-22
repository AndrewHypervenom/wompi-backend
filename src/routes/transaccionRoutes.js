const express = require('express');
const router = express.Router();
const Transaccion = require('../models/Transaccion');
const { createTransaction } = require('../services/transactionService');

router.post('/', async (req, res) => {
  try {
    console.log('Creando transacción con datos:', req.body);
    const resultado = await createTransaction(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Error al crear transacción:', error);
    
    if (error.message === 'Faltan campos requeridos') {
      return res.status(400).json({ 
        success: false, 
        error: 'Faltan campos requeridos' 
      });
    }
    
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