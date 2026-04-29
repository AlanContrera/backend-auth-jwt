const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const auth = require('../middlewares/auth.middleware');


// REGISTRO
router.post('/registro', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.send('Usuario ya existe ❌');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword
  });

  await newUser.save();

  res.send('Usuario registrado ');
});


// LOGIN1
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send('X Usuario no existe X');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.send('X Password incorrecto X');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
});


// RUTA PROTEGIDA
router.get('/perfil', auth, (req, res) => {
  res.send('Bienvenido a tu perfil');
});


module.exports = router;