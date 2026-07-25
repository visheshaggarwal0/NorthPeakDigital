import React, { Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const ParticleBackground = lazy(() => import('./ParticleBackground'));

export default function DynamicBackground() {
  const { scrollYProgress } = useScroll();
  
  // The primary orb moves dynamically as the user scrolls
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);

  // Secondary orb moves in a counter direction
  const y2 = useTransform(scrollYProgress, [0, 1], ['50%', '-150%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-20%', '50%']);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
      <motion.div 
        className="absolute top-0 right-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full mix-blend-screen opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, rgba(0,0,0,0) 70%)',
          y: y1,
          x: x1,
          scale: scale1,
          filter: 'blur(120px)'
        }}
      />
      <motion.div 
        className="absolute top-[40%] left-[-10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full mix-blend-screen opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(0,0,0,0) 70%)',
          y: y2,
          x: x2,
          filter: 'blur(100px)'
        }}
      />
    </div>
  );
}

