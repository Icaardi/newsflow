import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft, Clock, Lock, CheckCircle2, ArrowRight, X, Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Bulletin metadata (shared with IntelligenceFeed)                   */
/* ------------------------------------------------------------------ */

interface BulletinMeta {
  id: string;
  number: string;
  tag: string;
  tagColor: string;
  title: string;
  date: string;
  readTime: number;
  available: boolean;
  preview: string;
}

const bulletinsMeta: BulletinMeta[] = [
  { id: "001", number: "#001", tag: "Regulação", tagColor: "#3B82F6", title: "RDC 665/2022: O que muda na prática para gestores hospitalares", date: "16 de abril de 2026", readTime: 8, available: true, preview: "" },
  { id: "002", number: "#002", tag: "Dados de Mercado", tagColor: "#10B981", title: "Stents coronários: por que o mesmo dispositivo custa 478% mais caro", date: "23 de abril de 2026", readTime: 10, available: false, preview: "Analisamos dados da ANS e identificamos os fatores que explicam a variação brutal de preços." },
  { id: "003", number: "#003", tag: "Auditoria", tagColor: "#F59E0B", title: "Os 5 erros mais comuns em auditorias de OPME (e como evitá-los)", date: "30 de abril de 2026", readTime: 7, available: false, preview: "" },
  { id: "004", number: "#004", tag: "Tendências", tagColor: "#8B5CF6", title: "Rastreabilidade digital de DMI: o que o Brasil pode aprender com o modelo europeu", date: "7 de maio de 2026", readTime: 9, available: false, preview: "" },
];

/* ------------------------------------------------------------------ */
/*  Paywall modal                                                      */
/* ------------------------------------------------------------------ */

function PaywallOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
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
          <div className="absolute inset-0 bg-[#0F2B3C]/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-7 z-10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-[#6B7280] hover:text-[#1A1A2E] transition-colors">
              <X size={20} />
            </button>
            <div className="w-12 h-12 rounded-xl bg-[#E6FAF7] flex items-center justify-center mb-5">
              <Lock size={22} className="text-[#00C2A8]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E]">Este boletim é exclusivo para assinantes do Radar OPME</h3>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">Assine para ter acesso a todo o conteúdo de inteligência e ferramentas da plataforma.</p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Boletins semanais com análises de mercado exclusivas",
                "Dashboard de Preços OPME com dados atualizados",
                "Checklists e templates para auditoria e compliance",
                "Comunidade de profissionais OPME-DMI",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-[#1A1A2E]">
                  <CheckCircle2 size={16} className="text-[#00C2A8] mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2.5">
              <Button asChild className="w-full bg-[#00C2A8] hover:bg-[#00A892] text-white">
                <Link to="/assinar">Assinar o Radar OPME<ArrowRight size={16} className="ml-2" /></Link>
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
/*  Action card                                                        */
/* ------------------------------------------------------------------ */

function ActionCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-9 h-9 rounded-lg bg-[#E6FAF7] flex items-center justify-center shrink-0">
        <span className="font-mono-metric text-sm font-bold text-[#00C2A8]">{number}</span>
      </div>
      <div>
        <p className="text-base font-semibold text-[#1A1A2E]">{title}</p>
        <p className="text-[15px] text-[#6B7280] leading-relaxed mt-0.5">{description}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BulletinReader() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const articleRef = useRef<HTMLDivElement>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);

  const bulletin = bulletinsMeta.find((b) => b.id === id);
  const currentIdx = bulletinsMeta.findIndex((b) => b.id === id);
  const nextBulletin = currentIdx >= 0 && currentIdx < bulletinsMeta.length - 1 ? bulletinsMeta[currentIdx + 1] : null;

  // If not bulletin 001, show paywall immediately
  const isLocked = !bulletin || !bulletin.available;

  useEffect(() => {
    if (isLocked) setPaywallOpen(true);
  }, [isLocked]);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!bulletin) {
    return (
      <>
        <PaywallOverlay open={paywallOpen} onClose={() => navigate("/boletins")} />
        <div className="min-h-screen bg-white" />
      </>
    );
  }

  if (isLocked) {
    return (
      <PaywallOverlay open={true} onClose={() => navigate("/boletins")} />
    );
  }

  return (
    <>
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#00C2A8] origin-left z-[60]"
        style={{ scaleX }}
      />

      <div className="min-h-screen bg-white">
        {/* Back button area */}
        <div className="bg-[#F8FAFB] border-b border-[#E5E7EB]">
          <div className="max-w-3xl mx-auto px-5 py-3">
            <Link
              to="/boletins"
              className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0F2B3C] transition-colors"
            >
              <ArrowLeft size={16} />
              Voltar aos boletins
            </Link>
          </div>
        </div>

        <article ref={articleRef} className="max-w-3xl mx-auto px-5 pt-10 pb-20">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white"
                style={{ backgroundColor: bulletin.tagColor }}
              >
                {bulletin.tag}
              </span>
              <span className="font-mono-metric text-xs text-[#6B7280]">{bulletin.number}</span>
            </div>

            <h1 className="text-[28px] sm:text-[32px] font-bold text-[#1A1A2E] leading-tight">
              {bulletin.title}
            </h1>

            <p className="text-sm text-[#6B7280] mt-4">
              por <span className="font-medium text-[#1A1A2E]">Débora Soares</span> &bull; {bulletin.date} &bull;{" "}
              <Clock size={12} className="inline -mt-px" /> {bulletin.readTime} min de leitura
            </p>

            <div className="border-b border-[#E5E7EB] mt-6" />
          </header>

          {/* Body */}
          <div className="space-y-6 text-[#1A1A2E]" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            <p>
              A Resolução da Diretoria Colegiada nº 665, publicada em março de 2022 pela ANVISA, estabeleceu
              um novo marco regulatório para o gerenciamento de dispositivos médicos em serviços de saúde no
              Brasil. Mas entre a publicação e a implementação prática, existe um abismo que poucos gestores
              estão preparados para atravessar.
            </p>

            <p>
              Neste boletim, destrinchamos os pontos críticos que exigem ação imediata e apresentamos um
              roteiro prático para adequação.
            </p>

            {/* Section 1 */}
            <h2 className="text-[22px] font-bold text-[#0F2B3C] !mt-10 !mb-4">
              O que a RDC 665 exige de fato
            </h2>

            <p>
              A resolução amplia significativamente os requisitos de rastreabilidade, exigindo registro
              completo do ciclo de vida do dispositivo: da entrada no estoque até a implantação no paciente.
              Isso inclui identificação unívoca por número de série ou lote, registro do profissional
              responsável pela implantação, e vinculação direta ao prontuário do paciente.
            </p>

            <p>
              Para serviços que ainda operam com controles manuais em planilhas, a adequação pode representar
              uma mudança de processo significativa.
            </p>

            {/* Section 2 */}
            <h2 className="text-[22px] font-bold text-[#0F2B3C] !mt-10 !mb-4">
              Impacto financeiro: o custo da não-conformidade
            </h2>

            <p>
              Instituições que não se adequarem estão sujeitas a sanções que vão desde advertência até
              interdição parcial de atividades. Mas o custo real vai além das multas: a falta de
              rastreabilidade compromete a capacidade de resposta em casos de recall, expondo a instituição
              a riscos legais e reputacionais.
            </p>

            <p>
              O investimento em sistemas de rastreabilidade tem retorno mensurável: hospitais que
              implementaram controle digital de OPME reportam redução média de{" "}
              <span className="font-semibold">15-20% em perdas</span> por vencimento e desvio.
            </p>

            {/* Section 3 */}
            <h2 className="text-[22px] font-bold text-[#0F2B3C] !mt-10 !mb-4">
              3 Ações práticas para esta semana
            </h2>

            <div className="space-y-5 !mt-6">
              <ActionCard
                number="01"
                title="Audite seu processo atual"
                description="Use o checklist de compliance RDC 665 disponível na Biblioteca de Ferramentas do Radar OPME. Identifique as lacunas entre o que você faz hoje e o que a resolução exige."
              />
              <ActionCard
                number="02"
                title="Mapeie seus fornecedores críticos"
                description="Priorize a verificação dos 5 fornecedores que representam 80% do volume de OPME da sua instituição. Use o checklist de qualificação de fornecedor."
              />
              <ActionCard
                number="03"
                title="Defina um responsável técnico"
                description="A RDC 665 exige que haja um profissional designado como responsável pelo gerenciamento de dispositivos. Se sua instituição ainda não formalizou essa designação, faça esta semana."
              />
            </div>
          </div>

          {/* Actions summary box */}
          <div className="mt-12 rounded-xl bg-[#E6FAF7] border-l-4 border-[#00C2A8] p-6">
            <h3 className="text-base font-bold text-[#0F2B3C] mb-3">Ações desta edição</h3>
            <ul className="space-y-2 text-sm text-[#1A1A2E]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#00C2A8] mt-0.5 shrink-0" />
                Auditar processo atual com checklist de compliance RDC 665
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#00C2A8] mt-0.5 shrink-0" />
                Mapear e verificar os 5 principais fornecedores de OPME
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-[#00C2A8] mt-0.5 shrink-0" />
                Formalizar designação de responsável técnico pelo gerenciamento
              </li>
            </ul>
            <Link
              to="/ferramentas"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00C2A8] hover:text-[#00A892] mt-4 transition-colors"
            >
              Acessar checklists na Biblioteca de Ferramentas
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Next bulletin */}
          {nextBulletin && (
            <div className="mt-12 border-t border-[#E5E7EB] pt-8">
              <p className="text-xs text-[#6B7280] uppercase tracking-wider font-medium mb-3">Próximo boletim</p>
              <div
                onClick={() => {
                  if (nextBulletin.available) {
                    navigate(`/boletins/${nextBulletin.id}`);
                  } else {
                    setPaywallOpen(true);
                  }
                }}
                className="group bg-white rounded-xl border border-[#E5E7EB] shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 p-5 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                        style={{ backgroundColor: nextBulletin.tagColor }}
                      >
                        {nextBulletin.tag}
                      </span>
                      {!nextBulletin.available && (
                        <Badge className="bg-[#E6FAF7] text-[#0F2B3C] border-transparent text-[10px]">
                          <Lock size={9} className="mr-1" />
                          Exclusivo
                        </Badge>
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-[#1A1A2E] group-hover:text-[#0F2B3C] transition-colors">
                      {nextBulletin.title}
                    </h4>
                    {nextBulletin.preview && (
                      <p className="text-sm text-[#6B7280] mt-1 line-clamp-2">{nextBulletin.preview}</p>
                    )}
                  </div>
                  <ArrowRight size={20} className="text-[#6B7280] group-hover:text-[#00C2A8] transition-colors shrink-0 mt-1" />
                </div>
              </div>
            </div>
          )}

          {/* Subscribe CTA */}
          <div className="mt-10 border-t border-[#E5E7EB] pt-8">
            <div className="bg-[#0F2B3C] rounded-xl p-6 text-center">
              <Sparkles size={24} className="text-[#00C2A8] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">
                Acesse todos os boletins e ferramentas do Radar OPME
              </h3>
              <p className="text-sm text-white/60 mt-1.5">
                Inteligência de mercado exclusiva para profissionais de OPME-DMI
              </p>
              <Button asChild className="mt-5 bg-[#00C2A8] hover:bg-[#00A892] text-white">
                <Link to="/assinar">
                  Ver planos
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </div>

      <PaywallOverlay open={paywallOpen} onClose={() => setPaywallOpen(false)} />
    </>
  );
}
