import React from 'react';

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value || 0);
}

export default function ProductCard({ product, onAdd }) {
  const fallbackImage =
    'https://via.placeholder.com/400x400?text=Producto';

  const imageSrc =
    product?.imagenUrl && product.imagenUrl.trim() !== ''
      ? product.imagenUrl
      : fallbackImage;

  return (
    <article className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-6 flex h-56 items-center justify-center overflow-hidden rounded-3xl bg-slate-100">
        <img
          src={imageSrc}
          alt={product?.nombre || 'Producto'}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral">
            {product?.categoria || 'Lujo'}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {product?.nombre || 'Producto sin nombre'}
          </h3>
        </div>

        <p className="text-sm leading-6 text-slate-600">
          {product?.descripcion || 'Edición limitada con diseño premium y materiales de alta calidad.'}
        </p>

        <div className="flex items-center justify-between gap-4 pt-4">
          <div>
            <p className="text-xl font-semibold text-slate-900">
              {formatCurrency(product?.precio)}
            </p>
            <p className="text-sm text-neutral">
              Stock: {product?.stock ?? 'N/A'}
            </p>
          </div>

          <button
            type="button"
            onClick={onAdd}
            className="btn-primary whitespace-nowrap"
          >
            Añadir
          </button>
        </div>
      </div>
    </article>
  );
}