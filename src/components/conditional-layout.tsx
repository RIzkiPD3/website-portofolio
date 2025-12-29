"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Define routes where we want to hide the main header and footer
    const isExcludedRoute = pathname.startsWith("/admin") || pathname === "/login";

    return (
        <>
            {!isExcludedRoute && <Header />}
            <main className="min-h-screen">{children}</main>
            {!isExcludedRoute && <Footer />}
        </>
    );
}
