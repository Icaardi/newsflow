import { motion } from "framer-motion";

const AnalyticsSection = () => {
  return (
    <section id="analytics" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Analytics</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Acompanhe suas{" "}
            <br className="hidden md:block" />
            métricas em tempo real.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Na NewsFlow, você acompanha seus indicadores em tempo real e toma decisões de forma precisa.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Revenue */}
            <div className="bg-secondary/30 rounded-xl p-5 space-y-3">
              <p className="text-sm text-muted-foreground">Receita total</p>
              <p className="text-3xl font-bold font-mono-metric">R$ 12.847,90</p>
              <span className="text-xs text-success font-medium">↑ 2,0%</span>
              <div className="h-20 flex items-end gap-0.5 mt-2">
                {[20, 35, 28, 45, 40, 55, 50, 62, 58, 70, 65, 75, 80, 72, 85, 90].map((h, i) => (
                  <div key={i} className="flex-1 bg-accent/30 rounded-t transition-all" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            {/* Live engagement */}
            <div className="bg-secondary/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Engajamento ao vivo</p>
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { value: "1.5K", label: "Leituras\niniciadas" },
                  { value: "892", label: "Lendo\nagora" },
                  { value: "347", label: "Cliques\nem links" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-2xl font-bold font-mono-metric text-accent">{item.value}</p>
                    <p className="text-xs text-muted-foreground whitespace-pre-line mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="h-16 flex items-end gap-1 mt-2">
                {[40, 55, 35, 65, 50, 75, 60, 80, 70, 90, 85, 95].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-accent"
                    style={{ height: `${h}%`, opacity: 0.35 + (i / 12) * 0.45 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Top newsletters table */}
          <div className="bg-secondary/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold">Top newsletters</p>
              <span className="text-xs text-muted-foreground">Hoje</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground text-xs border-b border-border">
                    <th className="text-left pb-2 font-medium">Ranking</th>
                    <th className="text-left pb-2 font-medium">Newsletter</th>
                    <th className="text-right pb-2 font-medium">Aberturas</th>
                    <th className="text-right pb-2 font-medium">Receita</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {[
                    { rank: "🥇", name: "Tendências Tech 2026", opens: "2.847", revenue: "R$ 4.290" },
                    { rank: "🥈", name: "Finanças Descomplicadas", opens: "1.923", revenue: "R$ 3.150" },
                    { rank: "🥉", name: "Saúde & Performance", opens: "1.456", revenue: "R$ 2.680" },
                    { rank: "4", name: "Marketing para Experts", opens: "892", revenue: "R$ 1.420" },
                    { rank: "5", name: "Direito na Prática", opens: "634", revenue: "R$ 1.307" },
                  ].map((row) => (
                    <tr key={row.name} className="text-sm">
                      <td className="py-2.5 font-bold">{row.rank}</td>
                      <td className="py-2.5 text-foreground">{row.name}</td>
                      <td className="py-2.5 text-right text-muted-foreground font-mono-metric">{row.opens}</td>
                      <td className="py-2.5 text-right font-semibold font-mono-metric">{row.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Reports row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
        >
          {[
            { title: "Relatório de Aberturas", desc: "Analise as taxas de abertura por horário, dia e segmento." },
            { title: "Receita por Newsletter", desc: "Descubra como cada publicação está performando financeiramente." },
            { title: "Engajamento de Leitores", desc: "Visualize o comportamento de leitura dos seus assinantes." },
          ].map((report) => (
            <div key={report.title} className="bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-colors duration-200">
              <h4 className="font-bold text-sm mb-1">{report.title}</h4>
              <p className="text-xs text-muted-foreground">{report.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
