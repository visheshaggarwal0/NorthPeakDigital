import React from 'react';
import { Check } from 'lucide-react';
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
  return (
    <section id="pricing" className="py-24 px-6 bg-brand-bg relative border-t border-brand-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-brand-text">Transparent Engagement</h2>
          <p className="text-brand-muted text-lg">Predictable pricing models for high-impact deliverables. No hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-8 rounded-2xl border relative flex flex-col ${
                tier.popular 
                ? 'bg-brand-border/30 border-brand-accent shadow-[0_0_30px_var(--color-brand-accent-glow)]' 
                : 'bg-brand-bg border-brand-border'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8 mt-2">
                <h3 className="font-serif text-2xl font-bold mb-2 text-brand-text">{tier.name}</h3>
                <p className="text-brand-muted text-sm min-h-[40px]">{tier.desc}</p>
              </div>
              
              <div className="mb-8 border-b border-brand-border pb-8">
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
              
              <a href="#contact" className={`w-full py-4 text-center rounded-md font-semibold transition-all mt-auto ${
                tier.popular
                ? 'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-[0_0_20px_var(--color-brand-accent-glow)]'
                : 'bg-brand-border/50 text-brand-text hover:bg-brand-border'
              }`}>
                {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
