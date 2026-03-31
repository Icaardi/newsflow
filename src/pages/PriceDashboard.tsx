import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Database, Layers, TrendingUp, CalendarClock,
  AlertTriangle, CheckCircle2, ArrowRight, Info,
  LayoutGrid, Table2, Eye, ArrowUpDown,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Device {
  id: number;
  categoria: string;
  nome: string;
  preco_medio: number;
  min: number;
  max: number;
  variacao: number;
}

const priceData: Device[] = [
  { id: 1, categoria: "Stents Coronários", nome: "Stent farmacológico (DES)", preco_medio: 8500, min: 3200, max: 18500, variacao: 478 },
  { id: 2, categoria: "Stents Coronários", nome: "Stent convencional (BMS)", preco_medio: 2800, min: 1100, max: 7200, variacao: 554 },
  { id: 3, categoria: "Próteses de Quadril", nome: "Prótese total cimentada", preco_medio: 6200, min: 2800, max: 14500, variacao: 418 },
  { id: 4, categoria: "Próteses de Quadril", nome: "Prótese total não-cimentada", preco_medio: 12800, min: 5500, max: 28000, variacao: 409 },
  { id: 5, categoria: "Próteses de Joelho", nome: "Prótese total primária", preco_medio: 11500, min: 4800, max: 26000, variacao: 442 },
  { id: 6, categoria: "Próteses de Joelho", nome: "Prótese unicompartimental", preco_medio: 8200, min: 3500, max: 19000, variacao: 443 },
  { id: 7, categoria: "Marcapassos", nome: "Marcapasso bicameral", preco_medio: 14500, min: 6800, max: 32000, variacao: 370 },
  { id: 8, categoria: "Marcapassos", nome: "Marcapasso unicameral", preco_medio: 8900, min: 4200, max: 18500, variacao: 340 },
  { id: 9, categoria: "Fixadores de Coluna", nome: "Parafuso pedicular (unidade)", preco_medio: 2400, min: 680, max: 6800, variacao: 900 },
  { id: 10, categoria: "Fixadores de Coluna", nome: "Cage intervertebral PEEK", preco_medio: 5800, min: 2200, max: 15000, variacao: 582 },
  { id: 11, categoria: "Fixadores de Coluna", nome: "Haste de fixação (par)", preco_medio: 3200, min: 1100, max: 8500, variacao: 673 },
  { id: 12, categoria: "Telas e Membranas", nome: "Tela de polipropileno (hérnia)", preco_medio: 850, min: 180, max: 3200, variacao: 1678 },
  { id: 13, categoria: "Telas e Membranas", nome: "Tela biológica", preco_medio: 4500, min: 1800, max: 12000, variacao: 567 },
];

const categories = [
  "Todas",
  "Stents Coronários",
  "Próteses de Quadril",
  "Próteses de Joelho",
  "Marcapassos",
  "Fixadores de Coluna",
  "Telas e Membranas",
] as const;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });

function variationColor(v: number) {
  if (v < 400) return { bg: "rgba(16, 185, 129, 0.10)", text: "#10B981", border: "rgba(16, 185, 129, 0.25)" };
  if (v <= 600) return { bg: "rgba(245, 158, 11, 0.10)", text: "#F59E0B", border: "rgba(245, 158, 11, 0.25)" };
  return { bg: "rgba(239, 68, 68, 0.10)", text: "#EF4444", border: "rgba(239, 68, 68, 0.25)" };
}

function variationInsight(device: Device): string {
  if (device.variacao > 500)
    return `A variação de ${device.variacao}% indica risco significativo de sobrepreço. Recomenda-se auditoria comparativa antes de autorizar compras acima de ${formatBRL(device.preco_medio)}.`;
  if (device.variacao >= 300)
    return "Variação dentro da faixa de mercado, mas requer atenção. Compare com pelo menos 3 fornecedores.";
  return "Variação moderada. Mercado relativamente estável para esta categoria.";
}

/* ------------------------------------------------------------------ */
/*  Animation                                                          */
/* ------------------------------------------------------------------ */

const cardSpring = { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 };

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function MetricCard({ icon: Icon, label, value, accent }: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={cardSpring}
      className="rounded-lg p-6 flex items-start gap-4 transition-all duration-200"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-default)",
      }}
      whileHover={{ borderColor: "var(--border-hover)" }}
    >
      <div
        className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
        style={{
          backgroundColor: accent ? "rgba(239, 68, 68, 0.10)" : "var(--ds-blue-glow)",
          color: accent ? "var(--danger)" : "var(--ds-blue)",
        }}
      >
        <Icon size={20} />
      </div>
      <div>
        <p
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--text-tertiary)", letterSpacing: "0.05em" }}
        >
          {label}
        </p>
        <p className="font-mono-metric text-[28px] font-semibold mt-0.5" style={{ color: "var(--text-primary)" }}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}

function PriceRangeBar({ min, max, avg }: { min: number; max: number; avg: number }) {
  const pct = ((avg - min) / (max - min)) * 100;

  return (
    <div className="mt-3 space-y-1.5">
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #EF4444 100%)",
            opacity: 0.7,
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full z-10"
          style={{
            left: `clamp(4%, ${pct}%, 96%)`,
            backgroundColor: "var(--ds-blue)",
            border: "2px solid var(--bg-secondary)",
            boxShadow: "0 0 8px var(--ds-blue-glow)",
          }}
        />
      </div>
      <div className="flex justify-between">
        <span className="font-mono-metric text-xs" style={{ color: "var(--text-tertiary)" }}>{formatBRL(min)}</span>
        <span className="font-mono-metric text-xs" style={{ color: "var(--text-tertiary)" }}>{formatBRL(max)}</span>
      </div>
    </div>
  );
}

function DeviceDetailPanel({ device }: { device: Device }) {
  const chartData = [
    { name: "Mínimo", value: device.min, fill: "var(--ds-blue-deep)" },
    { name: "Médio", value: device.preco_medio, fill: "var(--ds-blue)" },
    { name: "Máximo", value: device.max, fill: "var(--ds-blue-light)" },
  ];

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className="overflow-hidden"
    >
      <div className="pt-4 mt-4" style={{ borderTop: "1px solid var(--border-default)" }}>
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 42, 63, 0.5)" horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={(v: number) => formatBRL(v)}
                tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fill: "var(--text-tertiary)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: "var(--text-secondary)" }}
                axisLine={false}
                tickLine={false}
                width={65}
              />
              <Tooltip
                formatter={(value: number) => formatBRL(value)}
                contentStyle={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  borderRadius: 8,
                  backgroundColor: "var(--bg-tertiary)",
                  border: "1px solid var(--border-default)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  color: "var(--text-primary)",
                }}
                labelStyle={{ color: "var(--text-secondary)" }}
                itemStyle={{ color: "var(--text-primary)" }}
                cursor={{ fill: "rgba(5, 89, 181, 0.05)" }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          className="flex items-start gap-2.5 p-3 rounded-md"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            border: "1px solid var(--border-default)",
          }}
        >
          <Info size={16} className="mt-0.5 shrink-0" style={{ color: "var(--ds-blue)" }} />
          <div>
            <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
              O que isso significa:
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {variationInsight(device)}
            </p>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Link
            to="/ferramentas"
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-sm transition-colors"
            style={{
              color: "var(--ds-blue)",
              border: "1px solid rgba(5, 89, 181, 0.4)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(5, 89, 181, 0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            Usar no checklist de auditoria
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function DeviceCard({ device, isExpanded, onToggle }: {
  device: Device;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const vc = variationColor(device.variacao);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={cardSpring}
      className="rounded-lg p-6 cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: `1px solid ${isExpanded ? "var(--border-active)" : "var(--border-default)"}`,
      }}
      whileHover={{
        y: -2,
        boxShadow: "0 4px 30px var(--ds-blue-glow)",
        borderColor: "var(--border-active)",
      }}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="min-w-0">
          <h3 className="text-base font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
            {device.nome}
          </h3>
          <span
            className="inline-block mt-1.5 text-[11px] font-semibold uppercase px-2 py-0.5 rounded-sm"
            style={{
              backgroundColor: "var(--ds-blue-glow)",
              color: "var(--ds-blue-light)",
              letterSpacing: "0.03em",
            }}
          >
            {device.categoria}
          </span>
        </div>
        <div
          className="shrink-0 px-2 py-0.5 rounded-sm text-xs font-semibold flex items-center gap-1"
          style={{
            backgroundColor: vc.bg,
            color: vc.text,
            border: `1px solid ${vc.border}`,
          }}
        >
          {device.variacao > 600 && <AlertTriangle size={11} />}
          {device.variacao < 400 && <CheckCircle2 size={11} />}
          {device.variacao}%
        </div>
      </div>

      <p className="font-mono-metric text-2xl font-semibold mt-3" style={{ color: "var(--text-primary)" }}>
        {formatBRL(device.preco_medio)}
      </p>
      <p className="text-xs -mt-0.5" style={{ color: "var(--text-tertiary)" }}>preço médio</p>

      <PriceRangeBar min={device.min} max={device.max} avg={device.preco_medio} />

      <p className="text-[11px] mt-3" style={{ color: "var(--text-tertiary)" }}>Fonte: Dados ANS 2024</p>

      <AnimatePresence initial={false}>
        {isExpanded && <DeviceDetailPanel device={device} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const VIEW_PREF_KEY = "radaropme_view_mode";

export default function PriceDashboard() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Todas");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">(() => {
    return (localStorage.getItem(VIEW_PREF_KEY) as "cards" | "table") || "table";
  });
  const [sortKey, setSortKey] = useState<"nome" | "categoria" | "preco_medio" | "variacao">("variacao");
  const [sortAsc, setSortAsc] = useState(false);

  const toggleView = (mode: "cards" | "table") => {
    setViewMode(mode);
    localStorage.setItem(VIEW_PREF_KEY, mode);
  };

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(key === "nome" || key === "categoria"); }
  };

  const filtered = useMemo(() => {
    let items = priceData;
    if (activeCategory !== "Todas") {
      items = items.filter((d) => d.categoria === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (d) => d.nome.toLowerCase().includes(q) || d.categoria.toLowerCase().includes(q),
      );
    }
    if (viewMode === "table") {
      items = [...items].sort((a, b) => {
        let cmp = 0;
        if (sortKey === "nome") cmp = a.nome.localeCompare(b.nome);
        else if (sortKey === "categoria") cmp = a.categoria.localeCompare(b.categoria);
        else if (sortKey === "preco_medio") cmp = a.preco_medio - b.preco_medio;
        else if (sortKey === "variacao") cmp = a.variacao - b.variacao;
        return sortAsc ? cmp : -cmp;
      });
    }
    return items;
  }, [search, activeCategory, viewMode, sortKey, sortAsc]);

  const totalDevices = priceData.length;
  const totalCategories = new Set(priceData.map((d) => d.categoria)).size;
  const maxVariation = Math.max(...priceData.map((d) => d.variacao));

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none fixed top-0 left-0 right-0 h-[600px] z-0"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% -10%, var(--ds-blue-glow), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-5 py-10 space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2
              className="font-display text-4xl md:text-[40px] font-normal"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              Radar de Preços OPME
            </h2>
            <p className="text-base mt-2" style={{ color: "var(--text-secondary)" }}>
              Compare preços de dispositivos médicos com dados de referência do mercado brasileiro
            </p>
          </div>
          {/* View toggle */}
          <div className="flex items-center rounded-sm overflow-hidden" style={{ border: "1px solid var(--border-default)" }}>
            {(["cards", "table"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => toggleView(mode)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm transition-colors"
                style={{
                  backgroundColor: viewMode === mode ? "rgba(5,89,181,0.15)" : "transparent",
                  color: viewMode === mode ? "var(--ds-blue)" : "var(--text-tertiary)",
                }}
              >
                {mode === "cards" ? <LayoutGrid size={15} /> : <Table2 size={15} />}
                <span className="hidden sm:inline">{mode === "cards" ? "Cards" : "Tabela"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard icon={Database} label="Dispositivos" value={String(totalDevices)} />
          <MetricCard icon={Layers} label="Categorias" value={String(totalCategories)} />
          <MetricCard icon={TrendingUp} label="Maior variação" value={`${maxVariation.toLocaleString("pt-BR")}%`} accent />
          <MetricCard icon={CalendarClock} label="Atualização" value="Mar 2026" />
        </div>

        {/* Search + Filters */}
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-tertiary)" }} />
            <input
              type="text"
              placeholder="Buscar dispositivo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-md text-sm transition-all duration-200 outline-none"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--ds-blue)";
                e.currentTarget.style.boxShadow = "0 0 0 3px var(--ds-blue-glow)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border-default)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setExpandedId(null); }}
                  className="px-3.5 py-1.5 rounded-sm text-sm font-medium transition-all duration-150"
                  style={{
                    backgroundColor: active ? "rgba(5, 89, 181, 0.15)" : "transparent",
                    color: active ? "var(--ds-blue)" : "var(--text-secondary)",
                    border: active ? "1px solid rgba(5, 89, 181, 0.3)" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Device view — Cards or Table */}
        {viewMode === "cards" ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((device, i) => (
                <motion.div key={device.id} layout transition={{ delay: i * 0.04 }}>
                  <DeviceCard
                    device={device}
                    isExpanded={expandedId === device.id}
                    onToggle={() => setExpandedId(expandedId === device.id ? null : device.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Table view */
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "var(--bg-tertiary)", borderBottom: "1px solid var(--border-default)" }}>
                  {([
                    { key: "nome" as const, label: "Dispositivo" },
                    { key: "categoria" as const, label: "Categoria", hide: "hidden sm:table-cell" },
                    { key: "preco_medio" as const, label: "Mín / Médio / Máx", hide: "" },
                    { key: "variacao" as const, label: "Variação", hide: "" },
                  ]).map((col) => (
                    <th
                      key={col.key}
                      className={`text-left text-[11px] font-semibold uppercase tracking-wider px-5 py-3 cursor-pointer select-none ${col.hide || ""}`}
                      style={{ color: sortKey === col.key ? "var(--ds-blue)" : "var(--text-tertiary)", letterSpacing: "0.05em" }}
                      onClick={() => handleSort(col.key)}
                    >
                      <span className="inline-flex items-center gap-1">{col.label} <ArrowUpDown size={11} style={{ opacity: sortKey === col.key ? 1 : 0.3 }} /></span>
                    </th>
                  ))}
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => {
                  const vc = variationColor(d.variacao);
                  return (
                    <tr
                      key={d.id}
                      className="transition-colors"
                      style={{
                        backgroundColor: i % 2 === 0 ? "var(--bg-secondary)" : "var(--bg-primary)",
                        borderBottom: "1px solid var(--border-default)",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? "var(--bg-secondary)" : "var(--bg-primary)"; }}
                    >
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{d.nome}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{d.categoria}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-mono-metric text-sm" style={{ color: "var(--text-tertiary)" }}>{formatBRL(d.min)}</span>
                        <span className="font-mono-metric text-sm font-medium mx-1" style={{ color: "var(--text-primary)" }}>{formatBRL(d.preco_medio)}</span>
                        <span className="font-mono-metric text-sm" style={{ color: "var(--text-tertiary)" }}>{formatBRL(d.max)}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-semibold" style={{ backgroundColor: vc.bg, color: vc.text, border: `1px solid ${vc.border}` }}>
                          {d.variacao > 600 && <AlertTriangle size={10} />}
                          {d.variacao < 400 && <CheckCircle2 size={10} />}
                          {d.variacao}%
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <Link to={`/dispositivo/${d.id}`} className="transition-colors" style={{ color: "var(--ds-blue)" }}>
                          <Eye size={16} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "var(--text-tertiary)" }}>
            <Search size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">Nenhum dispositivo encontrado para esta busca.</p>
          </div>
        )}

        {/* Footer banner */}
        <div
          className="rounded-md px-5 py-4 flex items-start gap-3"
          style={{
            backgroundColor: "rgba(26, 34, 53, 0.5)",
            border: "1px solid var(--border-default)",
          }}
        >
          <Info size={16} className="mt-0.5 shrink-0" style={{ color: "var(--text-tertiary)" }} />
          <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            Dados de referência baseados em fontes públicas ANS/2024. Atualização mensal para assinantes do Radar OPME.
          </p>
        </div>
      </div>
    </div>
  );
}
