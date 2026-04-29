const express = require('express');

require('dotenv').config();
require('./config/db');

const app = express();
app.use(express.json());

const authRoutes = require('./routes/auth.routes');

app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.listen(3000, () => {
  console.log('Servidor corriendo');
});