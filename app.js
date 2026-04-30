const express = require('express');
const cors = require('cors');
require('dotenv').config();

// conexión a la base de datos
require('./config/db');

// rutas
const authRoutes = require('./routes/auth.routes');

const app = express();

// middlewares
const CLIENT_URL = process.env.CLIENT_URL || 'https://backend-auth-2wqrmpkht-giovannicontre24-1013s-projects.vercel.app';

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (origin === CLIENT_URL) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', CLIENT_URL);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204);
  }
  next();
});
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