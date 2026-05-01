const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const auth = require('../middlewares/auth.middleware');


// REGISTRO
router.post('/registro', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password) return res.status(400).json({ msg: 'Email y password son requeridos' });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ msg: 'Usuario ya existe' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword, firstName, lastName });
  await newUser.save();

  return res.status(201).json({ msg: 'Usuario registrado' });
});


// LOGIN1
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ msg: 'Email y password son requeridos' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'Usuario no existe' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ msg: 'Password incorrecto' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.json({ token });
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