const mongoose = require('mongoose');

const transaccionSchema = new mongoose.Schema({
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  wompiId: String,
  estado: {
    type: String,
    enum: ['PENDIENTE', 'APPROVED', 'DECLINED', 'VOIDED'],
    default: 'PENDIENTE'
  },
  monto: {
    type: Number,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  direccionEntrega: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  codigoPostal: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaccion', transaccionSchema);