# Proyecto de Autenticación Básica

Este es un proyecto práctico enfocado en el desarrollo backend. El objetivo principal fue aprender y aplicar conceptos fundamentales como la creación de un sistema de registro e inicio de sesión, el manejo de contraseñas de forma segura y la protección de rutas mediante JSON Web Tokens (JWT).

Recientemente he refactorizado el proyecto para mejorar su estructura y aplicar buenas prácticas, separando responsabilidades y mejorando el manejo de errores.

## Enlaces del proyecto publicado

- **Interfaz de usuario:** [Frontend en Vercel](https://backend-auth-2wqrmpkht-giovannicontre24-1013s-projects.vercel.app)
- **API (Servidor):** [Backend en Render](https://backend-auth-jwt-lato.onrender.com)

> **Nota:** El servidor está alojado en un plan gratuito, por lo que la primera petición puede tardar unos segundos en responder mientras el servidor "despierta".

## Características Principales

- **Registro de usuarios:** Permite a un nuevo usuario crear una cuenta validando sus datos.
- **Inicio de sesión (Login):** Verifica el correo electrónico y la contraseña para autenticar al usuario.
- **Seguridad:** Las contraseñas se encriptan utilizando `bcrypt` con 10 rondas de sal, nunca se guardan en texto plano.
- **Protección de rutas (JWT):** Tras un login exitoso, el servidor entrega un token JWT con tiempo de expiración (1 hora) que permite acceder a rutas protegidas como el perfil.
- **Validación de datos:** Uso de `express-validator` para asegurar que el correo tenga el formato correcto y la contraseña cumpla con requisitos mínimos.
- **Manejo global de errores:** Middleware dedicado para capturar y estandarizar las respuestas de error en toda la aplicación.

## Tecnologías Utilizadas

- **Node.js y Express:** Entorno de ejecución y framework para construir el servidor.
- **MongoDB y Mongoose:** Base de datos NoSQL y ODM para modelar y almacenar la información de los usuarios.
- **jsonwebtoken (JWT):** Generación y validación de tokens de acceso.
- **bcrypt:** Hasheo y verificación de contraseñas.
- **express-validator:** Validación de datos de entrada en las peticiones.
- **HTML, CSS y JavaScript (Vanilla):** Para la interfaz visual del cliente.

## Estructura del Proyecto

El código está organizado siguiendo el patrón de separación de responsabilidades:
- `routes/`: Define las rutas de la API.
- `controllers/`: Contiene la lógica de negocio para cada ruta.
- `middlewares/`: Funciones intermedias para autenticación, validación y manejo de errores.
- `models/`: Esquemas de base de datos de Mongoose.

## Endpoints de la API

| Método | Ruta         | Descripción                                     | Acceso    |
|--------|--------------|-------------------------------------------------|-----------|
| GET    | `/`          | Comprueba si el servidor está funcionando.      | Público   |
| POST   | `/registro`  | Valida datos y crea un nuevo usuario.           | Público   |
| POST   | `/login`     | Autentica al usuario y devuelve el token JWT.   | Público   |
| GET    | `/perfil`    | Devuelve la información del usuario autenticado.| Protegido |

## Cómo probar el proyecto localmente

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/AlanContrera/backend-auth-jwt.git
   cd backend-auth-jwt
   ```

2. **Configurar las variables de entorno**
   Crea un archivo llamado `.env` en la raíz del proyecto basándote en el archivo `.env.example`:
   ```env
   PORT=3000
   JWT_SECRET=tu_secreto_super_seguro
   MONGO_URI=mongodb+srv://<usuario>:<password>@cluster...
   CLIENT_URL=http://127.0.0.1:5500
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Iniciar el servidor en modo desarrollo**
   ```bash
   npm run dev
   ```
   El servidor estará escuchando en `http://localhost:3000`.

5. **Probar el Frontend**
   Abre el archivo `index.html` (dentro de la carpeta `frontend`) en tu navegador.
   *Asegúrate de cambiar la constante `API` en los archivos de JavaScript del frontend para que apunten a `http://localhost:3000` si deseas probar con tu servidor local.*

## Lo que aprendí / Mejoras Recientes

Durante la evolución de este proyecto aprendí a:
- Estructurar el código separando rutas, controladores y middlewares, haciendo el proyecto mucho más ordenado y fácil de mantener.
- Validar correctamente la información que entra al servidor usando `express-validator`.
- Centralizar el manejo de errores para evitar que el servidor se caiga y dar respuestas consistentes al frontend.

## Autor

Alan Contreras
