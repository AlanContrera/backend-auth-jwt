# Proyecto de Autenticación Básica

Este es uno de mis primeros proyectos prácticos como desarrollador del lado del servidor. El objetivo de este proyecto fue aprender a construir un sistema de inicio de sesión y registro de usuarios, protegiendo la información con contraseñas seguras y utilizando tokens.

Construí tanto la parte del servidor como la interfaz visual para demostrar que todo el flujo funciona correctamente.

## Enlaces del proyecto publicado

- Interfaz de usuario: [https://backend-auth-2wqrmpkht-giovannicontre24-1013s-projects.vercel.app](https://backend-auth-2wqrmpkht-giovannicontre24-1013s-projects.vercel.app)
- Servidor: [https://backend-auth-jwt-lato.onrender.com](https://backend-auth-jwt-lato.onrender.com)

Nota: El servidor está alojado en un servicio gratuito, por lo que puede tardar un poco en responder la primera vez que se intenta iniciar sesión.

## ¿Qué hace este proyecto?

- Registro de usuarios: Permite a un nuevo usuario crear una cuenta.
- Inicio de sesión: Verifica el correo electrónico y la contraseña para dejar entrar al usuario.
- Seguridad: Las contraseñas no se guardan como texto plano, sino que se encriptan.
- Protección de rutas: Una vez que el usuario inicia sesión, recibe un "token" que le permite acceder a la sección de su perfil. Si no tiene ese token, el servidor le niega el acceso.
- Interfaz sencilla: Creé una interfaz básica con HTML, CSS y JavaScript puro para poder probar el servidor de forma visual.

## Tecnologías utilizadas

- Node.js y Express: Para construir el servidor web.
- MongoDB y Mongoose: Como base de datos para guardar la información de los usuarios.
- jsonwebtoken: Para generar y leer los tokens de inicio de sesión.
- bcrypt: Para encriptar las contraseñas.
- HTML, CSS y JavaScript: Para la interfaz visual.

## Rutas del servidor

| Método  | Ruta          | Descripción                                 | Requiere iniciar sesión |
|---------|---------------|----------------------------------------- - -|------------------------ |
| GET     | `/`           | Comprueba si el servidor está funcionando.  | No                     |
| POST    | `/registro`   | Crea un nuevo usuario en la base de datos.  | No                      |
| POST    | `/login`      | Verifica los datos y devuelve el token.     | No                     |
| GET     | `/perfil`     | Muestra la información del usuario.         | Sí                     |

## Cómo probar el proyecto en tu computadora

1. Descargar el código
```text
git clone https://github.com/AlanContrera/backend-auth-jwt.git
cd backend-auth-jwt
```

2. Configurar las variables
Crea un archivo llamado .env en la carpeta principal copiando el contenido de .env.example. Debes colocar tus propios datos:
```text
PORT=3000
JWT_SECRET=escribe_aqui_una_contrasena_secreta
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster...
CLIENT_URL=http://127.0.0.1:5500
```

3. Instalar las herramientas necesarias
```text
npm install
```

4. Iniciar el servidor
```text
npm run dev
```
El servidor empezará a funcionar en la dirección http://localhost:3000.

5. Iniciar la interfaz
Para probar la parte visual, abre el archivo index.html (dentro de la carpeta frontend) en tu navegador de internet. 
Si lo haces de esta manera, recuerda cambiar la variable API dentro de los archivos app.js y profile.html para que apunten a http://localhost:3000 en lugar del enlace publicado.

## Cosas que quiero aprender y mejorar después

Como voy empezando, sé que hay muchas cosas por mejorar. Mis siguientes pasos para este proyecto son:
- Aprender a revisar rigurosamente la información que envía el usuario para evitar errores en el servidor.
- Escribir pruebas automáticas para comprobar que mi código siempre funciona bien.
- Aprender a estructurar mejor el código a medida que el proyecto vaya creciendo.

## Autor

Alan Contreras
