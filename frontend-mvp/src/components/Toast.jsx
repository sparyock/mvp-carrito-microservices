import React, { useEffect } from 'react';

const palette = {
  success: 'bg-emerald-600 text-white',
  error: 'bg-rose-600 text-white',
  warning: 'bg-amber-500 text-slate-950'
};

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3200);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 min-w-[320px] rounded-3xl px-5 py-4 shadow-soft ${palette[type]}`}>
      <p className="text-sm font-semibold">{message}</p>
    </div>
  );
}
