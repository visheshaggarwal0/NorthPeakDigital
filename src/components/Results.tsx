import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { value: "140%", label: "Avg. Traffic Increase" },
  { value: "$10M+", label: "Revenue Generated" },
  { value: "99.9%", label: "Uptime Guaranteed" }
];

const testimonials = [
  {
    quote: "NorthPeak transformed our fragmented legacy system into a cohesive, lightning-fast platform. Our conversion rates doubled in the first quarter.",
    name: "Sarah Jenkins",
    title: "CTO, FinTech Solutions",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
  },
  {
    quote: "The level of engineering rigor and design polish is unmatched. They don't just write code; they build highly scalable digital businesses.",
    name: "David Chen",
    title: "Founder, GrowthStack",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    quote: "Working with NorthPeak felt like an extension of our internal team. Their infrastructure upgrades saved us 30% in monthly server costs.",
    name: "Elena Rodriguez",
    title: "VP Engineering, HealthCorp",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d"
  }
];

export default function Results() {
  return (
    <section id="results" className="py-24 px-6 relative border-t border-brand-border/50 bg-brand-bg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-accent/10 via-brand-bg to-brand-bg pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 border-b border-brand-border pb-24">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-serif text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-text to-brand-muted mb-2">
                {stat.value}
              </div>
              <div className="text-brand-muted font-medium uppercase tracking-wider text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-brand-text">Client Success</h2>
          <p className="text-brand-muted text-lg">Don't just take our word for it. See what our partners have to say.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-brand-border/20 border border-brand-border relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-accent/20" />
              <p className="font-serif text-lg leading-relaxed mb-8 relative z-10 text-brand-text/90 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-brand-border object-cover" />
                <div>
                  <div className="font-bold text-brand-text">{t.name}</div>
                  <div className="text-sm text-brand-muted">{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
