"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";

export default function AdminHeader() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleDateString("id-ID", options);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return (
        <header className="border-b border-slate-800/70 bg-slate-900/60 backdrop-blur-sm px-8 py-4">
            <div className="flex items-center justify-between">
                {/* Left: Dashboard Title */}
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                        Dashboard
                    </h2>
                </div>

                {/* Right: Date and Time */}
                <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(currentTime)}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 font-mono text-cyan-400">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(currentTime)}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
