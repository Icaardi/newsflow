import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-[#F8FAFB]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-[#00C2A8] tracking-wider uppercase mb-3">Planos</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A2E] mb-3">
            Planos de Fundador — Exclusivo Medical Devices Summit
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto">
            Vagas limitadas aos primeiros 200 assinantes. Preço de fundador mantido enquanto a assinatura estiver ativa.
          </p>
        </motion.div>

        <motion.div
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {/* Monthly */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-card p-7">
            <p className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-6">Mensal</p>

            <div className="mb-1">
              <span className="font-mono-metric text-4xl font-bold text-[#0F2B3C]">R$ 297</span>
              <span className="text-[#6B7280] text-sm">/mês</span>
            </div>
            <p className="text-sm text-[#6B7280] mb-1">
              <span className="line-through">de R$ 497,00</span>
            </p>
            <p className="text-xs text-[#00C2A8] font-semibold mb-6">40% de desconto de fundador</p>

            <Button asChild className="w-full bg-[#0F2B3C] hover:bg-[#1A3D52] text-white">
              <Link to="/assinar">
                Assinar mensal
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>

          {/* Annual — highlighted */}
          <div className="bg-white rounded-xl border-2 border-[#00C2A8] shadow-card p-7 relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00C2A8] text-white border-transparent text-[11px] font-bold px-3">
              MELHOR VALOR
            </Badge>

            <p className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-6">Anual</p>

            <div className="mb-1">
              <span className="font-mono-metric text-4xl font-bold text-[#0F2B3C]">R$ 2.970</span>
              <span className="text-[#6B7280] text-sm">/ano</span>
            </div>
            <p className="text-sm text-[#6B7280] mb-1">
              Equivale a <span className="font-mono-metric font-semibold text-[#1A1A2E]">R$ 247,50</span>/mês
            </p>
            <p className="text-xs text-[#00C2A8] font-semibold mb-6">Economia de R$ 2.994 vs preço regular</p>

            <Button asChild className="w-full bg-[#00C2A8] hover:bg-[#00A892] text-white">
              <Link to="/assinar">
                Assinar anual
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Fine print */}
        <motion.div
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-8 space-y-3"
        >
          <p className="text-sm text-[#6B7280]">
            Cancele quando quiser. Sem fidelidade, sem multa.
          </p>
          <p className="text-xs text-[#6B7280]/70 max-w-lg mx-auto">
            Referência: assinaturas de tabelas de preço como SIMPRO custam R$ 300-400/mês — sem análise, sem checklists, sem comunidade.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
