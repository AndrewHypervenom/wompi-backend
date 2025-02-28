const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      mensaje: 'Error de validación',
      errores: errors.array().map(err => ({
        campo: err.param,
        mensaje: err.msg
      }))
    });
  }
  next();
};

module.exports = validate;