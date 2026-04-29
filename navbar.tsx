'use client';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'Projects', href: '#projects' },
  { name: 'Resume', href: '#resume' },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0B0D]/70 backdrop-blur-md border-b border-[#262A30]">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#home" className="text-xl font-bold text-[#4B9CD3]">
            AnishPatel
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base font-medium text-white hover:text-[#4B9CD3] transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
