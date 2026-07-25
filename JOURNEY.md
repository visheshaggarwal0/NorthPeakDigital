# The Journey of NorthPeak Digital

Building NorthPeak Digital was an exercise in balancing premium, immersive web design with rigorous performance standards. This document outlines the evolution of the project from its initial concept to a Lighthouse-optimized powerhouse.

## 1. The Foundation: A Premium Aesthetic
The initial goal was to create a digital agency landing page that didn't just *tell* users about high-quality engineering, but *showed* it. We opted for a deep, high-contrast dark theme (using `#0B0F17` for the background and `#F8FAFC` for text) to establish a sleek, modern tone. 

Typography played a crucial role in creating hierarchy. We started with **Playfair Display** for sophisticated, serif headings and **Inter** for highly legible body text. Later, to create a better contrast for medium-importance UI elements, we introduced **Outfit** as a tertiary display font, using it for buttons, sub-headings, and uppercase labels.

## 2. Immersion & Interaction
To make the site feel alive, we introduced two key interactive elements:
- **Custom Cursor:** A custom-styled cursor that expands and reacts to interactive elements across the viewport.
- **Particle Background:** A dynamic HTML5 `<canvas>` background where a network of nodes slowly drifts and reacts to the user's mouse position.

## 3. The Performance Bottleneck & Optimizations
While the interactive elements looked great, they initially introduced significant performance overhead:
- The custom cursor was tied to React's `useState`, causing the entire component tree to re-render on every mouse movement. 
- The particle background was calculating distances for too many nodes, causing main-thread blocking and frame drops.

**The Fix:**
- We rewrote the `CustomCursor` using Motion's `useMotionValue` and `useSpring`. This bypassed React's render cycle completely, updating the DOM styles directly for buttery-smooth 60fps tracking without triggering React reconciliation.
- We optimized the `ParticleBackground` by reducing the total particle count and optimizing the nested loop for distance calculations (replacing `Math.sqrt` with squared distance checks where possible to save CPU cycles).

## 4. Polishing the UX: Smooth Scrolling & Loading
To give the site an "app-like" feel, we integrated **Lenis** for smooth scrolling. This required careful setup within a `useEffect` hook to ensure the `requestAnimationFrame` loop didn't leak or conflict with React's lifecycle. 
    
We also implemented a custom animated loader that ensures the site's heavy assets are ready before revealing the content. We continuously fine-tuned the artificial loading delay so it wouldn't negatively impact First Contentful Paint (FCP) and Largest Contentful Paint (LCP) metrics.

## 5. SEO & AI Readiness
The final phase was ensuring the site was discoverable and scored well on Lighthouse. 
- We created a `public/robots.txt` to guide search engine crawlers, boosting our SEO score.
- We added a `public/llms.txt`—a modern standard to help AI agents (like ChatGPT, Claude, and Gemini) parse and understand the company's services and value proposition effectively when browsing the web.
- We optimized the Vite build config to minify and split chunks effectively, saving hundreds of kilobytes on the initial load.

## Conclusion
NorthPeak Digital stands as a testament to the fact that you don't have to sacrifice performance for aesthetics. By carefully managing render cycles, leveraging raw canvas performance, and keeping a close eye on Lighthouse metrics, we built an agency site that is as fast as it is beautiful.
