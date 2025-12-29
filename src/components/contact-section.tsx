// components/ContactSection.tsx
import Container from "@/components/Container";
import { Mail, Instagram } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact-section" className="border-t border-slate-800 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Get In Touch
          </h2>
          <p className="mt-4 text-slate-400">
            Feel free to reach out through any of these platforms
          </p>

          <div className="mt-12 flex flex-col gap-4">
            {/* Email */}
            <a
              href="mailto:riskiputradandi@gmail.com"
              className="group flex items-center gap-4 rounded-xl border border-slate-800 p-6 transition hover:border-cyan-400/50 hover:bg-slate-900/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 text-cyan-400 transition group-hover:bg-cyan-400/10">
                <Mail className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="text-sm text-slate-400">Email</div>
                <div className="font-medium">riskiputradandi@gmail.com</div>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/rizki_ptrdnd02"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-slate-800 p-6 transition hover:border-pink-400/50 hover:bg-slate-900/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 text-pink-400 transition group-hover:bg-pink-400/10">
                <Instagram className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="text-sm text-slate-400">Instagram</div>
                <div className="font-medium">@rizki_ptrdnd02</div>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
