import React from 'react';
import { motion } from 'motion/react';

export default function SectionDivider() {
  return (
    <div className="w-full flex justify-center py-8 md:py-16 relative overflow-hidden bg-brand-bg">
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-center opacity-60">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-border to-transparent"></div>
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-2 h-2 rounded-full bg-brand-accent mx-4 shadow-[0_0_10px_var(--color-brand-accent-glow)]"
        />
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-brand-border to-transparent"></div>
      </div>
    </div>
  );
}
