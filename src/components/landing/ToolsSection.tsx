import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, BarChart3, Brain, Search } from "lucide-react";

const tools = [
  {
    id: "editor",
    icon: Mail,
    label: "Editor WYSIWYG",
    title: "Editor WYSIWYG",
    description: "Escreva suas newsletters em um editor visual poderoso. Arraste e solte blocos, adicione imagens, botões e formatação avançada sem precisar de código.",
    mockup: (
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="flex gap-1.5">
            {["B", "I", "U", "H1", "H2"].map((b) => (
              <span key={b} className="px-2.5 py-1 bg-secondary rounded text-xs font-mono text-muted-foreground">{b}</span>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-6 bg-secondary/50 rounded w-3/4" />
          <div className="h-4 bg-secondary/30 rounded w-full" />
          <div className="h-4 bg-secondary/30 rounded w-5/6" />
          <div className="h-32 bg-accent/10 rounded-lg border border-accent/20" />
          <div className="h-4 bg-secondary/30 rounded w-4/5" />
          <div className="h-4 bg-secondary/30 rounded w-full" />
        </div>
      </div>
    ),
  },
  {
    id: "automacao",
    icon: MessageSquare,
    label: "Automação de E-mails",
    title: "Automação de E-mails",
    badge: "Em breve",
    description: "Crie sequências automáticas de boas-vindas, vendas e re-engajamento. Mova seus leitores entre campanhas de forma inteligente.",
    mockup: (
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm font-medium">Fluxo ativo</span>
        </div>
        {["Novo assinante → E-mail de boas-vindas", "Após 3 dias → Conteúdo gratuito", "Após 7 dias → Oferta premium", "Sem abertura → Re-engajamento"].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">{i + 1}</div>
            <span className="text-sm text-muted-foreground">{step}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics Avançado",
    title: "Analytics Avançado",
    description: "Acompanhe taxa de abertura, cliques, crescimento de assinantes e receita em dashboards intuitivos e em tempo real.",
    mockup: (
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Taxa de abertura", value: "68.4%", color: "text-success" },
            { label: "Taxa de cliques", value: "12.7%", color: "text-accent" },
            { label: "Novos assinantes", value: "+847", color: "text-foreground" },
            { label: "MRR", value: "R$ 8.420", color: "text-warning" },
          ].map((m) => (
            <div key={m.label} className="bg-secondary/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className={`text-xl font-bold font-mono-metric ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </div>
        <div className="h-24 bg-secondary/30 rounded-lg flex items-end px-2 pb-2 gap-1">
          {[30, 45, 35, 60, 55, 70, 65, 80, 75, 90, 85, 95].map((h, i) => (
            <div key={i} className="flex-1 bg-accent/40 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "ia",
    icon: Brain,
    label: "AI Center",
    title: "AI Center",
    badge: "Em breve",
    description: "Use inteligência artificial para gerar ideias, criar rascunhos, otimizar assuntos de e-mail e recuperar assinantes inativos automaticamente.",
    mockup: (
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={18} className="text-accent" />
          <span className="text-sm font-medium">Assistente IA</span>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3 text-sm text-muted-foreground">
          "Crie uma newsletter sobre tendências de investimento em 2026 para profissionais de finanças..."
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-sm">
          <p className="font-semibold text-foreground mb-1">📝 Rascunho gerado</p>
          <p className="text-muted-foreground">3 seções • 1.200 palavras • 4 fontes citadas</p>
        </div>
      </div>
    ),
  },
  {
    id: "seo",
    icon: Search,
    label: "SEO & Distribuição",
    title: "SEO & Distribuição",
    description: "Otimize suas newsletters para mecanismos de busca. Distribua automaticamente em múltiplos canais e alcance mais leitores.",
    mockup: (
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <div className="space-y-3">
          {[
            { label: "Visitantes orgânicos", value: "4.200", change: "+18%" },
            { label: "Compartilhamentos", value: "892", change: "+24%" },
            { label: "Novos via SEO", value: "347", change: "+31%" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold font-mono-metric text-sm">{item.value}</span>
                <span className="text-xs text-success">{item.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const ToolsSection = () => {
  const [activeTool, setActiveTool] = useState("editor");
  const active = tools.find((t) => t.id === activeTool)!;

  return (
    <section id="ferramentas" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Ferramentas</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Impulsione sua newsletter com<br className="hidden md:block" /> ferramentas intuitivas
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Editor, automação, analytics, IA e muito mais — tudo integrado na mesma plataforma.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Left tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
                  activeTool === tool.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <tool.icon size={18} />
                {tool.label}
                {tool.badge && (
                  <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-foreground/10 text-muted-foreground">{tool.badge}</span>
                )}
              </button>
            ))}
          </div>

          {/* Right content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, x: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-2 gap-8 items-start"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{active.title}</h3>
                  {active.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">{active.badge}</span>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">{active.description}</p>
              </div>
              <div>{active.mockup}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
