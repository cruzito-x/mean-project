require('dotenv').config();
require('./config/db');
const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const port = 3000;
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const logsFolder = path.join(__dirname, "./logs"); // Ruta de la carpeta de logs

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Configurar el middleware para retornar archivos estáticos desde la carpeta 'uploads'
app.use(helmet({
  contentSecurityPolicy: false, // Deshabilitar la política de seguridad de contenido para evitar problemas con CORS
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // Permitir solicitudes desde otros orígenes
}));
app.use(cors()); // Permite solicitudes CORS de diferentes endpoints fuera del servidor

//Routes
const products = require("./routes/products");

// Crear la carpeta de logs si no existe
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder);
}

// Configuración de Morgan para escribir en el archivo express.log
const logStream = fs.createWriteStream(path.join(logsFolder, "express.log"), { flags: "a" });
app.use(morgan("combined", { stream: logStream }));

console.log = function(message) {
  logStream.write(`[LOG] ${message}\n`);
};

console.error = function(message) {
  logStream.write(`[ERROR] ${message}\n`);
};

app.use("/products", products);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});