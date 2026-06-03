const ITEMS = [
  { color: 'bg-green-700', label: 'Alta forte' },
  { color: 'bg-green-800', label: 'Alta' },
  { color: 'bg-slate-700', label: 'Neutro' },
  { color: 'bg-red-800', label: 'Queda' },
  { color: 'bg-red-900', label: 'Queda forte' },
] as const;

export function CityLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-1">
      <span className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">
        Cores dos prédios
      </span>
      {ITEMS.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className={`inline-block w-3 h-3 rounded-sm ${color}`} />
          <span className="text-slate-400 text-xs">{label}</span>
        </div>
      ))}
      <span className="text-slate-600 text-xs ml-auto hidden sm:block">
        Altura do prédio proporcional à variação do ativo
      </span>
    </div>
  );
}
