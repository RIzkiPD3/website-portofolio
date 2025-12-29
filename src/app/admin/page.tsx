"use client";

import { projects } from "@/lib/projects";
import { useSkills } from "@/contexts/skill-context";
import { FolderKanban, TrendingUp, Code2 } from "lucide-react";

export default function AdminPage() {
    const { skills } = useSkills();
    const totalProjects = projects.length;
    const totalSkills = skills.length;

    // Calculate average progress
    const averageProgress = totalProjects > 0
        ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / totalProjects)
        : 0;

    // Count by status
    const activeProjects = projects.filter(p => p.status === "AKTIF").length;
    const completedProjects = projects.filter(p => p.status === "COMPLETE").length;

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Halaman Dashboard
                </h1>
                <p className="mt-2 text-slate-400">
                    Ringkasan statistik dan informasi project dan skills
                </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                {/* Total Projects */}
                <div className="rounded-xl border border-slate-800/70 bg-slate-900/90 p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Total Project
                            </p>
                            <p className="mt-2 text-3xl font-bold text-white">{totalProjects}</p>
                        </div>
                        <div className="rounded-lg bg-cyan-500/20 p-3">
                            <FolderKanban className="h-6 w-6 text-cyan-400" />
                        </div>
                    </div>
                </div>

                {/* Active Projects */}
                <div className="rounded-xl border border-slate-800/70 bg-slate-900/90 p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Project Aktif
                            </p>
                            <p className="mt-2 text-3xl font-bold text-green-400">{activeProjects}</p>
                        </div>
                        <div className="rounded-lg bg-green-500/20 p-3">
                            <TrendingUp className="h-6 w-6 text-green-400" />
                        </div>
                    </div>
                </div>

                {/* Completed Projects */}
                <div className="rounded-xl border border-slate-800/70 bg-slate-900/90 p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Project Selesai
                            </p>
                            <p className="mt-2 text-3xl font-bold text-blue-400">{completedProjects}</p>
                        </div>
                        <div className="rounded-lg bg-blue-500/20 p-3">
                            <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Average Progress */}
                <div className="rounded-xl border border-slate-800/70 bg-slate-900/90 p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Rata-rata Progress
                            </p>
                            <p className="mt-2 text-3xl font-bold text-yellow-400">{averageProgress}%</p>
                        </div>
                        <div className="rounded-lg bg-yellow-500/20 p-3">
                            <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Total Skills */}
                <div className="rounded-xl border border-slate-800/70 bg-slate-900/90 p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Total Skills
                            </p>
                            <p className="mt-2 text-3xl font-bold text-purple-400">{totalSkills}</p>
                        </div>
                        <div className="rounded-lg bg-purple-500/20 p-3">
                            <Code2 className="h-6 w-6 text-purple-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
