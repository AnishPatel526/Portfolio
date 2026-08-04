'use client';

import type { IconType } from 'react-icons';
import { FaGithub, FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from 'react-icons/fa';
import {
  SiPandas,
  SiScikitlearn,
  SiPostgresql,
  SiFlask,
  SiTypescript,
  SiJavascript,
  SiVite,
  SiGitlab,
  SiSlack,
  SiGooglegemini,
} from 'react-icons/si';
import TechIcon from './tech-icon';

type Tech = { icon: IconType; label: string; className: string };

type Project = {
  name: string;
  blurb: string;
  bullets: string[];
  tech: Tech[];
  repo: string;
};

const REPO = 'https://github.com/AnishPatel526';

const projects: Project[] = [
  {
    name: 'Praxis',
    blurb:
      'AI native incident response pipeline that auto triages server crashes and drafts its own fixes.',
    bullets: [
      'Node.js and Express backend with a React and Vite frontend',
      'Google Vertex AI agents analyze logs and auto generate GitLab patch and rollback merge requests',
      'Human in the loop Slack approval flow enabling one click deployment',
      'Cut simulated mean time to recovery',
    ],
    tech: [
      { icon: FaReact, label: 'React', className: 'text-cyan-400' },
      { icon: FaNodeJs, label: 'Node.js', className: 'text-green-500' },
      { icon: SiVite, label: 'Vite', className: 'text-purple-400' },
      { icon: SiGooglegemini, label: 'Gemini', className: 'text-blue-400' },
      { icon: SiGitlab, label: 'GitLab', className: 'text-orange-500' },
      { icon: SiSlack, label: 'Slack', className: 'text-pink-400' },
    ],
    repo: REPO,
  },
  {
    name: 'KarvBill',
    blurb:
      'AI medical bill auditor. End to end pipeline that ingests itemized bills and surfaces pricing anomalies, duplicate charges, and overbilling.',
    bullets: [
      'Built with Python, AWS Textract, Pandas, scikit learn',
      'Hosted on AWS Elastic Beanstalk with S3 backed storage',
      'Combines ML based and rule driven validation checks',
      'Handles multiple claim formats end to end',
    ],
    tech: [
      { icon: FaPython, label: 'Python', className: 'text-blue-400' },
      { icon: FaAws, label: 'AWS', className: 'text-orange-400' },
      { icon: SiPandas, label: 'Pandas', className: 'text-white' },
      { icon: SiScikitlearn, label: 'scikit-learn', className: 'text-orange-500' },
      { icon: FaDocker, label: 'Docker', className: 'text-blue-500' },
    ],
    repo: REPO,
  },
  {
    name: 'SideLine',
    blurb:
      'Real time NBA analytics dashboard. Aggregates live game data and betting odds across 3 plus APIs and surfaces favorable prop bet opportunities.',
    bullets: [
      'Built with React, Node.js, WebSockets, Python, PostgreSQL',
      'Python pipeline normalizes data across 1,200 plus games',
      'Prop bet screener cross references live performance against book lines',
      'Tracks line movement in real time',
    ],
    tech: [
      { icon: FaReact, label: 'React', className: 'text-cyan-400' },
      { icon: FaNodeJs, label: 'Node.js', className: 'text-green-500' },
      { icon: FaPython, label: 'Python', className: 'text-blue-400' },
      { icon: SiPostgresql, label: 'PostgreSQL', className: 'text-blue-300' },
    ],
    repo: REPO,
  },
  {
    name: 'CodeScan',
    blurb:
      'Full stack AI code review tool. Analyzes code via the OpenAI API and surfaces bugs, security issues, and style improvements across 10 plus languages.',
    bullets: [
      'Built with Python, Flask, React, OpenAI API',
      'REST API backend with structured feedback rendering',
      'Syntax highlighted input across 10 plus languages',
      'Real time analysis on submission',
    ],
    tech: [
      { icon: FaPython, label: 'Python', className: 'text-blue-400' },
      { icon: SiFlask, label: 'Flask', className: 'text-white' },
      { icon: FaReact, label: 'React', className: 'text-cyan-400' },
      { icon: SiTypescript, label: 'TypeScript', className: 'text-blue-500' },
    ],
    repo: REPO,
  },
  {
    name: 'FairShare',
    blurb:
      'Full stack platform that calculates optimized payment splits across any group size. Eliminates manual balance tracking with an O(n) debt resolution algorithm.',
    bullets: [
      'Built with React, Node.js, Express, REST APIs',
      'O(n) debt resolution algorithm for instant payment splits',
      'Modular React interface with 10 plus reusable components',
      'Standardized UI consistency across all devices',
    ],
    tech: [
      { icon: FaReact, label: 'React', className: 'text-cyan-400' },
      { icon: FaNodeJs, label: 'Node.js', className: 'text-green-500' },
      { icon: SiJavascript, label: 'JavaScript', className: 'text-yellow-400' },
    ],
    repo: REPO,
  },
  {
    name: 'SyncBoard',
    blurb:
      'Real time collaborative task management platform. Reduced sync latency from seconds to milliseconds for concurrent users with WebSocket based updates.',
    bullets: [
      'Built with React, Node.js, WebSockets, Google Calendar API',
      'Real time updates across collaborative task management',
      'Google Calendar API integration syncs 100 percent of deadlines',
      '5 plus core collaboration features including shared notes',
    ],
    tech: [
      { icon: FaReact, label: 'React', className: 'text-cyan-400' },
      { icon: FaNodeJs, label: 'Node.js', className: 'text-green-500' },
      { icon: SiJavascript, label: 'JavaScript', className: 'text-yellow-400' },
    ],
    repo: REPO,
  },
];

export default function Projects() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <div
          key={project.name}
          // No overflow-hidden: the tech tooltips escape the top of this box.
          className="group relative flex min-h-[440px] flex-col justify-between rounded-2xl border border-[#262A30] bg-[#15171B] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3A3F47]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, rgba(75,156,211,0.18), transparent 70%)',
            }}
          />

          <div>
            <span
              aria-hidden="true"
              className="font-mono text-2xl font-medium text-[#6B7079]/40"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold">{project.name}</h3>
            <p className="mb-4 mt-3 text-sm leading-relaxed text-[#A8ADB5]">
              {project.blurb}
            </p>
            <ul className="list-disc space-y-1.5 pl-4 text-sm text-[#6B7079]">
              {project.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <div className="mb-4 flex flex-wrap gap-3">
              {project.tech.map((t) => (
                <TechIcon
                  key={t.label}
                  icon={t.icon}
                  label={t.label}
                  className={t.className}
                />
              ))}
            </div>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} GitHub repository`}
              className="inline-block text-[#4B9CD3]"
            >
              <FaGithub className="h-6 w-6 transition-opacity hover:opacity-70" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
