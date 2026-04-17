# Frontend MVP - Carrito de Compras

Frontend moderno con React + Tailwind CSS diseñado para consumir el backend existente.

## Características
- Catálogo de productos en grid responsivo.
- Carrito lateral (drawer) deslizante.
- Checkout con cálculo de impuestos y resumen claro.
- Skeleton loaders y notificaciones toast.
- Integración con API usando Axios.

## Instalación

```bash
cd frontend-mvp
npm install
npm run dev
```

## Configuración de la API

Si el backend se ejecuta en una URL distinta a `http://localhost:8080`, crea un archivo `.env` con:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Estructura de archivos

- `src/App.jsx`: control principal de estado y lógica del carrito.
- `src/api/productApi.js`: llamadas a la API con Axios.
- `src/components/`: componentes de UI reutilizables.
- `src/store/cartReducer.js`: manejo de estado del carrito con `useReducer`.
- `src/styles/index.css`: estilos globales y utilidades de Tailwind.

## Endpoints consumidos

- `GET /products`
- `POST /sales/cart?usuarioId=1`
- `POST /sales/cart/{cartId}/items`
- `POST /sales/invoice/{cartId}`

## Estilo visual

Paleta: blanco, gris oscuro y azul cobalto.
Diseño minimalista inspirado en e-commerce de lujo.
