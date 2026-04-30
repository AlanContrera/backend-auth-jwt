const express = require('express');

require('dotenv').config();
require('./config/db');

const app = express();
app.use(express.json());

const authRoutes = require('./routes/auth.routes');

const cors = require('cors');
app.use(cors({
  origin: 'https://backend-auth-2wqrmpkht-giovannicontre24-1013s-projects.vercel.app'
}));

app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.listen(3000, () => {
  console.log('Servidor corriendo');
});