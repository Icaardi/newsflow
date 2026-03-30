import { motion } from "framer-motion";
import { User } from "lucide-react";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const credentials = [
  "Mestre em Tecnologias em Saúde — PUC-PR",
  "Vice-Presidente da ABEA",
  "Membro do GTE-OPME/ANS",
  "IMDRF-Brasil/ANVISA",
  "30+ anos de experiência em OPME-DMI",
  "Fundadora da DS Treinamentos",
];

const ExpertSection = () => {
  return (
    <section id="expert" className="py-24 bg-[#F8FAFB]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center gap-10"
        >
          {/* Photo placeholder */}
          <div className="w-52 h-52 md:w-60 md:h-60 rounded-2xl bg-[#1A3D52] flex items-center justify-center shrink-0">
            <User size={64} className="text-white/30" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-semibold text-[#00C2A8] tracking-wider uppercase mb-2">A Expert</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mb-4">Débora Soares</h2>

            <ul className="space-y-1.5 mb-6">
              {credentials.map((c) => (
                <li key={c} className="text-sm text-[#6B7280] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C2A8] mt-1.5 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>

            <blockquote className="relative pl-4 border-l-2 border-[#00C2A8]">
              <p className="text-[15px] text-[#1A1A2E] italic leading-relaxed">
                "Em 30 anos no setor, nunca tivemos uma ferramenta que reunisse dados de preços, regulação e
                comunidade num só lugar. É exatamente isso que estamos construindo com o Radar OPME."
              </p>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertSection;
