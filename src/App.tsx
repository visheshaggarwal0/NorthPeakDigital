/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import DynamicBackground from './components/DynamicBackground';

// Lazy load below-the-fold components for better performance
const Services = lazy(() => import('./components/Services'));
const Results = lazy(() => import('./components/Results'));
const Pricing = lazy(() => import('./components/Pricing'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const AIAssistant = lazy(() => import('./components/AIAssistant'));

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <SmoothScroll>
      <div className="min-h-screen antialiased selection:bg-brand-accent selection:text-white relative">
        <DynamicBackground />
        <CustomCursor />
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-[100] origin-left" 
          style={{ scaleX }} 
        />
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<div className="min-h-[50vh]" />}>
            <Services />
            <Results />
            <Pricing />
            <FAQ />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-64" />}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <AIAssistant />
        </Suspense>
      </div>
    </SmoothScroll>
  );
}
