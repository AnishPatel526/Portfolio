'use client';

import { motion } from 'framer-motion';

type Experience = {
  company: string;
  role: string;
  /** Omitted when no verified date exists for the role — never invent one. */
  year?: string;
  period?: string;
  logo: string;
  logoBg: string;
  bullets: string[];
};

const experiences: Experience[] = [
  {
    company: 'apexanalytix',
    role: 'Application Development Intern',
    year: '2026',
    period: 'May – Aug 2026 · Greensboro, NC',
    logo: '/apexanalytix.png',
    logoBg: 'bg-white',
    bullets: [
      'Built a QA automation suite in Python and Playwright, cutting a 2 hour manual regression cycle to 17 minutes, an ~85% reduction',
      'Adapted the framework across 5 Fortune 500 client portals, extending coverage to distinct enterprise environments',
      'Scaled the tooling to 200+ employees, standardizing test execution across teams',
    ],
  },
  {
    company: 'Sports Media Inc.',
    role: 'Software Engineering Intern',
    year: '2025',
    period: 'Jun – Aug 2025 · Remote',
    logo: '/sportsmedia.png',
    logoBg: 'bg-white',
    bullets: [
      'Built a token based authentication system in Python and Java that increased login success by 30% and reduced reported issues by 25%',
      'Cut page load times by 1.2 seconds by optimizing API calls and shipping mobile first updates across the platform',
      'Deployed features to over 5,000 accounts working with a team of 5 engineers in Agile sprints',
    ],
  },
  {
    company: 'NC A&T State University',
    role: 'Research Intern',
    year: '2023',
    period: 'Aug 2023 – May 2024 · Greensboro, NC',
    logo: '/ncat.png',
    logoBg: 'bg-white',
    bullets: [
      'Achieved 95% classification accuracy detecting CAN bus cyberattacks across 5 ML models including Random Forest, KNN, SVM, and Isolation Forest',
      'Boosted detection performance by 20% through feature engineering and cross validation pipelines',
      'Co authored a peer reviewed paper presented at the 2024 icABCD Conference on automotive cybersecurity',
    ],
  },
  {
    company: 'UNC School of Dentistry',
    role: 'Computer Support Technician',
    // No dates: this role is not on the resume and none were ever listed.
    logo: '/uncdentistry.jpg',
    logoBg: 'bg-[#4B9CD3]',
    bullets: [
      '90% first contact resolution rate across 150 plus faculty, staff, and students',
      'Reduced new user downtime by 35% by completing 100 plus hardware and software setups',
      'Led onboarding sessions for 50+ users on personal and university issued devices',
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <ol className="relative">
      {experiences.map((exp, i) => {
        const isLast = i === experiences.length - 1;
        const isCurrent = i === 0;

        return (
          <li key={exp.company} className="relative flex gap-4 pb-10 last:pb-0 lg:gap-6">
            {/* Year gutter — desktop only */}
            <span className="hidden w-14 shrink-0 pt-6 text-right font-mono text-xs text-[#6B7079] lg:block">
              {exp.year}
            </span>

            {/* Spine column */}
            <div className="relative flex w-3 shrink-0 justify-center">
              <span className="absolute top-7 h-[10px] w-[10px] rounded-full bg-[#4B9CD3] shadow-[0_0_0_4px_rgba(75,156,211,0.15)]" />
              {isCurrent && (
                <motion.span
                  className="absolute top-7 h-[10px] w-[10px] rounded-full bg-[#4B9CD3]"
                  animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              {!isLast && (
                <span className="absolute top-11 bottom-[-2.5rem] w-px bg-[#262A30]" />
              )}
            </div>

            {/* Card */}
            <div className="flex-1 rounded-xl border-l-2 border-[#4B9CD3]/40 bg-[#15171B]/80 p-6 transition-all duration-300 hover:translate-x-1 hover:border-[#4B9CD3]">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold">{exp.company}</h3>
                  <p className="mt-0.5 text-sm italic text-[#A8ADB5]">{exp.role}</p>
                  {exp.period && (
                    <p className="mt-1 font-mono text-xs text-[#6B7079]">{exp.period}</p>
                  )}
                </div>
                <div
                  className={`flex h-14 w-28 shrink-0 items-center justify-center rounded p-2 ${exp.logoBg}`}
                >
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-relaxed text-[#A8ADB5]">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
