const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.send('X Acceso denegado X');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.send('X Token inválido X');
  }
}

module.exports = auth;