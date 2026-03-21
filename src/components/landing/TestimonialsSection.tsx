import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";

import { cn } from "@/lib/utils";

import marcosTavares from "@/assets/testimonials/marcos-tavares.jpg";
import draCamilaRocha from "@/assets/testimonials/dra-camila-rocha.jpg";
import felipeAugusto from "@/assets/testimonials/felipe-augusto.jpg";
import anaBeatriz from "@/assets/testimonials/ana-beatriz.jpg";
import ricardoGomes from "@/assets/testimonials/ricardo-gomes.jpg";
import julianaPires from "@/assets/testimonials/juliana-pires.jpg";

const testimonials = [
  {
    text: "Migrei minha newsletter de finanças para a NewsFlow e em 2 meses dobrei minha base de assinantes pagos. A plataforma é intuitiva e o checkout com Pix fez toda a diferença para o público brasileiro.",
    name: "Marcos Tavares",
    role: "Consultor Financeiro",
    src: marcosTavares,
    rating: 5,
  },
  {
    text: "Como médica, eu precisava de algo profissional e confiável para compartilhar conteúdo com meus pacientes. A NewsFlow me deu exatamente isso, sem precisar aprender a programar.",
    name: "Dra. Camila Rocha",
    role: "Médica Cardiologista",
    src: draCamilaRocha,
    rating: 5,
  },
  {
    text: "A IA da NewsFlow me economiza horas por semana. Envio o tema, ela pesquisa e gera um rascunho que preciso apenas ajustar. Minha produtividade triplicou.",
    name: "Felipe Augusto",
    role: "Jornalista e Escritor",
    src: felipeAugusto,
    rating: 5,
  },
  {
    text: "Já testei 5 plataformas de newsletter e nenhuma tinha checkout brasileiro de verdade. Na NewsFlow meus assinantes pagam com Pix na hora. Recomendo demais!",
    name: "Ana Beatriz",
    role: "Advogada Tributarista",
    src: anaBeatriz,
    rating: 5,
  },
  {
    text: "O que mais me impressionou foi o analytics em tempo real. Consigo ver exatamente quais temas geram mais engajamento e ajustar minha estratégia na hora.",
    name: "Ricardo Gomes",
    role: "Coach Executivo",
    src: ricardoGomes,
    rating: 5,
  },
  {
    text: "Sou nutricionista e uso a NewsFlow para mandar receitas e dicas semanais. O editor é lindo e meus clientes adoram o conteúdo. Já monetizei em menos de 1 mês.",
    name: "Juliana Pires",
    role: "Nutricionista",
    src: julianaPires,
    rating: 5,
  },
] as const;

type Testimonial = (typeof testimonials)[number];

const starIconClass = "w-4 h-4 shrink-0 stroke-[1.25]";
const starFilledClass = `${starIconClass} fill-warning text-warning stroke-warning`;
const starEmptyClass = `${starIconClass} fill-transparent text-muted-foreground/35 stroke-muted-foreground/35`;

function StarRating({ rating, className }: { rating: number; className?: string }) {
  const label = rating.toLocaleString("pt-BR", {
    minimumFractionDigits: Number.isInteger(rating) ? 0 : 1,
    maximumFractionDigits: 1,
  });

  return (
    <div
      className={cn("flex gap-0.5", className)}
      role="img"
      aria-label={`${label} de 5 estrelas`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fullAt = i + 1;
        if (rating >= fullAt) {
          return <Star key={i} className={starFilledClass} aria-hidden />;
        }
        if (rating >= i + 0.5) {
          return <StarHalf key={i} className={starFilledClass} aria-hidden />;
        }
        return <Star key={i} className={starEmptyClass} aria-hidden />;
      })}
    </div>
  );
}

const TestimonialsSection = () => {
  const topRow = testimonials.slice(0, 3);
  const bottomRow = testimonials.slice(3, 6);
  const doubledTop = [...topRow, ...topRow, ...topRow];
  const doubledBottom = [...bottomRow, ...bottomRow, ...bottomRow];

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Depoimentos</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-4">
            Nossos usuários amam a gente!
          </h2>
        </motion.div>
      </div>

      <div className="mb-4 overflow-hidden">
        <div className="flex animate-marquee-slow" style={{ width: "max-content" }}>
          {doubledTop.map((t, i) => (
            <TestimonialCard key={`top-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="flex animate-marquee-reverse" style={{ width: "max-content" }}>
          {doubledBottom.map((t, i) => (
            <TestimonialCard key={`bottom-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="w-[380px] mx-2 bg-card border border-border rounded-2xl p-6 shrink-0">
    <StarRating rating={testimonial.rating} className="mb-4" />
    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
      &ldquo;{testimonial.text}&rdquo;
    </p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden shrink-0 ring-1 ring-border/60">
        <img
          src={testimonial.src}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div>
        <p className="font-semibold text-sm">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

export default TestimonialsSection;
