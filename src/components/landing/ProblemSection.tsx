import { motion } from "framer-motion";

const problems = [
  {
    number: "3.108%",
    color: "text-[#EF4444]",
    headline: "Variação de preço detectada pela ANS no mesmo dispositivo",
    subtext: "Sem referência confiável, você negocia no escuro.",
  },
  {
    number: "665",
    color: "text-[#F59E0B]",
    headline: "Nova RDC da ANVISA com requisitos que a maioria ainda não implementou",
    subtext: "Regulação muda — e o custo da não-conformidade é alto.",
  },
  {
    number: "73%",
    color: "text-[#00C2A8]",
    headline: "Das auditorias de OPME encontram os mesmos erros evitáveis",
    subtext: "Faltam ferramentas práticas, não mais informação genérica.",
  },
];

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProblemSection = () => {
  return (
    <section className="py-24 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A2E] text-center mb-14 max-w-3xl mx-auto leading-tight"
        >
          O mercado de OPME tem um problema de{" "}
          <span className="font-mono-metric text-[#EF4444]">R$ 19,7 bilhões</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              variants={sectionAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-xl border border-[#E5E7EB] shadow-card p-6"
            >
              <p className={`font-mono-metric text-4xl sm:text-5xl font-bold ${p.color} mb-4`}>
                {p.number}
              </p>
              <p className="text-[15px] font-semibold text-[#1A1A2E] leading-snug mb-2">
                {p.headline}
              </p>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {p.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
