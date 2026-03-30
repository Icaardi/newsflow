import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUp, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_MSG: Message = {
  id: "init",
  role: "assistant",
  content: "Olá! Sou a Deb.ai — assistente inteligente treinada com mais de 30 anos de conhecimento em auditoria e regulação de dispositivos médicos de Débora Soares. Posso te ajudar com preços, compliance, auditoria, fornecedores e muito mais. Como posso ajudar?",
  timestamp: new Date(),
};

const INITIAL_CHIPS = [
  "Qual a maior variação de preço?",
  "Checklist para auditoria de stent",
  "Explique a RDC 665/2022",
  "Como negociar preço de OPME?",
];

function getResponse(text: string): { reply: string; chips: string[] } {
  const t = text.toLowerCase();

  if (/variação|preço|caro|custo|quanto custa|valor/.test(t))
    return { reply: "Com base nos dados do Radar OPME, a maior variação de preço detectada é de 1.678% na categoria de telas cirúrgicas (polipropileno para hérnia). Stents farmacológicos apresentam variação de 478% e parafusos pediculares chegam a 900%.\n\nRecomendo utilizar o Radar de Preços para consultar faixas por categoria e fundamentar suas auditorias.", chips: ["Ver Radar de Preços", "Detalhar stents coronários", "Como auditar preço alto?"] };

  if (/checklist|auditoria|auditar|verificar|conferir/.test(t))
    return { reply: "Para uma auditoria de OPME eficiente, recomendo seguir o checklist de Auditoria de Preços disponível na seção Ferramentas. Ele cobre quatro áreas:\n\n• Verificação de referência de preço (SIMPRO/Brasíndice)\n• Documentação regulatória (registro ANVISA)\n• Análise de fornecedor (AFE, certidões)\n• Conformidade do processo (justificativa clínica)\n\nAcesse Ferramentas na barra lateral para começar.", chips: ["Abrir Ferramentas", "Checklist de fornecedor", "O que é AFE?"] };

  if (/rdc|665|regulação|anvisa|resolução/.test(t))
    return { reply: "A RDC 665/2022 da ANVISA estabelece requisitos de Boas Práticas de Gerenciamento de Dispositivos Médicos. Os pontos críticos são:\n\n• Rastreabilidade completa do recebimento à implantação\n• Sistema PVPS (Primeiro que Vence, Primeiro que Sai) no armazenamento\n• Designação obrigatória de responsável técnico\n• Registros mantidos por mínimo de 5 anos\n\nO Boletim #001 tem uma análise detalhada com 3 ações práticas.", chips: ["Ler Boletim sobre RDC 665", "Checklist de compliance", "O que é PVPS?"] };

  if (/fornecedor|qualificação|afe|fabricante/.test(t))
    return { reply: "Para qualificação de fornecedor OPME, verifique:\n\n• AFE (Autorização de Funcionamento) vigente na ANVISA\n• Alvará sanitário municipal/estadual válido\n• CNPJ ativo e certidões negativas\n• CBPF para fabricantes nacionais\n• Responsável técnico habilitado\n\nUse o checklist 'Qualificação de Fornecedor OPME' nas Ferramentas para não esquecer nenhum item.", chips: ["Abrir checklist de fornecedor", "O que é CBPF?", "Verificar preço por fabricante"] };

  if (/negociar|negociação|compra|economia|economizar/.test(t))
    return { reply: "Estratégia de negociação de OPME baseada em dados:\n\n1. Consulte o Radar de Preços para ter a faixa de referência do mercado\n2. Sempre solicite cotação de pelo menos 3 fornecedores\n3. Documente a justificativa clínica para o dispositivo específico\n4. Verifique se não há alternativa terapêutica mais custo-efetiva\n5. Use a variação percentual como argumento — se a ANS detectou 478% de variação em stents, há margem de negociação\n\nO poder de negociação aumenta com dados.", chips: ["Ver variações por categoria", "Comparar fornecedores", "Gerar relatório de preços"] };

  if (/procedimento|cirurgia|implante|operação/.test(t))
    return { reply: "Consulte a tabela de Procedimentos e Dispositivos para ver todos os materiais utilizados em cada procedimento cirúrgico, com preços de referência e custo total estimado.\n\nPor exemplo, uma Artroplastia Total de Quadril utiliza em média 4 dispositivos com custo estimado entre R$15.000 e R$45.000 dependendo do tipo de prótese.\n\nAcesse Procedimentos na barra lateral.", chips: ["Ver procedimentos", "Custo de artrodese de coluna", "Dispositivos mais caros"] };

  if (/stent|coronário|angioplastia/.test(t))
    return { reply: "Stents coronários no mercado brasileiro:\n\n• Farmacológico (DES): R$3.200 a R$18.500 (variação 478%)\n• Convencional (BMS): R$1.100 a R$7.200 (variação 554%)\n\nO stent farmacológico tem menor taxa de reestenose mas maior custo. A justificativa clínica para uso do DES sobre o BMS deve estar documentada.\n\nConsulte o Radar de Preços para dados detalhados.", chips: ["Ver relatório de stent DES", "Diferença DES vs BMS", "Auditar compra de stent"] };

  if (/prótese|quadril|joelho/.test(t))
    return { reply: "Próteses ortopédicas no mercado brasileiro:\n\n• Quadril cimentada: R$2.800 a R$14.500 (variação 418%)\n• Quadril não-cimentada: R$5.500 a R$28.000 (variação 409%)\n• Joelho total primária: R$4.800 a R$26.000 (variação 442%)\n\nA escolha entre cimentada e não-cimentada deve estar clinicamente justificada conforme perfil do paciente (idade, atividade, qualidade óssea).", chips: ["Comparar cimentada vs não-cimentada", "Checklist para prótese", "Ver fabricantes"] };

  if (/coluna|parafuso|pedicular|artrodese/.test(t))
    return { reply: "ALERTA: Fixadores de coluna apresentam as maiores variações do mercado:\n\n• Parafuso pedicular: R$680 a R$6.800 (variação 900%)\n• Cage intervertebral PEEK: R$2.200 a R$15.000 (variação 582%)\n• Haste de fixação: R$1.100 a R$8.500 (variação 673%)\n\nUma artrodese de 2 níveis usa 4+ parafusos — a variação de preço se multiplica. Auditoria comparativa é obrigatória nesta categoria.", chips: ["Custo total de artrodese", "Auditar fixadores de coluna", "Ver fornecedores"] };

  return { reply: "Posso ajudar com diversas questões sobre OPME-DMI:\n\n• Consulta e comparação de preços de dispositivos\n• Auditoria e compliance (checklists prontos)\n• Regulação e normas (RDC 665, ANVISA)\n• Qualificação de fornecedores\n• Análise de procedimentos e custos\n• Negociação com base em dados\n\nSobre qual tema gostaria de saber mais?", chips: ["Consultar preços", "Iniciar auditoria", "Dúvida sobre regulação", "Analisar procedimento"] };
}

export default function RadarAgent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MSG]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chips, setChips] = useState<string[]>(INITIAL_CHIPS);
  const [chipsUsed, setChipsUsed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 250);
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || typing) return;
    const userMsg: Message = { id: String(Date.now()), role: "user", content: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setChipsUsed(true);
    setTyping(true);

    setTimeout(() => {
      const { reply, chips: newChips } = getResponse(text);
      const assistantMsg: Message = { id: String(Date.now() + 1), role: "assistant", content: reply, timestamp: new Date() };
      setMessages((prev) => [...prev, assistantMsg]);
      setChips(newChips);
      setTyping(false);
    }, 1500);
  }, [typing]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[51] flex flex-col w-full sm:w-[420px]"
            style={{ backgroundColor: "var(--bg-secondary)", borderLeft: "1px solid var(--border-default)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 shrink-0" style={{ borderBottom: "1px solid var(--border-default)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                  <Sparkles size={18} style={{ color: "var(--ds-magenta)" }} />
                </div>
                <div>
                  <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Deb.ai</p>
                  <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Assistente IA &bull; por Débora Soares</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-sm transition-colors"
                style={{ color: "var(--text-tertiary)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-tertiary)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-tertiary)"; }}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ scrollBehavior: "smooth" }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "items-start gap-2"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                      <Sparkles size={12} style={{ color: "var(--ds-magenta)" }} />
                    </div>
                  )}
                  <div
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{
                      maxWidth: "85%",
                      padding: "12px 16px",
                      borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                      backgroundColor: msg.role === "user" ? "var(--ds-blue)" : "var(--bg-tertiary)",
                      color: msg.role === "user" ? "#FFFFFF" : "var(--text-primary)",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Chips */}
              {!typing && chips.length > 0 && (
                <div className="flex flex-wrap gap-2 ml-8">
                  {chips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => sendMessage(chip)}
                      className="text-[13px] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                      style={{
                        backgroundColor: "rgba(5, 89, 181, 0.08)",
                        color: "var(--ds-blue)",
                        border: "1px solid rgba(5, 89, 181, 0.2)",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(5, 89, 181, 0.15)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(5, 89, 181, 0.08)"; }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {typing && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                    <Sparkles size={12} style={{ color: "var(--ds-magenta)" }} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl flex gap-1.5" style={{ backgroundColor: "var(--bg-tertiary)", borderRadius: "4px 16px 16px 16px" }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: "var(--text-tertiary)" }}
                        animate={{ scale: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 shrink-0 flex items-center gap-2" style={{ borderTop: "1px solid var(--border-default)" }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                placeholder="Pergunte sobre OPME..."
                className="flex-1 h-10 px-3.5 rounded-[10px] text-sm outline-none transition-all"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--ds-blue)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(5,89,181,0.1)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; e.currentTarget.style.boxShadow = "none"; }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || typing}
                className="w-10 h-10 flex items-center justify-center rounded-[10px] text-white transition-opacity shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: "var(--ds-blue)" }}
                aria-label="Enviar mensagem"
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
