import React from 'react';

const cards = Array.from({ length: 6 }, (_, index) => index + 1);

export default function SkeletonGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map(card => (
        <div key={card} className="animate-pulse rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-6 h-56 rounded-3xl bg-slate-200" />
          <div className="space-y-4">
            <div className="h-4 w-3/4 rounded-full bg-slate-200" />
            <div className="h-5 w-full rounded-full bg-slate-200" />
            <div className="h-3 w-5/6 rounded-full bg-slate-200" />
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-2">
                <div className="h-4 w-20 rounded-full bg-slate-200" />
                <div className="h-3 w-24 rounded-full bg-slate-200" />
              </div>
              <div className="h-11 w-28 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
