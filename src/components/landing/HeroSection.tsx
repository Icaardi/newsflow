import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, AlertTriangle } from "lucide-react";

/* Mini dashboard preview — built with HTML/CSS */
function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 p-5 space-y-4 max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Radar de Preços</span>
          <span className="text-[10px] text-white/40 font-mono-metric">Mar 2026</span>
        </div>

        {/* Device card 1 */}
        <div className="bg-white/10 rounded-xl p-4 border border-white/10">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-sm font-semibold text-white">Stent farmacológico (DES)</p>
              <p className="text-[10px] text-white/40 mt-0.5">Stents Coronários</p>
            </div>
            <span className="text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md flex items-center gap-1">
              <TrendingUp size={10} />
              478%
            </span>
          </div>
          <p className="font-mono-metric text-xl font-bold text-[#00C2A8] mt-2">R$ 8.500</p>
          <div className="mt-2 space-y-1">
            <div className="relative h-1.5 rounded-full overflow-hidden bg-white/10">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #EF4444 100%)" }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#0F2B3C] shadow"
                style={{ left: "35%" }}
              />
            </div>
            <div className="flex justify-between">
              <span className="font-mono-metric text-[10px] text-white/40">R$ 3.200</span>
              <span className="font-mono-metric text-[10px] text-white/40">R$ 18.500</span>
            </div>
          </div>
        </div>

        {/* Device card 2 (compact) */}
        <div className="bg-white/10 rounded-xl p-4 border border-white/10">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-sm font-semibold text-white">Tela de polipropileno</p>
              <p className="text-[10px] text-white/40 mt-0.5">Telas e Membranas</p>
            </div>
            <span className="text-[11px] font-semibold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-md flex items-center gap-1">
              <AlertTriangle size={10} />
              1.678%
            </span>
          </div>
          <p className="font-mono-metric text-xl font-bold text-[#00C2A8] mt-2">R$ 850</p>
          <div className="mt-2 space-y-1">
            <div className="relative h-1.5 rounded-full overflow-hidden bg-white/10">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #EF4444 100%)" }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#0F2B3C] shadow"
                style={{ left: "22%" }}
              />
            </div>
            <div className="flex justify-between">
              <span className="font-mono-metric text-[10px] text-white/40">R$ 180</span>
              <span className="font-mono-metric text-[10px] text-white/40">R$ 3.200</span>
            </div>
          </div>
        </div>
      </div>

      {/* Glow effect behind */}
      <div className="absolute -inset-8 bg-[#00C2A8]/8 rounded-full blur-3xl -z-10" />
    </motion.div>
  );
}

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(160deg, #0F2B3C 0%, #1A3D52 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — copy */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <Badge className="bg-white/10 text-white/90 border-white/15 text-xs font-medium px-3 py-1">
                Lançamento exclusivo — Medical Devices Summit 2026
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight">
                Inteligência de mercado e ferramentas para profissionais de{" "}
                <span className="text-[#00C2A8]">OPME-DMI</span>
              </h1>

              <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
                Radar de preços, checklists de auditoria, boletins de inteligência e comunidade profissional.
                Tudo que você precisa para tomar decisões melhores no mercado de dispositivos médicos.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-[#00C2A8] hover:bg-[#00A892] text-white rounded-full px-8"
                  onClick={() => document.getElementById("solucao")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explorar a plataforma
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full px-8"
                  onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Ver planos de fundador
                </Button>
              </div>

              <p className="text-xs text-white/30 pt-1">by DS Treinamentos</p>
            </motion.div>
          </div>

          {/* Right — dashboard preview */}
          <div className="flex-shrink-0 hidden md:block">
            <DashboardPreview />
          </div>
        </div>
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 stars-bg pointer-events-none" />
    </section>
  );
};

export default HeroSection;
