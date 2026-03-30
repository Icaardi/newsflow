import { motion } from "framer-motion";
import { BarChart3, BookOpen, Users } from "lucide-react";

const sectionAnim = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

function RadarMiniPreview() {
  return (
    <div className="rounded-md p-4 mt-4" style={{ backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-default)" }}>
      <div className="flex items-center justify-between text-xs mb-3">
        <span className="font-semibold" style={{ color: "var(--text-primary)" }}>Preview — Radar de Preços</span>
        <span className="font-mono-metric" style={{ color: "var(--text-tertiary)" }}>6 categorias</span>
      </div>
      {[
        { name: "Parafuso pedicular", price: "R$ 2.400", variation: "900%", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
        { name: "Stent farmacológico", price: "R$ 8.500", variation: "478%", color: "#FBBF24", bg: "rgba(245,158,11,0.12)" },
        { name: "Marcapasso unicameral", price: "R$ 8.900", variation: "340%", color: "#34D399", bg: "rgba(16,185,129,0.12)" },
      ].map((item) => (
        <div key={item.name} className="flex items-center justify-between py-2" style={{ borderTop: "1px solid var(--border-default)" }}>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.name}</p>
            <p className="font-mono-metric text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.price}</p>
          </div>
          <span className="font-mono-metric text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: item.bg, color: item.color }}>{item.variation}</span>
        </div>
      ))}
    </div>
  );
}

const pillars = [
  { icon: BarChart3, label: "TECNOLOGIA", title: "Radar de Preços OPME", description: "Dashboard interativo com dados de referência do mercado brasileiro. Compare preços por categoria, identifique variações, fundamente auditorias e negociações com dados.", preview: <RadarMiniPreview /> },
  { icon: BookOpen, label: "FORMAÇÃO", title: "Inteligência Aplicada", description: "Boletim semanal exclusivo por Débora Soares com análise profunda de regulação, dados e tendências. Checklists e templates prontos para uso imediato. Sessão mensal ao vivo de Q&A.", preview: null },
  { icon: Users, label: "COMUNIDADE", title: "Rede Profissional OPME", description: "Grupo exclusivo de profissionais do setor no WhatsApp. Alertas regulatórios em primeira mão, discussões técnicas qualificadas, networking com quem decide.", preview: null },
];

const SolutionSection = () => (
  <section id="solucao" className="py-24 lg:py-32" style={{ backgroundColor: "var(--bg-primary)" }}>
    <div className="max-w-7xl mx-auto px-6">
      <motion.div variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <p className="text-sm font-semibold tracking-wider uppercase mb-3" style={{ color: "var(--ds-blue)" }}>A Plataforma</p>
        <h2 className="font-display text-3xl md:text-[36px] font-normal" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Uma plataforma. Três pilares.</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title} variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-lg p-7 transition-all duration-200"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-active)"; e.currentTarget.style.boxShadow = "0 0 30px var(--ds-blue-glow)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div className="w-12 h-12 rounded-md flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(5,89,181,0.1)", color: "var(--ds-blue)" }}>
              <pillar.icon size={24} />
            </div>
            <p className="text-[11px] font-semibold tracking-wider uppercase mb-1.5" style={{ color: "var(--text-tertiary)" }}>{pillar.label}</p>
            <h3 className="text-[22px] font-medium mb-2" style={{ color: "var(--text-primary)" }}>{pillar.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{pillar.description}</p>
            {pillar.preview}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
