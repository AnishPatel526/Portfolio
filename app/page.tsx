'use client';

import { useEffect, useRef } from 'react';
import {
  FaGithub, FaLinkedin, FaEnvelope,
  FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaJava,
  FaGitAlt, FaHtml5, FaCss3Alt
} from 'react-icons/fa';
import {
  SiPostgresql, SiTypescript, SiJavascript, SiGo, SiSwift, SiPytorch
} from 'react-icons/si';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Chatbot from './modules/chatbot';
import CursorGlow from './modules/cursor-glow';
import ExperienceTimeline from './modules/experience-timeline';
import Projects from './modules/projects';
import Footer from './modules/footer';
import { RESUME_PATH, SOCIALS } from './lib/site';

export default function PortfolioLanding() {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffect = useRef<any>(null);

  // Particle canvas background
  useEffect(() => {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { VANTA?: { WAVES: (opts: object) => { destroy: () => void } } };
  if (!w.VANTA || !vantaRef.current) return;

  const effect = w.VANTA.WAVES({
    el: vantaRef.current,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 1,
    scaleMobile: 1,
    color: 0x111111,
    shininess: 30,
    waveHeight: 15,
    waveSpeed: 1,
    zoom: 1,
  });

  return () => {
    effect.destroy();
  };
}, []);

useEffect(() => {
  const handleScroll = () => {
    const dim = document.getElementById('bg-dim');
    if (!dim) return;
    const heroHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const opacity = Math.min(scrolled / heroHeight, 0.6);
    dim.style.setProperty('--bg-dim', String(opacity));
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  // Section animations
  const aboutControls = useAnimation();
  const [aboutRef, aboutInView] = useInView({ threshold: 0.2, triggerOnce: true });
  useEffect(() => {
    if (aboutInView) aboutControls.start({ opacity: 1, y: 0 });
  }, [aboutInView, aboutControls]);

  const expControls = useAnimation();
  const [expRef, expInView] = useInView({ threshold: 0.2, triggerOnce: true });
  useEffect(() => {
    if (expInView) expControls.start({ opacity: 1, y: 0 });
  }, [expInView, expControls]);

  const projectControls = useAnimation();
  const [projectRef, projectInView] = useInView({ threshold: 0.2, triggerOnce: true });
  useEffect(() => {
    if (projectInView) projectControls.start({ opacity: 1, y: 0 });
  }, [projectInView, projectControls]);

  return (
    <>
      {/* Particle background */}
<div
  ref={vantaRef}
  className="fixed inset-0 z-0"
  style={{ width: '100vw', height: '100vh' }}
  aria-hidden="true"
/>

{/* Dim overlay */}
<div
  id="bg-dim"
  className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-500"
  style={{ background: '#0A0B0D', opacity: 'var(--bg-dim, 0)' }}
  aria-hidden="true"
/>

{/* Pointer glow — above the background layers, below all content */}
<CursorGlow />

      {/* Hero */}
      <main className="relative z-10 isolate px-6 lg:px-8">
        <div id="home" className="mx-auto h-screen flex flex-col lg:flex-row justify-center items-center gap-4 max-w-5xl">
          {/* Left Side */}
          <div className="text-center lg:text-left">
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-[#4B9CD3]">Anish Patel</span>
            </h1>
            <p className="mt-4 text-2xl text-white">
              I build things that work.
            </p>
            <div className="mt-6 flex justify-center lg:justify-start gap-5">
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="text-white hover:text-[#4B9CD3] h-7 w-7 transition-colors" />
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-white hover:text-[#4B9CD3] h-7 w-7 transition-colors" />
              </a>
              <a href={SOCIALS.email} aria-label="Email">
                <FaEnvelope className="text-white hover:text-[#4B9CD3] h-7 w-7 transition-colors" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href="#experiences"
                className="inline-block rounded-md border border-[#4B9CD3] px-5 py-2.5 font-display text-lg font-bold text-[#4B9CD3] transition-colors hover:bg-[#4B9CD3] hover:text-white"
              >
                View my work ↓
              </a>
              <a
                href={SOCIALS.email}
                className="inline-block rounded-md border border-[#4B9CD3] bg-[#4B9CD3] px-5 py-2.5 font-display text-lg font-bold text-white transition-colors hover:border-[#5FAEE0] hover:bg-[#5FAEE0]"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Right Side - Headshot */}
          <div className="flex justify-center border-[#4B9CD3] rounded-full border-[6px]">
            <img
              src="/headshot.jpg"
              alt="Anish Patel"
              className="w-72 h-72 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#6B7079] text-xs uppercase tracking-widest flex flex-col items-center gap-2">
          <div className="w-px h-9 bg-[#262A30] relative overflow-hidden">
            <motion.div
              className="w-1 h-1 bg-[#4B9CD3] rounded-full absolute left-1/2 -translate-x-1/2"
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span>scroll</span>
        </div>
      </main>

      {/* About */}
      <section id="about" className="relative z-10 text-white py-24 px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            ref={aboutRef}
            initial={{ opacity: 0, y: 50 }}
            animate={aboutControls}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-12 text-center">
              About
              </h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
  <div className="space-y-5 text-[#A8ADB5] text-base leading-relaxed">
                <p>
                  Hi! I am a student at the University of North Carolina at Chapel Hill double majoring in Computer Science and Statistics and Analytics. I have a passion for software engineering, doing research, and building meaningful projects. I enjoy working across the stack, from designing backend systems and APIs to building data pipelines and integrating machine learning models. Most of my work is centered around solving practical problems, whether that is improving system performance, analyzing real-world data, or creating tools that are actually useful outside of a classroom setting.
                </p>
                <p>
                  Outside of class, I spend a lot of time staying active and competitive. I play football and chess, train boxing, and probably spend more time than I should on Rocket League.I like building things that actually work, figuring out hard problems, and getting better every time I sit down to code.
                </p>
              </div>
              <div>
  <div className="bg-[#15171B] border border-[#262A30] rounded-2xl p-7">
    <h3 className="text-sm text-[#6B7079] uppercase tracking-widest mb-5">Tech Stack</h3>
    <div className="grid grid-cols-3 gap-3">
      {([
        ['Python', FaPython, 'text-blue-400'],
        ['Java', FaJava, 'text-red-500'],
        ['JavaScript', SiJavascript, 'text-yellow-400'],
        ['TypeScript', SiTypescript, 'text-blue-500'],
        ['React', FaReact, 'text-cyan-400'],
        ['Node.js', FaNodeJs, 'text-green-500'],
        ['SQL', SiPostgresql, 'text-blue-300'],
        ['AWS', FaAws, 'text-orange-400'],
        ['Docker', FaDocker, 'text-blue-500'],
        ['Git', FaGitAlt, 'text-orange-500'],
        ['HTML', FaHtml5, 'text-orange-600'],
        ['CSS', FaCss3Alt, 'text-blue-400'],
        ['Go', SiGo, 'text-cyan-400'],
        ['Swift', SiSwift, 'text-orange-500'],
        ['PyTorch', SiPytorch, 'text-orange-600'],
      ] as const).map(([name, Icon, color]) => (
        <div
          key={name}
          className="flex flex-col items-center justify-center gap-2 bg-[#1C1F24] border border-[#262A30] rounded-lg py-4 hover:border-[#3A3F47] transition-colors"
        >
          <Icon className={`h-7 w-7 ${color}`} />
          <span className="text-xs text-[#A8ADB5]">{name}</span>
        </div>
      ))}
    </div>
  </div>
</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="relative z-10 text-white py-24 px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            ref={expRef}
            initial={{ opacity: 0, y: 50 }}
            animate={expControls}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-12 text-center">Featured Experiences</h2>
            <ExperienceTimeline />
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative z-10 text-white py-24 px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            ref={projectRef}
            initial={{ opacity: 0, y: 50 }}
            animate={projectControls}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-12 text-center">Featured Projects</h2>
            <Projects />
          </motion.div>
        </div>
      </section>

      {/* Resume */}
      <section id="resume" className="relative z-10 text-white py-24 px-6 lg:px-8 min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Left: Title + Button */}
            <div className="flex flex-col items-center justify-center text-center flex-1">
              <h2 className="font-display text-5xl font-bold mb-8">Resume</h2>
              <a
                href={RESUME_PATH}
                download
                className="inline-block rounded-md border border-[#4B9CD3] px-5 py-2.5 text-lg font-bold text-[#4B9CD3] hover:bg-[#4B9CD3] hover:text-white transition-colors"
              >
                Download PDF
              </a>
            </div>
            {/* Right: Preview */}
            <div className="flex-1 w-full max-w-3xl">
              <div className="w-full h-[80vh] border border-[#262A30] rounded-md overflow-hidden bg-white">
                <iframe
                  src={RESUME_PATH}
                  className="w-full h-full"
                  title="Anish Patel Resume Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Chatbot floats over everything */}
      <Chatbot />
    </>
  );
}
