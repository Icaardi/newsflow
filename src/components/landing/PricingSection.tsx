import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PricingSection = () => {
  return (
    <section id="preço" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Preços</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Traga sua newsletter para a NewsFlow!
          </h2>
          <p className="text-muted-foreground text-lg">
            Simplifique sua publicação e acelere seu crescimento conosco!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-card rounded-2xl border border-border p-8 glow-accent-strong text-center">
            <h3 className="font-bold text-sm text-accent mb-6 tracking-wider uppercase">
              Você só paga se monetizar!
            </h3>

            <div className="mb-2">
              <span className="text-6xl font-extrabold font-mono-metric">4.99%</span>
            </div>
            <p className="text-muted-foreground text-lg font-semibold mb-8">
              + R$ 1,49 <span className="text-sm font-normal">por transação</span>
            </p>

            <div className="text-left space-y-3 mb-8">
              {[
                "Newsletters ilimitadas",
                "Assinantes ilimitados",
                "Editor WYSIWYG completo",
                "Checkout com Pix, Cartão e Boleto",
                "Analytics em tempo real",
                "Assistente IA para criação",
                "Domínio personalizado",
                "Suporte prioritário",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 text-sm">
                  <Check size={16} className="text-accent shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mb-6">
              Transações por cartão em até 15 dias, boletos em 1 dia e Pix instantâneo.
            </p>

            <Button variant="default" size="xl" className="w-full rounded-full" asChild>
              <Link to="/register">Cadastrar agora!</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
