const express = require('express');
const cors = require('cors');
require('dotenv').config();

// conexión a la base de datos
require('./config/db');

// rutas
const authRoutes = require('./routes/auth.routes');

const app = express();

// middlewares
// TEMP: permitir todos los orígenes para pruebas (revertir en producción)
app.use(cors());
app.use(express.json());

// rutas
app.use('/', authRoutes);

// ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando ');
});

// servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto', PORT);
});