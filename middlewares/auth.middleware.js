const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: 'Acceso denegado' });

  // Soportar tanto 'Bearer <token>' como el token plano
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    return next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
}

module.exports = auth;