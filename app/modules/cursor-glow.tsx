'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING = { stiffness: 200, damping: 30, mass: 0.5 };

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);

  // Start far off-screen so the glow does not flash at (0,0) on mount.
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);

    let rafId = 0;
    const handleMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        rafId = 0;
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed z-[2] pointer-events-none"
      style={{
        left: springX,
        top: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 320,
        height: 320,
        borderRadius: '9999px',
        background:
          'radial-gradient(circle, rgba(75,156,211,0.18) 0%, rgba(75,156,211,0.06) 40%, transparent 70%)',
        filter: 'blur(60px)',
        mixBlendMode: 'plus-lighter',
        willChange: 'transform',
      }}
    />
  );
}
