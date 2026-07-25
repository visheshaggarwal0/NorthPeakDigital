import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "A standard project ranges from 4 to 12 weeks depending on complexity. We begin with a comprehensive discovery phase, followed by agile design and development sprints, culminating in a rigorous QA period before launch."
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes, we offer dedicated retainer packages for continuous conversion optimization, feature expansion, and infrastructure maintenance to ensure your product scales smoothly alongside your business."
  },
  {
    question: "Do you work with existing codebases or only new builds?",
    answer: "We handle both. Our engineering team can audit and refactor legacy systems for improved performance and scalability, or build highly optimized greenfield applications from the ground up."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "Our core stack utilizes modern ecosystem tools: React, Next.js, and TypeScript on the frontend, paired with robust Node.js or Python backend services. We architect and deploy primarily on AWS and Google Cloud."
  },
  {
    question: "How do you ensure the final product converts well?",
    answer: "We embed CRO (Conversion Rate Optimization) principles from day one. This includes data-driven UX design, performance optimization (Core Web Vitals), and strategic A/B testing frameworks to maximize user engagement."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 relative border-t border-brand-border/50 bg-brand-bg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-brand-text">Frequently Asked Questions</h2>
          <p className="text-brand-muted text-lg">Clear answers to help you understand our process and capabilities.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border rounded-lg transition-colors duration-300 ${isOpen ? 'border-brand-accent/50 bg-brand-border/10' : 'border-brand-border bg-brand-bg hover:border-brand-border/80'}`}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-xl font-semibold text-brand-text pr-8">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 text-brand-muted"
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-brand-muted leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
