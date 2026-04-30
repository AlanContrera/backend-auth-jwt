const express = require('express');
const cors = require('cors');
require('dotenv').config();

// conexión a la base de datos
require('./config/db');

// rutas
const authRoutes = require('./routes/auth.routes');

const app = express();

// middlewares
app.use(cors()); 
app.use(express.json());

// rutas
app.use('/', authRoutes);

// ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando ');
});

// servidor
app.listen(3000, () => {
  console.log('Servidor corriendo');
});