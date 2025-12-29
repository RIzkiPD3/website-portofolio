"use client";

import React, { useState, useEffect } from "react";
import { X, Image as ImageIcon } from "lucide-react";

type SkillFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string, image?: string) => void;
    initialName?: string;
    initialImage?: string;
};

export default function SkillFormModal({ isOpen, onClose, onSubmit, initialName = "", initialImage = "" }: SkillFormModalProps) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        setName(initialName);
        setImage(initialImage);
    }, [initialName, initialImage, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name.trim(), image.trim() || undefined);
            setName("");
            setImage("");
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white">
                        {initialName ? "Edit Skill" : "Tambah Skill Baru"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-slate-800 text-slate-400 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Skill Name */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Nama Skill
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                            placeholder="Contoh: React, TypeScript, Node.js"
                            autoFocus
                        />
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            URL Gambar (Opsional)
                        </label>
                        <input
                            type="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
                            placeholder="https://example.com/icon.png"
                        />
                    </div>

                    {/* Image Preview */}
                    {image && (
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Preview
                            </label>
                            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 flex items-center justify-center">
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="max-h-24 max-w-24 object-contain rounded-lg"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.innerHTML = `
                                            <div class="flex flex-col items-center gap-2 text-slate-500">
                                                <svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                <span class="text-xs">URL Gambar Tidak Valid</span>
                                            </div>
                                        `;
                                    }}
                                />
                            </div>
                        </div>
                    )}
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
                        {initialName ? "Simpan Perubahan" : "Tambah Skill"}
                    </button>
                </div>
            </div>
        </div>
    );
}
