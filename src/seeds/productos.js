require('dotenv').config();
const mongoose = require('mongoose');
const Producto = require('../models/Producto');

const productos = [
  {
    nombre: "Producto de prueba 1",
    descripcion: "Este es un producto de prueba para la integración con Wompi",
    precio: 50000,
    stock: 10,
    imagen: "/api/placeholder/400/300"
  },
  {
    nombre: "Producto de prueba 2",
    descripcion: "Otro producto de prueba para la integración",
    precio: 75000,
    stock: 5,
    imagen: "/api/placeholder/400/300"
  }
];

const seedDatabase = async () => {
  try {
    // Asegúrate de tener esta variable en tu archivo .env
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('La variable MONGODB_URI no está definida en el archivo .env');
    }

    console.log('Conectando a MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Conexión exitosa a MongoDB Atlas');

    // Limpiar la colección existente
    await Producto.deleteMany({});
    console.log('Productos anteriores eliminados');

    // Insertar nuevos productos
    await Producto.insertMany(productos);
    console.log('Nuevos productos insertados exitosamente');

    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('Conexión cerrada');

  } catch (error) {
    console.error('Error durante el proceso de seed:', error);
    process.exit(1);
  }
};

seedDatabase();