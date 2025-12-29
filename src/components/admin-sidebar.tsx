"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { LayoutDashboard, FolderKanban, LogOut } from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const navItems = [
        {
            name: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
        },
        {
            name: "Project",
            href: "/admin/projects",
            icon: FolderKanban,
        },
    ];

    const isActive = (href: string) => {
        if (href === "/admin") {
            return pathname === "/admin";
        }
        return pathname?.startsWith(href);
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-800/70 bg-slate-900/95 backdrop-blur-sm">
            <div className="flex h-full flex-col">
                {/* Logo/Brand */}
                <div className="border-b border-slate-800/70 p-6">
                    <h1 className="text-xl font-bold tracking-tight">
                        <span className="text-cyan-400">[</span>
                        <span className="text-white"> ADMIN </span>
                        <span className="text-cyan-400">]</span>
                    </h1>
                    <p className="mt-1 text-xs text-slate-500">Management Panel</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${active
                                        ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                                        : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-300"
                                    }`}
                            >
                                <Icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="border-t border-slate-800/70 p-4">
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-400"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
}
