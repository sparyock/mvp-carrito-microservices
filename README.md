# 🛒 MVP Carrito Microservices

Sistema distribuido basado en arquitectura de microservicios para la gestión de usuarios, productos y ventas (carrito y facturación).
El sistema utiliza un API Gateway como punto de entrada y un frontend moderno desarrollado en React con Tailwind CSS.

---

## 📌 Descripción del Proyecto

Este proyecto implementa un sistema de carrito de compras profesional utilizando microservicios independientes conectados mediante un API Gateway.

Cada microservicio maneja su propia base de datos PostgreSQL y lógica de negocio, permitiendo escalabilidad, mantenimiento y despliegue independiente.

El sistema permite:

- ✅ Crear y autenticar usuarios
- ✅ Registrar productos con imágenes profesionales
- ✅ Crear carritos de compra
- ✅ Agregar productos al carrito
- ✅ Generar facturas automáticamente
- ✅ Visualizar información desde un frontend web moderno

Cada microservicio implementa un **CRUD completo** (Crear, Leer, Actualizar, Eliminar) sobre sus respectivas entidades.

---

## 🏗️ Arquitectura del Sistema

```
Frontend (React + Tailwind CSS)
        │
        ▼
API Gateway (Spring Cloud)
        │
 ┌──────────────┬─────────────────┬──────────────┐
 ▼              ▼                 ▼
Users Service  Products Service   Sales Service
(mvp_users_db) (mvp_products_db)  (mvp_sales_db)
```

---

## 🧩 Microservicios

### 1️⃣ API Gateway

**Puerto:** `8080`

**Responsabilidad:**
- Punto de entrada al sistema
- Redirección de solicitudes
- Manejo de CORS para frontend
- Comunicación entre frontend y microservicios

**Rutas:**
```
/users/**
/products/**
/sales/**
```

### 2️⃣ Users Service

**Puerto:** `8081`

**Responsabilidad:**
- Registro de usuarios
- Autenticación de usuarios
- Gestión de información de usuarios

**Base de datos:** `mvp_users_db`

**CRUD completo de usuarios:**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /users | Listar todos los usuarios |
| GET | /users/{id} | Obtener usuario por ID |
| POST | /users | Crear nuevo usuario |
| POST | /users/login | Autenticar usuario |
| PUT | /users/{id} | Actualizar usuario existente |
| DELETE | /users/{id} | Eliminar usuario |

### 3️⃣ Products Service

**Puerto:** `8082`

**Responsabilidad:**
- Registro de productos con imágenes
- Gestión de inventario y stock
- Reducción automática de stock en ventas

**Base de datos:** `mvp_products_db`

**CRUD completo de productos:**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /products | Listar todos los productos |
| GET | /products/{id} | Obtener producto por ID |
| POST | /products | Crear nuevo producto |
| PUT | /products/{id} | Actualizar producto existente |
| PUT | /products/{id}/stock | Reducir stock |
| DELETE | /products/{id} | Eliminar producto |

### 4️⃣ Sales Service

**Puerto:** `8083`

**Responsabilidad:**
- Creación de carritos de compra
- Agregar/remover productos del carrito
- Generación automática de facturas
- Integración con products-service para reducción de stock

**Base de datos:** `mvp_sales_db`

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
| PUT | /sales/cart/{id}/items/{itemId} | Actualizar cantidad |
| DELETE | /sales/cart/{id}/items/{itemId} | Remover producto |
| DELETE | /sales/cart/{id} | Eliminar carrito |
| GET | /sales/invoice | Listar facturas |
| GET | /sales/invoice/{id} | Obtener factura por ID |
| POST | /sales/checkout | Generar factura desde carrito |
| DELETE | /sales/invoice/{id} | Eliminar factura |

---

## 🎨 Frontend

**Tecnología:** React 18 + Vite + Tailwind CSS
**Puerto:** `5173` (desarrollo) / `4173` (producción)

**Funcionalidades:**
- ✅ Autenticación completa (login/logout)
- ✅ Gestión de usuarios (CRUD completo)
- ✅ Catálogo de productos con imágenes profesionales
- ✅ Carrito de compras interactivo
- ✅ Checkout y generación de facturas
- ✅ Interfaz moderna y responsive
- ✅ Estado global con useReducer
- ✅ Persistencia con localStorage

**Componentes principales:**
- `App.jsx` - Componente principal con estado global
- `UserPanel.jsx` - Panel de login/registro
- `ProductCard.jsx` - Tarjeta de producto con imagen
- `CartDrawer.jsx` - Panel lateral del carrito
- `ProductList.jsx` - Lista de productos
- `InvoiceList.jsx` - Lista de facturas

---

## 🗄️ Bases de Datos PostgreSQL

Cada microservicio tiene su propia base de datos PostgreSQL:

| Servicio | Base de Datos | Puerto | Usuario |
|----------|---------------|--------|---------|
| Users | `mvp_users_db` | `5432` | `postgres` |
| Products | `mvp_products_db` | `5432` | `postgres` |
| Sales | `mvp_sales_db` | `5432` | `postgres` |

**Datos iniciales incluidos:**
- ✅ Usuarios de prueba (eliminados - crear propios)
- ✅ 8 productos profesionales con imágenes de Unsplash
- ✅ Tablas completamente configuradas

---

## ⚙️ Tecnologías Utilizadas

**Backend:**
- Java 17
- Spring Boot 3.x
- Spring Cloud Gateway
- Spring Data JPA/Hibernate
- OpenFeign Client
- PostgreSQL Driver
- Maven
- PostgreSQL 15

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide Icons

**Herramientas:**
- Visual Studio Code
- pgAdmin 4
- Postman
- Git/GitHub

---

## 🚀 Guía de Instalación y Ejecución

### 📋 Prerrequisitos

- Java 17 JDK
- Node.js 18+
- PostgreSQL 15+
- Maven 3.8+
- Git

### 1. 📥 Clonar repositorio

```bash
git clone https://github.com/sparyock/mvp-carrito-microservices.git
cd mvp-carrito-microservices
```

### 2. 🗄️ Configurar PostgreSQL

Crear las bases de datos:

```sql
-- Ejecutar en pgAdmin o psql
CREATE DATABASE mvp_users_db;
CREATE DATABASE mvp_products_db;
CREATE DATABASE mvp_sales_db;
```

**Credenciales por defecto:**
- Usuario: `postgres`
- Contraseña: `yeison`
- Puerto: `5432`

### 3. ⚡ Iniciar Servicios (Método Rápido)

**Windows:**
```bash
# Ejecutar script de inicio
start-services.bat
```

**Linux/Mac:**
```bash
# Iniciar servicios manualmente en orden:
cd Backend/users-service && ./mvnw spring-boot:run &
cd Backend/products-service && ./mvnw spring-boot:run &
cd Backend/sales-service && ./mvnw spring-boot:run &
cd Backend/api-gateway && ./mvnw spring-boot:run &
```

### 4. 🎨 Iniciar Frontend

```bash
cd frontend-mvp
npm install
npm run dev
```

### 5. 🌐 Acceder al Sistema

Abrir en el navegador:
```
http://localhost:5173
```

---

## 🔄 Flujo de Uso del Sistema

1. **Registro/Login:** Crear cuenta o iniciar sesión
2. **Explorar Productos:** Ver catálogo con imágenes profesionales
3. **Agregar al Carrito:** Seleccionar productos y cantidades
4. **Checkout:** Procesar compra y generar factura automáticamente
5. **Gestión:** Ver historial de compras y facturas

---

## 📸 Evidencias del Sistema

### ✅ Funcionalidades Implementadas:
- [x] Autenticación completa (login/logout)
- [x] CRUD completo de usuarios
- [x] CRUD completo de productos con imágenes
- [x] Sistema de carrito de compras
- [x] Generación automática de facturas
- [x] Integración completa frontend-backend
- [x] Bases de datos PostgreSQL separadas
- [x] API Gateway con CORS configurado
- [x] Frontend moderno con React + Tailwind
- [x] Reducción automática de stock
- [x] Manejo de errores y validaciones

### 🖼️ Capturas Sugeridas:
- Login y registro de usuarios
- Catálogo de productos con imágenes
- Carrito con productos agregados
- Proceso de checkout
- Factura generada
- Tablas en PostgreSQL
- Interfaz completa funcionando

---

## 🛑 Detener Servicios

**Windows:**
```bash
stop-services.bat
```

**Manual:**
```bash
# Cerrar procesos Java
taskkill /f /im java.exe
```

---

## 👨‍💻 Autor

**Proyecto Académico - Sistemas Distribuidos**

**Estudiante:** Yeison Andres Scarpeta Diaz
**Repositorio:** https://github.com/sparyock/mvp-carrito-microservices

---

## 📊 Estado del Proyecto

| Componente | Estado | Detalles |
|------------|--------|----------|
| Backend (4 microservicios) | ✅ Completo | Spring Boot + PostgreSQL |
| Frontend React | ✅ Completo | Moderno con Tailwind CSS |
| Integración API | ✅ Funcional | Axios + CORS configurado |
| Bases de datos | ✅ Operativas | PostgreSQL con datos iniciales |
| CRUD completo | ✅ Implementado | Todos los servicios |
| Autenticación | ✅ Completa | Login/logout funcional |
| Carrito de compras | ✅ Completo | Con reducción de stock |
| Imágenes productos | ✅ Agregadas | URLs profesionales Unsplash |
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
