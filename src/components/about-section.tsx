// components/AboutSection.tsx
import Container from "@/components/container";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="border-t border-slate-800 py-24">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* Image */}
        <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-slate-800">
          <Image
            src="/images/profile.jpg"
            alt="Rizki profile photo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            About Me
          </h2>

          <p className="mt-6 text-slate-400">
            I’m Rizki, a web developer who focuses on building clean,
            maintainable, and scalable web applications. I enjoy turning
            complex problems into simple and intuitive solutions.
          </p>

          <p className="mt-4 text-slate-400">
            Currently, I work mainly with Next.js, TypeScript, and modern
            frontend tools. I’m also exploring backend systems, databases,
            and software architecture to grow as a full-stack developer.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-slate-700 px-4 py-2">
              Next.js
            </span>
            <span className="rounded-full border border-slate-700 px-4 py-2">
              TypeScript
            </span>
            <span className="rounded-full border border-slate-700 px-4 py-2">
              Tailwind CSS
            </span>
            <span className="rounded-full border border-slate-700 px-4 py-2">
              GSAP
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
