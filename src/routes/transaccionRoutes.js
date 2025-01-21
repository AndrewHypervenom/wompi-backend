const express = require('express');
const router = express.Router();
const transaccionService = require('../services/transaccionService');

router.post('/', async (req, res, next) => {
  try {
    const result = await transaccionService.createTransaction(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await transaccionService.updateTransactionStatus(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;