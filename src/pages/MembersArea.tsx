import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Award, ChevronDown, PlayCircle, Lock,
  CheckCircle2, Circle, Clock,
} from "lucide-react";
import deboraPhoto from "@/assets/debora-soares.jpg";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  type: "video";
}

interface Module {
  id: number;
  title: string;
  description: string;
  status: "available" | "coming_soon" | "locked";
  expectedDate?: string;
  lessons: Lesson[];
}

const MODULES: Module[] = [
  {
    id: 1, title: "Boas-vindas", description: "Conheça o Radar OPME e aprenda a navegar pela plataforma", status: "available",
    lessons: [
      { id: "1.1", title: "Bem-vindo ao Radar OPME", description: "Apresentação da plataforma, funcionalidades principais e como aproveitar ao máximo sua assinatura.", duration: "8 min", completed: false, type: "video" },
      { id: "1.2", title: "Como usar o Radar de Preços", description: "Tutorial completo do dashboard interativo de preços OPME com dados de referência ANS.", duration: "12 min", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "Fundamentos de Auditoria OPME", description: "Base teórica e prática para auditoria de dispositivos médicos implantáveis", status: "coming_soon", expectedDate: "Maio 2026",
    lessons: [
      { id: "2.1", title: "O que é OPME e por que auditar", description: "Conceitos fundamentais, legislação vigente e a importância da auditoria.", duration: "15 min", completed: false, type: "video" },
      { id: "2.2", title: "Classificação de dispositivos médicos", description: "Classes de risco ANVISA, categorias OPME e como isso impacta a auditoria.", duration: "18 min", completed: false, type: "video" },
      { id: "2.3", title: "Tabelas de referência: SIMPRO, Brasíndice e ANS", description: "Como funcionam, como interpretar e como usar na prática de auditoria.", duration: "20 min", completed: false, type: "video" },
      { id: "2.4", title: "Fluxo de auditoria passo a passo", description: "Do recebimento da conta médica à emissão do parecer técnico.", duration: "22 min", completed: false, type: "video" },
    ],
  },
  { id: 3, title: "Análise de Preços e Negociação", description: "Técnicas avançadas para análise de variação de preços e negociação com fornecedores", status: "coming_soon", expectedDate: "Junho 2026", lessons: [] },
  { id: 4, title: "Compliance e Regulamentação", description: "RDC 665/2022, RN 566 e outras normativas essenciais para o profissional de OPME", status: "coming_soon", expectedDate: "Julho 2026", lessons: [] },
  { id: 5, title: "Rastreabilidade e UDI", description: "Sistema UDI, rastreabilidade de implantes e boas práticas de controle", status: "locked", lessons: [] },
  { id: 6, title: "Qualificação de Fornecedores", description: "Como avaliar, qualificar e monitorar fornecedores de OPME-DMI", status: "locked", lessons: [] },
  { id: 7, title: "Casos Práticos e Estudos de Caso", description: "Análise de cenários reais de auditoria com resolução guiada pela expert", status: "locked", lessons: [] },
  { id: 8, title: "Sessões ao Vivo — Gravações", description: "Arquivo das sessões ao vivo da comunidade Radar OPME", status: "coming_soon", expectedDate: "Após o congresso", lessons: [] },
];

const STORAGE_KEY = "radar-opme-member-progress";

function loadProgress(): string[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw).completedLessons || [] : []; }
  catch { return []; }
}
function saveProgress(completed: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ completedLessons: completed }));
}

const badgeStyles: Record<string, string> = {
  available: "rgba(5,89,181,0.1)",
  coming_soon: "rgba(245,158,11,0.1)",
  locked: "var(--bg-tertiary)",
  completed: "rgba(16,185,129,0.1)",
};
const badgeTextStyles: Record<string, string> = {
  available: "var(--ds-blue)",
  coming_soon: "#D97706",
  locked: "var(--text-tertiary)",
  completed: "#059669",
};

const cardSpring = { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 };

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MembersArea() {
  const [completed, setCompleted] = useState<string[]>(loadProgress);
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  useEffect(() => { saveProgress(completed); }, [completed]);

  const toggleLesson = useCallback((id: string) => {
    setCompleted((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }, []);

  const totalAvailable = useMemo(() => MODULES.filter((m) => m.status === "available").flatMap((m) => m.lessons).length, []);
  const completedCount = useMemo(() => MODULES.filter((m) => m.status === "available").flatMap((m) => m.lessons).filter((l) => completed.includes(l.id)).length, [completed]);
  const progressPct = totalAvailable > 0 ? Math.round((completedCount / totalAvailable) * 100) : 0;
  const completedModules = useMemo(() => MODULES.filter((m) => m.status === "available" && m.lessons.length > 0 && m.lessons.every((l) => completed.includes(l.id))).length, [completed]);

  return (
    <div className="p-6 lg:p-8" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--ds-blue-glow)", color: "var(--ds-blue)" }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Área de Membros</h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Graduação em Auditoria de OPME-DMI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src={deboraPhoto} alt="Débora Soares" className="w-6 h-6 rounded-full object-cover" />
          <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>por Débora Soares</span>
        </div>

        {/* Progress cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={cardSpring}
            className="rounded-lg p-5" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>Progresso geral</p>
            <div className="h-2 rounded-full overflow-hidden mb-2" style={{ backgroundColor: "var(--bg-tertiary)" }}>
              <motion.div className="h-full rounded-full" style={{ backgroundColor: "var(--ds-blue)" }} initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 0.6 }} />
            </div>
            <div className="flex justify-between text-xs">
              <span style={{ color: "var(--text-tertiary)" }}>{completedModules} de {MODULES.filter((m) => m.status === "available").length} módulos</span>
              <span className="font-mono-metric font-medium" style={{ color: "var(--ds-blue)" }}>{progressPct}%</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...cardSpring, delay: 0.08 }}
            className="rounded-lg p-5" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Award size={18} style={{ color: "var(--text-tertiary)" }} />
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Certificado de conclusão</p>
            </div>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Disponível ao finalizar todos os módulos</p>
            <span className="inline-block mt-2 text-[11px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#D97706" }}>Em breve</span>
          </motion.div>
        </div>

        {/* Modules */}
        <div className="space-y-3">
          {MODULES.map((mod, idx) => {
            const isExpanded = expandedModule === mod.id;
            const isAvailable = mod.status === "available";
            const isLocked = mod.status === "locked";
            const modCompleted = isAvailable && mod.lessons.length > 0 && mod.lessons.every((l) => completed.includes(l.id));
            const modLessonsDone = mod.lessons.filter((l) => completed.includes(l.id)).length;
            const statusKey = modCompleted ? "completed" : mod.status;

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...cardSpring, delay: idx * 0.05 }}
                className="rounded-lg overflow-hidden"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                  opacity: isLocked ? 0.4 : mod.status === "coming_soon" ? 0.6 : 1,
                }}
              >
                {/* Module header */}
                <button
                  className="w-full flex items-center gap-3 p-4 text-left transition-colors"
                  onClick={() => isAvailable && mod.lessons.length > 0 ? setExpandedModule(isExpanded ? null : mod.id) : undefined}
                  style={{ cursor: isAvailable && mod.lessons.length > 0 ? "pointer" : "default" }}
                  onMouseEnter={(e) => { if (isAvailable) e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  disabled={!isAvailable || mod.lessons.length === 0}
                >
                  <span className="font-mono-metric text-xs font-medium w-6 text-center" style={{ color: "var(--text-tertiary)" }}>{mod.id}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{mod.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>{mod.description}</p>
                    {mod.expectedDate && <p className="text-[11px] mt-1" style={{ color: "var(--text-tertiary)" }}>Previsão: {mod.expectedDate}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isLocked && <Lock size={15} style={{ color: "var(--text-tertiary)" }} />}
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: badgeStyles[statusKey], color: badgeTextStyles[statusKey] }}>
                      {modCompleted ? "Concluído" : mod.status === "coming_soon" ? "Em breve" : mod.status === "locked" ? "Bloqueado" : `${modLessonsDone}/${mod.lessons.length}`}
                    </span>
                    {isAvailable && mod.lessons.length > 0 && (
                      <ChevronDown size={16} className="transition-transform duration-200" style={{ color: "var(--text-tertiary)", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }} />
                    )}
                  </div>
                </button>

                {/* Lessons */}
                <AnimatePresence>
                  {isExpanded && isAvailable && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      className="overflow-hidden"
                    >
                      <div style={{ borderTop: "1px solid var(--border-default)" }}>
                        {mod.lessons.map((lesson) => {
                          const isDone = completed.includes(lesson.id);
                          const isActive = activeLesson === lesson.id;
                          return (
                            <div key={lesson.id}>
                              <div
                                className="flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer"
                                style={{ backgroundColor: isActive ? "var(--bg-tertiary)" : "transparent", borderBottom: "1px solid var(--border-default)" }}
                                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; }}
                                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
                                onClick={() => setActiveLesson(isActive ? null : lesson.id)}
                              >
                                <PlayCircle size={18} className="mt-0.5 shrink-0" style={{ color: isActive ? "var(--ds-blue)" : "var(--text-tertiary)" }} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{lesson.title}</p>
                                  <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>{lesson.description}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Clock size={11} style={{ color: "var(--text-tertiary)" }} />
                                    <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>{lesson.duration}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={(e) => { e.stopPropagation(); toggleLesson(lesson.id); }}
                                  className="shrink-0 mt-0.5"
                                  aria-label={isDone ? "Marcar como pendente" : "Marcar como concluída"}
                                >
                                  {isDone ? (
                                    <CheckCircle2 size={20} style={{ color: "var(--success)" }} />
                                  ) : (
                                    <Circle size={20} style={{ color: "var(--text-tertiary)" }} />
                                  )}
                                </button>
                              </div>

                              {/* Video placeholder */}
                              <AnimatePresence>
                                {isActive && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-4 pb-4">
                                      <div className="aspect-video rounded-lg flex flex-col items-center justify-center gap-3" style={{ backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-default)" }}>
                                        <PlayCircle size={48} style={{ color: "var(--text-tertiary)", opacity: 0.4 }} />
                                        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Vídeo em preparação</p>
                                        <p className="text-xs" style={{ color: "var(--text-tertiary)", opacity: 0.6 }}>A expert está gravando este conteúdo</p>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
