'use client';

import { useEffect, useRef } from 'react';
import {
  FaGithub, FaLinkedin, FaEnvelope,
  FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaJava,
  FaGitAlt, FaHtml5, FaCss3Alt
} from 'react-icons/fa';
import {
  SiPandas, SiScikitlearn, SiPostgresql, SiFlask, SiTypescript, SiJavascript
} from 'react-icons/si';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Chatbot from './modules/chatbot';

export default function PortfolioLanding() {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffect = useRef<any>(null);

  // Particle canvas background
  useEffect(() => {
  let effect: { destroy: () => void } | null = null;
  let mounted = true;

  const init = async () => {
    if (typeof window === 'undefined') return;
    const THREE = await import('three');
    // Make THREE available globally for vanta
    (window as unknown as { THREE: typeof THREE }).THREE = THREE;
    const VANTA = await import('vanta/dist/vanta.waves.min');
    if (!mounted || !vantaRef.current) return;
    effect = VANTA.default({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color: 0x111111,
    });
  };

  init();

  return () => {
    mounted = false;
    if (effect) effect.destroy();
  };
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
      <div ref={vantaRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />

      {/* Hero */}
      <main className="relative z-10 isolate px-6 lg:px-8">
        <div id="home" className="mx-auto h-screen flex flex-col lg:flex-row justify-center items-center gap-12 max-w-7xl">
          {/* Left Side */}
          <div className="text-center lg:text-left flex-1">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-[#4B9CD3]">Anish Patel</span>
            </h1>
            <p className="mt-4 text-2xl text-white">
              I build things that work.
            </p>
            <div className="mt-6 flex justify-center lg:justify-start gap-5">
              <a
                href="https://github.com/AnishPatel526"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="text-white hover:text-[#4B9CD3] h-7 w-7 transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/anish-patel1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-white hover:text-[#4B9CD3] h-7 w-7 transition-colors" />
              </a>
              <a href="mailto:abpatel1@unc.edu" aria-label="Email">
                <FaEnvelope className="text-white hover:text-[#4B9CD3] h-7 w-7 transition-colors" />
              </a>
            </div>
            <div className="mt-10">
              <a
                href="#experiences"
                className="inline-block rounded-md border border-[#4B9CD3] px-5 py-2.5 text-lg font-bold text-[#4B9CD3] hover:bg-[#4B9CD3] hover:text-white transition-colors"
              >
                View my work ↓
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
            <h2 className="text-4xl lg:text-5xl font-bold mb-12">
              About
            </h2>
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-5 text-[#A8ADB5] text-base leading-relaxed">
                <p>
                  I am a Computer Science and Statistics sophomore at UNC Chapel Hill. I build software, do research, and ship projects that solve real problems. Right now I am co founder of KarvBill, an AI tool that audits medical bills, and I am recruiting for summer 2026 software engineering internships.
                </p>
                <p>
                  Outside of class I play football and chess, train boxing, and spend too much time on Rocket League. I care about writing clean code, working on hard problems, and learning fast.
                </p>
              </div>
              <div className="lg:col-span-5">
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
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">Featured Experiences</h2>
            <div className="space-y-6">

              {/* Sports Media Inc */}
              <div className="flex flex-col lg:flex-row gap-8 bg-[#15171B] border border-[#262A30] p-8 rounded-2xl items-center">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold">Sports Media Inc.</h3>
                  <p className="text-lg italic text-[#A8ADB5] mt-1">Software Engineering Intern</p>
                  <div className="mt-4 space-y-3 text-[#A8ADB5]">
                    <p>- Built a token based authentication system in Python and Java that increased login success by 30 percent and reduced reported issues by 25 percent</p>
                    <p>- Cut page load times by 1.2 seconds by optimizing API calls and shipping mobile first updates across the platform</p>
                    <p>- Deployed features to over 5,000 accounts working with a team of 5 engineers in Agile sprints</p>
                  </div>
                </div>
                <div className="w-48 h-32 rounded-lg border border-[#262A30] flex items-center justify-center text-[#A8ADB5] font-medium text-sm flex-shrink-0">
                  Sports Media Inc.
                </div>
              </div>

              {/* NC A&T */}
              <div className="flex flex-col lg:flex-row gap-8 bg-[#15171B] border border-[#262A30] p-8 rounded-2xl items-center">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold">NC A&T State University</h3>
                  <p className="text-lg italic text-[#A8ADB5] mt-1">Research Intern</p>
                  <div className="mt-4 space-y-3 text-[#A8ADB5]">
                    <p>- Hit 95 percent classification accuracy detecting CAN bus cyberattacks across 5 ML models including Random Forest, KNN, SVM, and Isolation Forest</p>
                    <p>- Boosted detection performance by 20 percent through feature engineering and cross validation pipelines</p>
                    <p>- Co authored a peer reviewed paper presented at the 2024 icABCD Conference on automotive cybersecurity</p>
                  </div>
                </div>
                <div className="w-48 h-32 rounded-lg border border-[#262A30] flex items-center justify-center text-[#A8ADB5] font-medium text-sm flex-shrink-0">
                  NC A&T
                </div>
              </div>

              {/* UNC Dentistry */}
              <div className="flex flex-col lg:flex-row gap-8 bg-[#15171B] border border-[#262A30] p-8 rounded-2xl items-center">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold">UNC School of Dentistry</h3>
                  <p className="text-lg italic text-[#A8ADB5] mt-1">Computer Support Technician</p>
                  <div className="mt-4 space-y-3 text-[#A8ADB5]">
                    <p>- 90 percent first contact resolution rate across 150 plus faculty, staff, and students</p>
                    <p>- Reduced new user downtime by 35 percent by completing 100 plus hardware and software setups</p>
                    <p>- Led onboarding sessions for 50 plus users on personal and university issued devices</p>
                  </div>
                </div>
                <div className="w-48 h-32 rounded-lg border border-[#262A30] flex items-center justify-center text-[#A8ADB5] font-medium text-sm flex-shrink-0">
                  UNC Dentistry
                </div>
              </div>

            </div>
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
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* KarvBill */}
              <div className="bg-[#15171B] border border-[#262A30] rounded-2xl p-6 flex flex-col justify-between min-h-[420px] hover:border-[#3A3F47] transition-colors">
                <div>
                  <h3 className="text-xl font-bold mb-3">KarvBill</h3>
                  <p className="text-[#A8ADB5] mb-4 text-sm leading-relaxed">
                    AI medical bill auditor. End to end pipeline that ingests itemized bills and surfaces pricing anomalies, duplicate charges, and overbilling.
                  </p>
                  <ul className="text-sm text-[#6B7079] list-disc pl-4 space-y-1.5">
                    <li>Built with Python, AWS Textract, Pandas, scikit learn</li>
                    <li>Hosted on AWS Elastic Beanstalk with S3 backed storage</li>
                    <li>Combines ML based and rule driven validation checks</li>
                    <li>Handles multiple claim formats end to end</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <div className="flex gap-3 mb-4">
                    <FaPython className="h-6 w-6 text-blue-400" title="Python" />
                    <FaAws className="h-6 w-6 text-orange-400" title="AWS" />
                    <SiPandas className="h-6 w-6 text-white" title="Pandas" />
                    <SiScikitlearn className="h-6 w-6 text-orange-500" title="scikit-learn" />
                    <FaDocker className="h-6 w-6 text-blue-500" title="Docker" />
                  </div>
                  <div className="flex gap-4 text-[#4B9CD3]">
                    <a href="https://github.com/AnishPatel526" target="_blank" rel="noopener noreferrer" title="GitHub Repo" aria-label="KarvBill GitHub">
                      <FaGithub className="h-6 w-6 hover:opacity-70 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>

              {/* SideLine */}
              <div className="bg-[#15171B] border border-[#262A30] rounded-2xl p-6 flex flex-col justify-between min-h-[420px] hover:border-[#3A3F47] transition-colors">
                <div>
                  <h3 className="text-xl font-bold mb-3">SideLine</h3>
                  <p className="text-[#A8ADB5] mb-4 text-sm leading-relaxed">
                    Real time NBA analytics dashboard. Aggregates live game data and betting odds across 3 plus APIs and surfaces favorable prop bet opportunities.
                  </p>
                  <ul className="text-sm text-[#6B7079] list-disc pl-4 space-y-1.5">
                    <li>Built with React, Node.js, WebSockets, Python, PostgreSQL</li>
                    <li>Python pipeline normalizes data across 1,200 plus games</li>
                    <li>Prop bet screener cross references live performance against book lines</li>
                    <li>Tracks line movement in real time</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <div className="flex gap-3 mb-4">
                    <FaReact className="h-6 w-6 text-cyan-400" title="React" />
                    <FaNodeJs className="h-6 w-6 text-green-500" title="Node.js" />
                    <FaPython className="h-6 w-6 text-blue-400" title="Python" />
                    <SiPostgresql className="h-6 w-6 text-blue-300" title="PostgreSQL" />
                  </div>
                  <div className="flex gap-4 text-[#4B9CD3]">
                    <a href="https://github.com/AnishPatel526" target="_blank" rel="noopener noreferrer" title="GitHub Repo" aria-label="SideLine GitHub">
                      <FaGithub className="h-6 w-6 hover:opacity-70 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>

              {/* CodeScan */}
              <div className="bg-[#15171B] border border-[#262A30] rounded-2xl p-6 flex flex-col justify-between min-h-[420px] hover:border-[#3A3F47] transition-colors">
                <div>
                  <h3 className="text-xl font-bold mb-3">CodeScan</h3>
                  <p className="text-[#A8ADB5] mb-4 text-sm leading-relaxed">
                    Full stack AI code review tool. Analyzes code via the OpenAI API and surfaces bugs, security issues, and style improvements across 10 plus languages.
                  </p>
                  <ul className="text-sm text-[#6B7079] list-disc pl-4 space-y-1.5">
                    <li>Built with Python, Flask, React, OpenAI API</li>
                    <li>REST API backend with structured feedback rendering</li>
                    <li>Syntax highlighted input across 10 plus languages</li>
                    <li>Real time analysis on submission</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <div className="flex gap-3 mb-4">
                    <FaPython className="h-6 w-6 text-blue-400" title="Python" />
                    <SiFlask className="h-6 w-6 text-white" title="Flask" />
                    <FaReact className="h-6 w-6 text-cyan-400" title="React" />
                    <SiTypescript className="h-6 w-6 text-blue-500" title="TypeScript" />
                  </div>
                  <div className="flex gap-4 text-[#4B9CD3]">
                    <a href="https://github.com/AnishPatel526" target="_blank" rel="noopener noreferrer" title="GitHub Repo" aria-label="CodeScan GitHub">
                      <FaGithub className="h-6 w-6 hover:opacity-70 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Resume */}
      <section id="resume" className="relative z-10 text-white py-24 px-6 lg:px-8 min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Left: Title + Button */}
            <div className="flex flex-col items-center justify-center text-center flex-1">
              <h2 className="text-5xl font-bold mb-8">Resume</h2>
              <a
                href="/AnishP_Resume.pdf"
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
                  src="/AnishP_Resume.pdf"
                  className="w-full h-full"
                  title="Anish Patel Resume Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot floats over everything */}
      <Chatbot />
    </>
  );
}
