module.exports = {
  apps: [{
    name: "wompi-backend",
    script: "./src/app.js",
    env: {
      NODE_ENV: "production",
      PORT: 5000,
      MONGODB_URI: "tu-uri-de-mongodb-atlas",
      WOMPI_PUBLIC_KEY: "tu-clave-publica",
      WOMPI_PRIVATE_KEY: "tu-clave-privada"
    }
  }]
};