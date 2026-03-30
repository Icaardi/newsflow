import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const sectionAnim = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const CTASection = () => (
  <section className="relative py-24 lg:py-32 stars-bg" style={{ backgroundColor: "var(--bg-primary)" }}>
    <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, var(--ds-magenta-glow), transparent)" }} />
    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
      <motion.div variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="space-y-6">
        <h2 className="font-display text-3xl md:text-[36px] font-normal leading-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          Pare de negociar no escuro.
        </h2>
        <p className="max-w-lg mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Junte-se aos profissionais que estão usando dados e inteligência para tomar decisões melhores em OPME.
        </p>
        <div className="pt-2">
          <Link
            to="/assinar"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-sm text-sm font-semibold text-white transition-all"
            style={{ backgroundColor: "var(--ds-magenta)", boxShadow: "0 0 24px var(--ds-magenta-glow)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta-light)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta)"; }}
          >
            Garantir preço de fundador <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
