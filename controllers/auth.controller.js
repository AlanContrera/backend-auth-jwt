const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controlador para registro
const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el nuevo usuario
    const newUser = new User({ 
      email, 
      password: hashedPassword, 
      firstName, 
      lastName 
    });
    
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    // Pasar el error al middleware global de errores
    next(error);
  }
};

// Controlador para login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token con expiración (1 hora)
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ token, message: 'Login exitoso' });
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener perfil
const getProfile = async (req, res, next) => {
  try {
    // El id viene del token validado por el middleware
    const userId = req.user.id;
    
    // Buscar al usuario excluyendo el password
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile
};
