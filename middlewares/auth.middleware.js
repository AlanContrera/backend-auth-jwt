const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.send('Acceso denegado ❌');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.send('Token inválido ❌');
  }
}

module.exports = auth;