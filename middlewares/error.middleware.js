// Middleware global para manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Muestra el error en consola para facilitar el debugging

  // Estado HTTP y mensaje por defecto
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  // Respuesta genérica de error
  res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = errorHandler;
