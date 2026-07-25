import React from 'react';
import { Mountain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-bg border-t border-brand-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 group">
          <Mountain className="w-6 h-6 text-brand-accent group-hover:text-brand-text transition-colors" />
          <span className="font-serif text-xl font-bold tracking-tight text-brand-text">NorthPeak</span>
        </div>
        
        <div className="flex gap-8 text-sm text-brand-muted">
          <a href="#" className="hover:text-brand-text transition-colors">Twitter</a>
          <a href="#" className="hover:text-brand-text transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-brand-text transition-colors">GitHub</a>
        </div>
        
        <div className="text-sm text-brand-muted text-center md:text-left">
          &copy; {new Date().getFullYear()} NorthPeak Digital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
