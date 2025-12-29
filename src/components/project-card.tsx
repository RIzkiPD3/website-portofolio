// components/ProjectCard.tsx
import Link from "next/link";
import { Project } from "@/lib/projects";
import { ExternalLink, Github } from "lucide-react";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETE":
        return "bg-blue-500/20 text-blue-400 border-blue-500/40 shadow-blue-500/20";
      case "AKTIF":
        return "bg-green-500/20 text-green-400 border-green-500/40 shadow-green-500/20";
      case "IN_PROGRESS":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40 shadow-yellow-500/20";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/40 shadow-slate-500/20";
    }
  };

  return (
    <div className="group relative rounded-2xl border border-slate-800/70 bg-slate-900/90 backdrop-blur-sm p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20">
      {/* Project Number Badge */}
      <div className="absolute -top-4 -left-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-slate-700/80 bg-slate-800/95 text-sm font-bold text-slate-300 shadow-xl">
        {String(project.projectNumber).padStart(2, "0")}
      </div>

      {/* Status Badge */}
      <div className="absolute -top-3 right-4">
        <span
          className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-md ${getStatusColor(
            project.status
          )}`}
        >
          {project.status}
        </span>
      </div>

      {/* Project Preview/Image */}
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-800/60 bg-slate-800/80 shadow-xl">
        {project.image ? (
          <div className="relative aspect-video">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='18' fill='%2364748b'%3EProject Preview%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center bg-slate-800/80">
            <span className="text-sm text-slate-500 font-medium">Project Preview</span>
          </div>
        )}
      </div>

      {/* Project Title */}
      <h3 className="mt-6 text-xl font-bold text-yellow-400 tracking-tight">
        {project.title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="mt-5">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          TECH STACK:
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-blue-500/20 border border-blue-500/40 px-3 py-1.5 text-xs font-medium text-blue-300 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            PROGRESS
          </span>
          <span className="text-sm font-bold text-cyan-400">
            {project.progress}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-800/90 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 shadow-lg shadow-cyan-500/50"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-7 grid grid-cols-2 gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
          >
            <ExternalLink className="h-4 w-4" />
            VIEW LIVE
          </a>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/90 px-4 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-700 hover:shadow-lg active:scale-95"
          >
            <Github className="h-4 w-4" />
            SOURCE
          </a>
        )}
      </div>
    </div>
  );
}
