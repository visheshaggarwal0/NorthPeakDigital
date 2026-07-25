import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0.01, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const }
  }
};

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
      <motion.div 
        className="max-w-4xl mx-auto text-center z-10 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <span className="inline-block py-1 px-3 rounded-full bg-brand-bg text-brand-text text-xs font-display font-semibold tracking-wider uppercase mb-6 border border-brand-border shadow-sm">
            Digital Product Agency
          </span>
        </motion.div>

        <motion.h1 
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] md:leading-[1.15] mb-6 text-brand-text max-w-3xl mx-auto"
          variants={itemVariants}
        >
          We Scale Digital Products Through High-Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-amber">Engineering</span> & Design.
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          variants={itemVariants}
        >
          NorthPeak partners with ambitious brands to build scalable architecture, conversion-optimized interfaces, and resilient infrastructure.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <MagneticButton 
            as="a"
            href="#services" 
            className="w-full sm:w-auto px-8 py-4 bg-brand-text text-brand-bg font-display font-semibold rounded-md hover:bg-white transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Explore Services <ChevronRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton 
            as="a"
            href="#contact" 
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-brand-border text-brand-text font-display font-semibold rounded-md hover:bg-brand-border transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Book Strategy Call
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
