const express = require('express');
const cors = require('cors');
require('dotenv').config();

// conexión a la base de datos
require('./config/db');

// rutas
const authRoutes = require('./routes/auth.routes');

const app = express();

// middlewares
// Configurar CORS de forma segura
const rawClient = process.env.CLIENT_URL || 'https://backend-auth-2wqrmpkht-giovannicontre24-1013s-projects.vercel.app';
const CLIENT_URLS = rawClient.split(',').map(s => s.trim()).filter(Boolean);
console.log('Allowed client origins:', CLIENT_URLS);

const corsOptions = {
  origin: function (origin, callback) {
    // permitir peticiones sin Origin (tools, server-to-server)
    if (!origin) return callback(null, true);
    if (CLIENT_URLS.includes(origin)) return callback(null, true);
    console.warn('Blocked CORS origin:', origin);
    // no lanzar error aquí — devolver false para que CORS no establezca cabeceras
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
// simple preflight responder (no errores)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin;
    if (origin && CLIENT_URLS.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      return res.sendStatus(204);
    }
    // respond 204 to OPTIONS even if origin not allowed (browser will block)
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