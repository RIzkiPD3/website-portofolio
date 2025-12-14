// components/ProjectCard.tsx
import Link from "next/link";
import { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-600"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {project.title}
        </h3>
        <span className="text-sm text-slate-400">{project.year}</span>
      </div>

      <p className="mt-3 text-sm text-slate-400">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
