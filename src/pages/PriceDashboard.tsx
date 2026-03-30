import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Database, Layers, TrendingUp, CalendarClock,
  AlertTriangle, CheckCircle2, ArrowRight, Info,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  if (v < 400) return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" };
  if (v <= 600) return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" };
  return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" };
}

function variationInsight(device: Device): string {
  if (device.variacao > 500)
    return `A variação de ${device.variacao}% indica risco significativo de sobrepreço. Recomenda-se auditoria comparativa antes de autorizar compras acima de ${formatBRL(device.preco_medio)}.`;
  if (device.variacao >= 300)
    return "Variação dentro da faixa de mercado, mas requer atenção. Compare com pelo menos 3 fornecedores.";
  return "Variação moderada. Mercado relativamente estável para esta categoria.";
}

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
      className="bg-white rounded-xl border border-[#E5E7EB] shadow-card p-5 flex items-start gap-4"
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
        accent ? "bg-red-50 text-red-600" : "bg-[#E6FAF7] text-[#00C2A8]"
      }`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm text-[#6B7280] font-medium">{label}</p>
        <p className="font-mono-metric text-2xl font-bold text-[#1A1A2E] mt-0.5">{value}</p>
      </div>
    </motion.div>
  );
}

function PriceRangeBar({ min, max, avg }: { min: number; max: number; avg: number }) {
  const pct = ((avg - min) / (max - min)) * 100;

  return (
    <div className="mt-3 space-y-1.5">
      <div className="relative h-2.5 rounded-full overflow-hidden bg-gray-100">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #EF4444 100%)",
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#0F2B3C] shadow-md z-10"
          style={{ left: `clamp(4%, ${pct}%, 96%)` }}
        />
      </div>
      <div className="flex justify-between">
        <span className="font-mono-metric text-xs text-[#6B7280]">{formatBRL(min)}</span>
        <span className="font-mono-metric text-xs text-[#6B7280]">{formatBRL(max)}</span>
      </div>
    </div>
  );
}

function DeviceDetailPanel({ device }: { device: Device }) {
  const chartData = [
    { name: "Mínimo", value: device.min, fill: "#10B981" },
    { name: "Médio", value: device.preco_medio, fill: "#00C2A8" },
    { name: "Máximo", value: device.max, fill: "#EF4444" },
  ];

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="pt-4 mt-4 border-t border-[#E5E7EB]">
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={(v: number) => formatBRL(v)}
                tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: "#1A1A2E" }}
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
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F8FAFB] border border-[#E5E7EB]">
          <Info size={16} className="text-[#00C2A8] mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#1A1A2E] mb-0.5">O que isso significa:</p>
            <p className="text-sm text-[#6B7280] leading-relaxed">{variationInsight(device)}</p>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Button variant="outline" size="sm" asChild className="text-[#00C2A8] border-[#00C2A8] hover:bg-[#E6FAF7]">
            <Link to="/ferramentas">
              Usar no checklist de auditoria
              <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </Button>
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
      className="bg-white rounded-xl border border-[#E5E7EB] shadow-card hover:shadow-card-hover transition-shadow duration-200 p-5 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-[#1A1A2E] leading-snug">{device.nome}</h3>
          <Badge className="mt-1.5 text-[11px] bg-[#E6FAF7] text-[#0F2B3C] border-transparent font-medium">
            {device.categoria}
          </Badge>
        </div>
        <div className={`shrink-0 px-2 py-0.5 rounded-md text-xs font-semibold border ${vc.bg} ${vc.text} ${vc.border}`}>
          {device.variacao > 600 && <AlertTriangle size={11} className="inline mr-1 -mt-px" />}
          {device.variacao < 400 && <CheckCircle2 size={11} className="inline mr-1 -mt-px" />}
          {device.variacao}%
        </div>
      </div>

      <p className="font-mono-metric text-2xl font-bold text-[#0F2B3C] mt-3">
        {formatBRL(device.preco_medio)}
      </p>
      <p className="text-xs text-[#6B7280] -mt-0.5">preço médio</p>

      <PriceRangeBar min={device.min} max={device.max} avg={device.preco_medio} />

      <p className="text-[11px] text-[#6B7280]/70 mt-3">Fonte: Dados ANS 2024</p>

      <AnimatePresence initial={false}>
        {isExpanded && <DeviceDetailPanel device={device} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PriceDashboard() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Todas");
  const [expandedId, setExpandedId] = useState<number | null>(null);

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
    return items;
  }, [search, activeCategory]);

  const totalDevices = priceData.length;
  const totalCategories = new Set(priceData.map((d) => d.categoria)).size;
  const maxVariation = Math.max(...priceData.map((d) => d.variacao));

  return (
    <div className="bg-[#F8FAFB] min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-8 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2E]">Radar de Preços OPME</h2>
          <p className="text-[#6B7280] mt-1">
            Compare preços de dispositivos médicos com dados de referência do mercado brasileiro
          </p>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard icon={Database} label="Dispositivos catalogados" value={String(totalDevices)} />
          <MetricCard icon={Layers} label="Categorias monitoradas" value={String(totalCategories)} />
          <MetricCard icon={TrendingUp} label="Maior variação detectada" value={`${maxVariation.toLocaleString("pt-BR")}%`} accent />
          <MetricCard icon={CalendarClock} label="Última atualização" value="Mar 2026" />
        </div>

        {/* Search + Filters */}
        <div className="space-y-3">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Buscar dispositivo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-sm text-[#1A1A2E] placeholder:text-[#6B7280]/60 focus:outline-none focus:ring-2 focus:ring-[#00C2A8]/30 focus:border-[#00C2A8] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setExpandedId(null); }}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  activeCategory === cat
                    ? "bg-[#0F2B3C] text-white"
                    : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#00C2A8] hover:text-[#0F2B3C]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Device grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((device, i) => (
              <motion.div
                key={device.id}
                layout
                transition={{ delay: i * 0.04 }}
              >
                <DeviceCard
                  device={device}
                  isExpanded={expandedId === device.id}
                  onToggle={() => setExpandedId(expandedId === device.id ? null : device.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#6B7280]">
            <Search size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">Nenhum dispositivo encontrado para esta busca.</p>
          </div>
        )}

        {/* Footer banner */}
        <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFB] px-5 py-4 flex items-start gap-3">
          <Info size={16} className="text-[#6B7280] mt-0.5 shrink-0" />
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Dados de referência baseados em fontes públicas ANS/2024. Atualização mensal para assinantes do Radar OPME.
          </p>
        </div>
      </div>
    </div>
  );
}
