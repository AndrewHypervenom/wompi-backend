module.exports = {
  apps: [{
    name: "wompi-backend",
    script: "./src/app.js",
    env: {
      NODE_ENV: "production",
      PORT: process.env.PORT || 5000,
      MONGODB_URI: process.env.MONGODB_URI,
      WOMPI_PUBLIC_KEY: process.env.WOMPI_PUBLIC_KEY,
      WOMPI_PRIVATE_KEY: process.env.WOMPI_PRIVATE_KEY
    }
  }]
};