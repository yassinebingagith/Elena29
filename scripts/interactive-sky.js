(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let canvas, ctx;
  let width = 0, height = 0, dpr = 1;
  let animationFrameId = null;
  let isRunning = false;

  // Pointer state with fluid lerp
  const targetPointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35, active: true };
  const currentPointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 };
  let windBiasX = 0;

  // Particles & Time
  let flakes = [];
  let sparkles = [];
  let time = 0;

  const isMobile = () => window.innerWidth < 768;
  const maxFlakes = () => (isMobile() ? 14 : 26);

  class Snowflake {
    constructor(resetY = false) {
      this.reset(resetY);
    }

    reset(resetY = false) {
      this.x = Math.random() * width;
      this.y = resetY ? -10 : Math.random() * height;
      this.radius = Math.random() * 2.2 + 0.8;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.speedY = Math.random() * 0.6 + 0.3;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.008;
      this.vx = 0;
      this.vy = 0;
    }

    update() {
      this.wobble += this.wobbleSpeed;
      const waveX = Math.sin(this.wobble) * 0.4;

      // Pointer wind deflection
      if (currentPointer) {
        const dx = this.x - currentPointer.x;
        const dy = this.y - currentPointer.y;
        const dist = Math.hypot(dx, dy);
        const maxDist = isMobile() ? 120 : 160;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 2.2;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
      }

      this.vx *= 0.92;
      this.vy *= 0.92;

      this.x += this.speedX + waveX + windBiasX + this.vx;
      this.y += this.speedY + this.vy;

      if (this.y > height + 10) this.reset(true);
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
    }

    draw(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity.toFixed(2)})`;
      ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
      ctx.shadowBlur = 5;
      ctx.fill();
      ctx.restore();
    }
  }

  class Sparkle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.8 + 1.4;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 0.6;
      this.size = Math.random() * 3.0 + 1.2;
      this.life = 1.0;
      this.decay = Math.random() * 0.03 + 0.025;
      this.hue = Math.random() > 0.5 ? 165 : 195;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.04;
      this.vx *= 0.96;
      this.life -= this.decay;
    }

    draw(ctx) {
      if (this.life <= 0) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 90%, 75%, ${this.life.toFixed(2)})`;
      ctx.shadowColor = `hsla(${this.hue}, 100%, 75%, 0.9)`;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    }
  }

  function spawnSparkleBurst(x, y, count = 12) {
    if (reduceMotion.matches) return;
    for (let i = 0; i < count; i++) {
      sparkles.push(new Sparkle(x, y));
    }
  }

  function initCanvas() {
    canvas = document.getElementById("interactiveSkyCanvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    flakes = [];
    const count = maxFlakes();
    for (let i = 0; i < count; i++) {
      flakes.push(new Snowflake(false));
    }

    const updatePointer = (clientX, clientY) => {
      targetPointer.x = clientX;
      targetPointer.y = clientY;
      targetPointer.active = true;
    };

    window.addEventListener("mousemove", (e) => updatePointer(e.clientX, e.clientY), { passive: true });
    window.addEventListener("pointermove", (e) => updatePointer(e.clientX, e.clientY), { passive: true });

    window.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        updatePointer(touch.clientX, touch.clientY);
        spawnSparkleBurst(touch.clientX, touch.clientY, isMobile() ? 10 : 14);
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        updatePointer(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    window.addEventListener("click", (e) => {
      spawnSparkleBurst(e.clientX, e.clientY, isMobile() ? 8 : 12);
    }, { passive: true });

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", (e) => {
        if (e.gamma !== null) {
          windBiasX = (e.gamma / 45) * 0.4;
        }
      }, { passive: true });
    }

    startAnimation();
  }

  function resizeCanvas() {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (ctx) ctx.scale(dpr, dpr);

    const targetCount = maxFlakes();
    while (flakes.length < targetCount) flakes.push(new Snowflake(true));
    if (flakes.length > targetCount) flakes.length = targetCount;
  }

  function drawDominantAurora() {
    time += 0.009;

    // Smooth pointer lerp
    currentPointer.x += (targetPointer.x - currentPointer.x) * 0.12;
    currentPointer.y += (targetPointer.y - currentPointer.y) * 0.12;

    const scrollY = window.scrollY || 0;
    const scrollFactor = Math.min(scrollY / 1200, 1);

    // 1. TOUCH AURORA SWIRL CORE (Glowing flare centered under touch/cursor)
    ctx.save();
    const touchGlowRadius = isMobile() ? 160 : 230;
    const touchGrad = ctx.createRadialGradient(
      currentPointer.x, currentPointer.y, 0,
      currentPointer.x, currentPointer.y, touchGlowRadius
    );
    touchGrad.addColorStop(0, "rgba(52, 211, 153, 0.42)");
    touchGrad.addColorStop(0.35, "rgba(56, 189, 248, 0.28)");
    touchGrad.addColorStop(0.7, "rgba(167, 139, 250, 0.15)");
    touchGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = touchGrad;
    ctx.beginPath();
    ctx.arc(currentPointer.x, currentPointer.y, touchGlowRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. DOMINANT AURORA CURTAINS & WAVES
    const ribbons = [
      { yRatio: 0.15, height: 220, color1: "rgba(16, 185, 129, 0.42)", color2: "rgba(56, 189, 248, 0.25)", speed: 1.0, pull: 0.45 },
      { yRatio: 0.26, height: 260, color1: "rgba(6, 182, 212, 0.38)", color2: "rgba(236, 72, 153, 0.22)", speed: 0.7, pull: 0.60 },
      { yRatio: 0.38, height: 230, color1: "rgba(139, 92, 246, 0.35)", color2: "rgba(16, 185, 129, 0.20)", speed: 1.3, pull: 0.50 }
    ];

    ribbons.forEach((r, idx) => {
      ctx.save();
      ctx.beginPath();

      const baseY = height * r.yRatio + Math.sin(time * r.speed + idx) * 45 - scrollY * 0.2;
      
      // Direct touch displacement (pulls curve towards finger/mouse X & Y)
      const touchDx = (currentPointer.x - width * 0.5) * r.pull;
      const touchDy = (currentPointer.y - baseY) * (0.35 * r.pull);

      ctx.moveTo(-60, baseY);

      const cp1x = width * 0.25 + touchDx;
      const cp1y = baseY - 50 + touchDy + Math.sin(time * 1.5 + idx) * 55;
      const cp2x = width * 0.75 + touchDx;
      const cp2y = baseY + 50 + touchDy + Math.cos(time * 1.3 + idx) * 55;
      const endX = width + 60;
      const endY = baseY + Math.sin(time * 1.1 + idx) * 30;

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
      ctx.lineTo(endX, endY + r.height + scrollFactor * 50);
      ctx.bezierCurveTo(cp2x, cp2y + r.height, cp1x, cp1y + r.height, -60, baseY + r.height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseY - 40, width, baseY + r.height);
      grad.addColorStop(0, r.color1);
      grad.addColorStop(0.5, r.color2);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.filter = "blur(28px)";
      ctx.fill();
      ctx.restore();
    });

    // 3. SHIMMERING VERTICAL AURORA RAYS (Curtain light beams)
    ctx.save();
    const rayCount = isMobile() ? 6 : 12;
    for (let r = 0; r < rayCount; r++) {
      const rx = (width / rayCount) * r + Math.sin(time * 0.8 + r) * 30;
      const ry = height * 0.05 + Math.cos(time + r) * 20;
      const rWidth = 25 + Math.sin(time * 2 + r) * 15;
      const rHeight = 180 + Math.sin(time * 1.5 + r) * 60;

      const rayGrad = ctx.createLinearGradient(rx, ry, rx, ry + rHeight);
      rayGrad.addColorStop(0, "rgba(52, 211, 153, 0.22)");
      rayGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.12)");
      rayGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = rayGrad;
      ctx.filter = "blur(18px)";
      ctx.fillRect(rx - rWidth / 2, ry, rWidth, rHeight);
    }
    ctx.restore();
  }

  function render() {
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    if (!reduceMotion.matches) {
      drawDominantAurora();

      for (let i = 0; i < flakes.length; i++) {
        flakes[i].update();
        flakes[i].draw(ctx);
      }

      for (let i = sparkles.length - 1; i >= 0; i--) {
        sparkles[i].update();
        sparkles[i].draw(ctx);
        if (sparkles[i].life <= 0) {
          sparkles.splice(i, 1);
        }
      }
    }

    if (isRunning) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  function startAnimation() {
    if (isRunning) return;
    isRunning = true;
    render();
  }

  function stopAnimation() {
    isRunning = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCanvas);
  } else {
    initCanvas();
  }
})();
