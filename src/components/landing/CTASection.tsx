import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-28 relative stars-bg bg-sidebar text-sidebar-foreground overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto px-6 text-center relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold mb-5 text-sidebar-foreground">
          Comece sua newsletter profissional hoje
        </h2>
        <p className="text-sidebar-foreground/70 text-lg mb-8 max-w-xl mx-auto">
          Junte-se a centenas de experts que já monetizam seu conhecimento com a plataforma mais completa do Brasil.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="ghost"
            size="xl"
            className="border border-sidebar-foreground/25 text-sidebar-foreground hover:bg-white/10 hover:text-sidebar-foreground rounded-full"
            asChild
          >
            <Link to="/login">Fazer login</Link>
          </Button>
          <Button variant="default" size="xl" className="rounded-full" asChild>
            <Link to="/register">
              Começar a publicar
              <ArrowUpRight size={18} />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
