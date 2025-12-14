// components/ProjectsSection.tsx
import Container from "@/components/container";
import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/projects";

export default function ProjectsSection() {
  return (
    <section className="border-t border-slate-800 py-24">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight">
          Selected Projects
        </h2>

        <p className="mt-4 max-w-2xl text-slate-400">
          A selection of projects that showcase my skills and experience
          in building modern web applications.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
