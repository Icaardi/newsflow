import { motion } from "framer-motion";
import { Check } from "lucide-react";

const sectionAnim = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const benefits = [
  "Dashboard de preços OPME com dados de referência",
  "Boletim semanal de inteligência por Débora Soares",
  "Checklists interativos de auditoria e compliance",
  "Templates profissionais (pareceres, relatórios, protocolos)",
  "Sessão mensal ao vivo de Q&A com a expert",
  "Comunidade exclusiva de WhatsApp",
  "Acervo completo de todos os boletins",
  "Preço de fundador travado para sempre",
];

const BenefitsSection = () => (
  <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--bg-primary)" }}>
    <div className="max-w-4xl mx-auto px-6">
      <motion.div variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-[36px] font-normal" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Tudo incluído na sua assinatura</h2>
      </motion.div>

      <motion.div variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 max-w-2xl mx-auto">
        {benefits.map((benefit) => (
          <div key={benefit} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "var(--ds-blue-glow)", color: "var(--ds-blue)" }}>
              <Check size={12} />
            </div>
            <span className="text-[15px]" style={{ color: "var(--text-primary)" }}>{benefit}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default BenefitsSection;
