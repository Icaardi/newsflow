import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck, Shield, UserCheck, ChevronDown, RotateCcw,
  FileText, BarChart2, Search, Table2, BookOpen, ListChecks, Map,
  CheckCircle2, Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface ChecklistItem {
  id: string;
  label: string;
}

interface ChecklistCategory {
  title: string;
  items: ChecklistItem[];
}

interface Checklist {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  categories: ChecklistCategory[];
}

const checklists: Checklist[] = [
  {
    id: "auditoria-precos",
    icon: ClipboardCheck,
    title: "Auditoria de Preços OPME",
    description: "Roteiro completo para auditar preços de dispositivos médicos em processos de compra hospitalar",
    categories: [
      {
        title: "Verificação de Referência de Preço",
        items: [
          { id: "ap-1", label: "Consultar SIMPRO/Brasíndice para referência de preço de mercado" },
          { id: "ap-2", label: "Comparar com tabela ANS de preços máximos (quando disponível)" },
          { id: "ap-3", label: "Verificar histórico de compras anteriores do mesmo item" },
          { id: "ap-4", label: "Consultar preços praticados em pelo menos 3 fornecedores" },
          { id: "ap-5", label: "Documentar justificativa técnica para preços acima da referência" },
        ],
      },
      {
        title: "Documentação Regulatória",
        items: [
          { id: "ap-6", label: "Confirmar registro ANVISA válido e vigente do produto" },
          { id: "ap-7", label: "Verificar se a classe de risco está correta (I, II, III ou IV)" },
          { id: "ap-8", label: "Checar se o produto possui Certificado de Boas Práticas de Fabricação" },
          { id: "ap-9", label: "Confirmar rastreabilidade: lote, validade, número de série" },
          { id: "ap-10", label: "Verificar se a nota fiscal discrimina corretamente o código ANVISA" },
        ],
      },
      {
        title: "Análise de Fornecedor",
        items: [
          { id: "ap-11", label: "Confirmar que o fornecedor possui AFE válida" },
          { id: "ap-12", label: "Verificar situação fiscal e cadastral (CNPJ ativo, certidões negativas)" },
          { id: "ap-13", label: "Avaliar histórico de entregas e qualidade do fornecedor" },
          { id: "ap-14", label: "Checar se há vínculo societário entre fornecedor e solicitante médico" },
          { id: "ap-15", label: "Documentar processo de seleção do fornecedor" },
        ],
      },
      {
        title: "Conformidade do Processo",
        items: [
          { id: "ap-16", label: "Verificar se há justificativa clínica para o dispositivo específico solicitado" },
          { id: "ap-17", label: "Confirmar que não há alternativa terapêutica mais custo-efetiva" },
          { id: "ap-18", label: "Checar se a solicitação segue o protocolo institucional de OPME" },
          { id: "ap-19", label: "Verificar se houve aprovação da comissão de padronização (quando aplicável)" },
          { id: "ap-20", label: "Documentar todo o fluxo de aprovação com responsáveis e datas" },
        ],
      },
    ],
  },
  {
    id: "compliance-rdc665",
    icon: Shield,
    title: "Compliance RDC 665/2022",
    description: "Conformidade com Boas Práticas de Gerenciamento de Dispositivos Médicos (ANVISA)",
    categories: [
      {
        title: "Recebimento e Inspeção",
        items: [
          { id: "rc-1", label: "Verificar integridade da embalagem primária e secundária" },
          { id: "rc-2", label: "Conferir dados da rotulagem: nome, fabricante, lote, validade, registro ANVISA" },
          { id: "rc-3", label: "Confirmar que o produto recebido corresponde ao pedido de compra" },
          { id: "rc-4", label: "Registrar temperatura de recebimento (para produtos termossensíveis)" },
          { id: "rc-5", label: "Armazenar documentação de rastreabilidade do recebimento" },
        ],
      },
      {
        title: "Armazenamento",
        items: [
          { id: "rc-6", label: "Garantir condições ambientais conforme especificação do fabricante" },
          { id: "rc-7", label: "Implementar sistema PVPS (Primeiro que Vence, Primeiro que Sai)" },
          { id: "rc-8", label: "Manter área de quarentena para produtos com não-conformidade" },
          { id: "rc-9", label: "Realizar inventário periódico e documentado" },
          { id: "rc-10", label: "Segregar produtos por classe de risco quando necessário" },
        ],
      },
      {
        title: "Rastreabilidade",
        items: [
          { id: "rc-11", label: "Registrar: paciente, profissional, produto (lote/série), data e procedimento" },
          { id: "rc-12", label: "Garantir rastreabilidade bidirecional (do paciente ao fabricante e vice-versa)" },
          { id: "rc-13", label: "Manter registros por prazo mínimo de 5 anos (ou vida útil do produto + 2 anos)" },
          { id: "rc-14", label: "Implementar sistema de notificação de tecnovigilância" },
          { id: "rc-15", label: "Documentar recall e ações corretivas quando aplicável" },
        ],
      },
    ],
  },
  {
    id: "qualificacao-fornecedor",
    icon: UserCheck,
    title: "Qualificação de Fornecedor OPME",
    description: "Qualificação e avaliação periódica de fornecedores de dispositivos médicos",
    categories: [
      {
        title: "Documentação Legal",
        items: [
          { id: "qf-1", label: "AFE (Autorização de Funcionamento da Empresa) vigente na ANVISA" },
          { id: "qf-2", label: "Alvará sanitário municipal/estadual válido" },
          { id: "qf-3", label: "CNPJ ativo e situação cadastral regular na Receita Federal" },
          { id: "qf-4", label: "Certidão Negativa de Débitos trabalhistas, tributários e previdenciários" },
          { id: "qf-5", label: "Contrato social atualizado com objeto social compatível" },
        ],
      },
      {
        title: "Capacidade Técnica",
        items: [
          { id: "qf-6", label: "Responsável técnico habilitado e registrado no conselho de classe" },
          { id: "qf-7", label: "CBPF (Certificado de Boas Práticas de Fabricação) para fabricantes nacionais" },
          { id: "qf-8", label: "Certificado de Boas Práticas de Distribuição e Armazenamento" },
          { id: "qf-9", label: "Registro ou cadastro vigente na ANVISA para todos os produtos comercializados" },
          { id: "qf-10", label: "Manual de Boas Práticas disponível e implementado" },
        ],
      },
      {
        title: "Avaliação de Desempenho",
        items: [
          { id: "qf-11", label: "Pontualidade nas entregas (meta: \u226595% dentro do prazo)" },
          { id: "qf-12", label: "Conformidade dos produtos entregues (meta: \u226599%)" },
          { id: "qf-13", label: "Tempo de resposta para solicitações e reclamações" },
          { id: "qf-14", label: "Disponibilidade de assessoria técnica e treinamento" },
          { id: "qf-15", label: "Política de troca e devolução clara e documentada" },
        ],
      },
    ],
  },
];

const templates = [
  { title: "Modelo de Parecer Técnico de OPME", icon: FileText },
  { title: "Relatório de Benchmark de Preços", icon: BarChart2 },
  { title: "Protocolo de Rastreabilidade", icon: Search },
  { title: "Matriz de Avaliação de Fornecedores", icon: Table2 },
];

const guides = [
  { title: "RDC 665/2022 — Resumo Executivo", icon: BookOpen },
  { title: "Fluxo de Auditoria OPME — Passo a Passo", icon: ListChecks },
  { title: "Glossário de Termos OPME-DMI", icon: Map },
];

/* ------------------------------------------------------------------ */
/*  localStorage hooks                                                 */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "radar-opme-checklists";

function loadCheckedState(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCheckedState(state: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ------------------------------------------------------------------ */
/*  Checkbox component                                                 */
/* ------------------------------------------------------------------ */

function CheckItem({ id, label, checked, onChange }: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string, value: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-3 py-2.5 px-1 rounded-lg cursor-pointer hover:bg-[#F8FAFB] transition-colors group"
    >
      <div className="relative mt-0.5 shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(id, e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-5 h-5 rounded-md border-2 border-[#E5E7EB] peer-checked:border-[#00C2A8] peer-checked:bg-[#00C2A8] transition-all duration-200 flex items-center justify-center group-hover:border-[#00C2A8]/50">
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            initial={false}
            animate={{ pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.path
              d="M2 6L5 9L10 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: checked ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.svg>
        </div>
      </div>
      <span className={`text-sm leading-relaxed transition-colors duration-200 ${
        checked ? "text-[#6B7280] line-through" : "text-[#1A1A2E]"
      }`}>
        {label}
      </span>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress bar                                                       */
/* ------------------------------------------------------------------ */

function ProgressBar({ checked, total }: { checked: number; total: number }) {
  const pct = total === 0 ? 0 : (checked / total) * 100;
  const isComplete = checked === total && total > 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: isComplete ? "#10B981" : "#00C2A8" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <span className="font-mono-metric text-xs text-[#6B7280] shrink-0 w-12 text-right">
        {checked}/{total}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Checklist card                                                     */
/* ------------------------------------------------------------------ */

function ChecklistCard({ checklist, checkedState, onToggle, onReset }: {
  checklist: Checklist;
  checkedState: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
  onReset: (checklistId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const allItems = useMemo(
    () => checklist.categories.flatMap((c) => c.items),
    [checklist],
  );
  const checkedCount = allItems.filter((item) => checkedState[item.id]).length;
  const total = allItems.length;
  const isComplete = checkedCount === total;

  const Icon = checklist.icon;

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
      return;
    }
    onReset(checklist.id);
    setConfirmReset(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-[#E5E7EB] shadow-card hover:shadow-card-hover transition-shadow duration-200"
    >
      {/* Collapsed header */}
      <div
        className="p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-lg bg-[#E6FAF7] flex items-center justify-center shrink-0">
            <Icon size={22} className="text-[#00C2A8]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-semibold text-[#1A1A2E]">{checklist.title}</h3>
              {isComplete && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 border text-[11px]">
                    <CheckCircle2 size={11} className="mr-1" />
                    Completo!
                  </Badge>
                </motion.div>
              )}
            </div>
            <p className="text-sm text-[#6B7280] mt-0.5">{checklist.description}</p>
            <div className="mt-3">
              <ProgressBar checked={checkedCount} total={total} />
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 mt-1"
          >
            <ChevronDown size={20} className="text-[#6B7280]" />
          </motion.div>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5">
              <div className="border-t border-[#E5E7EB]" />

              {checklist.categories.map((category, catIdx) => (
                <div key={category.title}>
                  {catIdx > 0 && <div className="border-t border-[#E5E7EB] mb-4" />}
                  <h4 className="text-sm font-semibold text-[#0F2B3C] mb-2">{category.title}</h4>
                  <div className="space-y-0.5">
                    {category.items.map((item) => (
                      <CheckItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        checked={!!checkedState[item.id]}
                        onChange={onToggle}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); handleReset(); }}
                  className={`text-xs ${confirmReset ? "text-red-600 hover:text-red-700 hover:bg-red-50" : "text-[#6B7280] hover:text-[#1A1A2E]"}`}
                >
                  <RotateCcw size={13} className="mr-1.5" />
                  {confirmReset ? "Confirmar reset?" : "Resetar"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Coming-soon card                                                   */
/* ------------------------------------------------------------------ */

function ComingSoonCard({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 opacity-60 cursor-default select-none">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
          <Icon size={18} className="text-[#6B7280]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#1A1A2E]">{title}</p>
          <Badge className="mt-1.5 text-[10px] bg-gray-100 text-[#6B7280] border-transparent">
            Em breve
          </Badge>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ToolsLibrary() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(loadCheckedState);

  useEffect(() => {
    saveCheckedState(checkedState);
  }, [checkedState]);

  const handleToggle = useCallback((id: string, value: boolean) => {
    setCheckedState((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleReset = useCallback((checklistId: string) => {
    const cl = checklists.find((c) => c.id === checklistId);
    if (!cl) return;
    const ids = cl.categories.flatMap((c) => c.items.map((i) => i.id));
    setCheckedState((prev) => {
      const next = { ...prev };
      for (const id of ids) delete next[id];
      return next;
    });
  }, []);

  return (
    <div className="bg-[#F8FAFB] min-h-screen">
      <div className="max-w-5xl mx-auto px-5 py-8 space-y-10">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2E]">Ferramentas e Recursos</h2>
          <p className="text-[#6B7280] mt-1">
            Checklists, templates e guias práticos para profissionais de OPME-DMI
          </p>
        </div>

        {/* Checklists section */}
        <section>
          <div className="flex items-center gap-2.5 mb-4">
            <Sparkles size={18} className="text-[#00C2A8]" />
            <h3 className="text-lg font-semibold text-[#1A1A2E]">Checklists Interativos</h3>
          </div>
          <div className="space-y-4">
            {checklists.map((cl, i) => (
              <motion.div
                key={cl.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <ChecklistCard
                  checklist={cl}
                  checkedState={checkedState}
                  onToggle={handleToggle}
                  onReset={handleReset}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Templates section */}
        <section>
          <h3 className="text-lg font-semibold text-[#1A1A2E] mb-4">Templates e Documentos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {templates.map((t) => (
              <ComingSoonCard key={t.title} title={t.title} icon={t.icon} />
            ))}
          </div>
        </section>

        {/* Guides section */}
        <section>
          <h3 className="text-lg font-semibold text-[#1A1A2E] mb-4">Guias Regulatórios</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {guides.map((g) => (
              <ComingSoonCard key={g.title} title={g.title} icon={g.icon} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
