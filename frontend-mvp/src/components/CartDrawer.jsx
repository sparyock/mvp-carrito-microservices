import React from 'react';

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
}

export default function CartDrawer({ open, onClose, items, subtotal, taxes, total, onRemove, onIncrement, onDecrement, onCheckout }) {
  return (
    <div className={`fixed inset-0 z-40 transition duration-500 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
      <div onClick={onClose} className={`absolute inset-0 bg-slate-950/30 backdrop-blur-sm transition duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-soft transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral">Tu carrito</p>
            <h2 className="text-2xl font-semibold text-slate-900">Resumen</h2>
          </div>
          <button type="button" onClick={onClose} className="text-slate-500 transition hover:text-slate-900">Cerrar</button>
        </div>

        <div className="h-full overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
              <p className="text-lg font-semibold">Tu carrito está vacío</p>
              <p className="mt-2 text-sm">Añade un producto para comenzar el checkout.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-slate-900">{item.nombre}</p>
                      <p className="mt-2 text-sm text-slate-600">{formatCurrency(item.precio)} x {item.cantidad}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">Subtotal: {formatCurrency(item.subtotal)}</p>
                    </div>
                    <button type="button" onClick={() => onRemove(item.id)} className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-600">Eliminar</button>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-3xl bg-white p-3">
                    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2">
                      <button type="button" onClick={() => onDecrement(item.id)} className="text-xl font-bold text-slate-600">−</button>
                      <span className="min-w-[24px] text-center font-semibold text-slate-900">{item.cantidad}</span>
                      <button type="button" onClick={() => onIncrement(item.id)} className="text-xl font-bold text-slate-600">+</button>
                    </div>
                    <span className="text-sm text-slate-500">Disponible: {item.stock ?? 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 rounded-[32px] border border-slate-200 bg-slate-950 px-6 py-6 text-white shadow-soft">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Impuestos (12%)</span>
                <span>{formatCurrency(taxes)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-700 pt-4 text-xl font-semibold text-white">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              className="btn-primary mt-6 w-full rounded-full bg-accent text-white"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
