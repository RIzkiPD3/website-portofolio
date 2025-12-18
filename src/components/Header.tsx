// components/Header.tsx

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="text-lg font-semibold tracking-tight">
          Rizki<span className="text-cyan-400">.</span>
        </a>

        <nav className="flex gap-6 text-sm text-slate-300">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#about-section" className="hover:text-white">About</a>
          <a href="#skills-section" className="hover:text-white">Skills</a>
          <a href="#projects-section" className="hover:text-white">Projects</a>
          <a href="#contact-section" className="hover:text-white">Contact</a>
        </nav>
      </div>
    </header>
  );
}
