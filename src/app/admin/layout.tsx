"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import AdminSidebar from "@/components/admin-sidebar";
import AdminHeader from "@/components/admin-header";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();

    // Protect the admin routes
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    // Don't render if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-950">
            <AdminSidebar />
            <div className="ml-64">
                <AdminHeader />
                <main className="p-8">{children}</main>
            </div>
        </div>
    );
}
