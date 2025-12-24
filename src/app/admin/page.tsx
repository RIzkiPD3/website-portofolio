"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function AdminPage() {
    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();

    // Protect the route - redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    // Don't render content if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Admin Card */}
                <div className="relative rounded-2xl border border-slate-800/70 bg-slate-900/90 backdrop-blur-sm p-12 shadow-2xl">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-5xl font-bold tracking-tight mb-4">
                            <span className="text-cyan-400">[</span>
                            <span className="text-white"> Halaman Admin </span>
                            <span className="text-cyan-400">]</span>
                        </h1>
                        <p className="text-slate-400 mb-8">
                            Selamat datang di panel administrasi
                        </p>

                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
                            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                            Authenticated
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={logout}
                            className="rounded-lg border border-slate-700 bg-slate-800/90 px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-700 hover:shadow-lg active:scale-95"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
