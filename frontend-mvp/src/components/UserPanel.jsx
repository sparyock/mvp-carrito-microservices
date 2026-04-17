import React, { useState } from 'react';

export default function UserPanel({ users, onLogin, onSelectUser, onCreateUser, loading, error, loginError }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (!name || !email || !password) return;
    onCreateUser({ nombre: name, correo: email, password });
  };

  const handleLoginSubmit = event => {
    event.preventDefault();
    if (!loginEmail || !loginPassword) return;
    onLogin({ correo: loginEmail, password: loginPassword });
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16 sm:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-neutral">Bienvenido</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Inicia tu experiencia de compra</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">Selecciona un usuario existente o crea una cuenta para comenzar a comprar con tu carrito personalizado.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral">Usuarios existentes</p>
              <div className="mt-4 space-y-3">
                {loading ? (
                  <div className="space-y-3">
                    <div className="h-4 w-3/4 rounded-full bg-slate-200" />
                    <div className="h-4 w-1/2 rounded-full bg-slate-200" />
                  </div>
                ) : error ? (
                  <p className="text-sm text-rose-600">{error}</p>
                ) : users.length === 0 ? (
                  <p className="text-sm text-slate-600">No hay usuarios aún. Crea uno rápido.</p>
                ) : (
                  users.map(user => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => onSelectUser(user)}
                      className="flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-accent/40 hover:bg-accent/5"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{user.nombre}</p>
                        <p className="text-sm text-slate-500">{user.correo}</p>
                      </div>
                      <span className="text-sm font-semibold text-accent">Usar</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral">Iniciar sesión</p>
              <p className="mt-2 text-sm text-slate-600">Inicia sesión con tu correo y contraseña para continuar.</p>
              <form onSubmit={handleLoginSubmit} className="mt-5 space-y-4">
                {loginError && <p className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{loginError}</p>}
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Correo</span>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
                    placeholder="juan@correo.com"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Contraseña</span>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
                    placeholder="********"
                  />
                </label>
                <button type="submit" className="btn-secondary w-full">Ingresar</button>
              </form>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral">Cuenta segura</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">Este flujo permite seleccionar un usuario real y asociar tu carrito de compras a ese usuario.</p>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral">Crear usuario</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Registra una cuenta</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Nombre</span>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
                  placeholder="Juan Perez"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Correo</span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
                  placeholder="juan@correo.com"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Contraseña</span>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
                  placeholder="********"
                />
              </label>
              <button type="submit" className="btn-primary w-full">Crear usuario</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
