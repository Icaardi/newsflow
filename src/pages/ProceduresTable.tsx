import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp, Eye, Stethoscope, ArrowUpDown } from "lucide-react";

interface Device {
  id: number;
  name: string;
  avgPrice: number;
}

interface Procedure {
  id: number;
  name: string;
  specialty: string;
  estimatedCost: number;
  devices: Device[];
}

const procedures: Procedure[] = [
  { id: 1, name: "Angioplastia coronária com stent", specialty: "Cardiologia", estimatedCost: 25800, devices: [
    { id: 1, name: "Stent farmacológico (DES)", avgPrice: 8500 },
    { id: 2, name: "Stent convencional (BMS)", avgPrice: 2800 },
  ]},
  { id: 2, name: "Artroplastia total de quadril", specialty: "Ortopedia", estimatedCost: 38000, devices: [
    { id: 3, name: "Prótese total cimentada", avgPrice: 6200 },
    { id: 4, name: "Prótese total não-cimentada", avgPrice: 12800 },
  ]},
  { id: 3, name: "Artrodese de coluna lombar", specialty: "Neurocirurgia", estimatedCost: 42000, devices: [
    { id: 9, name: "Parafuso pedicular (unidade)", avgPrice: 2400 },
    { id: 10, name: "Cage intervertebral PEEK", avgPrice: 5800 },
    { id: 11, name: "Haste de fixação (par)", avgPrice: 3200 },
  ]},
  { id: 4, name: "Artroplastia total de joelho", specialty: "Ortopedia", estimatedCost: 32000, devices: [
    { id: 5, name: "Prótese total primária", avgPrice: 11500 },
    { id: 6, name: "Prótese unicompartimental", avgPrice: 8200 },
  ]},
  { id: 5, name: "Implante de marcapasso definitivo", specialty: "Cardiologia", estimatedCost: 28000, devices: [
    { id: 7, name: "Marcapasso bicameral", avgPrice: 14500 },
    { id: 8, name: "Marcapasso unicameral", avgPrice: 8900 },
  ]},
  { id: 6, name: "Hernioplastia inguinal com tela", specialty: "Cirurgia Geral", estimatedCost: 8500, devices: [
    { id: 12, name: "Tela de polipropileno (hérnia)", avgPrice: 850 },
    { id: 13, name: "Tela biológica", avgPrice: 4500 },
  ]},
];

const formatBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });

type SortKey = "name" | "specialty" | "devices" | "estimatedCost";

export default function ProceduresTable() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const filtered = useMemo(() => {
    let items = procedures;
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q) || p.specialty.toLowerCase().includes(q));
    }
    return [...items].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "specialty") cmp = a.specialty.localeCompare(b.specialty);
      else if (sortKey === "devices") cmp = a.devices.length - b.devices.length;
      else if (sortKey === "estimatedCost") cmp = a.estimatedCost - b.estimatedCost;
      return sortAsc ? cmp : -cmp;
    });
  }, [search, sortKey, sortAsc]);

  const SortHeader = ({ label, k, className = "" }: { label: string; k: SortKey; className?: string }) => (
    <th
      className={`text-left text-[11px] font-semibold uppercase tracking-wider px-5 py-3 cursor-pointer select-none transition-colors ${className}`}
      style={{ color: sortKey === k ? "var(--ds-blue)" : "var(--text-tertiary)", letterSpacing: "0.05em" }}
      onClick={() => handleSort(k)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <ArrowUpDown size={11} style={{ opacity: sortKey === k ? 1 : 0.3 }} />
      </span>
    </th>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto px-5 py-10 space-y-8">
        <div>
          <h2
            className="font-display text-4xl md:text-[40px] font-normal"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Procedimentos e Dispositivos
          </h2>
          <p className="text-base mt-2" style={{ color: "var(--text-secondary)" }}>
            Tabela de procedimentos cirúrgicos com dispositivos OPME associados e custos estimados
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-tertiary)" }} />
          <input
            type="text"
            placeholder="Buscar procedimento ou especialidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-md text-sm outline-none transition-all duration-200"
            style={{ backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--ds-blue)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--ds-blue-glow)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>

        {/* Table */}
        <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "var(--bg-tertiary)", borderBottom: "1px solid var(--border-default)" }}>
                <SortHeader label="Procedimento" k="name" />
                <SortHeader label="Especialidade" k="specialty" className="hidden sm:table-cell" />
                <SortHeader label="Dispositivos" k="devices" />
                <SortHeader label="Custo estimado" k="estimatedCost" className="hidden md:table-cell" />
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((proc, i) => {
                const isExpanded = expandedId === proc.id;
                return (
                  <motion.tr
                    key={proc.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="cursor-pointer transition-colors"
                    style={{
                      backgroundColor: isExpanded ? "var(--bg-tertiary)" : i % 2 === 0 ? "var(--bg-secondary)" : "var(--bg-primary)",
                      borderBottom: "1px solid var(--border-default)",
                    }}
                    onMouseEnter={(e) => { if (!isExpanded) e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; }}
                    onMouseLeave={(e) => { if (!isExpanded) e.currentTarget.style.backgroundColor = i % 2 === 0 ? "var(--bg-secondary)" : "var(--bg-primary)"; }}
                    onClick={() => setExpandedId(isExpanded ? null : proc.id)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Stethoscope size={16} style={{ color: "var(--text-tertiary)" }} />
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{proc.name}</span>
                      </div>
                      {/* Expanded row content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 ml-7 space-y-2">
                              {proc.devices.map((d) => (
                                <div key={d.id} className="flex items-center justify-between py-2 px-3 rounded-sm" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
                                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{d.name}</span>
                                  <div className="flex items-center gap-3">
                                    <span className="font-mono-metric text-sm font-medium" style={{ color: "var(--text-primary)" }}>{formatBRL(d.avgPrice)}</span>
                                    <Link
                                      to={`/dispositivo/${d.id}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="transition-colors"
                                      style={{ color: "var(--ds-blue)" }}
                                    >
                                      <Eye size={15} />
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{proc.specialty}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono-metric text-sm" style={{ color: "var(--text-primary)" }}>{proc.devices.length}</span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="font-mono-metric text-sm font-medium" style={{ color: "var(--text-primary)" }}>{formatBRL(proc.estimatedCost)}</span>
                    </td>
                    <td className="px-3 py-4">
                      {isExpanded ? <ChevronUp size={16} style={{ color: "var(--text-tertiary)" }} /> : <ChevronDown size={16} style={{ color: "var(--text-tertiary)" }} />}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "var(--text-tertiary)" }}>
            <Search size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">Nenhum procedimento encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
