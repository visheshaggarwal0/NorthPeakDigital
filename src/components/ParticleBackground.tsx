import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    let mouse = {
      x: -1000,
      y: -1000,
      radius: 180
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      density: number;
      color: string;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5;
        this.density = (Math.random() * 20) + 1;
        
        const colors = ['rgba(79, 70, 229, 0.7)', 'rgba(245, 158, 11, 0.6)', 'rgba(255, 255, 255, 0.5)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
      }

      update() {
        // Drift
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around smoothly
        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distanceSq = dx * dx + dy * dy;
        let maxDistanceSq = mouse.radius * mouse.radius;
        
        if (distanceSq < maxDistanceSq) {
          let distance = Math.sqrt(distanceSq);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (mouse.radius - distance) / mouse.radius;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          // Push particles away from mouse to create an interactive wake
          this.x -= directionX * 0.5;
          this.y -= directionY * 0.5;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Adjust density for more particles while staying performant
      const numParticles = Math.min(Math.floor((canvas!.width * canvas!.height) / 6000), 250);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      // Draw subtle connecting lines if they are close
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distanceSq = dx * dx + dy * dy;
          
          if (distanceSq < 10000) { // 100 * 100
            let distance = Math.sqrt(distanceSq);
            let opacity = 1 - (distance / 100);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79, 70, 229, ${opacity * 0.4})`; 
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        // Connect particles to mouse
        let mdx = particles[i].x - mouse.x;
        let mdy = particles[i].y - mouse.y;
        let mDistanceSq = mdx * mdx + mdy * mdy;
        
        if (mDistanceSq < 22500) { // 150 * 150
          let distance = Math.sqrt(mDistanceSq);
          let opacity = 1 - (distance / 150);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(245, 158, 11, ${opacity * 0.3})`;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    // Initialize
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
