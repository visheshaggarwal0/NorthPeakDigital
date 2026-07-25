import React from 'react';
import { PenTool, BarChart, Cloud, Search, Database, Layout } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';

const services = [
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Custom Web Development",
    desc: "React, Next.js, and modern single-page applications built for speed, accessibility, and dynamic scale."
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "UI/UX Product Design",
    desc: "Data-driven interface design focused on reducing friction and elevating the end-user experience."
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: "Conversion Optimization",
    desc: "Rigorous A/B testing and analytics to convert casual visitors into paying customers."
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud Infrastructure & DevOps",
    desc: "Resilient CI/CD pipelines, Dockerized deployments, and scalable AWS/GCP infrastructure."
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Technical SEO & Performance",
    desc: "Core Web Vitals optimization, server-side rendering, and semantic architecture for search visibility."
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "API & Backend Architecture",
    desc: "Robust microservices, GraphQL endpoints, and high-performance relational database architectures."
  }
];

function ServiceCard({ svc, i }: { svc: any, i: number; key?: number | string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      onMouseMove={handleMouseMove}
      className="p-8 rounded-2xl bg-brand-bg border border-brand-border transition-colors group relative overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(79, 70, 229, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-brand-border/50 flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white transition-colors">
          {svc.icon}
        </div>
        <h3 className="font-serif text-xl font-bold mb-3 text-brand-text">{svc.title}</h3>
        <p className="text-brand-muted leading-relaxed text-sm md:text-base">{svc.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-brand-bg relative border-t border-brand-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-brand-text">Our Capabilities</h2>
          <p className="text-brand-muted text-lg">We deliver end-to-end digital solutions, combining robust engineering with refined aesthetic execution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <ServiceCard key={i} svc={svc} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
