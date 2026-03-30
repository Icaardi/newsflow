import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "O que é o Radar OPME?",
    a: "Plataforma de assinatura que reúne ferramentas de inteligência de mercado (dashboard de preços), conteúdo especializado (boletins semanais), recursos práticos (checklists e templates) e comunidade profissional para o mercado de OPME-DMI. Uma iniciativa DS Treinamentos.",
  },
  {
    q: "Quem é Débora Soares?",
    a: "Especialista com mais de 30 anos no setor de OPME-DMI, Mestre em Tecnologias em Saúde pela PUC-PR, Vice-Presidente da Associação Brasileira de Engenharia e Arquitetura (ABEA), e membro de comitês técnicos da ANS e ANVISA. Fundadora da DS Treinamentos.",
  },
  {
    q: "Os dados de preços são reais?",
    a: "Os dados de referência são baseados em fontes públicas (ANS, ANVISA, CMED) e atualizados periodicamente. O dashboard é uma ferramenta de referência para apoiar decisões, não substitui análise contratual específica.",
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim. Sem fidelidade e sem multa. O preço de fundador (R$ 297/mês ou R$ 2.970/ano) é mantido enquanto a assinatura estiver ativa — se cancelar e voltar depois, o preço será o regular de R$ 497/mês.",
  },
  {
    q: "O que é o Medical Devices Summit?",
    a: "Congresso online gratuito de 5 dias (13-17 de abril de 2026) sobre Dados, Tecnologia, Regulação e Auditoria no mercado de dispositivos médicos. Organizado por Débora Soares e DS Treinamentos.",
  },
];

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1A2E]">
            Perguntas frequentes
          </h2>
        </motion.div>

        <motion.div
          variants={sectionAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white border border-[#E5E7EB] rounded-xl px-5 data-[state=open]:border-[#00C2A8]/30"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-[#1A1A2E] py-4 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#6B7280] pb-4 leading-relaxed">
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
