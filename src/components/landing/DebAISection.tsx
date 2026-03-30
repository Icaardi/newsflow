import { motion } from "framer-motion";
import { Search, Shield, ClipboardCheck, TrendingUp, Sparkles } from "lucide-react";

const sectionAnim = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const capabilities = [
  { icon: Search, title: "Consulta de preços", desc: "Pergunte sobre variações, faixas e referências de qualquer dispositivo" },
  { icon: Shield, title: "Compliance e regulação", desc: "Tire dúvidas sobre RDCs, ANVISA e boas práticas" },
  { icon: ClipboardCheck, title: "Roteiros de auditoria", desc: "Peça checklists personalizados para auditoria de preço e fornecedor" },
  { icon: TrendingUp, title: "Análise de mercado", desc: "Entenda tendências, riscos e oportunidades no mercado de dispositivos" },
];

const DebAISection = () => (
  <section className="py-24 lg:py-32 relative" style={{ backgroundColor: "var(--bg-primary)" }}>
    <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(192, 0, 126, 0.04), transparent)" }} />

    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <motion.div variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="text-center mb-14">
        <span
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-medium mb-5"
          style={{ backgroundColor: "rgba(192, 0, 126, 0.1)", color: "var(--ds-magenta)" }}
        >
          <Sparkles size={14} /> Inteligência Artificial
        </span>
        <h2 className="font-display text-3xl md:text-[36px] font-normal mb-4" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          Deb.ai — 30 anos de experiência em OPME, disponíveis 24 horas por dia
        </h2>
        <p className="text-base md:text-lg max-w-[640px] mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Um assistente inteligente treinado com o conhecimento de Débora Soares. Tire dúvidas sobre preços, regulação, auditoria e compliance em tempo real — como ter uma consultora sênior sempre ao seu lado.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Capabilities grid */}
        <motion.div variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="rounded-md p-5"
              style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(192, 0, 126, 0.08)", color: "var(--ds-magenta)" }}>
                <cap.icon size={20} />
              </div>
              <p className="text-[15px] font-medium mb-1" style={{ color: "var(--text-primary)" }}>{cap.title}</p>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{cap.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Chat mockup */}
        <motion.div variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="rounded-lg p-5 max-w-[400px] mx-auto lg:mx-0" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
            {/* Mini header */}
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid var(--border-default)" }}>
              <Sparkles size={14} style={{ color: "var(--ds-magenta)" }} />
              <span className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>Deb.ai</span>
            </div>

            {/* User bubble */}
            <div className="flex justify-end mb-3">
              <div className="text-[13px] px-3.5 py-2.5 text-white" style={{ backgroundColor: "var(--ds-blue)", borderRadius: "16px 4px 16px 16px", maxWidth: "85%" }}>
                Qual a variação de preço de stents farmacológicos?
              </div>
            </div>

            {/* Assistant bubble */}
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                <Sparkles size={10} style={{ color: "var(--ds-magenta)" }} />
              </div>
              <div className="text-[13px] px-3.5 py-2.5 leading-relaxed" style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", borderRadius: "4px 16px 16px 16px", maxWidth: "85%" }}>
                Os stents farmacológicos (DES) apresentam variação de 478% no mercado brasileiro, com preços entre R$3.200 e R$18.500. Recomendo consultar o Radar de Preços.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Disclaimer */}
      <motion.p
        variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-10 text-xs italic" style={{ color: "var(--text-tertiary)" }}
      >
        A Deb.ai utiliza inteligência artificial para oferecer orientações baseadas em dados e na experiência de Débora Soares. As respostas são informativas e não substituem análise profissional específica.
      </motion.p>
    </div>
  </section>
);

export default DebAISection;
