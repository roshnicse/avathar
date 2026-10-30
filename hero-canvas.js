/**
 * AVATHAR AI ACADEMY — HERO NEURAL CANVAS ANIMATION
 * Lightweight, high-performance HTML5 canvas particle & neural net animation.
 */

(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // Respect user preference for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };
  let animationFrameId;

  // Configuration
  const PARTICLE_COUNT_DESKTOP = 65;
  const PARTICLE_COUNT_MOBILE = 35;
  const CONNECT_DISTANCE = 140;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    initParticles();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2.5 + 1.2;
      this.baseRadius = this.radius;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      
      // 80% cyan, 20% gold nodes
      const isGold = Math.random() > 0.8;
      this.color = isGold ? '#F5C451' : '#00BFFF';
      this.glowColor = isGold ? 'rgba(245, 196, 81, 0.4)' : 'rgba(0, 191, 255, 0.4)';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off screen boundaries smoothly
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interactive reaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = dx / dist;
          const dirY = dy / dist;
          this.x -= dirX * force * 2.5;
          this.y -= dirY * force * 2.5;
        }
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.glowColor;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    const count = window.innerWidth < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DISTANCE) {
          const alpha = (1 - dist / CONNECT_DISTANCE) * 0.35;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          
          // Slight gradient between cyan and blue
          ctx.strokeStyle = `rgba(0, 191, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    connectParticles();
    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  // Touch support for mobile interaction
  window.addEventListener('touchmove', function (e) {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }
  }, { passive: true });

  window.addEventListener('touchend', function () {
    mouse.x = null;
    mouse.y = null;
  });

  // Start animation
  resize();
  animate();
})();
