import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Clock, ChevronRight, MessageCircle,
  X, CheckCircle2, Sparkles, ArrowRight, BookOpen,
} from "lucide-react";
import deboraPhoto from "@/assets/debora-soares.jpg";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Bulletin {
  id: string;
  number: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  title: string;
  date: string;
  preview: string;
  readTime: number;
  available: boolean;
}

const bulletins: Bulletin[] = [
  {
    id: "001", number: "#001", tag: "Regulação",
    tagColor: "#60A5FA", tagBg: "rgba(59, 130, 246, 0.15)",
    title: "RDC 665/2022: O que muda na prática para gestores hospitalares",
    date: "16 de abril de 2026",
    preview: "A nova resolução da ANVISA redefine os requisitos de gerenciamento de dispositivos médicos. Veja o que você precisa adaptar imediatamente.",
    readTime: 8, available: true,
  },
  {
    id: "002", number: "#002", tag: "Dados de Mercado",
    tagColor: "#34D399", tagBg: "rgba(16, 185, 129, 0.15)",
    title: "Stents coronários: por que o mesmo dispositivo custa 478% mais caro",
    date: "23 de abril de 2026",
    preview: "Analisamos dados da ANS e identificamos os fatores que explicam a variação brutal de preços. Três ações para sua próxima negociação.",
    readTime: 10, available: false,
  },
  {
    id: "003", number: "#003", tag: "Auditoria",
    tagColor: "#FBBF24", tagBg: "rgba(245, 158, 11, 0.15)",
    title: "Os 5 erros mais comuns em auditorias de OPME (e como evitá-los)",
    date: "30 de abril de 2026",
    preview: "Auditamos mais de 200 processos de compra de OPME no último ano. Estes são os erros que aparecem em 73% dos casos.",
    readTime: 7, available: false,
  },
  {
    id: "004", number: "#004", tag: "Tendências",
    tagColor: "#A78BFA", tagBg: "rgba(139, 92, 246, 0.15)",
    title: "Rastreabilidade digital de DMI: o que o Brasil pode aprender com o modelo europeu",
    date: "7 de maio de 2026",
    preview: "A UDI (Unique Device Identification) já é obrigatória na Europa. Como o Brasil está se preparando e o que muda para sua instituição.",
    readTime: 9, available: false,
  },
];

const filterTabs = ["Todos", "Regulação", "Dados de Mercado", "Auditoria", "Tendências"] as const;

const cardSpring = { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 };

/* ------------------------------------------------------------------ */
/*  Bulletin card                                                      */
/* ------------------------------------------------------------------ */

function BulletinCard({ bulletin, onLockedClick }: {
  bulletin: Bulletin;
  onLockedClick: () => void;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (bulletin.available) {
      navigate(`/boletins/${bulletin.id}`);
    } else {
      onLockedClick();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={cardSpring}
      onClick={handleClick}
      className="group rounded-lg p-6 cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-default)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-active)";
        e.currentTarget.style.boxShadow = "0 4px 30px var(--ds-blue-glow)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-default)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Tag + status row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
              style={{ backgroundColor: bulletin.tagBg, color: bulletin.tagColor }}
            >
              {bulletin.tag}
            </span>
            {bulletin.available ? (
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
                style={{ backgroundColor: "rgba(16, 185, 129, 0.12)", color: "#34D399" }}
              >
                <CheckCircle2 size={10} className="mr-1" />
                Disponível
              </span>
            ) : (
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
                style={{ backgroundColor: "var(--ds-blue-glow)", color: "var(--ds-blue-light)" }}
              >
                <Lock size={10} className="mr-1" />
                Exclusivo
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium leading-snug transition-colors" style={{ color: "var(--text-primary)" }}>
            {bulletin.title}
          </h3>

          {/* Preview */}
          <p className="text-sm mt-2 leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {bulletin.preview}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4 mt-3 text-xs" style={{ color: "var(--text-tertiary)" }}>
            <span>{bulletin.date}</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              <span className="font-mono-metric">{bulletin.readTime}</span> min
            </span>
            <span className="font-mono-metric" style={{ opacity: 0.6 }}>{bulletin.number}</span>
          </div>
        </div>

        {/* Arrow / Lock */}
        <div className="shrink-0 mt-1">
          {bulletin.available ? (
            <ChevronRight size={20} style={{ color: "var(--text-tertiary)" }} />
          ) : (
            <Lock size={18} style={{ color: "var(--text-tertiary)", opacity: 0.5 }} />
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Paywall modal                                                      */
/* ------------------------------------------------------------------ */

function PaywallModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full p-7 z-10"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-default)",
              borderRadius: "20px",
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 transition-colors"
              style={{ color: "var(--text-tertiary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
            >
              <X size={20} />
            </button>

            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
              style={{ backgroundColor: "var(--ds-blue-glow)", color: "var(--ds-blue)" }}
            >
              <Lock size={28} />
            </div>

            <h3
              className="font-display text-2xl font-normal"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
            >
              Exclusivo para assinantes do Radar OPME
            </h3>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Assine para ter acesso a todo o conteúdo de inteligência e ferramentas da plataforma.
            </p>

            <ul className="mt-5 space-y-2.5">
              {[
                "Boletins semanais com análises de mercado exclusivas",
                "Dashboard de Preços OPME com dados atualizados",
                "Checklists e templates para auditoria e compliance",
                "Comunidade de profissionais OPME-DMI",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-primary)" }}>
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "var(--ds-blue)" }} />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2.5">
              <Link
                to="/assinar"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm text-sm font-semibold text-white transition-all"
                style={{
                  backgroundColor: "var(--ds-magenta)",
                  boxShadow: "0 0 20px var(--ds-magenta-glow)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta-light)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta)"; }}
              >
                Assinar o Radar OPME
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/"
                className="flex items-center justify-center w-full py-2.5 rounded-sm text-sm font-medium transition-colors"
                style={{
                  color: "var(--ds-blue)",
                  border: "1px solid rgba(5, 89, 181, 0.3)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(5, 89, 181, 0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                Conhecer a plataforma
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar cards                                                      */
/* ------------------------------------------------------------------ */

function ExpertCard() {
  return (
    <div
      className="rounded-lg p-5"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={deboraPhoto}
          alt="Débora Soares — Especialista OPME-DMI"
          className="w-12 h-12 rounded-full object-cover shrink-0"
          style={{ border: "1px solid var(--border-default)" }}
        />
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Débora Soares</p>
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Editora-chefe</p>
        </div>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        Mestre PUC-PR &bull; Vice-Presidente ABEA &bull; Membro GTE-OPME/ANS &bull; 30+ anos em OPME-DMI
      </p>
    </div>
  );
}

function SubscribeCTACard() {
  return (
    <div
      className="rounded-lg p-5"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--ds-blue)",
        boxShadow: "0 0 30px var(--ds-blue-glow)",
      }}
    >
      <Sparkles size={20} className="mb-3" style={{ color: "var(--ds-blue)" }} />
      <p className="text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
        Acesse todos os boletins + radar de preços + ferramentas
      </p>
      <Link
        to="/assinar"
        className="flex items-center justify-center gap-1.5 mt-4 w-full py-2 rounded-sm text-sm font-semibold text-white transition-all"
        style={{
          backgroundColor: "var(--ds-magenta)",
          boxShadow: "0 0 16px var(--ds-magenta-glow)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta-light)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta)"; }}
      >
        Ver planos de fundador
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function CommunityCard() {
  return (
    <div
      className="rounded-lg p-5"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <MessageCircle size={18} style={{ color: "var(--ds-blue)" }} />
        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Comunidade Radar OPME</p>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        Discussões técnicas, alertas regulatórios e networking no WhatsApp com profissionais OPME-DMI.
      </p>
      <button
        className="mt-3 w-full text-center text-xs font-medium py-2 rounded-sm transition-colors"
        style={{
          color: "var(--text-secondary)",
          border: "1px solid var(--border-default)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--ds-blue)";
          e.currentTarget.style.color = "var(--ds-blue)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border-default)";
          e.currentTarget.style.color = "var(--text-secondary)";
        }}
      >
        Saiba mais
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IntelligenceFeed() {
  const [activeTab, setActiveTab] = useState<string>("Todos");
  const [paywallOpen, setPaywallOpen] = useState(false);

  const filtered = useMemo(() => {
    if (activeTab === "Todos") return bulletins;
    return bulletins.filter((b) => b.tag === activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h2
              className="font-display text-4xl md:text-[40px] font-normal"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              Boletins de Inteligência
            </h2>
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium"
              style={{ backgroundColor: "rgba(5, 89, 181, 0.1)", color: "var(--ds-blue)" }}
            >
              <BookOpen size={11} className="mr-1.5" />
              por Débora Soares — DS Treinamentos
            </span>
          </div>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Análise semanal exclusiva sobre regulação, dados e tendências do mercado OPME-DMI
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterTabs.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3.5 py-1.5 rounded-sm text-sm font-medium transition-all duration-150"
                style={{
                  backgroundColor: active ? "rgba(5, 89, 181, 0.15)" : "transparent",
                  color: active ? "var(--ds-blue)" : "var(--text-secondary)",
                  border: active ? "1px solid rgba(5, 89, 181, 0.3)" : "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Main layout: feed + sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Feed */}
          <div className="flex-1 min-w-0 space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((b, i) => (
                <motion.div
                  key={b.id}
                  transition={{ delay: i * 0.05 }}
                >
                  <BulletinCard
                    bulletin={b}
                    onLockedClick={() => setPaywallOpen(true)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-16" style={{ color: "var(--text-tertiary)" }}>
                <BookOpen size={32} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">Nenhum boletim nesta categoria ainda.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-20 space-y-4">
              <ExpertCard />
              <SubscribeCTACard />
              <CommunityCard />
            </div>
          </aside>
        </div>
      </div>

      {/* Paywall modal */}
      <PaywallModal open={paywallOpen} onClose={() => setPaywallOpen(false)} />
    </div>
  );
}
