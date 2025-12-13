// components/Footer.tsx
export default function Footer() {
    return (
      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-slate-400">
          © {new Date().getFullYear()} Rizki. All rights reserved.
        </div>
      </footer>
    );
  }
  