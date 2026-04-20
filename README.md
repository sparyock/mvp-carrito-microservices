# Sistema de Microservicios —  MVP Carrito de Compras


## Descripción general

Este proyecto implementa una arquitectura basada en microservicios para gestionar usuarios, productos y ventas mediante un flujo completo de carrito de compras y facturación. El sistema fue desarrollado como práctica de Sistemas Distribuidos y está organizado en servicios independientes que se comunican a través de un API Gateway.

Cada microservicio tiene su propia responsabilidad, su propia base de datos PostgreSQL y su propia lógica de negocio. Esto permite una mejor separación de responsabilidades, mantenimiento más claro y facilidad para escalar componentes de manera independiente.

El sistema permite:

- registrar usuarios
- autenticar usuarios mediante login
- crear, consultar, actualizar y eliminar productos
- crear carritos de compra
- agregar productos al carrito
- reducir stock automáticamente
- generar facturas
- consultar la información desde un frontend web desarrollado en React

---

## Arquitectura del sistema

```text
Frontend React + Vite
        |
        v
API Gateway
        |
  -------------------------------
  |             |              |
  v             v              v
Users        Products        Sales
Service      Service         Service
```

---

## Estructura del proyecto

```text
MVP-CARRITO-MICROSERVICES
│
├── Backend
│   ├── api-gateway
│   ├── products-service
│   ├── sales-service
│   └── users-service
│
├── frontend-mvp
│   ├── src
│   │   ├── api
│   │   │   ├── productApi.js
│   │   │   └── userApi.js
│   │   ├── components
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── SkeletonGrid.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── UserPanel.jsx
│   │   ├── store
│   │   │   └── cartReducer.js
│   │   ├── styles
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── start-products.bat
│   ├── start-services.bat
│   └── stop-services.bat
│
└── README.md
```

---

## Microservicios del backend

### API Gateway

Puerto: `8080`

Responsabilidad:

- punto de entrada al sistema
- redirección de solicitudes a cada microservicio
- centralización de rutas
- manejo de integración entre frontend y backend

Rutas principales:

```text
/users/**
/products/**
/sales/**
```

---

### Users Service

Puerto: `8081`

Responsabilidad:

- crear usuarios
- autenticar usuarios
- listar usuarios
- consultar usuario por id
- actualizar usuarios
- eliminar usuarios

Base de datos: `mvp_users_db`

Endpoints principales:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /users | Crear usuario |
| POST | /users/login | Autenticar usuario |
| GET | /users | Listar usuarios |
| GET | /users/{id} | Obtener usuario por id |
| PUT | /users/{id} | Actualizar usuario |
| DELETE | /users/{id} | Eliminar usuario |

---

### Products Service

Puerto: `8082`

Responsabilidad:

- crear productos
- listar productos
- consultar productos por id
- actualizar productos
- reducir stock
- eliminar productos

Base de datos: `mvp_products_db`

Endpoints principales:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /products | Crear producto |
| GET | /products | Listar productos |
| GET | /products/{id} | Obtener producto por id |
| PUT | /products/{id} | Actualizar producto |
| PUT | /products/{id}/stock?cantidad=1 | Reducir stock |
| DELETE | /products/{id} | Eliminar producto |

---

### Sales Service

Puerto: `8083`

Responsabilidad:

- crear carritos
- agregar productos al carrito
- consultar carrito por id
- generar factura
- persistir el detalle de la venta

Base de datos: `mvp_sales_db`

Tablas principales:

```text
carritos
carrito_detalle
facturas
detalle_factura
```

Endpoints validados en pruebas:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /sales/cart?usuarioId={id} | Crear carrito |
| POST | /sales/cart/{cartId}/items | Agregar producto al carrito |
| GET | /sales/cart/{cartId} | Consultar carrito por id |
| POST | /sales/invoice/{cartId} | Generar factura |

Observación técnica:

Durante las pruebas se validó correctamente el flujo principal de ventas. Algunos endpoints documentados inicialmente para actualizar y eliminar items del carrito no se encontraron implementados en el backend actual, por lo que se dejan como mejora futura.

---

## Frontend

El proyecto incluye un frontend desarrollado en React con Vite, encargado de consumir los microservicios y mostrar una interfaz moderna para el flujo de compra.

Tecnologías del frontend:

- React 18
- Vite
- JavaScript
- Axios
- Tailwind CSS

Puerto usado:

- desarrollo: `5173`
- vista previa o build local: `4173`

Funcionalidades del frontend:

- login y selección de usuario
- registro de nuevos usuarios
- catálogo de productos
- visualización de imágenes de productos
- carrito lateral interactivo
- cálculo de subtotal, impuestos y total
- checkout y generación de factura
- persistencia de sesión con localStorage
- mensajes de retroalimentación mediante toast

Archivos principales del frontend:

| Archivo | Función |
|--------|---------|
| `App.jsx` | Componente principal y flujo general |
| `main.jsx` | Punto de entrada del frontend |
| `src/api/productApi.js` | Consumo de endpoints de productos y ventas |
| `src/api/userApi.js` | Consumo de endpoints de usuarios |
| `src/components/ProductCard.jsx` | Tarjeta visual de producto |
| `src/components/CartDrawer.jsx` | Panel lateral del carrito |
| `src/components/UserPanel.jsx` | Login, selección y registro de usuario |
| `src/components/Header.jsx` | Encabezado principal |
| `src/components/Toast.jsx` | Mensajes emergentes |
| `src/components/SkeletonGrid.jsx` | Carga visual de catálogo |
| `src/store/cartReducer.js` | Manejo del estado del carrito |

---

## Bases de datos

Cada microservicio usa su propia base de datos PostgreSQL:

| Servicio | Base de datos |
|----------|---------------|
| Users Service | `mvp_users_db` |
| Products Service | `mvp_products_db` |
| Sales Service | `mvp_sales_db` |

Esto mantiene independencia entre dominios y evita acoplamiento innecesario entre tablas de servicios distintos.

---

## Tecnologías utilizadas

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- Spring Web
- Maven

### Frontend

- React 18
- Vite
- Axios
- Tailwind CSS
- JavaScript
- HTML
- CSS

### Base de datos e infraestructura

- PostgreSQL
- Docker
- Docker Compose

### Herramientas de trabajo y pruebas

- Visual Studio Code
- Postman
- pgAdmin 4
- Git
- GitHub

---

## Ramas del repositorio

El proyecto maneja una estrategia básica de trabajo con tres ramas principales:

### `main`

Rama principal del proyecto. Debe contener la versión más estable y lista para entrega o presentación.

### `develop`

Rama de integración. Aquí se consolidan los cambios funcionales antes de pasarlos a la rama principal.

### `qa`

Rama de validación. Se usa para pruebas, revisión y verificación del comportamiento antes de unir cambios a `main`.

Flujo recomendado de trabajo:

```text
develop -> qa -> main
```

Uso sugerido:

- desarrollar nuevas funciones en `develop`
- validar funcionamiento en `qa`
- publicar versión estable en `main`

---

## Ejecución del proyecto

### Requisitos previos

- Java 17
- Maven
- Node.js 18 o superior
- PostgreSQL
- Docker Desktop

---

## Ejecución con Docker

Desde la raíz del proyecto:

```bash
docker compose up -d
```

Verificar contenedores:

```bash
docker ps
```

---

## Ejecución manual del backend

En terminales separadas:

```bash
cd Backend/users-service
mvn spring-boot:run
```

```bash
cd Backend/products-service
mvn spring-boot:run
```

```bash
cd Backend/sales-service
mvn spring-boot:run
```

```bash
cd Backend/api-gateway
mvn spring-boot:run
```

---

## Ejecución del frontend

```bash
cd frontend-mvp
npm install
npm run dev
```

Abrir en navegador:

```text
http://localhost:5173
```

---

## Pruebas funcionales realizadas

Se realizaron pruebas manuales en Postman y validación en pgAdmin.

### Users Service

- crear usuario: correcto
- login de usuario: correcto
- listar usuarios: correcto
- obtener usuario por id: correcto
- actualizar usuario: correcto
- eliminar usuario: correcto

### Products Service

- crear producto: correcto
- listar productos: correcto
- obtener producto por id: correcto
- actualizar producto: correcto
- reducir stock con parámetro `cantidad`: correcto
- eliminar producto: correcto

### Sales Service

- crear carrito: correcto
- agregar producto al carrito: correcto
- consultar carrito por id: correcto
- generar factura: correcto
- persistencia de factura en PostgreSQL: correcta

Observación:

Las pruebas confirmaron que el flujo principal del sistema funciona de forma correcta: usuario, producto, carrito, reducción de stock y generación de factura.

---

## Ejemplos de endpoints probados

Crear carrito:

```http
POST http://localhost:8080/sales/cart?usuarioId=3
```

Agregar producto al carrito:

```http
POST http://localhost:8080/sales/cart/7/items
Content-Type: application/json
```

Body:

```json
{
  "productoId": 1,
  "cantidad": 1
}
```

Consultar carrito:

```http
GET http://localhost:8080/sales/cart/7
```

Reducir stock:

```http
PUT http://localhost:8080/products/1/stock?cantidad=1
```

Generar factura:

```http
POST http://localhost:8080/sales/invoice/7
```

---

## Consultas SQL de verificación

Consultar productos:

```sql
SELECT * FROM productos;
```

Consultar carritos:

```sql
SELECT * FROM carritos;
```

Consultar detalle del carrito:

```sql
SELECT * FROM carrito_detalle;
```

Consultar facturas:

```sql
SELECT * FROM facturas ORDER BY id DESC;
```

Consultar detalle de facturas:

```sql
SELECT * FROM detalle_factura;
```

---

## Flujo funcional validado

1. Se crea o selecciona un usuario
2. Se consultan los productos
3. Se crea un carrito asociado al usuario
4. Se agrega un producto al carrito
5. Se consulta el contenido del carrito
6. Se reduce stock del producto
7. Se genera la factura
8. Se valida la persistencia en PostgreSQL

---

## Seguridad

El login actual funciona con correo y contraseña. Por tratarse de un proyecto académico, las contraseñas se almacenan sin cifrado. Para una versión de producción se recomienda integrar:

- BCrypt
- JWT
- Spring Security
- control de roles y permisos

---

## Mejoras futuras

- implementar endpoints para actualizar cantidad de items del carrito
- implementar endpoints para eliminar items del carrito
- listar carritos desde endpoint general
- listar facturas desde endpoint general
- integrar seguridad con JWT
- agregar pruebas automatizadas
- agregar validaciones más estrictas
- desplegar servicios en contenedores independientes con configuración completa de producción

---

## Autor

Proyecto académico desarrollado para la asignatura de Sistemas Distribuidos.

Estudiante: Yeison Andres Scarpeta Diaz

---

## Estado del proyecto

El proyecto se encuentra funcional a nivel de MVP. El flujo principal de usuarios, productos, carrito y facturación fue validado correctamente tanto por endpoints como por persistencia en PostgreSQL.
