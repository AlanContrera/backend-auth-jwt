# Backend Auth JWT

API REST de autenticación construida con Node.js, Express y MongoDB.

---

## Funcionalidades

* Registro de usuarios
* Login con autenticación
* Encriptación de contraseñas con bcrypt
* Generación de tokens con JWT
* Rutas protegidas

---

## Tecnologías

* Node.js
* Express
* MongoDB
* Mongoose
* bcrypt
* jsonwebtoken

---

## Estructura del proyecto

```
/models
/routes
/middlewares
/config
app.js
```

---

##  Instalación

Clona el repositorio e instala dependencias:

```
npm install
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```
PORT=3000
JWT_SECRET=tu_secreto
MONGO_URI=mongodb://127.0.0.1:27017/miapp
```

---

## Ejecutar proyecto

```
node app.js
```

El servidor correrá en:

```
http://localhost:3000
```

---

## Endpoints

### Registro

**POST** `/registro`

Body:

```
{
  "email": "test@test.com",
  "password": "1234"
}

```

---

### Login

**POST** `/login`

Body:

```
{
  "email": "test@test.com",
  "password": "1234"
}
```

Respuesta:

```
{
  "token": "Pega aquí el token obtenido del login"
}
```

---

### Perfil (Ruta protegida)

**GET** `/perfil`

Header requerido:

```
Authorization: TU_TOKEN
```

Respuesta:

```
Bienvenido a tu perfil
```

---

## Notas

* Las contraseñas se almacenan encriptadas con bcrypt
* Se utiliza JWT para autenticación
* Las rutas protegidas requieren un token válido

---

## Autor

Alan Contreras
