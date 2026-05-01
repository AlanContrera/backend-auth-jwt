const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const auth = require('../middlewares/auth.middleware');


// REGISTRO
router.post('/registro', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.send('Usuario ya existe ❌');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName
  });

  await newUser.save();

  res.send('Usuario registrado');
});


// LOGIN1
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send('X Usuario no existe X');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.send('X Password incorrecto X');

  const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
  );

  res.json({ token });
});


// RUTA PROTEGIDA
router.get('/perfil', auth, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).send('X Acceso denegado X');
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).send('X Usuario no encontrado X');
    res.json({ id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName });
  } catch (err) {
    console.error('Error /perfil:', err);
    res.status(500).send('Error interno');
  }
});


module.exports = router;