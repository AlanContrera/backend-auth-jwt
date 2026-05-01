# Backend Practicas

API de autenticación minimal para demostración y portafolio. Implementada con Node.js, Express, MongoDB (Mongoose), `bcrypt` y JWT.

Descripción breve
- Registro y login con JWT.
- Ruta protegida `/perfil` que devuelve JSON con `id`, `email`, `firstName`, `lastName`.

Despliegue
- Frontend (carpeta `frontend/`) desplegado en Vercel.
- API desplegada en Render (asegúrate de actualizar la variable `CLIENT_URL` en Render con el dominio de Vercel).

Instalación rápida
1. Copia `.env.example` a `.env` y completa las variables.
2. Instala dependencias:

```
npm install
```

Scripts útiles

```
npm start    # arranca con node
npm run dev  # arranca con nodemon (dev)
```

Variables de entorno (mínimas)

```
PORT=3000
JWT_SECRET=tu_secreto
MONGO_URI=tu_mongo_uri
CLIENT_URL=https://tu-frontend.vercel.app
```

Ejecutar local

```
npm run dev
```

Endpoints principales

- POST `/registro`  — Body: `{ email, password, firstName, lastName }` — Respuesta JSON con usuario (sin contraseña) y código HTTP 201.
- POST `/login`     — Body: `{ email, password }` — Respuesta JSON `{ token }`  (JWT).
- GET `/perfil`     — Header: `Authorization: Bearer <token>` — Respuesta JSON `{ id, email, firstName, lastName }`.

Notas importantes
- La API responde siempre JSON en errores y éxito para facilitar integración con frontends.
- El middleware de auth acepta el encabezado `Authorization: Bearer <token>`.
- Asegúrate de redeplegar la API en Render después de actualizar `CLIENT_URL` para resolver problemas de CORS.

Sugerencias para presentar en entrevistas
- Explica la decisión de usar JWT sin estado y el trade-off con sesiones centradas en servidor.
- Menciona las mejoras futuras: validación con `express-validator` o `Joi`, tests, e2e, y CI/CD.

Autor

Alan Contreras
