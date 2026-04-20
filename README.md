# Sistema de Microservicios — Gestión de Citas Inteligente / MVP Carrito de Compras

## Descripción General

Este proyecto corresponde a la implementación de una arquitectura basada en microservicios desarrollada como parte de la asignatura de Sistemas Distribuidos. El sistema simula un flujo completo de gestión de ventas mediante la interacción entre múltiples servicios independientes, cada uno responsable de una funcionalidad específica.

El objetivo principal del proyecto es demostrar el funcionamiento de una arquitectura distribuida utilizando tecnologías modernas como Spring Boot, PostgreSQL, Docker y un API Gateway, permitiendo la comunicación entre servicios y la persistencia de datos en bases de datos independientes.

El sistema permite:

- Registrar usuarios
- Autenticar usuarios mediante login
- Crear y gestionar productos
- Administrar carritos de compra
- Agregar productos al carrito
- Reducir stock automáticamente
- Generar facturas
- Persistir información en bases de datos PostgreSQL

La arquitectura está diseñada siguiendo principios de desacoplamiento, escalabilidad y modularidad, permitiendo que cada microservicio funcione de manera independiente.

---

## Arquitectura del Sistema

El sistema está compuesto por los siguientes microservicios:

- API Gateway
- Users Service
- Products Service
- Sales Service
- PostgreSQL (base de datos independiente por servicio)

Cada microservicio tiene su propia base de datos y se comunica a través del API Gateway utilizando rutas HTTP.

---

## Estructura del Proyecto

```
mvp-carrito-microservices
│
├── api-gateway
│
├── users-service
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│   └── resources
│
├── products-service
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│   └── resources
│
├── sales-service
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│   └── resources
│
└── docker-compose.yml
```

---

## Tecnologías Utilizadas

Backend:

- Java 17
- Spring Boot 3
- Spring Data JPA
- Spring Web
- Maven

Base de datos:

- PostgreSQL 16

Infraestructura:

- Docker
- Docker Compose

Herramientas de prueba:

- Postman
- pgAdmin 4

---

## Puertos Utilizados

| Servicio | Puerto |
|----------|-------|
| API Gateway | 8080 |
| Users Service | 8081 |
| Products Service | 8082 |
| Sales Service | 8083 |
| PostgreSQL | 5432 |

---

## Bases de Datos

Cada microservicio utiliza su propia base de datos independiente.

| Microservicio | Base de datos |
|--------------|--------------|
| Users Service | mvp_users_db |
| Products Service | mvp_products_db |
| Sales Service | mvp_sales_db |

Esto permite mantener independencia entre servicios y evitar dependencias directas entre tablas de diferentes dominios.

---

## API Gateway

El API Gateway actúa como punto de entrada único para todos los microservicios. Su función principal es enrutar las solicitudes hacia el servicio correspondiente.

Ejemplo de rutas configuradas:

```
/users/**
/products/**
/sales/**
```

Ejemplo de configuración:

```
spring.cloud.gateway.routes[0].id=users-service
spring.cloud.gateway.routes[0].uri=http://localhost:8081
spring.cloud.gateway.routes[0].predicates[0]=Path=/users/**
```

---

## Microservicio Users Service

Responsabilidades:

- Crear usuarios
- Autenticar usuarios
- Listar usuarios
- Obtener usuario por ID
- Actualizar usuario
- Eliminar usuario

Endpoints disponibles:

```
POST /users
POST /users/login
GET /users
GET /users/id/{id}
PUT /users/{id}
DELETE /users/{id}
```

Ejemplo de creación de usuario:

```
POST http://localhost:8080/users
```

Body:

```
{
  "nombre": "Juan Perez",
  "correo": "juan@gmail.com",
  "password": "123456"
}
```

---

## Microservicio Products Service

Responsabilidades:

- Crear productos
- Listar productos
- Actualizar productos
- Reducir stock
- Eliminar productos

Endpoints disponibles:

```
POST /products
GET /products
GET /products/{id}
PUT /products/{id}
PUT /products/{id}/stock?cantidad=1
DELETE /products/{id}
```

Ejemplo de reducción de stock:

```
PUT http://localhost:8080/products/1/stock?cantidad=1
```

---

## Microservicio Sales Service

Responsabilidades:

- Crear carrito
- Agregar productos al carrito
- Consultar carrito
- Generar factura

Endpoints disponibles:

```
POST /sales/cart?usuarioId=3
POST /sales/cart/{cartId}/items
GET /sales/cart/{cartId}
POST /sales/invoice/{cartId}
```

Ejemplo de crear carrito:

```
POST http://localhost:8080/sales/cart?usuarioId=3
```

Ejemplo de agregar producto al carrito:

```
POST http://localhost:8080/sales/cart/7/items
```

Body:

```
{
  "productoId": 1,
  "cantidad": 1
}
```

Ejemplo de generar factura:

```
POST http://localhost:8080/sales/invoice/7
```

---

## Flujo Completo del Sistema

El flujo funcional del sistema es el siguiente:

1. Se crea un usuario
2. Se crea un producto
3. Se crea un carrito
4. Se agrega un producto al carrito
5. Se reduce el stock del producto
6. Se genera la factura
7. La factura se guarda en la base de datos

Este flujo demuestra la comunicación entre múltiples microservicios dentro de una arquitectura distribuida.

---

## Ejecución del Proyecto

Requisitos previos:

- Java 17 instalado
- Maven instalado
- Docker instalado
- Docker Desktop en ejecución

---

## Ejecución con Docker

Paso 1:

Abrir una terminal en la raíz del proyecto.

Paso 2:

Ejecutar el siguiente comando:

```
docker compose up -d
```

Paso 3:

Verificar los contenedores:

```
docker ps
```

Debe mostrar:

- api-gateway
- users-service
- products-service
- sales-service
- postgres

---

## Ejecución sin Docker

Para ejecutar los microservicios manualmente desde Visual Studio Code:

```
cd users-service
mvn spring-boot:run
```

```
cd products-service
mvn spring-boot:run
```

```
cd sales-service
mvn spring-boot:run
```

```
cd api-gateway
mvn spring-boot:run
```

---

## Verificación del Sistema

Se realizaron pruebas funcionales utilizando Postman para validar el comportamiento de cada microservicio.

Resultados de pruebas:

| Funcionalidad | Estado |
|--------------|-------|
| Crear usuario | Correcto |
| Login usuario | Correcto |
| Listar usuarios | Correcto |
| Crear producto | Correcto |
| Listar productos | Correcto |
| Reducir stock | Correcto |
| Crear carrito | Correcto |
| Agregar item al carrito | Correcto |
| Ver carrito | Correcto |
| Generar factura | Correcto |

---

## Ejemplo de Consulta SQL

Ver facturas generadas:

```
SELECT * FROM facturas ORDER BY id DESC;
```

Ejemplo de resultado:

| id | fecha | total | usuario_id |
|----|------|------|-----------|
| 4 | 2026-04-20 | 175 | 3 |

---

## Seguridad

Actualmente el sistema utiliza autenticación básica mediante correo y contraseña.

Nota técnica:

Las contraseñas se almacenan en texto plano únicamente con fines académicos. En un entorno de producción se recomienda utilizar algoritmos de hash como:

- BCrypt
- Argon2
- PBKDF2

---

## Escalabilidad

La arquitectura basada en microservicios permite:

- Escalar servicios de forma independiente
- Mantener separación de responsabilidades
- Facilitar mantenimiento y despliegue
- Permitir integración con nuevos servicios

Ejemplo de servicios futuros:

- Servicio de notificaciones
- Servicio de pagos
- Servicio de reportes
- Servicio de autenticación con JWT

---

## Autor

Proyecto desarrollado como parte del curso de Sistemas Distribuidos.

Rol en el proyecto:

Configuración de microservicios

Configuración de bases de datos

Implementación de Docker

Pruebas funcionales del sistema

Documentación técnica

---

## Estado del Proyecto

El sistema se encuentra completamente funcional a nivel de MVP, permitiendo la ejecución de un flujo completo desde la creación de usuarios hasta la generación de facturas dentro de una arquitectura distribuida basada en microservicios.

