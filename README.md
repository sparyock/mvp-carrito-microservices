# 🛒 MVP Carrito Microservices

Sistema distribuido basado en arquitectura de microservicios para la gestión de usuarios, productos y ventas (carrito y facturación).
El sistema utiliza un API Gateway como punto de entrada y un frontend desarrollado en Angular.

---

## 📌 Descripción del Proyecto

Este proyecto implementa un sistema de carrito de compras utilizando microservicios independientes conectados mediante un API Gateway.

Cada microservicio maneja su propia base de datos y lógica de negocio, permitiendo escalabilidad, mantenimiento y despliegue independiente.

El sistema permite:

- Crear usuarios
- Registrar productos
- Crear carritos
- Agregar productos al carrito
- Generar facturas
- Visualizar información desde un frontend web

Cada microservicio implementa un **CRUD completo** (Crear, Leer, Actualizar, Eliminar) sobre sus respectivas entidades, permitiendo la gestión total de los datos desde el frontend y la API.

---

## 🏗️ Arquitectura del Sistema

```
Frontend (Angular)
        │
        ▼
API Gateway (Spring Cloud)
        │
 ┌──────────────┬──────────────┬──────────────┐
 ▼              ▼              ▼
Users Service  Products Service  Sales Service
(PostgreSQL)   (PostgreSQL)      (PostgreSQL)
```

---

## 🧩 Microservicios

### 1️⃣ API Gateway

**Puerto:** `8080`

**Responsabilidad:**
- Punto de entrada al sistema
- Redirección de solicitudes
- Manejo de CORS
- Comunicación entre frontend y microservicios

**Rutas:**
```
/users/**
/products/**
/sales/**
```

---

### 2️⃣ Users Service

**Puerto:** `8081`

**Responsabilidad:**
- Registro de usuarios
- Gestión de información de usuarios

**Base de datos:** `usersdb`

**CRUD completo de usuarios:**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /users | Listar todos los usuarios |
| GET | /users/{id} | Obtener usuario por ID |
| POST | /users | Crear nuevo usuario |
| PUT | /users/{id} | Actualizar usuario existente |
| DELETE | /users/{id} | Eliminar usuario |

---

### 3️⃣ Products Service

**Puerto:** `8082`

**Responsabilidad:**
- Registro de productos
- Gestión de inventario

**Base de datos:** `productsdb`

**CRUD completo de productos:**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /products | Listar todos los productos |
| GET | /products/{id} | Obtener producto por ID |
| POST | /products | Crear nuevo producto |
| PUT | /products/{id} | Actualizar producto existente |
| DELETE | /products/{id} | Eliminar producto |

---

### 4️⃣ Sales Service

**Puerto:** `8083`

**Responsabilidad:**
- Creación de carritos
- Agregar productos
- Generación de facturas

**Base de datos:** `salesdb`

**Tablas:**
```
carritos
carrito_detalle
facturas
detalle_factura
```

**CRUD completo de ventas:**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /sales/cart | Listar todos los carritos |
| GET | /sales/cart/{id} | Obtener carrito por ID |
| POST | /sales/cart | Crear nuevo carrito |
| POST | /sales/cart/{id}/items | Agregar producto al carrito |
| PUT | /sales/cart/{id} | Actualizar carrito |
| DELETE | /sales/cart/{id} | Eliminar carrito |
| GET | /sales/invoice | Listar facturas |
| GET | /sales/invoice/{id} | Obtener factura por ID |
| POST | /sales/invoice/{id} | Generar factura desde carrito |
| DELETE | /sales/invoice/{id} | Eliminar factura |

---

## 🎨 Frontend

**Tecnología:** Angular
**Puerto:** `4200`

**Funcionalidades:**
- Crear, listar, actualizar y eliminar usuarios (CRUD completo)
- Crear, listar, actualizar y eliminar productos (CRUD completo)
- Crear carrito y gestionar items (CRUD completo)
- Generar y visualizar facturas
- Visualización de datos en tiempo real

**Rutas del frontend:**
```
/inicio
/usuarios
/productos
/ventas
```

---

## 🗄️ Bases de Datos

Se utiliza **PostgreSQL**. Cada microservicio tiene su propia base de datos:

```
usersdb
productsdb
salesdb
```

---

## ⚙️ Tecnologías Utilizadas

**Backend:**
- Java 17
- Spring Boot
- Spring Cloud Gateway
- Spring Data JPA
- Maven
- PostgreSQL

**Frontend:**
- Angular
- TypeScript
- Bootstrap
- HTML / CSS

**Herramientas:**
- Postman
- Git / GitHub
- Visual Studio Code
- pgAdmin

---

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar repositorio

```bash
git clone https://github.com/sparyock/mvp-carrito-microservices.git
```

### 2. Levantar bases de datos

Crear en PostgreSQL:
```
usersdb
productsdb
salesdb
```

### 3. Ejecutar microservicios

Ejecutar cada servicio en orden:
```
users-service
products-service
sales-service
api-gateway
```

Comando:
```bash
mvn spring-boot:run
```

### 4. Ejecutar frontend

Entrar a la carpeta `frontend-mvp` y ejecutar:
```bash
npm install
ng serve
```

Abrir en el navegador:
```
http://localhost:4200
```

---

## 🔁 Flujo del Sistema

1. El usuario accede al frontend
2. El frontend envía solicitudes al API Gateway
3. El Gateway redirige al microservicio correspondiente
4. El microservicio procesa la solicitud (Create, Read, Update o Delete)
5. Se guarda la información en PostgreSQL
6. Se devuelve la respuesta al frontend

---

## 📸 Evidencias sugeridas

Agregar capturas de:
- Usuarios creados, editados y eliminados
- Productos creados, editados y eliminados
- Carrito creado con items
- Factura generada
- Tablas en PostgreSQL
- Frontend funcionando

---

## 👨‍💻 Autor

Proyecto académico — **Sistemas Distribuidos**

**Estudiante:** Yeison Andres Scarpeta Diaz
**Repositorio:** https://github.com/sparyock/mvp-carrito-microservices

---

## 📌 Estado del proyecto

| Componente     | Estado       |
|----------------|--------------|
| Backend        | ✅ Completo  |
| Frontend       | ✅ Completo  |
| Integración    | ✅ Funcional |
| Base de datos  | ✅ Operativa |
| CRUD completo  | ✅ Implementado |
