import { useEffect, useRef } from 'react';

import { clickSound, tickSound } from '../lib/sound.js';

const HOVER_SEL = 'a, button, [data-cursor="hover"], [data-magnetic], input, textarea, label';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const burstLayerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const burstLayer = burstLayerRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let magnetic = null;
    let lastTick = 0;
    let rafId;

    // Dot moves INSTANTLY with the mouse — no lerp.
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Only the ring lerps — and magnetic pull only applies to the ring.
    const animate = () => {
      let tx = mouseX;
      let ty = mouseY;
      if (magnetic) {
        const r = magnetic.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        tx = mouseX + (cx - mouseX) * 0.35;
        ty = mouseY + (cy - mouseY) * 0.35;
      }
      ringX += (tx - ringX) * 0.22;
      ringY += (ty - ringY) * 0.22;
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    // Event delegation — one listener on document, no DOM scanning, no observer.
    const onOver = (e) => {
      const el = e.target.closest(HOVER_SEL);
      if (!el || el === magnetic) return;
      magnetic = el;
      ring && ring.classList.add('hovering');
      const now = performance.now();
      if (now - lastTick > 120) {
        lastTick = now;
        tickSound();
      }
    };

    const onOut = (e) => {
      const to = e.relatedTarget;
      if (magnetic && (!to || !magnetic.contains(to))) {
        const stillIn = to && to.closest && to.closest(HOVER_SEL);
        if (!stillIn) {
          magnetic = null;
          ring && ring.classList.remove('hovering');
        }
      }
    };

    const onClick = (e) => {
      clickSound();
      if (!burstLayer) return;
      const burst = document.createElement('span');
      burst.className = 'cursor-burst';
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;

      const palette = ['#00F0FF', '#FF2E97', '#B6FF3C', '#FFD24A', '#9B5DE5'];
      for (let i = 0; i < 12; i += 1) {
        const spark = document.createElement('span');
        spark.className = 'cursor-spark';
        const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 28 + Math.random() * 22;
        spark.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
        spark.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
        spark.style.background = palette[i % palette.length];
        burst.appendChild(spark);
      }
      burstLayer.appendChild(burst);
      setTimeout(() => burst.remove(), 700);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    window.addEventListener('click', onClick);

    animate();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={burstLayerRef} className="cursor-burst-layer" />
    </>
  );
};

export default CustomCursor;
