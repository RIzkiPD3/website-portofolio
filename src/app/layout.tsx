// app/layout.tsx
import type { Metadata } from "next";
import ClickBurst from "@/components/click-burst";
import { AuthProvider } from "@/contexts/auth-context";
import { ProjectProvider } from "@/contexts/project-context";
import ConditionalLayout from "@/components/conditional-layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rizki | Software Engineer",
  description: "Professional web portfolio built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased font-sans">
        <AuthProvider>
          <ProjectProvider>
            <ClickBurst />
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ProjectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
