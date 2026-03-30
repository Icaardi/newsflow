import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const sectionAnim = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const PricingSection = () => (
  <section id="pricing" className="py-24 lg:py-32" style={{ backgroundColor: "var(--bg-primary)" }}>
    <div className="max-w-5xl mx-auto px-6">
      <motion.div variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <p className="text-sm font-semibold tracking-wider uppercase mb-3" style={{ color: "var(--ds-blue)" }}>Planos</p>
        <h2 className="font-display text-3xl md:text-[36px] font-normal mb-3" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          Planos de Fundador — Exclusivo Medical Devices Summit
        </h2>
        <p className="max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
          Vagas limitadas aos primeiros 200 assinantes. Preço de fundador mantido enquanto a assinatura estiver ativa.
        </p>
      </motion.div>

      <motion.div variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Monthly */}
        <div className="rounded-lg p-8" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
          <p className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: "var(--text-tertiary)" }}>Mensal</p>
          <div className="mb-1">
            <span className="font-mono-metric text-[40px] font-bold" style={{ color: "var(--text-primary)" }}>R$ 297</span>
            <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>/mês</span>
          </div>
          <p className="text-sm mb-1"><span className="line-through" style={{ color: "var(--text-tertiary)" }}>de R$ 497,00</span></p>
          <p className="text-xs font-semibold mb-6" style={{ color: "var(--ds-magenta-light)" }}>40% de desconto de fundador</p>
          <Link
            to="/assinar"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-sm text-sm font-semibold transition-all"
            style={{ color: "var(--ds-blue)", border: "1px solid rgba(5,89,181,0.4)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(5,89,181,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            Assinar mensal <ArrowRight size={16} />
          </Link>
        </div>

        {/* Annual */}
        <div className="rounded-lg p-8 relative" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid rgba(192,0,126,0.3)", boxShadow: "0 0 40px var(--ds-magenta-glow)" }}>
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: "var(--ds-magenta)" }}>
            MELHOR VALOR
          </span>
          <p className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: "var(--text-tertiary)" }}>Anual</p>
          <div className="mb-1">
            <span className="font-mono-metric text-[40px] font-bold" style={{ color: "var(--text-primary)" }}>R$ 2.970</span>
            <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>/ano</span>
          </div>
          <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>
            Equivale a <span className="font-mono-metric font-semibold" style={{ color: "var(--text-primary)" }}>R$ 247,50</span>/mês
          </p>
          <p className="text-xs font-semibold mb-6" style={{ backgroundColor: "rgba(192,0,126,0.15)", color: "var(--ds-magenta-light)", display: "inline-block", padding: "2px 8px", borderRadius: "4px" }}>
            Economia de R$ 2.994
          </p>
          <Link
            to="/assinar"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-sm text-sm font-semibold text-white transition-all"
            style={{ backgroundColor: "var(--ds-magenta)", boxShadow: "0 0 20px var(--ds-magenta-glow)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta-light)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta)"; }}
          >
            Assinar anual <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>

      <motion.div variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center mt-8 space-y-3">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Cancele quando quiser. Sem fidelidade, sem multa.</p>
        <p className="text-[13px] max-w-lg mx-auto" style={{ color: "var(--text-tertiary)" }}>
          Referência: assinaturas de tabelas de preço como SIMPRO custam R$ 300-400/mês — sem análise, sem checklists, sem comunidade.
        </p>
      </motion.div>
    </div>
  </section>
);

export default PricingSection;
