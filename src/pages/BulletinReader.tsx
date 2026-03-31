import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft, Clock, Lock, CheckCircle2, ArrowRight, X, Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Bulletin metadata                                                  */
/* ------------------------------------------------------------------ */

interface BulletinMeta {
  id: string;
  number: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  title: string;
  date: string;
  readTime: number;
  available: boolean;
  preview: string;
}

const bulletinsMeta: BulletinMeta[] = [
  { id: "001", number: "#001", tag: "Regulação", tagColor: "#60A5FA", tagBg: "rgba(59,130,246,0.15)", title: "RDC 665/2022: O que muda na prática para gestores hospitalares", date: "16 de abril de 2026", readTime: 8, available: true, preview: "" },
  { id: "002", number: "#002", tag: "Dados de Mercado", tagColor: "#34D399", tagBg: "rgba(16,185,129,0.15)", title: "Stents coronários: por que o mesmo dispositivo custa 478% mais caro", date: "23 de abril de 2026", readTime: 10, available: false, preview: "Analisamos dados da ANS e identificamos os fatores que explicam a variação brutal de preços." },
  { id: "003", number: "#003", tag: "Auditoria", tagColor: "#FBBF24", tagBg: "rgba(245,158,11,0.15)", title: "Os 5 erros mais comuns em auditorias de OPME (e como evitá-los)", date: "30 de abril de 2026", readTime: 7, available: false, preview: "" },
  { id: "004", number: "#004", tag: "Tendências", tagColor: "#A78BFA", tagBg: "rgba(139,92,246,0.15)", title: "Rastreabilidade digital de DMI: o que o Brasil pode aprender com o modelo europeu", date: "7 de maio de 2026", readTime: 9, available: false, preview: "" },
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
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full p-7 z-10"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)", borderRadius: "20px" }}
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
            <h3 className="font-display text-2xl font-normal" style={{ color: "var(--text-primary)" }}>
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
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-primary)" }}>
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "var(--ds-blue)" }} />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2.5">
              <Link
                to="/assinar"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm text-sm font-semibold text-white transition-all"
                style={{ backgroundColor: "var(--ds-magenta)", boxShadow: "0 0 20px var(--ds-magenta-glow)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta-light)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta)"; }}
              >
                Assinar o Radar OPME <ArrowRight size={16} />
              </Link>
              <Link
                to="/"
                className="flex items-center justify-center w-full py-2.5 rounded-sm text-sm font-medium transition-colors"
                style={{ color: "var(--ds-blue)", border: "1px solid rgba(5, 89, 181, 0.3)" }}
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
/*  Action card                                                        */
/* ------------------------------------------------------------------ */

function ActionCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div
        className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
        style={{ backgroundColor: "var(--ds-blue-glow)" }}
      >
        <span className="font-mono-metric text-xl font-semibold" style={{ color: "var(--ds-blue)" }}>{number}</span>
      </div>
      <div>
        <p className="text-base font-medium" style={{ color: "var(--text-primary)" }}>{title}</p>
        <p className="text-[15px] leading-relaxed mt-0.5" style={{ color: "var(--text-secondary)" }}>{description}</p>
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

  const isLocked = !bulletin || !bulletin.available;

  useEffect(() => {
    if (isLocked) setPaywallOpen(true);
  }, [isLocked]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!bulletin) {
    return (
      <>
        <PaywallOverlay open={paywallOpen} onClose={() => navigate("/boletins")} />
        <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }} />
      </>
    );
  }

  if (isLocked) {
    return <PaywallOverlay open={true} onClose={() => navigate("/boletins")} />;
  }

  return (
    <>
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
        style={{ scaleX, backgroundColor: "var(--ds-blue)" }}
      />

      <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
        {/* Back button area */}
        <div style={{ borderBottom: "1px solid var(--border-default)" }}>
          <div className="max-w-[680px] mx-auto px-5 py-3">
            <Link
              to="/boletins"
              className="inline-flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: "var(--text-tertiary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
            >
              <ArrowLeft size={16} />
              Voltar aos boletins
            </Link>
          </div>
        </div>

        <article ref={articleRef} className="max-w-[680px] mx-auto px-5 pt-12 pb-24">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                style={{ backgroundColor: bulletin.tagBg, color: bulletin.tagColor }}
              >
                {bulletin.tag}
              </span>
              <span className="font-mono-metric text-[13px]" style={{ color: "var(--text-tertiary)" }}>
                {bulletin.number}
              </span>
            </div>

            <h1
              className="font-display text-[32px] sm:text-[36px] font-normal leading-tight"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
              {bulletin.title}
            </h1>

            <p className="text-sm mt-4" style={{ color: "var(--text-secondary)" }}>
              por <span className="font-medium" style={{ color: "var(--text-primary)" }}>Débora Soares</span> &bull; {bulletin.date} &bull;{" "}
              <Clock size={12} className="inline -mt-px" /> {bulletin.readTime} min de leitura
            </p>

            <div className="mt-8" style={{ borderBottom: "1px solid var(--border-default)" }} />
          </header>

          {/* Body */}
          <div className="space-y-6" style={{ fontSize: "17px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
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

            <h2
              className="text-[22px] font-medium !mt-12 !mb-4"
              style={{ color: "var(--text-primary)" }}
            >
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

            <h2
              className="text-[22px] font-medium !mt-12 !mb-4"
              style={{ color: "var(--text-primary)" }}
            >
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
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>15-20% em perdas</span> por vencimento e desvio.
            </p>

            <h2
              className="text-[22px] font-medium !mt-12 !mb-4"
              style={{ color: "var(--text-primary)" }}
            >
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
          <div
            className="mt-14 p-6"
            style={{
              backgroundColor: "rgba(5, 89, 181, 0.06)",
              borderLeft: "3px solid var(--ds-blue)",
              borderRadius: "0 12px 12px 0",
            }}
          >
            <h3 className="text-base font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              Ações desta edição
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "var(--ds-blue)" }} />
                Auditar processo atual com checklist de compliance RDC 665
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "var(--ds-blue)" }} />
                Mapear e verificar os 5 principais fornecedores de OPME
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "var(--ds-blue)" }} />
                Formalizar designação de responsável técnico pelo gerenciamento
              </li>
            </ul>
            <Link
              to="/ferramentas"
              className="inline-flex items-center gap-1.5 text-sm font-semibold mt-4 transition-colors"
              style={{ color: "var(--ds-blue)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ds-blue-light)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ds-blue)"; }}
            >
              Acessar checklists na Biblioteca de Ferramentas
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Next bulletin */}
          {nextBulletin && (
            <div className="mt-14 pt-8" style={{ borderTop: "1px solid var(--border-default)" }}>
              <p
                className="text-xs uppercase tracking-wider font-medium mb-3"
                style={{ color: "var(--text-tertiary)", letterSpacing: "0.08em" }}
              >
                Próximo boletim
              </p>
              <div
                onClick={() => {
                  if (nextBulletin.available) navigate(`/boletins/${nextBulletin.id}`);
                  else setPaywallOpen(true);
                }}
                className="group rounded-lg p-5 cursor-pointer transition-all duration-200"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}
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
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ backgroundColor: nextBulletin.tagBg, color: nextBulletin.tagColor }}
                      >
                        {nextBulletin.tag}
                      </span>
                      {!nextBulletin.available && (
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{ backgroundColor: "var(--ds-blue-glow)", color: "var(--ds-blue-light)" }}
                        >
                          <Lock size={9} className="mr-1" />
                          Exclusivo
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-medium transition-colors" style={{ color: "var(--text-primary)" }}>
                      {nextBulletin.title}
                    </h4>
                    {nextBulletin.preview && (
                      <p className="text-sm mt-1 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                        {nextBulletin.preview}
                      </p>
                    )}
                  </div>
                  <ArrowRight size={20} className="shrink-0 mt-1" style={{ color: "var(--text-tertiary)" }} />
                </div>
              </div>
            </div>
          )}

          {/* Subscribe CTA */}
          <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border-default)" }}>
            <div
              className="rounded-lg p-8 text-center"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid rgba(5, 89, 181, 0.2)",
              }}
            >
              <Sparkles size={24} className="mx-auto mb-3" style={{ color: "var(--ds-blue)" }} />
              <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                Acesse todos os boletins e ferramentas do Radar OPME
              </h3>
              <p className="text-sm mt-1.5" style={{ color: "var(--text-tertiary)" }}>
                Inteligência de mercado exclusiva para profissionais de OPME-DMI
              </p>
              <Link
                to="/assinar"
                className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 rounded-sm text-sm font-semibold text-white transition-all"
                style={{ backgroundColor: "var(--ds-magenta)", boxShadow: "0 0 20px var(--ds-magenta-glow)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta-light)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta)"; }}
              >
                Ver planos <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </article>
      </div>

      <PaywallOverlay open={paywallOpen} onClose={() => setPaywallOpen(false)} />
    </>
  );
}
