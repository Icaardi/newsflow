import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Como funciona a IA para criação de newsletters?",
    a: "Você envia o tema e pontos-chave, e nossa IA pesquisa fontes confiáveis, estrutura o conteúdo e gera um rascunho completo em minutos. Você pode revisar, ajustar o tom e publicar com um clique.",
  },
  {
    q: "Quais formas de pagamento meus assinantes podem usar?",
    a: "Seus assinantes podem pagar via Pix (instantâneo), cartão de crédito e boleto bancário. Tudo nativo e integrado, sem necessidade de configurações externas.",
  },
  {
    q: "Preciso saber programar para usar a NewsFlow?",
    a: "Não! A NewsFlow foi feita para experts de conteúdo. O editor é visual (WYSIWYG), o checkout é automático e a IA faz o trabalho pesado. Você foca no conteúdo.",
  },
  {
    q: "Qual a taxa cobrada sobre minhas vendas?",
    a: "Cobramos apenas 4.99% + R$ 1,49 por transação aprovada. Se você não vender, não paga nada. Sem mensalidade, sem taxa de setup.",
  },
  {
    q: "Posso migrar minha newsletter de outra plataforma?",
    a: "Sim! Oferecemos importação simples de assinantes via CSV. Também ajudamos na migração do seu conteúdo existente para que a transição seja suave.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-28 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">FAQ</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold">Perguntas frequentes</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-accent/30">
                <AccordionTrigger className="text-left text-sm font-semibold py-4 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
