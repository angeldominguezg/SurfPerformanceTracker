const favoriteSpots = [
  {
    name: "Los Pocitos",
    region: "VE - La Guaira",
    accent: "from-amber-200 via-sky-200 to-blue-400",
    active: true,
  },
  {
    name: "Los Caracas",
    region: "VE - La Guaira",
    accent: "from-slate-300 via-slate-100 to-slate-400",
  },
  {
    name: "Aeropuerto",
    region: "VE - La Guaira",
    accent: "from-emerald-200 via-cyan-100 to-slate-300",
  },
];

const forecastCards = [
  {
    day: "Hoy",
    date: "12 May",
    waveHeight: "1.8 - 2.5",
    direction: "NW (310°)",
    energy: "850 kJ",
    windLabel: "Viento: Off-shore",
    windValue: "12 km/h SE",
    windBadge: "Excelente",
    windTone:
      "border-emerald-100 bg-emerald-50 text-emerald-700 shadow-emerald-100/80",
    highTide: "06:45 & 19:12",
    lowTide: "12:54 & 01:20",
    bestWindow: "07:30 - 10:45",
    bestWindowNote: "Marea media subiendo, vientos suaves de tierra.",
    highlight: "from-blue-700 via-blue-600 to-cyan-500",
    waveTone: "bg-blue-100 text-blue-700",
  },
  {
    day: "Mañana",
    date: "13 May",
    waveHeight: "1.2 - 1.8",
    direction: "N (355°)",
    energy: "420 kJ",
    windLabel: "Viento: On-shore",
    windValue: "25 km/h NW",
    windBadge: "Pobre",
    windTone:
      "border-amber-100 bg-amber-50 text-amber-700 shadow-amber-100/80",
    highTide: "07:55 & 20:22",
    lowTide: "14:04 & 02:30",
    bestWindow: "Sin ventanas óptimas",
    bestWindowNote: "Vientos de mar afectan la forma de la ola.",
    highlight: "from-slate-200 via-slate-100 to-slate-200",
    waveTone: "bg-slate-200 text-slate-500",
  },
  {
    day: "Lunes",
    date: "14 May",
    waveHeight: "3.0 - 4.5",
    direction: "NW (315°)",
    energy: "1450 kJ",
    windLabel: "Viento: Off-shore",
    windValue: "18 km/h S",
    windBadge: "Solo Pro",
    windTone:
      "border-emerald-100 bg-emerald-50 text-emerald-700 shadow-emerald-100/80",
    highTide: "09:05 & 21:32",
    lowTide: "15:14 & 03:40",
    bestWindow: "11:00 - 13:30",
    bestWindowNote: "Gran swell llegando. La desembocadura aguanta bien el tamaño.",
    highlight: "from-blue-700 via-blue-600 to-cyan-500",
    waveTone: "bg-indigo-100 text-indigo-700",
  },
];

const swellComponents = [
  { label: "Swell Primario", value: "2.4m @ 14s (NW)", tone: "bg-blue-600" },
  { label: "Swell Secundario", value: "0.8m @ 8s (N)", tone: "bg-slate-300" },
  { label: "Mar de Viento", value: "0.4m @ 4s (SE)", tone: "bg-slate-200" },
];

function SpotPreview({
  accent,
  alt,
}: {
  accent: string;
  alt: string;
}) {
  return (
    <div
      aria-label={alt}
      className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${accent} shadow-inner`}
    />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,103,255,0.12),_transparent_20%),linear-gradient(180deg,#f9fbff_0%,#f3f6fb_32%,#eef2f7_100%)] text-slate-900">
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl shadow-inner shadow-blue-200/80">
                🌊
              </div>
              <div>
                <p className="text-lg font-black tracking-tight text-slate-950">SurfCast</p>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                  Surf Performance Tracker
                </p>
              </div>
            </div>

            <div className="hidden min-w-[260px] flex-1 justify-center lg:flex">
              <label className="flex h-12 w-full max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 shadow-sm shadow-slate-200/40">
                <span className="text-slate-400">⌕</span>
                <input
                  aria-label="Buscar playas"
                  className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                  placeholder="Buscar playas globales..."
                  readOnly
                  value=""
                />
              </label>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {["🔔", "⚙️"].map((icon) => (
                <button
                  key={icon}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-base transition hover:border-blue-200 hover:bg-blue-50"
                  type="button"
                >
                  {icon}
                </button>
              ))}
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-orange-100 bg-gradient-to-br from-orange-200 via-orange-100 to-blue-100 text-sm font-black text-slate-700">
                AD
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-[1600px] flex-1 gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
          <aside className="hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] lg:flex lg:flex-col">
            <div className="space-y-8">
              <section>
                <p className="px-2 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                  Menú Principal
                </p>
                <nav className="mt-4 space-y-2">
                  <a
                    className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200/80"
                    href="#"
                  >
                    <span>▦</span>
                    <span>Panel</span>
                  </a>
                  <a className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900" href="#">
                    <span>🗺️</span>
                    <span>Mapa Global</span>
                  </a>
                  <a className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900" href="#">
                    <span>👥</span>
                    <span>Comunidad</span>
                  </a>
                </nav>
              </section>

              <section>
                <div className="flex items-center justify-between px-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    Playas Favoritas
                  </p>
                  <button className="text-lg text-blue-600" type="button">
                    +
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {favoriteSpots.map((spot) => (
                    <div
                      key={spot.name}
                      className={`flex items-center gap-3 rounded-2xl border p-3 transition ${
                        spot.active
                          ? "border-blue-200 bg-blue-50 shadow-sm shadow-blue-100/80"
                          : "border-transparent bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      <SpotPreview accent={spot.accent} alt={spot.name} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-900">{spot.name}</p>
                        <p className="truncate text-xs font-medium text-slate-500">
                          {spot.region}
                        </p>
                      </div>
                      {spot.active ? <span className="text-blue-600">★</span> : null}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-auto rounded-[1.75rem] bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-5 text-white shadow-[0_28px_70px_-35px_rgba(37,99,235,0.85)]">
              <p className="text-2xl">🏄</p>
              <h2 className="mt-3 text-sm font-black uppercase tracking-[0.2em]">Hazte Premium</h2>
              <p className="mt-2 text-xs leading-5 text-blue-50/90">
                Desbloquea pronósticos extendidos, cámaras HD y alertas avanzadas por spot.
              </p>
              <button
                className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                type="button"
              >
                Mejorar ahora
              </button>
            </div>
          </aside>

          <section className="space-y-8">
            <div className="flex flex-col gap-5 rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-blue-600">
                    VE • La Guaira
                  </p>
                  <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                    Pronóstico Los Pocitos
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                    Punto de izquierda consistente. Conocida como la mejor ola de desembocadura de río del
                    mundo.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-[1.5rem] border border-slate-200 bg-white p-2 shadow-sm shadow-slate-200/60">
                  <div className="rounded-[1.25rem] px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                      Temp. Agua
                    </p>
                    <p className="mt-1 text-3xl font-black text-slate-950">16°C</p>
                  </div>
                  <div className="rounded-[1.25rem] border-l border-slate-100 px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                      Clima
                    </p>
                    <p className="mt-1 text-3xl font-black text-slate-950">21°C</p>
                    <p className="text-sm font-semibold text-amber-500">☀ Parcialmente soleado</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-3">
                {forecastCards.map((card) => (
                  <article key={card.day} className="space-y-3">
                    <div className="flex items-center justify-between px-2">
                      <h2 className="text-2xl font-black tracking-tight text-slate-900">{card.day}</h2>
                      <span className="text-sm font-semibold text-slate-400">{card.date}</span>
                    </div>

                    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_45px_-32px_rgba(15,23,42,0.45)]">
                      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-5">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                            Altura de Ola
                          </p>
                          <div className="mt-2 flex items-end gap-1">
                            <span className="text-4xl font-black tracking-tight text-slate-950">
                              {card.waveHeight}
                            </span>
                            <span className="pb-1 text-lg font-bold text-slate-400">m</span>
                          </div>
                        </div>
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-[1.25rem] text-3xl ${card.waveTone}`}
                        >
                          🌊
                        </div>
                      </div>

                      <div className="space-y-5 p-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-[1.25rem] bg-slate-50 p-3">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                              Dirección
                            </p>
                            <p className="mt-2 text-sm font-bold text-slate-900">↖ {card.direction}</p>
                          </div>
                          <div className="rounded-[1.25rem] bg-slate-50 p-3">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                              Energía
                            </p>
                            <p className="mt-2 text-sm font-bold text-slate-900">⚡ {card.energy}</p>
                          </div>
                        </div>

                        <div className={`rounded-[1.25rem] border px-4 py-3 shadow-sm ${card.windTone}`}>
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-medium text-slate-500">{card.windLabel}</p>
                              <p className="text-sm font-black text-slate-900">{card.windValue}</p>
                            </div>
                            <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">
                              {card.windBadge}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3 rounded-[1.25rem] bg-slate-50 px-4 py-4">
                          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                            Mareas
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-slate-500">↑ Alta</span>
                            <span className="font-black text-slate-900">{card.highTide}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-slate-500">↓ Baja</span>
                            <span className="font-black text-slate-900">{card.lowTide}</span>
                          </div>
                        </div>

                        <div
                          className={`relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br p-4 text-white ${card.highlight}`}
                        >
                          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />
                          <div className="relative">
                            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/75">
                              Mejor Ventana
                            </p>
                            <p className="mt-2 text-xl font-black">{card.bestWindow}</p>
                            <p className="mt-1 max-w-[26ch] text-xs leading-5 text-white/80">
                              {card.bestWindowNote}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.05fr_1.15fr]">
              <section className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="rounded-xl bg-blue-100 px-2 py-1 text-sm text-blue-700">≈</span>
                  <h2 className="text-2xl font-black tracking-tight text-slate-950">
                    Componentes del Swell
                  </h2>
                </div>

                <div className="mt-6 space-y-4">
                  {swellComponents.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-4 rounded-[1.25rem] bg-slate-50 px-4 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${item.tone}`} />
                        <span className="text-sm font-semibold text-slate-600">{item.label}</span>
                      </div>
                      <span className="text-sm font-black text-slate-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 p-6 text-white shadow-[0_30px_90px_-50px_rgba(15,23,42,0.85)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_38%),linear-gradient(180deg,rgba(34,86,156,0.18),rgba(2,6,23,0.88))]" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.9))]" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-55" />

                <div className="relative flex h-full min-h-[260px] flex-col justify-end">
                  <div className="mb-8 flex items-center justify-center">
                    <button
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-white/25 text-3xl backdrop-blur transition hover:bg-white/35"
                      type="button"
                    >
                      ▶
                    </button>
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-red-300">
                    En vivo
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight">Vista del Puerto</h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-200">
                    Monitoreo en tiempo real de condiciones, nubosidad y entrada de series.
                  </p>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
