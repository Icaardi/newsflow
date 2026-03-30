import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CTASection = () => {
  return (
    <section className="relative py-24 stars-bg" style={{ backgroundColor: "#0F2B3C" }}>
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Pare de negociar no escuro.
          </h2>
          <p className="text-white/60 max-w-lg mx-auto leading-relaxed">
            Junte-se aos profissionais que estão usando dados e inteligência para tomar decisões melhores em OPME.
          </p>
          <div className="pt-2">
            <Button
              size="lg"
              className="bg-[#00C2A8] hover:bg-[#00A892] text-white rounded-full px-8"
              asChild
            >
              <Link to="/assinar">
                Garantir preço de fundador
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
