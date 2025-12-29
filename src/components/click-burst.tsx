"use client";

import { useEffect, useRef } from "react";

interface Particle {
    element: HTMLDivElement;
    active: boolean;
}

interface Burst {
    particles: Particle[];
    circle: HTMLDivElement;
    active: boolean;
    timestamp: number;
}

export default function ClickBurst() {
    const containerRef = useRef<HTMLDivElement>(null);
    const burstPoolRef = useRef<Burst[]>([]);
    const lastBurstTimeRef = useRef<number>(0);
    const activeBurstsRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;

        // Configuration
        const MAX_BURSTS = 15;
        const PARTICLES_PER_BURST = 8; // 4 cardinal + 4 diagonal
        const MIN_BURST_INTERVAL = 50; // ms
        const BURST_DURATION = 800; // ms

        // Initialize object pool
        const initPool = () => {
            const pool: Burst[] = [];

            for (let i = 0; i < MAX_BURSTS; i++) {
                // Create circle element
                const circle = document.createElement("div");
                circle.className = "burst-circle";
                circle.style.position = "absolute";
                circle.style.pointerEvents = "none";
                circle.style.opacity = "0";
                circle.style.willChange = "transform, opacity";
                containerRef.current!.appendChild(circle);

                // Create particle elements
                const particles: Particle[] = [];
                for (let j = 0; j < PARTICLES_PER_BURST; j++) {
                    const particle = document.createElement("div");
                    particle.className = "burst-particle";
                    particle.style.position = "absolute";
                    particle.style.pointerEvents = "none";
                    particle.style.opacity = "0";
                    particle.style.willChange = "transform, opacity";
                    containerRef.current!.appendChild(particle);

                    particles.push({ element: particle, active: false });
                }

                pool.push({
                    particles,
                    circle,
                    active: false,
                    timestamp: 0,
                });
            }

            return pool;
        };

        burstPoolRef.current = initPool();

        // Get available burst from pool
        const getAvailableBurst = (): Burst | null => {
            // Clean up old bursts
            const now = Date.now();
            burstPoolRef.current.forEach((burst) => {
                if (burst.active && now - burst.timestamp > BURST_DURATION) {
                    burst.active = false;
                    activeBurstsRef.current--;
                }
            });

            // Find available burst
            return burstPoolRef.current.find((b) => !b.active) || null;
        };

        // Trigger burst effect
        const createBurst = (x: number, y: number) => {
            const now = Date.now();

            // Throttle: check minimum interval
            if (now - lastBurstTimeRef.current < MIN_BURST_INTERVAL) {
                return;
            }

            // Limit: check max concurrent bursts
            if (activeBurstsRef.current >= MAX_BURSTS) {
                return;
            }

            const burst = getAvailableBurst();
            if (!burst) return;

            // Mark as active
            burst.active = true;
            burst.timestamp = now;
            activeBurstsRef.current++;
            lastBurstTimeRef.current = now;

            // Position and animate circle
            burst.circle.style.left = `${x}px`;
            burst.circle.style.top = `${y}px`;
            burst.circle.style.transform = "translate(-50%, -50%) scale(0.1)";
            burst.circle.style.opacity = "1";

            // Trigger reflow to restart animation
            burst.circle.offsetHeight;
            burst.circle.classList.remove("burst-circle-animate");
            void burst.circle.offsetWidth; // Force reflow
            burst.circle.classList.add("burst-circle-animate");

            // Position and animate particles
            burst.particles.forEach((particle, i) => {
                const angle = (360 / PARTICLES_PER_BURST) * i;
                const radian = (angle * Math.PI) / 180;
                const distance = 60;

                // Debug: log angles to verify diagonal positions
                if (i === 0) console.log(`Burst with ${PARTICLES_PER_BURST} particles, angles:`,
                    Array.from({ length: PARTICLES_PER_BURST }, (_, idx) => (360 / PARTICLES_PER_BURST) * idx));

                particle.element.style.left = `${x}px`;
                particle.element.style.top = `${y}px`;
                particle.element.style.setProperty("--angle", `${angle}deg`);
                particle.element.style.setProperty("--tx", `${Math.cos(radian) * distance}px`);
                particle.element.style.setProperty("--ty", `${Math.sin(radian) * distance}px`);
                particle.element.style.transform = "translate(-50%, -50%) scale(1)";
                particle.element.style.opacity = "1";

                // Trigger animation
                particle.element.offsetHeight;
                particle.element.classList.remove("burst-particle-animate");
                void particle.element.offsetWidth;
                particle.element.classList.add("burst-particle-animate");

                particle.active = true;
            });

            // Cleanup after animation (using timer as fallback)
            setTimeout(() => {
                burst.circle.style.opacity = "0";
                burst.particles.forEach((p) => {
                    p.element.style.opacity = "0";
                    p.active = false;
                });
                burst.active = false;
                activeBurstsRef.current--;
            }, BURST_DURATION);
        };

        const handleClick = (e: MouseEvent) => {
            createBurst(e.clientX, e.clientY);
        };

        const handleTouch = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (touch) {
                createBurst(touch.clientX, touch.clientY);
            }
        };

        window.addEventListener("click", handleClick);
        window.addEventListener("touchstart", handleTouch, { passive: true });

        return () => {
            window.removeEventListener("click", handleClick);
            window.removeEventListener("touchstart", handleTouch);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{ contain: "layout style paint" }}
        />
    );
}
