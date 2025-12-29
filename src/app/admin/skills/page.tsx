"use client";

import { useState } from "react";
import { useSkills } from "@/contexts/skill-context";
import { FileX, Plus, Pencil, Trash2, Code2 } from "lucide-react";
import SkillFormModal from "@/components/skill-form-modal";
import DeleteModal from "@/components/delete-modal";
import { Skill } from "@/lib/skills";

export default function AdminSkillsPage() {
    const { skills, addSkill, updateSkill, deleteSkill } = useSkills();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingSkill, setDeletingSkill] = useState<Skill | null>(null);

    const handleCreate = () => {
        setEditingSkill(null);
        setIsModalOpen(true);
    };

    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill);
        setIsModalOpen(true);
    };

    const handleSubmit = (name: string, image?: string) => {
        if (editingSkill) {
            updateSkill(editingSkill.id, name, image);
        } else {
            addSkill(name, image);
        }
    };

    const handleDelete = (skill: Skill) => {
        setDeletingSkill(skill);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deletingSkill) {
            deleteSkill(deletingSkill.id);
            setDeletingSkill(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Skills Management
                    </h1>
                    <p className="mt-2 text-slate-400">
                        Kelola semua skills yang ada
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-2">
                        <span className="text-sm font-semibold text-slate-400">
                            Total: <span className="text-cyan-400">{skills.length}</span>
                        </span>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        TAMBAH SKILL
                    </button>
                </div>
            </div>

            {/* Skills List */}
            {skills.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/40 p-12">
                    <div className="rounded-full bg-slate-800/50 p-6">
                        <FileX className="h-12 w-12 text-slate-600" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-slate-300">
                        Tidak ada Skill
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Belum ada skill yang ditambahkan
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {skills.map((skill) => (
                        <div
                            key={skill.id}
                            className="group relative rounded-xl border border-slate-800/70 bg-slate-900/90 p-5 shadow-xl transition-all hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
                        >
                            {/* Skill Icon/Image */}
                            <div className="flex justify-center mb-3">
                                {skill.image ? (
                                    <div className="h-16 w-16 rounded-full bg-slate-800/50 p-2 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={skill.image}
                                            alt={skill.name}
                                            className="h-full w-full object-contain"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                const parent = e.currentTarget.parentElement;
                                                if (parent) {
                                                    parent.innerHTML = `<div class="rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4"><svg class="h-8 w-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg></div>`;
                                                }
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4">
                                        <Code2 className="h-8 w-8 text-cyan-400" />
                                    </div>
                                )}
                            </div>

                            {/* Skill Name */}
                            <h3 className="text-center text-base font-bold text-white line-clamp-1 mb-4">
                                {skill.name}
                            </h3>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => handleEdit(skill)}
                                    className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-700"
                                >
                                    <Pencil className="h-3 w-3" />
                                    EDIT
                                </button>
                                <button
                                    onClick={() => handleDelete(skill)}
                                    className="flex items-center justify-center gap-1.5 rounded-lg border border-red-700/50 bg-red-900/20 px-3 py-2 text-xs font-semibold text-red-400 transition-all hover:bg-red-900/40"
                                >
                                    <Trash2 className="h-3 w-3" />
                                    HAPUS
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Form Modal */}
            <SkillFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialName={editingSkill?.name}
                initialImage={editingSkill?.image}
            />

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                projectTitle={deletingSkill?.name || ""}
            />
        </div>
    );
}
