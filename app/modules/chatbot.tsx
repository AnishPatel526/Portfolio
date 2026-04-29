'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaTimes, FaArrowLeft } from 'react-icons/fa';

const questions = [
  {
    q: "Where did Anish intern last summer?",
    a: "Sports Media Inc. as a Software Engineering Intern. He built a token based authentication system in Python and Java that boosted login success by 30%, cut page load times by 1.2 seconds, and shipped features to over 5,000 accounts!!"
  },
  {
    q: "What is Anish working on right now?",
    a: "He is building multiple projects! One of which Karvbill, an AI tool that audits medical bills and surfaces pricing errors. He is also recruiting for summer 2026 software engineering internships and grinding LeetCode in Python and Java."
  },
  {
    q: "What does Anish study?",
    a: "Computer Science and Statistics at UNC Chapel Hill, class of 2027. GPA 3.75. Three time Dean's List."
  },
  {
    q: "What languages and tools does he use?",
    a: "Python, Java, C, C++, JavaScript, TypeScript, SQL, and Go. Comfortable with React, Node.js, Flask, Docker, AWS, Git, and the standard data stack of Pandas, NumPy, scikit learn, and PyTorch."
  },
  {
    q: "What does Anish do for fun?",
    a: "Football, chess, and boxing. Plenty of NBA 2K, Rocket League, and Fortnite. Big fan of How I Met Your Mother, Breaking Bad, House M.D, and the Pitt."
  },
  {
    q: "Has he done research?",
    a: "Yes. A year at NC A&T State University researching CAN bus cyberattack detection. Built and evaluated 5 ML models, hit 95 percent accuracy, and co authored a peer reviewed paper at the 2024 icABCD Conference."
  },
  {
    q: "How can I reach Anish?",
    a: "Email is fastest at abpatel1@unc.edu. He is also reachable via number and LinkedIn."
  }
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
  const timer = setTimeout(() => setShowHint(true), 3000);
  const hideTimer = setTimeout(() => setShowHint(false), 12000);
  return () => {
    clearTimeout(timer);
    clearTimeout(hideTimer);
  };
}, []);

return (
  <div className="fixed bottom-6 right-6 z-50">
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="absolute bottom-16 right-0 w-80 bg-[#15171B] border border-[#262A30] rounded-2xl shadow-2xl overflow-hidden mb-2"
          role="dialog"
          aria-labelledby="chatbot-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#262A30]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4B9CD3]/15 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#4B9CD3]"></div>
              </div>
              <div>
                <p id="chatbot-title" className="text-sm font-semibold text-white">Get to know Anish</p>
                <p className="text-xs text-[#6B7079]">
                  {selected !== null ? 'Answer' : 'Pick a question'}
                </p>
              </div>
            </div>
            <button
              onClick={() => { setOpen(false); setSelected(null); }}
              className="text-[#6B7079] hover:text-white transition-colors"
              aria-label="Close chatbot"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 max-h-96 overflow-y-auto">
            {selected === null ? (
              <div className="space-y-2">
                {questions.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className="w-full text-left text-sm text-white bg-[#1C1F24] border border-[#262A30] rounded-lg px-3 py-2.5 hover:bg-[#262A30] hover:border-[#3A3F47] transition-colors"
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-xs text-[#6B7079] mb-3">{questions[selected].q}</p>
                <p className="text-sm text-white leading-relaxed mb-4">{questions[selected].a}</p>
                <button
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-1.5 text-xs text-[#4B9CD3] hover:text-[#5FAEE0] transition-colors"
                >
                  <FaArrowLeft className="h-3 w-3" />
                  Back to questions
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Hint with curved arrow - shows only when chatbot is closed */}
    <AnimatePresence>
      {!open && showHint && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-2 right-20 flex items-center pointer-events-none"
        >
          <span
            className="text-[#4B9CD3] text-base whitespace-nowrap font-medium"
            style={{ fontFamily: 'cursive' }}
          >
            Learn more about me!
          </span>
          <svg
            width="60"
            height="50"
            viewBox="0 0 60 50"
            fill="none"
            className="ml-1"
          >
            <path
              d="M 5 10 Q 25 5, 40 25 T 55 40"
              stroke="#4B9CD3"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 50 35 L 56 41 L 49 44"
              stroke="#4B9CD3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Toggle button */}
    <button
      onClick={() => { setOpen(!open); setShowHint(false); }}
      aria-label="Open chatbot"
      className="w-14 h-14 rounded-full bg-[#4B9CD3] hover:bg-[#5FAEE0] flex items-center justify-center text-white shadow-lg transition-colors relative"
    >
      {open ? <FaTimes className="h-5 w-5" /> : <FaCommentDots className="h-5 w-5" />}
    </button>
  </div>
);
}
