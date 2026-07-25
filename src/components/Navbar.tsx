import React, { useState } from 'react';
import { Mountain, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Mountain className="w-8 h-8 text-brand-accent group-hover:text-brand-text transition-colors" />
          <span className="font-serif text-2xl font-bold tracking-tight">NorthPeak</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors">Services</a>
          <a href="#results" className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors">Results</a>
          <a href="#pricing" className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors">Pricing</a>
          <a href="#contact" className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors">Contact</a>
        </nav>

        <div className="hidden md:flex items-center">
          <a href="#contact" className="px-5 py-2.5 bg-brand-accent hover:bg-brand-accent/90 text-white text-sm font-semibold rounded-md transition-all shadow-[0_0_20px_var(--color-brand-accent-glow)]">
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-brand-text" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-brand-bg border-b border-brand-border px-6 py-6 flex flex-col gap-6 shadow-xl">
          <a href="#services" onClick={() => setIsOpen(false)} className="text-lg font-medium text-brand-text hover:text-brand-accent transition-colors">Services</a>
          <a href="#results" onClick={() => setIsOpen(false)} className="text-lg font-medium text-brand-text hover:text-brand-accent transition-colors">Results</a>
          <a href="#pricing" onClick={() => setIsOpen(false)} className="text-lg font-medium text-brand-text hover:text-brand-accent transition-colors">Pricing</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-lg font-medium text-brand-text hover:text-brand-accent transition-colors">Contact</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="w-full text-center px-5 py-3 bg-brand-accent text-white font-semibold rounded-md mt-2">
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}
