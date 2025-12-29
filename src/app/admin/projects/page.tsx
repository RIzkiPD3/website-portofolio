"use client";

import { useState } from "react";
import { useProjects } from "@/contexts/project-context";
import { FileX, Plus, Pencil, Trash2 } from "lucide-react";
import ProjectFormModal from "@/components/project-form-modal";
import DeleteModal from "@/components/delete-modal";
import { Project } from "@/lib/projects";

export default function AdminProjectsPage() {
    const { projects, addProject, updateProject, deleteProject } = useProjects();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingProject, setDeletingProject] = useState<Project | null>(null);

    const handleCreate = () => {
        setEditingProject(null);
        setIsModalOpen(true);
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setIsModalOpen(true);
    };

    const handleSubmit = (data: any) => {
        if (editingProject) {
            updateProject(editingProject.slug, data);
        } else {
            addProject(data);
        }
    };

    const handleDelete = (project: Project) => {
        setDeletingProject(project);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deletingProject) {
            deleteProject(deletingProject.slug);
            setDeletingProject(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Project Management
                    </h1>
                    <p className="mt-2 text-slate-400">
                        Kelola semua project yang ada
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-2">
                        <span className="text-sm font-semibold text-slate-400">
                            Total: <span className="text-cyan-400">{projects.length}</span>
                        </span>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        TAMBAH PROJECT
                    </button>
                </div>
            </div>

            {/* Projects List */}
            {projects.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/40 p-12">
                    <div className="rounded-full bg-slate-800/50 p-6">
                        <FileX className="h-12 w-12 text-slate-600" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-slate-300">
                        Tidak ada Project
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Belum ada project yang ditambahkan
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => {
                        const getStatusColor = (status: string) => {
                            switch (status) {
                                case "COMPLETE":
                                    return "border-blue-500/40 bg-blue-500/20 text-blue-400";
                                case "AKTIF":
                                    return "border-green-500/40 bg-green-500/20 text-green-400";
                                case "IN_PROGRESS":
                                    return "border-yellow-500/40 bg-yellow-500/20 text-yellow-400";
                                default:
                                    return "border-slate-500/40 bg-slate-500/20 text-slate-400";
                            }
                        };

                        return (
                            <div
                                key={project.slug}
                                className="group relative rounded-xl border border-slate-800/70 bg-slate-900/90 p-6 shadow-xl transition-all hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
                            >
                                {/* Project Number */}
                                <div className="absolute -top-3 -left-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-700/80 bg-slate-800/95 text-xs font-bold text-slate-300 shadow-lg">
                                    {String(project.projectNumber).padStart(2, "0")}
                                </div>

                                {/* Status Badge */}
                                <div className="mb-4 flex justify-end">
                                    <span
                                        className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${getStatusColor(
                                            project.status
                                        )}`}
                                    >
                                        {project.status}
                                    </span>
                                </div>

                                {/* Project Image */}
                                <div className="mb-4 overflow-hidden rounded-lg border border-slate-800/60 bg-slate-800/80 aspect-video flex items-center justify-center">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='16' fill='%2364748b'%3ENo Image%3C/text%3E%3C/svg%3E";
                                            }}
                                        />
                                    ) : (
                                        <div className="text-slate-600 text-xs font-medium">No Image</div>
                                    )}
                                </div>

                                {/* Project Title */}
                                <h3 className="text-lg font-bold text-yellow-400 line-clamp-1">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-2 text-sm text-slate-400 line-clamp-2 min-h-[2.5rem]">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {project.techStack.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full bg-blue-500/20 border border-blue-500/40 px-2 py-0.5 text-[10px] font-medium text-blue-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 3 && (
                                        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                                            +{project.techStack.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="mb-1.5 flex items-center justify-between">
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                            PROGRESS
                                        </span>
                                        <span className="text-xs font-bold text-cyan-400">
                                            {project.progress}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-800/90">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-700"
                                    >
                                        <Pencil className="h-3 w-3" />
                                        EDIT
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project)}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-red-700/50 bg-red-900/20 px-3 py-2 text-xs font-semibold text-red-400 transition-all hover:bg-red-900/40"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                        HAPUS
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Form Modal */}
            <ProjectFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingProject}
            />

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                projectTitle={deletingProject?.title || ""}
            />
        </div>
    );
}
