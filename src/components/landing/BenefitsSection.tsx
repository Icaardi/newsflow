import { motion } from "framer-motion";
import { Check } from "lucide-react";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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

const BenefitsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A2E]">
            Tudo incluído na sua assinatura
          </h2>
        </motion.div>

        <motion.div
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mx-auto"
        >
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#E6FAF7] flex items-center justify-center shrink-0 mt-0.5">
                <Check size={12} className="text-[#00C2A8]" />
              </div>
              <span className="text-[15px] text-[#1A1A2E]">{benefit}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
