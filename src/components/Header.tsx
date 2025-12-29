// components/Header.tsx
"use client";

export default function Header() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, targetId: string) => {
    e.preventDefault();

    // Update URL in address bar without page navigation
    window.history.pushState({}, '', href);

    // Scroll to target
    if (targetId === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a
          href="/"
          className="text-lg font-semibold tracking-tight"
          onClick={(e) => handleClick(e, "/", "#")}
        >
          Rizki<span className="text-cyan-400">.</span>
        </a>

        <nav className="flex gap-6 text-sm text-slate-300">
          <a
            href="/"
            className="hover:text-white transition-colors"
            onClick={(e) => handleClick(e, "/", "#")}
          >
            Home
          </a>
          <a
            href="/about"
            className="hover:text-white transition-colors"
            onClick={(e) => handleClick(e, "/about", "#about-section")}
          >
            About
          </a>
          <a
            href="/skills"
            className="hover:text-white transition-colors"
            onClick={(e) => handleClick(e, "/skills", "#skills-section")}
          >
            Skills
          </a>
          <a
            href="/projects"
            className="hover:text-white transition-colors"
            onClick={(e) => handleClick(e, "/projects", "#projects-section")}
          >
            Projects
          </a>
          <a
            href="/contact"
            className="hover:text-white transition-colors"
            onClick={(e) => handleClick(e, "/contact", "#contact-section")}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
