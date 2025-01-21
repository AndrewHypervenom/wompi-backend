const axios = require('axios');
require('dotenv').config();

const wompiApi = axios.create({
  baseURL: process.env.WOMPI_SANDBOX_URL,
  headers: {
    'Authorization': `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
    'Content-Type': 'application/json'
  }
});

const createPaymentSource = async (cardData) => {
  try {
    const response = await wompiApi.post('/payment_sources', cardData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment source:', error);
    throw error;
  }
};

const createTransaction = async (transactionData) => {
  try {
    const response = await wompiApi.post('/transactions', transactionData);
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

const getTransaction = async (transactionId) => {
  try {
    const response = await wompiApi.get(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting transaction:', error);
    throw error;
  }
};

module.exports = {
  createPaymentSource,
  createTransaction,
  getTransaction
};