'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RESUME_PATH } from '../lib/site';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'Projects', href: '#projects' },
  { name: 'Resume', href: '#resume' },
];

type PillPosition = { left: number; width: number; opacity: number };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = 'flex items-center justify-between p-6 lg:px-8 bg-gradient-to-b from-black/40 via-black/10 to-transparent ' + (scrolled ? 'pointer-events-none' : '');
  // Hidden below lg: the pill is wider than a phone viewport, and the top-bar
  // links are lg-only too, so mobile keeps just the wordmark + Resume CTA.
  const pillClass = 'hidden lg:block absolute top-4 left-1/2 -translate-x-1/2 ' + (scrolled ? '' : 'pointer-events-none');

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        className={navClass}
      >
        <div className="flex lg:flex-1">
          <a
            href="#home"
            className="font-display text-xl font-bold [text-shadow:0_1px_3px_rgb(0_0_0_/_0.6)]"
          >
            <span className="text-white">Anish</span>{' '}
            <span className="text-[#4B9CD3]">Patel</span>
          </a>
        </div>
        <div className="hidden lg:mr-44 lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0_/_0.6)] hover:text-[#4B9CD3] transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : -20 }}
        transition={{ duration: 0.3 }}
        className={pillClass}
      >
        <PillNav />
      </motion.div>

      {/* Sits outside <motion.nav> so it survives the scroll swap */}
      <a
        href={RESUME_PATH}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-5 right-6 lg:right-8 z-50 rounded-full border border-[#4B9CD3]/60 bg-[#0A0B0D]/60 px-4 py-2 font-display text-sm font-medium text-[#4B9CD3] backdrop-blur-md transition-colors hover:bg-[#4B9CD3] hover:text-white"
      >
        Open Resume ↗
      </a>
    </header>
  );
}

function PillNav() {
  const [position, setPosition] = useState<PillPosition>({ left: 0, width: 0, opacity: 0 });
  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border border-[#4B9CD3] bg-[#0A0B0D]/90 backdrop-blur-md p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {navigation.map((item) => (
        <PillTab key={item.name} setPosition={setPosition} href={item.href}>
          {item.name}
        </PillTab>
      ))}
      <PillCursor position={position} />
    </ul>
  );
}

function PillTab({ children, setPosition, href }: { children: React.ReactNode; setPosition: React.Dispatch<React.SetStateAction<PillPosition>>; href: string }) {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 block cursor-pointer"
    >
      <a href={href} className="block px-4 py-2 text-xs uppercase tracking-wider text-white md:px-5 md:py-2.5 md:text-sm font-medium">
        {children}
      </a>
    </li>
  );
}

function PillCursor({ position }: { position: PillPosition }) {
  return <motion.li animate={position} className="absolute z-0 h-8 md:h-10 rounded-full bg-[#4B9CD3]" />;
}