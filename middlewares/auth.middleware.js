const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Leer el token desde los headers
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso denegado, no hay token' });
  }

  try {
    // Soportar el formato "Bearer <token>" o simplemente el token
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Guardar los datos del usuario decodificados en la request para usarlos luego
    req.user = decoded;
    
    next(); // Continuar a la siguiente función
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o ha expirado' });
  }
};

module.exports = authMiddleware;