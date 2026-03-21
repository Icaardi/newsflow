import { motion } from "framer-motion";

const MarqueeSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className="py-6 border-y border-border/40 overflow-hidden"
    >
      <div className="text-center">
        <span className="text-lg md:text-xl font-bold text-foreground/80 tracking-wide">
          Centenas de usuários escolhem NewsFlow todos os dias!
        </span>
      </div>
    </motion.section>
  );
};

export default MarqueeSection;
