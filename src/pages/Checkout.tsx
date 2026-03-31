import { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  QrCode, Copy, CreditCard, Check, Loader2,
  Shield, CalendarCheck, Lock, RefreshCw, Clock,
  BarChart3, Users, ShieldCheck, ChevronDown, ChevronUp,
  AlertTriangle, Star, X, Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import deboraPhoto from "@/assets/debora-soares.jpg";
const dsLogo = "";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ── Schema ──────────────────────────────────────────────────────────────────

const checkoutSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z
    .string()
    .min(10, "WhatsApp inválido")
    .regex(/^[\d\s()+-]+$/, "Formato inválido"),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
  cardName: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

// ── Constants ───────────────────────────────────────────────────────────────

const PLANS = {
  monthly: {
    label: "Mensal",
    price: 297,
    originalPrice: 497,
    period: "/mês",
    sublabel: "Cancele quando quiser",
  },
  annual: {
    label: "Anual",
    price: 2970,
    originalPrice: 5964,
    period: "/ano",
    sublabel: "Equivale a R$ 247,50/mês",
  },
} as const;

const ANNUAL_SAVINGS = 497 * 12 - 2970; // R$ 2.994

const PIX_CODE =
  "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540297.005802BR5916DSTrainamentos6008SaoPaulo62070503***6304ABCD";

const FOUNDER_DISCOUNT = 0.4;

const BENEFITS = [
  { text: "Dashboard de preços OPME com dados de referência", special: false },
  { text: "Deb.ai — assistente inteligente 24h treinado por Débora Soares", special: true },
  { text: "Boletim semanal de inteligência por Débora Soares", special: false },
  { text: "Checklists interativos de auditoria e compliance", special: false },
  { text: "Templates profissionais prontos para uso", special: false },
  { text: "Sessão mensal ao vivo de Q&A", special: false },
  { text: "Comunidade exclusiva de WhatsApp", special: false },
  { text: "Acervo completo de boletins", special: false },
  { text: "Preço de fundador travado para sempre", special: false },
];

const TRUST_SEALS = [
  { label: "Garantia de 7 dias", icon: RefreshCw },
  { label: "Cancele quando quiser", icon: CalendarCheck },
  { label: "Pagamento seguro", icon: Shield },
  { label: "Dados protegidos", icon: Lock },
];

const TESTIMONIALS = [
  {
    name: "Dr. Ricardo Mendes",
    role: "Gestor Hospitalar \u2022 Hospital S\u00e3o Lucas",
    text: "O radar de preços me economiza horas de pesquisa por semana. Agora eu sei exatamente a faixa de mercado antes de qualquer negociação.",
  },
  {
    name: "Dra. Camila Oliveira",
    role: "Auditora de OPME \u2022 Unimed Central",
    text: "Os checklists de auditoria são ouro puro. Finalmente uma ferramenta prática e confiável para o dia a dia.",
  },
  {
    name: "Fernando Costa",
    role: "Diretor de Suprimentos \u2022 Rede D'Or",
    text: "O grupo de WhatsApp e os boletins da Débora sozinhos já valem a assinatura. A troca entre profissionais do setor é riquíssima.",
  },
];

const VALUE_PROPS = [
  {
    icon: BarChart3,
    title: "Radar de preços OPME",
    desc: "Dashboard com dados de referência do mercado brasileiro para auditorias e negociações",
  },
  {
    icon: Users,
    title: "Inteligência + Comunidade",
    desc: "Boletins semanais por Débora Soares, checklists profissionais e grupo exclusivo de WhatsApp",
  },
  {
    icon: ShieldCheck,
    title: "Garantia total",
    desc: "7 dias para testar. Não gostou? Devolvemos 100%. Sem perguntas.",
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function maskCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function maskExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatTimer(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ── Animation variants ──────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as number[] },
});

// ── Global countdown (persistent across re-renders) ─────────────────────────

const OFFER_DURATION = 47 * 3600 + 59 * 60 + 59; // 47:59:59

function useCountdown(initial: number) {
  const startRef = useRef(Date.now());
  const [remaining, setRemaining] = useState(initial);

  useEffect(() => {
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      setRemaining(Math.max(initial - elapsed, 0));
    }, 1000);
    return () => clearInterval(id);
  }, [initial]);

  return remaining;
}

// ── Pix Timer ───────────────────────────────────────────────────────────────

function PixTimer() {
  const [seconds, setSeconds] = useState(30 * 60);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <span className="font-mono-metric text-sm text-muted-foreground">
      Expira em{" "}
      <span className="text-foreground font-semibold">
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </span>
    </span>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────

const Checkout = () => {
  const [plan, setPlan] = useState<"monthly" | "annual">("annual");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const exitShownRef = useRef(false);

  const offerSeconds = useCountdown(OFFER_DURATION);

  // Exit-intent detection (mouse leaves viewport)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitShownRef.current) {
        exitShownRef.current = true;
        setShowExitPopup(true);
      }
    };
    document.addEventListener("mouseout", handler);
    return () => document.removeEventListener("mouseout", handler);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", email: "", whatsapp: "" },
  });

  const selectedPlan = PLANS[plan];
  const discount = selectedPlan.originalPrice - selectedPlan.price;
  const total = selectedPlan.price;

  const onSubmit = useCallback((_data: CheckoutForm) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  }, []);

  const handleCopyPix = useCallback(() => {
    navigator.clipboard.writeText(PIX_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  const scrollToForm = useCallback(() => {
    document.getElementById("checkout-form")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const cardNumberValue = watch("cardNumber") ?? "";
  const cardExpiryValue = watch("cardExpiry") ?? "";
  const whatsappValue = watch("whatsapp") ?? "";

  // ── Summary card (shared between mobile collapsible and desktop sticky) ──

  const SummaryContent = () => (
    <div className="space-y-5">
      {/* Author */}
      <div className="flex items-center gap-3">
        <img src={deboraPhoto} alt="Débora Soares" className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-accent/20" />
        <div>
          <p className="font-semibold text-sm leading-tight">Radar OPME</p>
          <p className="text-xs text-muted-foreground">por Débora Soares — DS Treinamentos</p>
        </div>
      </div>

      {/* Benefits */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          O que você recebe:
        </p>
        <div className="space-y-2.5">
          {BENEFITS.map((b) => (
            <div key={b.text} className="flex items-start gap-2.5">
              {b.special ? (
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "rgba(192,0,126,0.1)", color: "var(--ds-magenta)" }}>
                  <Sparkles size={12} />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "var(--ds-blue-glow)", color: "var(--ds-blue)" }}>
                  <Check size={12} />
                </div>
              )}
              <span className="text-sm leading-snug" style={{ color: "var(--text-secondary)", fontWeight: b.special ? 600 : 400 }}>
                {b.text}
                {b.special && (
                  <span className="ml-1 text-[9px] font-semibold px-1 py-0.5 rounded" style={{ backgroundColor: "rgba(192,0,126,0.15)", color: "var(--ds-magenta)" }}>IA</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Price breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Plano {selectedPlan.label}</span>
          <span className="font-mono-metric line-through text-muted-foreground">{formatCurrency(selectedPlan.originalPrice)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-success font-medium">Desconto fundador (-40%)</span>
          <span className="font-mono-metric text-success">-{formatCurrency(discount)}</span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold font-mono-metric" style={{ color: "var(--text-primary)" }}>
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Trust seals */}
      <div className="grid grid-cols-2 gap-2.5">
        {TRUST_SEALS.map((seal) => (
          <div key={seal.label} className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "var(--success)" }}>
              <Check size={11} />
            </div>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>{seal.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ═══ URGENCY BAR ═══ */}
      <div
        className="sticky top-0 z-50 text-center py-2.5 px-4"
        style={{ backgroundColor: "rgba(192, 0, 126, 0.1)", borderBottom: "1px solid rgba(192, 0, 126, 0.15)" }}
      >
        <p className="text-xs sm:text-sm font-medium flex items-center justify-center gap-2 flex-wrap" style={{ color: "var(--ds-magenta-light)" }}>
          <Clock size={14} className="shrink-0" style={{ color: "var(--ds-magenta)" }} />
          <span>
            Oferta exclusiva para participantes do{" "}
            <span className="font-bold" style={{ color: "var(--text-primary)" }}>Medical Devices Summit</span> — encerra em
          </span>
          <span className="font-mono-metric font-bold text-sm sm:text-base tracking-wide" style={{ color: "var(--ds-magenta)" }}>
            {formatTimer(offerSeconds)}
          </span>
        </p>
      </div>

      {/* ═══ LOGO HEADER ═══ */}
      <header style={{ borderBottom: "1px solid var(--border-default)", backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-center gap-3">
          <img src={dsLogo} alt="DS Treinamentos" className="h-8 brightness-0 invert opacity-60" />
          <span className="font-bold text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>Radar OPME</span>
        </div>
      </header>

      {/* ═══ HERO DE REFORÇO ═══ */}
      <section className="py-10 sm:py-14 px-4" style={{ borderBottom: "1px solid var(--border-default)", background: "radial-gradient(ellipse 80% 50% at 50% 0%, var(--ds-blue-glow), transparent), var(--bg-primary)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            {...fadeUp(0)}
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Inteligência de mercado OPME-DMI{" "}
            <span style={{ color: "var(--ds-blue-light)" }}>na sua mesa de decisão</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="text-muted-foreground text-base sm:text-lg mb-4 max-w-2xl mx-auto"
          >
            Radar de preços, checklists de auditoria, boletins semanais e comunidade profissional.
            Tudo que gestores, auditores e médicos precisam para tomar decisões mais seguras sobre dispositivos médicos.
          </motion.p>

          {/* Social proof pulse */}
          <motion.div
            {...fadeUp(0.15)}
            className="flex items-center justify-center gap-2 mb-10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
            </span>
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">200 vagas de fundador</span> — 40% de desconto exclusivo do Medical Devices Summit
            </span>
          </motion.div>

          {/* Value prop cards */}
          <motion.div
            {...fadeUp(0.2)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {VALUE_PROPS.map((vp, i) => (
              <div
                key={i}
                className="bg-card rounded-xl border border-border p-5 text-left shadow-card hover:shadow-card-hover transition-shadow duration-200"
              >
                <div className="w-10 h-10 rounded-md flex items-center justify-center mb-3" style={{ backgroundColor: "var(--ds-blue-glow)", color: "var(--ds-blue)" }}>
                  <vp.icon size={20} />
                </div>
                <p className="font-semibold text-sm mb-1">{vp.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{vp.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FORM + SUMMARY ═══ */}
      <main id="checkout-form" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        {/* Mobile summary (collapsible) — shown above form on mobile */}
        <div className="lg:hidden mb-6">
          <Card className="shadow-card">
            <button
              type="button"
              onClick={() => setSummaryOpen(!summaryOpen)}
              className="w-full flex items-center justify-between p-5"
            >
              <div className="flex items-center gap-3">
                <img src={deboraPhoto} alt="Débora Soares" className="w-9 h-9 rounded-full object-cover shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-sm">Resumo do pedido</p>
                  <p className="text-xs text-accent font-bold font-mono-metric">
                    {formatCurrency(total)}
                  </p>
                </div>
              </div>
              {summaryOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {summaryOpen && (
              <CardContent className="pt-0 pb-5">
                <div className="h-px bg-border mb-5" />
                <SummaryContent />
              </CardContent>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-start">
          {/* ── Left column — Form ── */}
          <motion.div {...fadeUp(0.1)}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal info */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">
                      WhatsApp{" "}
                      <span className="text-muted-foreground font-normal">
                        (para acesso ao grupo)
                      </span>
                    </Label>
                    <Input
                      id="whatsapp"
                      placeholder="(11) 99999-9999"
                      value={maskPhone(whatsappValue)}
                      onChange={(e) => setValue("whatsapp", maskPhone(e.target.value))}
                    />
                    {errors.whatsapp && (
                      <p className="text-xs text-destructive">{errors.whatsapp.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Plan selector */}
              <Card>
                <CardContent className="pt-6">
                  <Label className="mb-3 block">Escolha seu plano</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Monthly */}
                    <button
                      type="button"
                      onClick={() => setPlan("monthly")}
                      className={`relative rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                        plan === "monthly"
                          ? "border-accent bg-accent/5 shadow-sm"
                          : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      <span className="block text-sm font-semibold">{PLANS.monthly.label}</span>
                      <span className="block mt-1">
                        <span className="text-lg font-bold font-mono-metric">
                          {formatCurrency(PLANS.monthly.price)}
                        </span>
                        <span className="text-xs text-muted-foreground">{PLANS.monthly.period}</span>
                      </span>
                      <span className="block text-xs text-muted-foreground mt-1">
                        {PLANS.monthly.sublabel}
                      </span>
                    </button>

                    {/* Annual */}
                    <button
                      type="button"
                      onClick={() => setPlan("annual")}
                      className={`relative rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                        plan === "annual"
                          ? "border-accent bg-accent/5 shadow-sm ring-1 ring-accent/30"
                          : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      <Badge className="absolute -top-2.5 left-3 bg-accent text-accent-foreground border-0 text-[10px] uppercase tracking-wider">
                        Melhor valor — Economia de {formatCurrency(ANNUAL_SAVINGS)}
                      </Badge>
                      <span className="block text-sm font-semibold mt-1">{PLANS.annual.label}</span>
                      <span className="block mt-1">
                        <span className="text-lg font-bold font-mono-metric">
                          {formatCurrency(PLANS.annual.price)}
                        </span>
                        <span className="text-xs text-muted-foreground">{PLANS.annual.period}</span>
                      </span>
                      <span className="block text-xs text-muted-foreground mt-1">
                        {PLANS.annual.sublabel}
                      </span>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment tabs */}
              <Card>
                <CardContent className="pt-6">
                  <Label className="mb-3 block">Forma de pagamento</Label>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="pix" className="gap-1.5">
                        <QrCode size={14} /> Pix
                      </TabsTrigger>
                      <TabsTrigger value="card" className="gap-1.5">
                        <CreditCard size={14} /> Cartão
                      </TabsTrigger>
                    </TabsList>

                    {/* Pix */}
                    <TabsContent value="pix" className="mt-4 space-y-4">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-48 h-48 rounded-xl border-2 border-dashed border-border bg-muted/50 flex items-center justify-center">
                          <QrCode size={80} className="text-muted-foreground/40" />
                        </div>
                        <PixTimer />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Código Pix copia e cola
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            readOnly
                            value={PIX_CODE}
                            className="font-mono text-xs truncate"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="default"
                            onClick={handleCopyPix}
                            className="shrink-0 gap-1.5"
                          >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? "Copiado!" : "Copiar"}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Card */}
                    <TabsContent value="card" className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número do cartão</Label>
                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          value={maskCardNumber(cardNumberValue)}
                          onChange={(e) =>
                            setValue("cardNumber", maskCardNumber(e.target.value))
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Validade</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/AA"
                            value={maskExpiry(cardExpiryValue)}
                            onChange={(e) =>
                              setValue("cardExpiry", maskExpiry(e.target.value))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            placeholder="123"
                            maxLength={4}
                            {...register("cardCvv")}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nome no cartão</Label>
                        <Input
                          id="cardName"
                          placeholder="Como impresso no cartão"
                          {...register("cardName")}
                        />
                      </div>
                    </TabsContent>

                  </Tabs>
                </CardContent>
              </Card>

              {/* CTA Button */}
              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full text-base sm:text-lg py-4 h-auto font-bold uppercase tracking-wide rounded-sm text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "var(--ds-magenta)", boxShadow: "0 0 24px var(--ds-magenta-glow)" }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "var(--ds-magenta-light)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta)"; }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Acessar a plataforma — {formatCurrency(total)}
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                  <Lock size={12} />
                  Pagamento seguro &bull; Seus dados estão protegidos
                </p>
              </div>
            </form>
          </motion.div>

          {/* ── Right column — Summary (desktop only) ── */}
          <motion.div
            {...fadeUp(0.25)}
            className="hidden lg:block lg:sticky lg:top-28"
          >
            <div className="rounded-lg p-6 shadow-card" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid rgba(192, 0, 126, 0.15)" }}>
              <SummaryContent />
            </div>
          </motion.div>
        </div>
      </main>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="py-12 sm:py-16 px-4" style={{ borderTop: "1px solid var(--border-default)", backgroundColor: "var(--bg-primary)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            {...fadeUp(0)}
            className="font-display text-xl sm:text-2xl font-normal text-center mb-10"
            style={{ color: "var(--text-primary)" }}
          >
            O que dizem os membros do Radar OPME
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} {...fadeUp(0.1 + i * 0.1)}>
                <div className="h-full rounded-lg p-6" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)" }}>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} className="fill-warning" style={{ color: "var(--warning)" }} />
                    ))}
                  </div>
                  <p className="font-display text-sm leading-relaxed mb-4 italic" style={{ color: "var(--text-secondary)" }}>
                    "{t.text}"
                  </p>
                  <div className="pt-3" style={{ borderTop: "1px solid var(--border-default)" }}>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPERT SECTION ═══ */}
      <section className="py-12 sm:py-16 px-4" style={{ borderTop: "1px solid var(--border-default)", backgroundColor: "var(--bg-primary)" }}>
        <motion.div {...fadeUp(0)} className="max-w-2xl mx-auto text-center">
          <img
            src={deboraPhoto}
            alt="Débora Soares"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
            style={{ border: "2px solid rgba(5, 89, 181, 0.3)" }}
          />
          <h3 className="font-display text-xl font-normal mb-1" style={{ color: "var(--text-primary)" }}>Débora Soares</h3>
          <div className="flex items-center justify-center gap-2 mb-4">
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Especialista em OPME-DMI &bull; Fundadora da DS Treinamentos
            </p>
            <img src={dsLogo} alt="DS Treinamentos" className="h-6 brightness-0 invert opacity-50" />
          </div>
          <p className="text-sm leading-relaxed max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Com mais de 30 anos no setor de dispositivos médicos, Débora é referência
            nacional em auditoria e regulação de OPME. Mestre pela PUC-PR, Vice-Presidente da ABEA,
            membro do GTE-OPME/ANS e do IMDRF-Brasil/ANVISA. Fundadora da DS Treinamentos e do Medical Devices Summit.
          </p>
        </motion.div>
      </section>

      {/* ═══ URGENCY FOOTER ═══ */}
      <footer className="py-10 sm:py-14 px-4 stars-bg" style={{ backgroundColor: "#080C15" }}>
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-5">
          <div className="flex items-center justify-center gap-2" style={{ color: "var(--warning)" }}>
            <AlertTriangle size={20} />
            <span className="font-semibold text-sm sm:text-base">Atenção</span>
          </div>

          <p className="text-base sm:text-lg font-semibold leading-relaxed" style={{ color: "var(--text-primary)" }}>
            O preço de fundador está disponível{" "}
            <span className="underline underline-offset-4" style={{ color: "var(--ds-magenta-light)", textDecorationColor: "rgba(192,0,126,0.4)" }}>
              apenas durante o Medical Devices Summit
            </span>
          </p>

          <p className="text-sm leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            Após o evento, o preço volta para R$ 497/mês (plano mensal) ou R$ 5.964/ano
            (plano anual). Referência: SIMPRO/Brasíndice custam R$ 300-400/mês só pela tabela de preços.
          </p>

          <button
            className="text-base font-bold uppercase tracking-wide mt-4 px-8 py-3 rounded-sm text-white transition-all"
            style={{ backgroundColor: "var(--ds-magenta)", boxShadow: "0 0 24px var(--ds-magenta-glow)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta-light)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta)"; }}
            onClick={scrollToForm}
          >
            Garantir minha vaga agora
          </button>
        </div>
      </footer>

      {/* ═══ EXIT POPUP ═══ */}
      {showExitPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowExitPopup(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="max-w-md w-full p-8 relative"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-default)", borderRadius: "20px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 transition-colors"
              style={{ color: "var(--text-tertiary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-4">
              <h3 className="font-display text-xl font-normal leading-tight" style={{ color: "var(--text-primary)" }}>
                Tem certeza que quer perder o preço de fundador?
              </h3>

              <div className="flex items-start gap-3 text-left rounded-md p-4" style={{ backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-default)" }}>
                <img src={deboraPhoto} alt="Débora Soares" className="w-10 h-10 rounded-full object-cover shrink-0" />
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Após o Medical Devices Summit, o valor volta para R$ 497/mês. Esta é sua
                  única chance de travar o desconto de 40% para sempre.
                </p>
              </div>

              <button
                className="w-full py-3 rounded-sm text-sm font-bold uppercase tracking-wide text-white transition-all"
                style={{ backgroundColor: "var(--ds-magenta)", boxShadow: "0 0 20px var(--ds-magenta-glow)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta-light)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--ds-magenta)"; }}
                onClick={() => { setShowExitPopup(false); scrollToForm(); }}
              >
                Quero manter meu desconto
              </button>

              <button
                type="button"
                onClick={() => setShowExitPopup(false)}
                className="text-sm transition-colors"
                style={{ color: "var(--text-tertiary)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
              >
                Não, obrigado
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Checkout;
