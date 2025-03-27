import { motion, Variants } from "framer-motion";


const variants: Variants = {

  initial: {

    scaleY: 0.5,

    opacity: 0,

  },

  animate: {

    scaleY: 1,

    opacity: 1,

    transition: {

      repeat: Infinity,

      repeatType: "mirror" as const,

      duration: 1,

      ease: "circIn",

    },

  },

};


export const BarLoader = () => {

  return (
    <div className="inset-0 flex flex-col items-center justify-center absolute">
        <motion.div

          transition={{

            staggerChildren: 0.25,

          }}

          initial="initial"

          animate="animate"

          className="flex gap-1"

        >
        
          <motion.div variants={variants} className="h-12 w-2 bg-primary rounded-full" />

          <motion.div variants={variants} className="h-12 w-2 bg-primary rounded-full" />

          <motion.div variants={variants} className="h-12 w-2 bg-primary rounded-full" />

          <motion.div variants={variants} className="h-12 w-2 bg-primary rounded-full" />

          <motion.div variants={variants} className="h-12 w-2 bg-primary rounded-full" />

        </motion.div>
        <p className="text-muted">Загрузка...</p>
    </div>

  );

};

