# NorthPeak Digital

A premium, high-performance landing page for a digital product agency. This project is engineered with modern web technologies to deliver an exceptional user experience, featuring smooth scrolling, interactive canvas backgrounds, and fluid animations.

## 🚀 Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS (v4)
- **Animations:** Motion (formerly Framer Motion)
- **Scrolling:** Lenis (Smooth Scroll)
- **Icons:** Lucide React
- **Backend:** Node.js, Express (configured for full-stack deployment)

## ✨ Key Features

- **Interactive Canvas Background:** A lightweight, performant particle network built on HTML5 Canvas that reacts to cursor movement.
- **Custom Fluid Cursor:** A spring-animated custom cursor built with `useMotionValue` to bypass React state overhead for silky smooth 60fps tracking.
- **Smooth Scrolling:** Integrated Lenis for premium, hardware-accelerated scroll physics.
- **Premium Typography:** Carefully paired fonts: *Playfair Display* (Headings), *Outfit* (Sub-headings), and *Inter* (Body text).
- **SEO & AI-Ready:** Fully optimized for search engines (`robots.txt`) and LLM agents (`llms.txt`).
- **Responsive Design:** Mobile-first approach ensuring perfect layouts across all device sizes.

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or bun

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production
To create a production-ready build:
```bash
npm run build
```
This will compile both the frontend assets (via Vite) and the Express server into the `dist/` directory.

## 📂 Structure Overview
- `/src/components` - Reusable UI components (Hero, Navbar, Results, etc.)
- `/public` - Static assets, `robots.txt`, and `llms.txt`
- `/server.ts` - Express backend for production serving and API routes
