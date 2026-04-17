import React from 'react';

export default function Header({ badgeCount, onCartClick, userName, onLogout }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">Luxury Store</p>
          <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Carrito de compras Premium</h1>
            {userName && <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">Hola, {userName}</span>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {userName && (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-300 hover:text-rose-600"
            >
              Cerrar sesión
            </button>
          )}
          <button
            type="button"
            onClick={onCartClick}
            className="relative inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-accent hover:text-accent"
          >
            <span>Carrito</span>
            <span className="inline-flex h-9 min-w-[36px] items-center justify-center rounded-full bg-accent text-sm font-semibold text-white shadow-lg">{badgeCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
