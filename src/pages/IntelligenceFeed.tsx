import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Clock, ChevronRight, User, MessageCircle,
  X, CheckCircle2, Sparkles, ArrowRight, BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Bulletin {
  id: string;
  number: string;
  tag: string;
  tagColor: string;
  title: string;
  date: string;
  preview: string;
  readTime: number;
  available: boolean;
}

const bulletins: Bulletin[] = [
  {
    id: "001",
    number: "#001",
    tag: "Regulação",
    tagColor: "#3B82F6",
    title: "RDC 665/2022: O que muda na prática para gestores hospitalares",
    date: "16 de abril de 2026",
    preview: "A nova resolução da ANVISA redefine os requisitos de gerenciamento de dispositivos médicos. Veja o que você precisa adaptar imediatamente.",
    readTime: 8,
    available: true,
  },
  {
    id: "002",
    number: "#002",
    tag: "Dados de Mercado",
    tagColor: "#10B981",
    title: "Stents coronários: por que o mesmo dispositivo custa 478% mais caro",
    date: "23 de abril de 2026",
    preview: "Analisamos dados da ANS e identificamos os fatores que explicam a variação brutal de preços. Três ações para sua próxima negociação.",
    readTime: 10,
    available: false,
  },
  {
    id: "003",
    number: "#003",
    tag: "Auditoria",
    tagColor: "#F59E0B",
    title: "Os 5 erros mais comuns em auditorias de OPME (e como evitá-los)",
    date: "30 de abril de 2026",
    preview: "Auditamos mais de 200 processos de compra de OPME no último ano. Estes são os erros que aparecem em 73% dos casos.",
    readTime: 7,
    available: false,
  },
  {
    id: "004",
    number: "#004",
    tag: "Tendências",
    tagColor: "#8B5CF6",
    title: "Rastreabilidade digital de DMI: o que o Brasil pode aprender com o modelo europeu",
    date: "7 de maio de 2026",
    preview: "A UDI (Unique Device Identification) já é obrigatória na Europa. Como o Brasil está se preparando e o que muda para sua instituição.",
    readTime: 9,
    available: false,
  },
];

const filterTabs = ["Todos", "Regulação", "Dados de Mercado", "Auditoria", "Tendências"] as const;

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
      onClick={handleClick}
      className="group bg-white rounded-xl border border-[#E5E7EB] shadow-card p-5 cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Tag + status row */}
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white"
              style={{ backgroundColor: bulletin.tagColor }}
            >
              {bulletin.tag}
            </span>
            {bulletin.available ? (
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 border text-[11px]">
                <CheckCircle2 size={10} className="mr-1" />
                Disponível
              </Badge>
            ) : (
              <Badge className="bg-[#E6FAF7] text-[#0F2B3C] border-[#00C2A8]/20 border text-[11px]">
                <Lock size={10} className="mr-1" />
                Exclusivo para assinantes
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[17px] font-semibold text-[#1A1A2E] leading-snug group-hover:text-[#0F2B3C] transition-colors">
            {bulletin.title}
          </h3>

          {/* Preview */}
          <p className="text-sm text-[#6B7280] mt-2 leading-relaxed line-clamp-2">
            {bulletin.preview}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4 mt-3 text-xs text-[#6B7280]">
            <span>{bulletin.date}</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {bulletin.readTime} min de leitura
            </span>
            <span className="font-mono-metric text-[#6B7280]/60">{bulletin.number}</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="shrink-0 mt-1">
          {bulletin.available ? (
            <ChevronRight size={20} className="text-[#6B7280] group-hover:text-[#00C2A8] transition-colors" />
          ) : (
            <Lock size={18} className="text-[#6B7280]/40" />
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
          <div className="absolute inset-0 bg-[#0F2B3C]/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-7 z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#6B7280] hover:text-[#1A1A2E] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="w-12 h-12 rounded-xl bg-[#E6FAF7] flex items-center justify-center mb-5">
              <Lock size={22} className="text-[#00C2A8]" />
            </div>

            <h3 className="text-xl font-bold text-[#1A1A2E]">
              Este boletim é exclusivo para assinantes do Radar OPME
            </h3>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
              Assine para ter acesso a todo o conteúdo de inteligência e ferramentas da plataforma.
            </p>

            <ul className="mt-5 space-y-2.5">
              {[
                "Boletins semanais com análises de mercado exclusivas",
                "Dashboard de Preços OPME com dados atualizados",
                "Checklists e templates para auditoria e compliance",
                "Comunidade de profissionais OPME-DMI",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm text-[#1A1A2E]">
                  <CheckCircle2 size={16} className="text-[#00C2A8] mt-0.5 shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2.5">
              <Button asChild className="w-full bg-[#00C2A8] hover:bg-[#00A892] text-white">
                <Link to="/assinar">
                  Assinar o Radar OPME
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button variant="ghost" asChild className="w-full text-[#6B7280] hover:text-[#1A1A2E]">
                <Link to="/">Conhecer a plataforma</Link>
              </Button>
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
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
          <User size={22} className="text-[#6B7280]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A1A2E]">Débora Soares</p>
          <p className="text-xs text-[#6B7280]">Editora-chefe</p>
        </div>
      </div>
      <p className="text-xs text-[#6B7280] leading-relaxed">
        Mestre PUC-PR &bull; Vice-Presidente ABEA &bull; Membro GTE-OPME/ANS &bull; 30+ anos em OPME-DMI
      </p>
    </div>
  );
}

function SubscribeCTACard() {
  return (
    <div className="bg-[#0F2B3C] rounded-xl p-5 text-white">
      <Sparkles size={20} className="text-[#00C2A8] mb-3" />
      <p className="text-sm font-semibold leading-snug">
        Acesse todos os boletins + radar de preços + ferramentas
      </p>
      <Button asChild size="sm" className="mt-4 w-full bg-[#00C2A8] hover:bg-[#00A892] text-white">
        <Link to="/assinar">
          Ver planos de fundador
          <ArrowRight size={14} className="ml-1.5" />
        </Link>
      </Button>
    </div>
  );
}

function CommunityCard() {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-card p-5">
      <div className="flex items-center gap-2.5 mb-2">
        <MessageCircle size={18} className="text-[#00C2A8]" />
        <p className="text-sm font-semibold text-[#1A1A2E]">Comunidade Radar OPME</p>
      </div>
      <p className="text-xs text-[#6B7280] leading-relaxed">
        Discussões técnicas, alertas regulatórios e networking no WhatsApp com profissionais OPME-DMI.
      </p>
      <Button variant="outline" size="sm" className="mt-3 w-full text-xs text-[#6B7280] border-[#E5E7EB] hover:border-[#00C2A8] hover:text-[#0F2B3C]">
        Saiba mais
      </Button>
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
    <div className="bg-[#F8FAFB] min-h-screen">
      <div className="max-w-6xl mx-auto px-5 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-[#1A1A2E]">Boletins de Inteligência</h2>
            <Badge className="bg-[#E6FAF7] text-[#0F2B3C] border-transparent text-[11px] font-medium">
              <BookOpen size={11} className="mr-1" />
              por Débora Soares — DS Treinamentos
            </Badge>
          </div>
          <p className="text-[#6B7280]">
            Análise semanal exclusiva sobre regulação, dados e tendências do mercado OPME-DMI
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                activeTab === tab
                  ? "bg-[#0F2B3C] text-white"
                  : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#00C2A8] hover:text-[#0F2B3C]"
              }`}
            >
              {tab}
            </button>
          ))}
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
              <div className="text-center py-12 text-[#6B7280]">
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
