const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: String,
  precio: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  imagen: String
});

module.exports = mongoose.model('Producto', productoSchema);