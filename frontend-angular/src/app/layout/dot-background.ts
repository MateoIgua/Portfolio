import { afterNextRender, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';

// Fondo animado: una grilla de puntos tenues; los puntos cercanos al cursor
// se encienden y crecen, y se apagan suavemente cuando el cursor se aleja.
//
// - Se dibuja en un <canvas> fijo detrás de todo el contenido (z-index: -1),
//   por eso solo se ve en las zonas sin fondo propio (hero, secciones).
// - El canvas tiene pointer-events: none, así que el mouse lo "atraviesa" y
//   se escucha en window.
// - El bucle de animación solo corre mientras hay algo que animar (cursor
//   sobre la página o puntos apagándose); en reposo no consume CPU.
// - Con prefers-reduced-motion se dibuja la grilla estática, sin efecto.
// - La app no usa zone.js (zoneless), así que requestAnimationFrame no
//   dispara detección de cambios de Angular en cada frame.

const SPACING = 28; // px entre puntos
const INFLUENCE = 170; // px de radio de influencia del cursor
const EASE = 0.14; // velocidad de encendido/apagado (0-1)
const BASE_ALPHA = 0.16; // opacidad de un punto "apagado"
const BASE_RADIUS = 1;
const MAX_GROWTH = 2.8; // cuánto crece el radio al encenderse

@Component({
  selector: 'app-dot-background',
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  styles: `
    canvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
    }
  `,
})
export class DotBackground {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // afterNextRender: el canvas ya existe en el DOM (y estamos en el navegador).
    afterNextRender(() => this.start());
  }

  private start(): void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let levels = new Float32Array(0); // intensidad 0..1 de cada punto
    let mouseX = -9999;
    let mouseY = -9999;
    let rafId = 0;

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(frame);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;
      levels = new Float32Array(cols * rows);
      schedule();
    };

    const frame = () => {
      rafId = 0;
      ctx.clearRect(0, 0, width, height);

      // 1) Todos los puntos base en un solo trazado (rápido).
      ctx.fillStyle = `rgba(74, 240, 74, ${BASE_ALPHA})`;
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING + SPACING / 2;
          const y = r * SPACING + SPACING / 2;
          ctx.moveTo(x + BASE_RADIUS, y);
          ctx.arc(x, y, BASE_RADIUS, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      if (reduceMotion) return;

      // 2) Puntos encendidos: cada uno se acerca (EASE) a su intensidad objetivo.
      const influence2 = INFLUENCE * INFLUENCE;
      let animating = mouseX > -9000;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const x = c * SPACING + SPACING / 2;
          const y = r * SPACING + SPACING / 2;
          const dx = x - mouseX;
          const dy = y - mouseY;
          const d2 = dx * dx + dy * dy;
          const target = d2 < influence2 ? (1 - Math.sqrt(d2) / INFLUENCE) ** 2 : 0;

          let level = levels[i] + (target - levels[i]) * EASE;
          if (level < 0.01 && target === 0) level = 0;
          levels[i] = level;
          if (level === 0) continue;

          animating = true;
          const red = Math.round(74 + 40 * level); // verde → verde un poco más claro
          const green = Math.round(240 + 15 * level);
          const blue = Math.round(74 + 40 * level);
          const alpha = BASE_ALPHA + (1 - BASE_ALPHA) * level;
          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, BASE_RADIUS + MAX_GROWTH * level, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (animating) schedule();
    };

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      schedule();
    };
    const onPointerLeave = () => {
      mouseX = mouseY = -9999;
      schedule();
    };

    resize();
    window.addEventListener('resize', resize);
    if (!reduceMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    });
  }
}
