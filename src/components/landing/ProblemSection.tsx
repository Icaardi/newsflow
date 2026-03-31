import { motion } from "framer-motion";

const problems = [
  { number: "3.108%", color: "var(--danger)", headline: "Variação de preço detectada pela ANS no mesmo dispositivo", subtext: "Sem referência confiável, você negocia no escuro." },
  { number: "665", color: "var(--warning)", headline: "Nova RDC da ANVISA com requisitos que a maioria ainda não implementou", subtext: "Regulação muda — e o custo da não-conformidade é alto." },
  { number: "73%", color: "var(--ds-blue)", headline: "Das auditorias de OPME encontram os mesmos erros evitáveis", subtext: "Faltam ferramentas práticas, não mais informação genérica." },
];

const sectionAnim = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const ProblemSection = () => (
  <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--bg-primary)" }}>
    <div className="max-w-7xl mx-auto px-6">
      <motion.h2
        variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-3xl md:text-[36px] font-normal text-center mb-16 max-w-3xl mx-auto leading-tight"
        style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
      >
        O mercado de OPME tem um problema de{" "}
        <span className="font-mono-metric" style={{ color: "var(--danger)" }}>R$ 19,7 bilhões</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {problems.map((p, i) => (
          <motion.div
            key={i} variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-lg p-8"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
          >
            <p className="font-mono-metric text-5xl sm:text-[56px] font-bold mb-5" style={{ color: p.color }}>{p.number}</p>
            <p className="text-[15px] font-medium leading-snug mb-2" style={{ color: "var(--text-primary)" }}>{p.headline}</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.subtext}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
