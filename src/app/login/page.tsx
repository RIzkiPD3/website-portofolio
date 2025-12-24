"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Validate inputs
        if (!username.trim() || !password.trim()) {
            setError("Username dan password harus diisi");
            setIsLoading(false);
            return;
        }

        // Attempt login
        const success = login(username, password);

        if (success) {
            // Redirect to admin page
            router.push("/admin");
        } else {
            setError("Username atau password salah");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Login Card */}
                <div className="relative rounded-2xl border border-slate-800/70 bg-slate-900/90 backdrop-blur-sm p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">
                            <span className="text-cyan-400">[</span>
                            <span className="text-white"> LOGIN </span>
                            <span className="text-cyan-400">]</span>
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            Masuk ke halaman admin
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                                placeholder="Masukkan username"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                                placeholder="Masukkan password"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3">
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Memproses..." : "LOGIN"}
                        </button>
                    </form>

                    {/* Footer Hint */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-600">
                            Protected admin access
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
