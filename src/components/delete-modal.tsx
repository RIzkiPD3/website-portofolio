"use client";

import React from "react";
import { X, AlertTriangle } from "lucide-react";

type DeleteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    projectTitle: string;
};

export default function DeleteModal({ isOpen, onClose, onConfirm, projectTitle }: DeleteModalProps) {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white">
                        Konfirmasi Hapus
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-slate-800 text-slate-400 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Warning Icon */}
                    <div className="flex justify-center">
                        <div className="rounded-full bg-red-500/20 p-4">
                            <AlertTriangle className="h-12 w-12 text-red-400" />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="text-center space-y-2">
                        <p className="text-slate-300 font-medium">
                            Apakah Anda yakin ingin menghapus project ini?
                        </p>
                        <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-3">
                            <p className="text-yellow-400 font-semibold text-sm">
                                {projectTitle}
                            </p>
                        </div>
                        <p className="text-sm text-slate-500">
                            Tindakan ini tidak dapat dibatalkan.
                        </p>
                    </div>
                </div>

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
                        onClick={handleConfirm}
                        className="px-6 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 shadow-lg shadow-red-500/20 active:scale-95 transition-all"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
