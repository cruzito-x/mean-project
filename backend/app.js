require('dotenv').config();
require('./config/db');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const logsFolder = path.join(__dirname, "./logs"); // Ruta de la carpeta de logs

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

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});