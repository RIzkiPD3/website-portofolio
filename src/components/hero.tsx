// components/Hero.tsx
import Link from "next/link";
import Container from "@/components/container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-200px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      <Container className="flex min-h-[calc(100vh-4rem)] flex-col justify-center">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Hi, I’m Rizki  
          <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Software Engineer
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          I build modern, scalable, and user-focused web applications using
          Next.js, TypeScript, and clean architecture.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/projects"
            className="rounded-lg bg-linear-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-medium text-white transition hover:opacity-90"
          >
            View Projects
          </Link>

          <Link
            href="/contact"
            className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            Contact Me
          </Link>
        </div>
      </Container>
    </section>
  );
}
