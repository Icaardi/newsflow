import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Activity, Layers, TrendingUp, ClipboardCheck, BarChart3,
  FileText, ArrowRight, Clock, Lock, CheckCircle2, Stethoscope, Search,
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const procedures = [
  { name: "Angioplastia coronária com stent", specialty: "Cardiologia", devices: 4 },
  { name: "Artroplastia total de quadril", specialty: "Ortopedia", devices: 3 },
  { name: "Artrodese de coluna lombar", specialty: "Neurocirurgia", devices: 5 },
  { name: "Artroplastia total de joelho", specialty: "Ortopedia", devices: 2 },
  { name: "Implante de marcapasso definitivo", specialty: "Cardiologia", devices: 2 },
];

const recentBulletins = [
  {
    id: "001", tag: "Regulação", tagColor: "#60A5FA", tagBg: "rgba(59,130,246,0.15)",
    title: "RDC 665/2022: O que muda na prática para gestores hospitalares",
    date: "16 de abril de 2026", readTime: 8, available: true,
  },
  {
    id: "002", tag: "Dados de Mercado", tagColor: "#34D399", tagBg: "rgba(16,185,129,0.15)",
    title: "Stents coronários: por que o mesmo dispositivo custa 478% mais caro",
    date: "23 de abril de 2026", readTime: 10, available: false,
  },
];

const quickAccess = [
  { label: "Radar de Preços", icon: BarChart3, desc: "Consulte preços de referência por categoria", path: "/radar" },
  { label: "Ferramentas", icon: ClipboardCheck, desc: "Checklists de auditoria e compliance", path: "/ferramentas" },
  { label: "Boletins", icon: FileText, desc: "Análises semanais de inteligência OPME", path: "/boletins" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "radar-opme-checklists";

function getChecklistProgress(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const state: Record<string, boolean> = JSON.parse(raw);
    const checked = Object.values(state).filter(Boolean);
    // 50 total items across all checklists
    if (checked.length === 0) return 0;
    if (checked.length >= 50) return 0; // all complete = 0 in progress
    return checked.length > 0 ? 1 : 0; // simplified: at least 1 in progress if any checked
  } catch {
    return 0;
  }
}

function getActiveChecklists(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const state: Record<string, boolean> = JSON.parse(raw);
    const prefixes = new Set<string>();
    for (const [key, val] of Object.entries(state)) {
      if (val) prefixes.add(key.split("-")[0]);
    }
    // Count checklists that have at least one item checked
    // ap = auditoria precos (20 items), rc = compliance (15 items), qf = qualificacao (15 items)
    let active = 0;
    const totals: Record<string, number> = { ap: 20, rc: 15, qf: 15 };
    for (const prefix of Object.keys(totals)) {
      const checkedInPrefix = Object.entries(state).filter(([k, v]) => k.startsWith(prefix + "-") && v).length;
      if (checkedInPrefix > 0 && checkedInPrefix < totals[prefix]) active++;
    }
    return active;
  } catch {
    return 0;
  }
}

const cardSpring = { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 };

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "Profissional";
  const activeChecklists = useMemo(() => getActiveChecklists(), []);

  const metrics = [
    { label: "Dispositivos monitorados", value: "14", icon: Activity, link: "/radar", color: "var(--ds-blue)" },
    { label: "Categorias ativas", value: "6", icon: Layers, link: "/radar", color: "var(--ds-blue)" },
    { label: "Maior variação detectada", value: "1.678%", icon: TrendingUp, link: "/radar", color: "var(--danger)", danger: true },
    { label: "Checklists em andamento", value: String(activeChecklists), icon: ClipboardCheck, link: "/ferramentas", color: "var(--ds-blue)" },
  ];

  return (
    <DashboardLayout title={`Bom dia, ${firstName}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Subtitle */}
        <p className="text-sm -mt-2" style={{ color: "var(--text-tertiary)" }}>
          Seu painel de inteligência OPME-DMI
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...cardSpring, delay: i * 0.08 }}
            >
              <Link
                to={m.link}
                className="block rounded-lg p-6 transition-all duration-200"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-active)";
                  e.currentTarget.style.boxShadow = "0 0 30px var(--ds-blue-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-default)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-tertiary)", letterSpacing: "0.05em" }}>
                    {m.label}
                  </span>
                  <div
                    className="w-9 h-9 rounded-md flex items-center justify-center"
                    style={{
                      backgroundColor: m.danger ? "rgba(239,68,68,0.1)" : "var(--ds-blue-glow)",
                      color: m.color,
                    }}
                  >
                    <m.icon size={18} />
                  </div>
                </div>
                <p className="font-mono-metric text-[28px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  {m.value}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick access */}
        <section>
          <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Acesso rápido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickAccess.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...cardSpring, delay: 0.3 + i * 0.08 }}
              >
                <Link
                  to={item.path}
                  className="block rounded-lg p-6 transition-all duration-200 group"
                  style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-active)";
                    e.currentTarget.style.boxShadow = "0 0 30px var(--ds-blue-glow)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-default)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-md flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(5, 89, 181, 0.1)", color: "var(--ds-blue)" }}
                  >
                    <item.icon size={22} />
                  </div>
                  <h3 className="text-[15px] font-medium mb-1" style={{ color: "var(--text-primary)" }}>{item.label}</h3>
                  <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: "var(--ds-blue)" }}>
                    Acessar <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Procedures table */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...cardSpring, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Procedimentos e Dispositivos</h2>
            <Link
              to="/procedimentos"
              className="text-sm font-medium flex items-center gap-1 transition-colors"
              style={{ color: "var(--ds-blue)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ds-blue-light)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ds-blue)"; }}
            >
              Ver tabela completa <ArrowRight size={14} />
            </Link>
          </div>
          <div
            className="rounded-lg overflow-hidden"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                  <th className="text-left text-xs font-medium uppercase tracking-wider px-6 py-3" style={{ color: "var(--text-tertiary)", letterSpacing: "0.05em" }}>
                    Procedimento
                  </th>
                  <th className="text-left text-xs font-medium uppercase tracking-wider px-6 py-3 hidden sm:table-cell" style={{ color: "var(--text-tertiary)", letterSpacing: "0.05em" }}>
                    Especialidade
                  </th>
                  <th className="text-right text-xs font-medium uppercase tracking-wider px-6 py-3" style={{ color: "var(--text-tertiary)", letterSpacing: "0.05em" }}>
                    Dispositivos
                  </th>
                </tr>
              </thead>
              <tbody>
                {procedures.map((proc, i) => (
                  <tr
                    key={proc.name}
                    className="transition-colors cursor-pointer"
                    style={{ borderBottom: i < procedures.length - 1 ? "1px solid var(--border-default)" : "none" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Stethoscope size={16} style={{ color: "var(--text-tertiary)" }} />
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{proc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{proc.specialty}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono-metric text-sm font-medium" style={{ color: "var(--text-primary)" }}>{proc.devices}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Recent bulletins */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...cardSpring, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Últimos Boletins</h2>
            <Link
              to="/boletins"
              className="text-sm font-medium flex items-center gap-1 transition-colors"
              style={{ color: "var(--ds-blue)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ds-blue-light)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ds-blue)"; }}
            >
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentBulletins.map((b) => (
              <Link
                key={b.id}
                to={b.available ? `/boletins/${b.id}` : "/boletins"}
                className="block rounded-lg p-5 transition-all duration-200"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-active)";
                  e.currentTarget.style.boxShadow = "0 0 30px var(--ds-blue-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-default)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ backgroundColor: b.tagBg, color: b.tagColor }}
                  >
                    {b.tag}
                  </span>
                  {!b.available && (
                    <Lock size={12} style={{ color: "var(--text-tertiary)" }} />
                  )}
                  {b.available && (
                    <CheckCircle2 size={12} style={{ color: "var(--success)" }} />
                  )}
                </div>
                <h3 className="text-sm font-medium leading-snug mb-2" style={{ color: "var(--text-primary)" }}>
                  {b.title}
                </h3>
                <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-tertiary)" }}>
                  <span>{b.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    <span className="font-mono-metric">{b.readTime}</span> min
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
