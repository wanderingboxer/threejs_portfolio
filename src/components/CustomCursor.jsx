import { useEffect, useRef } from 'react';

import { clickSound, tickSound } from '../lib/sound.js';

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
    let dotX = mouseX;
    let dotY = mouseY;
    let magnetic = null;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Magnetic pull on hovered target
      let tx = mouseX;
      let ty = mouseY;
      if (magnetic) {
        const r = magnetic.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        tx = mouseX + (cx - mouseX) * 0.35;
        ty = mouseY + (cy - mouseY) * 0.35;
      }
      dotX += (tx - dotX) * 0.55;
      dotY += (ty - dotY) * 0.55;
      ringX += (tx - ringX) * 0.18;
      ringY += (ty - ringY) * 0.18;
      if (dot) dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      if (ring) ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = (e) => {
      if (!ring) return;
      ring.classList.add('hovering');
      const el = e.currentTarget;
      if (el.dataset?.magnetic !== undefined || el.tagName === 'BUTTON' || el.tagName === 'A') {
        magnetic = el;
      }
      tickSound();
    };
    const onLeave = () => {
      ring && ring.classList.remove('hovering');
      magnetic = null;
    };

    const onClick = (e) => {
      clickSound();
      if (!burstLayer) return;
      const burst = document.createElement('span');
      burst.className = 'cursor-burst';
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;

      // 12 sparks in random colors
      const palette = ['#00F0FF', '#FF2E97', '#B6FF3C', '#FFD24A', '#9B5DE5'];
      for (let i = 0; i < 12; i += 1) {
        const spark = document.createElement('span');
        spark.className = 'cursor-spark';
        const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 28 + Math.random() * 22;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        spark.style.setProperty('--dx', `${dx}px`);
        spark.style.setProperty('--dy', `${dy}px`);
        spark.style.background = palette[i % palette.length];
        burst.appendChild(spark);
      }
      burstLayer.appendChild(burst);
      setTimeout(() => burst.remove(), 700);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    const SEL = 'a, button, [data-cursor="hover"], [data-magnetic], input, textarea, label';
    const bind = (el) => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = '1';
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    };
    document.querySelectorAll(SEL).forEach(bind);

    const observer = new MutationObserver(() => {
      document.querySelectorAll(SEL).forEach(bind);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    animate();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      observer.disconnect();
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
