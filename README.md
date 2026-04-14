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

**Endpoints:**
```
GET  /users
POST /users
```

---

### 3️⃣ Products Service

**Puerto:** `8082`

**Responsabilidad:**
- Registro de productos
- Gestión de inventario

**Base de datos:** `productsdb`

**Endpoints:**
```
GET  /products
POST /products
```

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

**Endpoints principales:**
```
POST /sales/cart
POST /sales/cart/{id}/items
GET  /sales/cart/{id}
POST /sales/invoice/{id}
```

---

## 🎨 Frontend

**Tecnología:** Angular
**Puerto:** `4200`

**Funcionalidades:**
- Crear usuarios
- Crear productos
- Crear carrito
- Agregar productos
- Generar factura
- Visualización de datos

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
4. El microservicio procesa la solicitud
5. Se guarda la información en PostgreSQL
6. Se devuelve la respuesta al frontend

---

## 📸 Evidencias sugeridas

Agregar capturas de:
- Usuarios creados
- Productos creados
- Carrito creado
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
