/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Results from './components/Results';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen antialiased selection:bg-brand-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Results />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
