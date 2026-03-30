import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, CheckCircle2, Info, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

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

const formatBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });

function variationInsight(d: Device): string {
  if (d.variacao > 500) return `A variação de ${d.variacao}% indica risco significativo de sobrepreço. Recomenda-se auditoria comparativa antes de autorizar compras acima de ${formatBRL(d.preco_medio)}.`;
  if (d.variacao >= 300) return "Variação dentro da faixa de mercado, mas requer atenção. Compare com pelo menos 3 fornecedores.";
  return "Variação moderada. Mercado relativamente estável para esta categoria.";
}

function variationColor(v: number) {
  if (v < 400) return { bg: "rgba(16,185,129,0.10)", text: "#10B981", label: "Moderada" };
  if (v <= 600) return { bg: "rgba(245,158,11,0.10)", text: "#F59E0B", label: "Atenção" };
  return { bg: "rgba(239,68,68,0.10)", text: "#EF4444", label: "Crítica" };
}

export default function DeviceReport() {
  const { id } = useParams<{ id: string }>();
  const device = useMemo(() => priceData.find((d) => d.id === Number(id)), [id]);

  if (!device) return <Navigate to="/radar" replace />;

  const vc = variationColor(device.variacao);
  const chartData = [
    { name: "Mínimo", value: device.min, fill: "var(--ds-blue-deep)" },
    { name: "Médio", value: device.preco_medio, fill: "var(--ds-blue)" },
    { name: "Máximo", value: device.max, fill: "var(--ds-blue-light)" },
  ];
  const pct = ((device.preco_medio - device.min) / (device.max - device.min)) * 100;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div style={{ borderBottom: "1px solid var(--border-default)" }}>
        <div className="max-w-4xl mx-auto px-5 py-3">
          <Link to="/radar" className="inline-flex items-center gap-1.5 text-sm transition-colors" style={{ color: "var(--text-tertiary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
          >
            <ArrowLeft size={16} /> Voltar ao Radar de Preços
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-10 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block text-[11px] font-semibold uppercase px-2 py-0.5 rounded-sm mb-3"
            style={{ backgroundColor: "var(--ds-blue-glow)", color: "var(--ds-blue-light)", letterSpacing: "0.03em" }}>
            {device.categoria}
          </span>
          <h1 className="font-display text-3xl md:text-[36px] font-normal" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            {device.nome}
          </h1>
        </motion.div>

        {/* Key metrics */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: "Preço médio", value: formatBRL(device.preco_medio) },
            { label: "Mínimo", value: formatBRL(device.min) },
            { label: "Máximo", value: formatBRL(device.max) },
            { label: "Variação", value: `${device.variacao}%`, color: vc.text },
          ].map((m) => (
            <div key={m.label} className="rounded-lg p-5" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "var(--text-tertiary)", letterSpacing: "0.05em" }}>{m.label}</p>
              <p className="font-mono-metric text-2xl font-semibold" style={{ color: m.color || "var(--text-primary)" }}>{m.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Price range bar */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-lg p-6" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Faixa de preço</h3>
          <div className="relative h-3 rounded-full overflow-hidden mb-2" style={{ backgroundColor: "var(--bg-tertiary)" }}>
            <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #EF4444 100%)", opacity: 0.7 }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10"
              style={{ left: `clamp(3%, ${pct}%, 97%)`, backgroundColor: "var(--ds-blue)", border: "2px solid var(--bg-secondary)", boxShadow: "0 0 8px var(--ds-blue-glow)" }} />
          </div>
          <div className="flex justify-between">
            <span className="font-mono-metric text-xs" style={{ color: "var(--text-tertiary)" }}>{formatBRL(device.min)}</span>
            <span className="font-mono-metric text-xs" style={{ color: "var(--text-tertiary)" }}>{formatBRL(device.max)}</span>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-lg p-6" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Comparativo de preços</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,42,63,0.5)" horizontal={false} />
                <XAxis type="number" tickFormatter={(v: number) => formatBRL(v)}
                  tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fill: "var(--text-tertiary)" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name"
                  tick={{ fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} width={65} />
                <Tooltip formatter={(value: number) => formatBRL(value)}
                  contentStyle={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, borderRadius: 8, backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                  labelStyle={{ color: "var(--text-secondary)" }} itemStyle={{ color: "var(--text-primary)" }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
                  {chartData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Variation analysis */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-lg p-6" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="px-2.5 py-1 rounded-sm text-xs font-semibold flex items-center gap-1" style={{ backgroundColor: vc.bg, color: vc.text }}>
              {device.variacao > 600 ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
              Variação {vc.label}: {device.variacao}%
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-md" style={{ backgroundColor: "rgba(5,89,181,0.06)", borderLeft: "3px solid var(--ds-blue)" }}>
            <Info size={16} className="mt-0.5 shrink-0" style={{ color: "var(--ds-blue)" }} />
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{variationInsight(device)}</p>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Link to="/ferramentas" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-colors"
            style={{ color: "var(--ds-blue)", border: "1px solid rgba(5,89,181,0.4)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(5,89,181,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            Usar no checklist de auditoria <ArrowRight size={14} />
          </Link>
          <Link to="/radar" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-colors"
            style={{ color: "var(--text-secondary)", border: "1px solid var(--border-default)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            Ver todos os dispositivos
          </Link>
        </div>

        {/* Source */}
        <p className="text-[13px]" style={{ color: "var(--text-tertiary)" }}>Fonte: Dados de referência ANS 2024. Atualização mensal para assinantes do Radar OPME.</p>
      </div>
    </div>
  );
}
