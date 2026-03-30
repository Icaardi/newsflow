import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, AlertTriangle } from "lucide-react";

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="rounded-lg p-5 space-y-4 max-w-sm" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)", boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 60px var(--ds-blue-glow)" }}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>Radar de Preços</span>
          <span className="text-[10px] font-mono-metric" style={{ color: "var(--text-tertiary)" }}>Mar 2026</span>
        </div>
        {[
          { name: "Stent farmacológico (DES)", cat: "Stents Coronários", price: "R$ 8.500", var: "478%", varColor: "#FBBF24", varBg: "rgba(245,158,11,0.15)", Icon: TrendingUp, pos: "35%" },
          { name: "Tela de polipropileno", cat: "Telas e Membranas", price: "R$ 850", var: "1.678%", varColor: "#EF4444", varBg: "rgba(239,68,68,0.15)", Icon: AlertTriangle, pos: "22%" },
        ].map((d) => (
          <div key={d.name} className="rounded-md p-4" style={{ backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--surface-glass-border)" }}>
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{d.name}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>{d.cat}</p>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1" style={{ backgroundColor: d.varBg, color: d.varColor }}>
                <d.Icon size={10} />{d.var}
              </span>
            </div>
            <p className="font-mono-metric text-xl font-semibold mt-2" style={{ color: "var(--ds-blue-light)" }}>{d.price}</p>
            <div className="mt-2 space-y-1">
              <div className="relative h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-elevated)" }}>
                <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #EF4444 100%)", opacity: 0.6 }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full" style={{ left: d.pos, backgroundColor: "var(--ds-blue)", border: "2px solid var(--bg-secondary)", boxShadow: "0 0 6px var(--ds-blue-glow)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute -inset-12 rounded-full blur-3xl -z-10" style={{ backgroundColor: "rgba(5, 89, 181, 0.08)" }} />
    </motion.div>
  );
}

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -20%, var(--ds-blue-glow), transparent)" }} />
      <div className="absolute inset-0 stars-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-7"
            >
              <span
                className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: "rgba(5, 89, 181, 0.1)", border: "1px solid rgba(5, 89, 181, 0.2)", color: "var(--ds-blue)" }}
              >
                Lançamento exclusivo — Medical Devices Summit 2026
              </span>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-[56px] font-normal leading-[1.08]"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                Inteligência de mercado e ferramentas para profissionais de{" "}
                <span style={{ color: "var(--ds-blue-light)" }}>OPME-DMI</span>
              </h1>

              <p className="text-lg leading-relaxed max-w-xl" style={{ color: "var(--text-secondary)" }}>
                Radar de preços, checklists de auditoria, boletins de inteligência e comunidade profissional.
                Tudo que você precisa para tomar decisões melhores no mercado de dispositivos médicos.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-sm text-sm font-semibold text-white transition-all"
                  style={{ backgroundColor: "var(--ds-blue)", boxShadow: "0 0 24px var(--ds-blue-glow)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-blue-light)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-blue)"; }}
                  onClick={() => document.getElementById("solucao")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explorar a plataforma <ArrowRight size={18} />
                </button>
                <button
                  className="inline-flex items-center justify-center px-7 py-3 rounded-sm text-sm font-medium transition-all"
                  style={{ border: "1px solid var(--border-hover)", color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--ds-magenta)"; e.currentTarget.style.color = "var(--ds-magenta-light)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                  onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Ver planos de fundador
                </button>
              </div>

              <p className="text-xs pt-1" style={{ color: "var(--text-tertiary)" }}>by DS Treinamentos</p>
            </motion.div>
          </div>

          <div className="flex-shrink-0 hidden md:block">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
