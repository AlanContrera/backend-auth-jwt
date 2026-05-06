const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Importar los controladores
const authController = require('../controllers/auth.controller');

// Importar middlewares
const authMiddleware = require('../middlewares/auth.middleware');

// ----- Validaciones Básicas -----
const registerValidation = [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

const loginValidation = [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];

// Middleware helper para revisar si hay errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores, devolver un 400 con la lista de errores
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ----- Definición de Rutas -----

// Registro de usuario
router.post('/registro', registerValidation, validate, authController.register);

// Login de usuario
router.post('/login', loginValidation, validate, authController.login);

// Ruta protegida de perfil
router.get('/perfil', authMiddleware, authController.getProfile);

module.exports = router;