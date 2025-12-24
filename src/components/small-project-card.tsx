"use client";

// components/SmallProjectCard.tsx
import { Project } from "@/lib/projects";

type SmallProjectCardProps = {
    project: Project;
    onClick?: () => void;
};

export default function SmallProjectCard({ project, onClick }: SmallProjectCardProps) {
    return (
        <div
            className="group relative rounded-xl border border-slate-800/70 bg-slate-900/90 backdrop-blur-sm p-4 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer hover:scale-[1.02]"
            onClick={onClick}
        >
            {/* Project Number Badge */}
            <div className="absolute -top-3 -left-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-700/80 bg-slate-800/95 text-xs font-bold text-slate-300 shadow-lg">
                {String(project.projectNumber).padStart(2, "0")}
            </div>

            {/* Project Image */}
            <div className="mt-2 overflow-hidden rounded-lg border border-slate-800/60 bg-slate-800/80 shadow-inner">
                {project.image ? (
                    <div className="relative aspect-video">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='16' fill='%2364748b'%3EProject Preview%3C/text%3E%3C/svg%3E";
                            }}
                        />
                    </div>
                ) : (
                    <div className="flex aspect-video items-center justify-center bg-slate-800/80">
                        <span className="text-xs text-slate-500 font-medium">Preview</span>
                    </div>
                )}
            </div>

            {/* Project Title */}
            <h4 className="mt-4 text-sm font-bold text-yellow-400 line-clamp-1 tracking-tight">
                {project.title}
            </h4>

            {/* Progress Bar */}
            <div className="mt-3">
                <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        PROGRESS
                    </span>
                    <span className="text-xs font-bold text-cyan-400">
                        {project.progress}%
                    </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800/90 shadow-inner">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 shadow-sm"
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
