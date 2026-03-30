import { motion } from "framer-motion";
import { BarChart3, BookOpen, Users, TrendingUp, AlertTriangle } from "lucide-react";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* Mini preview for the price radar pillar */
function RadarMiniPreview() {
  return (
    <div className="bg-[#F8FAFB] rounded-lg border border-[#E5E7EB] p-4 mt-4">
      <div className="flex items-center justify-between text-xs text-[#6B7280] mb-3">
        <span className="font-semibold text-[#0F2B3C]">Preview — Radar de Preços</span>
        <span className="font-mono-metric">6 categorias</span>
      </div>
      {[
        { name: "Parafuso pedicular", price: "R$ 2.400", variation: "900%", color: "text-red-500", bg: "bg-red-50" },
        { name: "Stent farmacológico", price: "R$ 8.500", variation: "478%", color: "text-amber-500", bg: "bg-amber-50" },
        { name: "Marcapasso unicameral", price: "R$ 8.900", variation: "340%", color: "text-emerald-500", bg: "bg-emerald-50" },
      ].map((item) => (
        <div key={item.name} className="flex items-center justify-between py-2 border-t border-[#E5E7EB]">
          <div>
            <p className="text-sm font-medium text-[#1A1A2E]">{item.name}</p>
            <p className="font-mono-metric text-sm font-bold text-[#0F2B3C]">{item.price}</p>
          </div>
          <span className={`font-mono-metric text-xs font-semibold px-2 py-0.5 rounded ${item.bg} ${item.color}`}>
            {item.variation}
          </span>
        </div>
      ))}
    </div>
  );
}

const pillars = [
  {
    icon: BarChart3,
    label: "TECNOLOGIA",
    title: "Radar de Preços OPME",
    description:
      "Dashboard interativo com dados de referência do mercado brasileiro. Compare preços por categoria, identifique variações, fundamente auditorias e negociações com dados.",
    preview: <RadarMiniPreview />,
  },
  {
    icon: BookOpen,
    label: "FORMAÇÃO",
    title: "Inteligência Aplicada",
    description:
      "Boletim semanal exclusivo por Débora Soares com análise profunda de regulação, dados e tendências. Checklists e templates prontos para uso imediato. Sessão mensal ao vivo de Q&A.",
    preview: null,
  },
  {
    icon: Users,
    label: "COMUNIDADE",
    title: "Rede Profissional OPME",
    description:
      "Grupo exclusivo de profissionais do setor no WhatsApp. Alertas regulatórios em primeira mão, discussões técnicas qualificadas, networking com quem decide.",
    preview: null,
  },
];

const SolutionSection = () => {
  return (
    <section id="solucao" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-[#00C2A8] tracking-wider uppercase mb-3">A Plataforma</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A2E]">
            Uma plataforma. Três pilares.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={sectionAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-xl border border-[#E5E7EB] shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200"
            >
              <div className="w-11 h-11 rounded-lg bg-[#E6FAF7] flex items-center justify-center mb-4">
                <pillar.icon size={22} className="text-[#00C2A8]" />
              </div>
              <p className="text-[11px] font-semibold text-[#6B7280] tracking-wider uppercase mb-1.5">
                {pillar.label}
              </p>
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{pillar.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{pillar.description}</p>
              {pillar.preview}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
