import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import avatar01 from "@/assets/avatars/avatar-01.avif";
import avatar02 from "@/assets/avatars/avatar-02.avif";
import avatar03 from "@/assets/avatars/avatar-03.avif";
import avatar04 from "@/assets/avatars/avatar-04.avif";
import avatar05 from "@/assets/avatars/avatar-05.avif";
import avatar06 from "@/assets/avatars/avatar-06.avif";
import avatar07 from "@/assets/avatars/avatar-07.avif";
import avatar08 from "@/assets/avatars/avatar-08.avif";

const avatars = [
  { name: "Marina Costa", role: "Jornalista", src: avatar02 }, 
  { name: "Pedro Alves", role: "Consultor Financeiro", src: avatar07 }, 
  { name: "Carla Nunes", role: "Médica", src: avatar06 }, 
  { name: "Rafael Torres", role: "Advogado", src: avatar04 },
  { name: "Julia Mendes", role: "Nutricionista", src: avatar05 }, 
  { name: "Diego Santos", role: "Esp. Marketing", src: avatar03 }, 
  { name: "Ana Ferreira", role: "Produtora de Conteúdo", src: avatar08 },
  { name: "Lucas Ribeiro", role: "Coach Executivo", src: avatar01 },
];

const HeroSection = () => {
  const doubledAvatars = [...avatars, ...avatars];

  return (
    <section className="relative min-h-screen gradient-hero flex flex-col items-center justify-center">
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-8 w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-7"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
            Tudo que você precisa{" "}
            <br className="hidden sm:block" />
            para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(172,100%,36%)] to-[hsl(190,85%,32%)]">
              viver de newsletter.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Deixe de lado aquela lista enorme de ferramentas e passe a publicar,
            monetizar e escalar seu conteúdo em um só lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="ghost" size="xl" className="border border-border hover:border-muted-foreground/30 rounded-full" asChild>
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
      </div>

      {/* Scrolling avatars */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full overflow-hidden mt-8 pb-12 relative z-10"
      >
        <div className="flex animate-scroll-left" style={{ width: "max-content" }}>
          {doubledAvatars.map((a, i) => (
            <div key={i} className="flex items-center gap-3 mx-4 bg-card/60 backdrop-blur-sm border border-border/40 rounded-full py-2 px-4 shrink-0">
              <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden shrink-0 ring-1 ring-border/60">
                <img src={a.src} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground whitespace-nowrap">{a.name}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap">{a.role}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
