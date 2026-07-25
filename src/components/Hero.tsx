import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      
      <div className="max-w-4xl mx-auto text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand-bg text-brand-text text-xs font-semibold tracking-wider uppercase mb-6 border border-brand-border shadow-sm">
            Digital Product Agency
          </span>
        </motion.div>

        <motion.h1 
          className="font-serif text-5xl md:text-7xl font-bold leading-tight md:leading-[1.1] mb-6 text-brand-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          We Scale Digital Products Through High-Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-amber">Engineering</span> & Design.
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          NorthPeak partners with ambitious brands to build scalable architecture, conversion-optimized interfaces, and resilient infrastructure.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="#services" className="w-full sm:w-auto px-8 py-4 bg-brand-text text-brand-bg font-semibold rounded-md hover:bg-white transition-all flex items-center justify-center gap-2">
            Explore Services <ChevronRight className="w-4 h-4" />
          </a>
          <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-brand-border text-brand-text font-semibold rounded-md hover:bg-brand-border transition-all flex items-center justify-center">
            Book Strategy Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
