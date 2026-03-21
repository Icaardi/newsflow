import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Newspaper, Sparkles, CreditCard } from "lucide-react";

const tabs = [
  {
    id: "newsletters",
    label: "Newsletters",
    icon: Newspaper,
    title: "Publique qualquer tipo de newsletter.",
    description: "Na NewsFlow, você publica newsletters gratuitas e pagas com facilidade. Nossa plataforma reúne tudo em um só lugar, tornando a criação e monetização do seu conteúdo muito mais simples.",
    cards: [
      { title: "Newsletter Gratuita", desc: "Artigos, curadoria, análises e opiniões para sua audiência." },
      { title: "Newsletter Premium", desc: "Conteúdo exclusivo com assinatura mensal ou anual via Pix/Cartão." },
      { title: "Série de E-mails", desc: "Crie sequências automatizadas de onboarding e nutrição." },
    ],
  },
  {
    id: "ia",
    label: "IA",
    icon: Sparkles,
    title: "A inteligência artificial que escreve por você.",
    description: "Envie o tema e pontos-chave. A IA pesquisa fontes, estrutura e gera um rascunho profissional em minutos. Você revisa, ajusta e publica.",
    cards: [
      { title: "Pesquisa Automática", desc: "A IA busca fontes confiáveis e dados atualizados sobre seu tema." },
      { title: "Rascunho Completo", desc: "Receba um artigo estruturado com título, subtítulos e conclusão." },
      { title: "Tom Personalizado", desc: "Ajuste o estilo de escrita para combinar com sua voz editorial." },
    ],
  },
  {
    id: "monetizacao",
    label: "Monetização",
    icon: CreditCard,
    title: "Monetize seu conhecimento de forma simples.",
    description: "Aceite Pix, cartão e boleto nativamente. Seus assinantes pagam do jeito brasileiro, sem fricção. Acompanhe sua receita em tempo real.",
    cards: [
      { title: "Checkout BR", desc: "Pix instantâneo, cartão de crédito e boleto integrados." },
      { title: "Zero Taxa de Receita", desc: "Diferente de outras plataformas, sua receita é 100% sua." },
      { title: "Planos Flexíveis", desc: "Crie planos mensais, anuais ou vitalícios para seus leitores." },
    ],
  },
];

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState("newsletters");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="funcionalidades" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                {active.title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {active.description}
              </p>
              <Button variant="default" className="rounded-full" asChild>
                <Link to="/register">Comece a publicar</Link>
              </Button>
            </div>

            {/* Right: cards */}
            <div className="space-y-4">
              {active.cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-colors duration-200"
                >
                  <h4 className="font-bold text-base mb-1">{card.title}</h4>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturesSection;
