import { useEffect, useReducer, useState } from 'react';
import { fetchProducts, createCart, addProductToCart, fetchCart, checkoutCart } from './api/productApi';
import { fetchUsers, createUser, loginUser } from './api/userApi';
import { cartReducer, initialCartState } from './store/cartReducer';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import SkeletonGrid from './components/SkeletonGrid';
import Toast from './components/Toast';
import UserPanel from './components/UserPanel';

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
}

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  async function loadProducts() {
    setIsLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los productos. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  async function loadUsers() {
    setUsersLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setUsersError('No se pudieron cargar los usuarios.');
    } finally {
      setUsersLoading(false);
    }
  }

  useEffect(() => {
    const savedUser = window.localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    loadUsers();
    loadProducts();
  }, []);

  const openCart = () => dispatch({ type: 'TOGGLE_DRAWER', payload: true });
  const closeCart = () => dispatch({ type: 'TOGGLE_DRAWER', payload: false });

  const selectedUserName = currentUser ? currentUser.nombre : null;

  const loadCartItems = async (cartId) => {
    try {
      const cartDetails = await fetchCart(cartId);
      const loadedItems = cartDetails.map((detail) => {
        const product = products.find((p) => p.id === detail.productoId);

        return {
          id: detail.id,
          productoId: detail.productoId,
          nombre: product?.nombre || `Producto ${detail.productoId}`,
          precio: detail.precioUnitario,
          cantidad: detail.cantidad,
          subtotal: detail.subtotal,
          stock: product?.stock ?? null
        };
      });

      dispatch({ type: 'SET_ITEMS', payload: loadedItems });
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'SET_TOAST',
        payload: { message: 'No se pudo cargar el carrito.', type: 'error' }
      });
    }
  };

  const addProduct = async (product) => {
    if (!currentUser) {
      dispatch({
        type: 'SET_TOAST',
        payload: { message: 'Selecciona un usuario antes de agregar productos.', type: 'warning' }
      });
      return;
    }

    try {
      let cartId = state.cartId;

      if (!cartId) {
        const cart = await createCart(currentUser.id);
        cartId = cart.id;
        dispatch({ type: 'SET_CART_ID', payload: cartId });
      }

      await addProductToCart(cartId, product.id, 1);
      await loadCartItems(cartId);

      dispatch({
        type: 'SET_TOAST',
        payload: { message: `${product.nombre} agregado al carrito`, type: 'success' }
      });

      openCart();
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'SET_TOAST',
        payload: { message: 'No se pudo agregar el producto. Intenta más tarde.', type: 'error' }
      });
    }
  };

  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const incrementItem = (id) => dispatch({ type: 'INCREMENT_ITEM', payload: id });
  const decrementItem = (id) => dispatch({ type: 'DECREMENT_ITEM', payload: id });
  const clearToast = () => dispatch({ type: 'CLEAR_TOAST' });

  const subtotal = state.items.reduce((total, item) => total + item.subtotal, 0);
  const taxes = subtotal * 0.12;
  const total = subtotal + taxes;

  const handleCheckout = async () => {
    if (!currentUser) {
      dispatch({
        type: 'SET_TOAST',
        payload: { message: 'Selecciona un usuario antes de pagar.', type: 'warning' }
      });
      return;
    }

    if (!state.cartId || state.items.length === 0) {
      dispatch({
        type: 'SET_TOAST',
        payload: { message: 'Agrega productos antes de pagar.', type: 'warning' }
      });
      return;
    }

    try {
      const result = await checkoutCart(state.cartId);
      console.log('Factura generada', result);

      alert(
        `Compra realizada con éxito.\n\n` +
        `Factura generada correctamente.\n\n` +
        `Respuesta del servidor:\n${JSON.stringify(result, null, 2)}`
      );

      dispatch({
        type: 'SET_TOAST',
        payload: { message: 'Compra realizada con éxito.', type: 'success' }
      });

      dispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'TOGGLE_DRAWER', payload: false });

      await loadProducts();
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'SET_TOAST',
        payload: { message: 'Error al procesar el pago.', type: 'error' }
      });
    }
  };

  const handleSelectUser = (user) => {
    if (currentUser?.id !== user.id) {
      dispatch({ type: 'CLEAR_CART' });
    }

    setCurrentUser(user);
    window.localStorage.setItem('currentUser', JSON.stringify(user));

    dispatch({
      type: 'SET_TOAST',
      payload: { message: `Hola ${user.nombre}, listo para comprar.`, type: 'success' }
    });
  };

  const getApiErrorMessage = (error) => {
    const data = error?.response?.data;
    if (!data) return 'Ocurrió un error en la solicitud.';
    if (typeof data === 'string') return data;
    return Object.values(data).filter(Boolean).join(' | ');
  };

  const handleCreateUser = async (usuario) => {
    try {
      const user = await createUser(usuario);
      setUsers((prev) => [...prev, user]);
      handleSelectUser({ id: user.id, nombre: user.nombre, correo: user.correo });
    } catch (err) {
      console.error(err);
      const message = getApiErrorMessage(err);

      dispatch({
        type: 'SET_TOAST',
        payload: { message: `No se pudo crear el usuario. ${message}`, type: 'error' }
      });
    }
  };

  const handleLogin = async (credentials) => {
    setLoginError(null);

    try {
      const user = await loginUser(credentials);
      handleSelectUser({ id: user.id, nombre: user.nombre, correo: user.correo });
    } catch (err) {
      console.error(err);
      const message = getApiErrorMessage(err);
      setLoginError(message || 'Correo o contraseña incorrectos. Intenta de nuevo.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginError(null);
    window.localStorage.removeItem('currentUser');
    dispatch({ type: 'CLEAR_CART' });
    dispatch({
      type: 'SET_TOAST',
      payload: { message: 'Sesión cerrada.', type: 'info' }
    });
  };

  return (
    <div className="min-h-screen bg-surface text-slate-900">
      <Header
        badgeCount={state.items.length}
        onCartClick={openCart}
        userName={selectedUserName}
        onLogout={handleLogout}
      />

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        {!currentUser ? (
          <UserPanel
            users={users}
            loading={usersLoading}
            error={usersError}
            loginError={loginError}
            onLogin={handleLogin}
            onSelectUser={handleSelectUser}
            onCreateUser={handleCreateUser}
          />
        ) : (
          <>
            <section className="mb-10 rounded-[32px] bg-white p-8 shadow-soft">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <span className="inline-flex rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                    Lanzamiento premium
                  </span>
                  <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                    Diseño de compras de lujo
                  </h1>
                  <p className="mt-4 text-lg leading-8 text-slate-600">
                    Una experiencia de carrito elegante, minimalista y moderna. Productos seleccionados,
                    vista rápida y checkout suave.
                  </p>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-slate-950 px-8 py-6 text-white shadow-lg">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Oferta exclusiva</p>
                  <p className="mt-4 text-3xl font-semibold">40% de descuento</p>
                  <p className="mt-2 text-sm text-slate-400">
                    En productos seleccionados, disponible actualmente.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-neutral">Catálogo</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">Productos destacados</h2>
              </div>

              <button type="button" className="btn-secondary" onClick={openCart}>
                Ver carrito ({state.items.length})
              </button>
            </section>

            {isLoading ? (
              <SkeletonGrid />
            ) : error ? (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-8 text-rose-700 shadow-sm">
                {error}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={() => addProduct(product)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <CartDrawer
        open={state.drawerOpen}
        onClose={closeCart}
        items={state.items}
        subtotal={subtotal}
        taxes={taxes}
        total={total}
        onRemove={removeItem}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onCheckout={handleCheckout}
      />

      {state.toast && (
        <Toast
          message={state.toast.message}
          type={state.toast.type}
          onClose={clearToast}
        />
      )}
    </div>
  );
}

export default App;