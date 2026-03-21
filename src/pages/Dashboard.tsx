import { Users, DollarSign, MailOpen, UserPlus, TrendingUp, TrendingDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const metrics = [
  { label: "Assinantes totais", value: "1.847", change: "+12.3%", positive: true, icon: Users },
  { label: "MRR", value: "R$ 14.230", change: "+8.1%", positive: true, icon: DollarSign },
  { label: "Taxa de abertura", value: "67.2%", change: "+3.4%", positive: true, icon: MailOpen },
  { label: "Novos (7d)", value: "+89", change: "-2.1%", positive: false, icon: UserPlus },
];

const chartData = [
  { name: "01/02", assinantes: 1420 },
  { name: "08/02", assinantes: 1480 },
  { name: "15/02", assinantes: 1510 },
  { name: "22/02", assinantes: 1590 },
  { name: "01/03", assinantes: 1640 },
  { name: "08/03", assinantes: 1720 },
  { name: "15/03", assinantes: 1790 },
  { name: "21/03", assinantes: 1847 },
];

const recentEditions = [
  { title: "Como a IA está mudando a medicina preventiva", date: "21 Mar 2026", status: "Publicada", opens: 1243, clicks: 312 },
  { title: "5 tendências em telemedicina para 2026", date: "14 Mar 2026", status: "Publicada", opens: 1089, clicks: 287 },
  { title: "O futuro da prescrição digital", date: "07 Mar 2026", status: "Rascunho", opens: 0, clicks: 0 },
  { title: "Regulamentação de IA em saúde: o que muda", date: "01 Mar 2026", status: "Agendada", opens: 0, clicks: 0 },
];

const statusColors: Record<string, string> = {
  Publicada: "bg-success/15 text-success",
  Rascunho: "bg-warning/15 text-warning",
  Agendada: "bg-accent/15 text-accent",
};

const Dashboard = () => {
  return (
    <DashboardLayout title="Bom dia, Leonardo 👋">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{m.label}</span>
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <m.icon size={18} className="text-accent" />
                </div>
              </div>
              <p className="text-2xl font-bold font-mono-metric mb-1">{m.value}</p>
              <div className="flex items-center gap-1">
                {m.positive ? (
                  <TrendingUp size={14} className="text-success" />
                ) : (
                  <TrendingDown size={14} className="text-destructive" />
                )}
                <span className={`text-xs font-medium ${m.positive ? "text-success" : "text-destructive"}`}>
                  {m.change}
                </span>
                <span className="text-xs text-muted-foreground">vs mês anterior</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card rounded-xl border border-border p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">Crescimento de assinantes</h2>
            <div className="flex gap-2">
              {["30d", "60d", "90d"].map((period, i) => (
                <button
                  key={period}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    i === 0
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAssinantes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(172, 100%, 38%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(172, 100%, 38%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} stroke="hsl(220, 13%, 91%)" />
                <YAxis tick={{ fontSize: 12, fill: "hsl(220, 9%, 46%)" }} stroke="hsl(220, 13%, 91%)" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(220, 13%, 91%)",
                    backgroundColor: "hsl(0, 0%, 100%)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "13px",
                    color: "hsl(240, 28%, 14%)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="assinantes"
                  stroke="hsl(172, 100%, 38%)"
                  strokeWidth={2}
                  fill="url(#colorAssinantes)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent editions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
        >
          <div className="p-6 pb-0">
            <h2 className="font-semibold">Últimas edições</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Título</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 hidden sm:table-cell">Data</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-6 py-3 hidden md:table-cell">Aberturas</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-6 py-3 hidden md:table-cell">Cliques</th>
                </tr>
              </thead>
              <tbody>
                {recentEditions.map((edition) => (
                  <tr
                    key={edition.title}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm font-medium max-w-xs truncate">{edition.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">{edition.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[edition.status]}`}>
                        {edition.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-mono-metric hidden md:table-cell">
                      {edition.opens > 0 ? edition.opens.toLocaleString() : "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-mono-metric hidden md:table-cell">
                      {edition.clicks > 0 ? edition.clicks : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
