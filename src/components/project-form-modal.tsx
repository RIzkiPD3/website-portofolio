"use client";

import React, { useState, useEffect, useRef } from "react";
import { Project } from "@/lib/projects";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import SlingshotProgress from "@/components/slingshot-progress";

type ProjectFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: Project | null;
};

export default function ProjectFormModal({ isOpen, onClose, onSubmit, initialData }: ProjectFormModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState("");
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setTechStack(initialData.techStack.join(", "));
            setProgress(initialData.progress);
            setImage(initialData.image || null);
        } else {
            setTitle("");
            setDescription("");
            setTechStack("");
            setProgress(0);
            setImage(null);
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            description,
            techStack: techStack.split(",").map(t => t.trim()).filter(t => t !== ""),
            progress: Number(progress),
            image,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white">
                        {initialData ? "Edit Project" : "Tambah Project Baru"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-slate-800 text-slate-400 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Image Upload Area */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Project Image
                        </label>

                        <div className="relative group">
                            {image ? (
                                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
                                    <img
                                        src={image}
                                        alt="Preview"
                                        className="h-full w-full object-contain"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
                                            title="Ganti Gambar"
                                        >
                                            <Upload className="h-5 w-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all backdrop-blur-md"
                                            title="Hapus Gambar"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-cyan-500/50 transition-all flex flex-col items-center justify-center gap-3 group"
                                >
                                    <div className="rounded-full bg-slate-700/50 p-4 group-hover:bg-cyan-500/10 transition-colors">
                                        <ImageIcon className="h-8 w-8 text-slate-400 group-hover:text-cyan-400" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-slate-300">Pilih Gambar Project</p>
                                        <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 1MB</p>
                                    </div>
                                </button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-1">
                        {/* Project Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Nama Project
                            </label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                                placeholder="Contoh: Portfolio Website"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Deskripsi Project
                            </label>
                            <textarea
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 shadow-inner resize-none"
                                placeholder="Jelaskan secara singkat tentang project ini..."
                            />
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Tech Stack
                            </label>
                            <input
                                type="text"
                                required
                                value={techStack}
                                onChange={(e) => setTechStack(e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                                placeholder="Contoh: Next.js, TypeScript, TailwindCSS (pisahkan dengan koma)"
                            />
                        </div>

                        {/* Progress - Slingshot Input */}
                        <SlingshotProgress
                            value={progress}
                            onChange={setProgress}
                        />
                    </div>
                </form>

                {/* Footer */}
                <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2.5 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
                    >
                        {initialData ? "Simpan Perubahan" : "Tambah Project"}
                    </button>
                </div>
            </div>
        </div>
    );
}
