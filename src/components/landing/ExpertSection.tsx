import { motion } from "framer-motion";
import { User } from "lucide-react";

const sectionAnim = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const credentials = [
  "Mestre em Tecnologias em Saúde — PUC-PR",
  "Vice-Presidente da ABEA",
  "Membro do GTE-OPME/ANS",
  "IMDRF-Brasil/ANVISA",
  "30+ anos de experiência em OPME-DMI",
  "Fundadora da DS Treinamentos",
];

const ExpertSection = () => (
  <section id="expert" className="py-24 lg:py-32" style={{ backgroundColor: "var(--bg-primary)" }}>
    <div className="max-w-5xl mx-auto px-6">
      <motion.div variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="flex flex-col md:flex-row items-center gap-12">
        <div
          className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--bg-tertiary)", border: "2px solid rgba(5, 89, 181, 0.3)" }}
        >
          <User size={56} style={{ color: "var(--text-tertiary)" }} />
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-semibold tracking-wider uppercase mb-2" style={{ color: "var(--ds-blue)" }}>A Expert</p>
          <h2 className="font-display text-3xl font-normal mb-5" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>Débora Soares</h2>

          <ul className="space-y-1.5 mb-8">
            {credentials.map((c) => (
              <li key={c} className="text-sm flex items-start gap-2.5" style={{ color: "var(--text-secondary)" }}>
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "var(--ds-blue)" }} />
                {c}
              </li>
            ))}
          </ul>

          <blockquote className="relative pl-5" style={{ borderLeft: "2px solid rgba(5, 89, 181, 0.3)" }}>
            <span className="absolute -left-1 -top-4 font-display text-5xl leading-none" style={{ color: "rgba(5, 89, 181, 0.2)" }}>"</span>
            <p className="font-display text-lg italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Em 30 anos no setor, nunca tivemos uma ferramenta que reunisse dados de preços, regulação e
              comunidade num só lugar. É exatamente isso que estamos construindo com o Radar OPME.
            </p>
          </blockquote>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ExpertSection;
