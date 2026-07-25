import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

const tiers = [
  {
    name: "Starter",
    desc: "For early-stage startups needing a solid foundation.",
    price: "$5k",
    features: ["Custom Landing Page", "Responsive UI Design", "Basic SEO Setup", "Contact Form Integration", "1 Month Support"],
    popular: false
  },
  {
    name: "Growth",
    desc: "For scaling businesses requiring robust engineering.",
    price: "$15k",
    features: ["Full-Stack Web App", "Advanced UX/UI Flow", "CMS Integration", "Performance Optimization", "Analytics Dashboard", "3 Months Support"],
    popular: true
  },
  {
    name: "Enterprise",
    desc: "Custom architectural solutions for massive scale.",
    price: "Custom",
    features: ["Microservices Architecture", "Custom Cloud DevOps", "Legacy System Migration", "Dedicated QA Testing", "SLA & 24/7 Support", "Annual Partnership"],
    popular: false
  }
];

export default function Pricing() {
  const [expandedIndex, setExpandedIndex] = useState<number>(1);

  return (
    <section id="pricing" className="py-24 px-6 bg-brand-bg relative border-t border-brand-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-brand-text">Transparent Engagement</h2>
          <p className="text-brand-muted text-lg">Predictable pricing models for high-impact deliverables. No hidden fees.</p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:items-stretch">
          {tiers.map((tier, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                className={`rounded-2xl border relative flex flex-col ${
                  tier.popular 
                  ? 'bg-brand-border/30 border-brand-accent' 
                  : 'bg-brand-bg border-brand-border'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-white px-4 py-1 rounded-full text-xs font-display font-bold uppercase tracking-wider shadow-sm z-10">
                    Most Popular
                  </div>
                )}
                
                {/* Header (Clickable on Mobile) */}
                <button 
                  onClick={() => setExpandedIndex(isExpanded ? -1 : i)}
                  className="w-full text-left p-6 md:p-8 md:pb-0 flex items-center justify-between md:block focus:outline-none md:cursor-default"
                >
                  <div className="md:mb-8 md:mt-2">
                    <h3 className="font-serif text-2xl font-bold mb-1 md:mb-2 text-brand-text flex items-center justify-between">
                      {tier.name}
                    </h3>
                    <p className="text-brand-muted text-sm hidden md:block min-h-[40px]">{tier.desc}</p>
                    <div className="md:hidden text-brand-accent font-bold mt-1">
                      {tier.price}
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-brand-muted shrink-0 md:hidden transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Content (Collapsible on Mobile) */}
                <div 
                  className={`md:block md:flex-1 md:flex md:flex-col overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
                  }`}
                >
                  <div className="px-6 pb-6 md:px-8 md:pb-8 flex flex-col flex-1">
                    <p className="text-brand-muted text-sm md:hidden mb-6">{tier.desc}</p>
                    
                    <div className="hidden md:block mb-8 border-b border-brand-border pb-8">
                      <span className="font-serif text-5xl font-bold text-brand-text">{tier.price}</span>
                      {tier.price !== "Custom" && <span className="text-brand-muted ml-2">/ project</span>}
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-1">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                          <span className="text-sm text-brand-text/90">{feat}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a href="#contact" className={`w-full py-4 text-center rounded-md font-semibold transition-all mt-auto block ${
                      tier.popular
                      ? 'bg-brand-accent text-white hover:bg-brand-accent/90'
                      : 'bg-brand-border/50 text-brand-text hover:bg-brand-border'
                    }`}>
                      {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
