import { motion } from "framer-motion"

export function AboutUsDivider(){

  return(
    <motion.div
      className="container mx-auto px-4 py-12 border-t border-white/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { number: "01", label: "ТЕСТЫ" },
          { number: "02", label: "КУРСЫ" },
          { number: "03", label: "ИИ" },
          { number: "04", label: "УПРАВЛЕНИЕ" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <span className="text-4xl md:text-5xl font-mono font-bold">{item.number}</span>
            <span className="text-white/50 text-sm mt-2 font-mono">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
    )
}