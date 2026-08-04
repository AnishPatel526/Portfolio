'use client';

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SOCIALS } from '../lib/site';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'Projects', href: '#projects' },
  { name: 'Resume', href: '#resume' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#262A30] px-6 py-12 text-white lg:px-8">
      <div className="container mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-bold">
            <span className="text-white">Anish</span>{' '}
            <span className="text-[#4B9CD3]">Patel</span>
          </p>
          <p className="mt-1 text-sm text-[#A8ADB5]">I build things that work.</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-[#A8ADB5] transition-colors hover:text-[#4B9CD3]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex gap-5">
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="h-6 w-6 text-white transition-colors hover:text-[#4B9CD3]" />
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-6 w-6 text-white transition-colors hover:text-[#4B9CD3]" />
          </a>
          <a href={SOCIALS.email} aria-label="Email">
            <FaEnvelope className="h-6 w-6 text-white transition-colors hover:text-[#4B9CD3]" />
          </a>
        </div>
      </div>

      <div className="container mx-auto mt-10 max-w-6xl">
        <p className="text-xs text-[#6B7079]">© 2026 Anish Patel</p>
      </div>
    </footer>
  );
}
