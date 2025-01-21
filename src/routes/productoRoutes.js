const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el producto' });
  }
});

// Actualizar stock
router.patch('/:id/stock', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    const nuevoStock = producto.stock - 1;
    if (nuevoStock < 0) {
      return res.status(400).json({ mensaje: 'Stock insuficiente' });
    }

    producto.stock = nuevoStock;
    await producto.save();
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el stock' });
  }
});

module.exports = router;