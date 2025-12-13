// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Rizki<span className="text-cyan-400">.</span>
        </Link>

        <nav className="flex gap-6 text-sm text-slate-300">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/projects" className="hover:text-white">Projects</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
