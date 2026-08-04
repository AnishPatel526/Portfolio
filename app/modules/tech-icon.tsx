'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { IconType } from 'react-icons';

export default function TechIcon({
  icon: Icon,
  label,
  className = '',
}: {
  icon: IconType;
  label: string;
  className?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-flex outline-none"
      tabIndex={0}
      aria-label={label}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <Icon className={`h-6 w-6 ${className}`} aria-hidden="true" />
      <AnimatePresence>
        {show && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[#4B9CD3]/50 bg-[#1C1F24] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white shadow-lg"
          >
            {label}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[#4B9CD3]/50 bg-[#1C1F24]"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
