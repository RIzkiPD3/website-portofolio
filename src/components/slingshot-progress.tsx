"use client";

import React, { useState, useRef, useEffect } from "react";
import { Circle } from "lucide-react";

type SlingshotProgressProps = {
    value: number;
    onChange: (value: number) => void;
};

export default function SlingshotProgress({ value, onChange }: SlingshotProgressProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [pullX, setPullX] = useState(0);
    const [pullY, setPullY] = useState(0);
    const [displayValue, setDisplayValue] = useState(value);
    const [isReleasing, setIsReleasing] = useState(false);
    const [releaseProgress, setReleaseProgress] = useState(0); // 0 to 1 for animation

    const slingshotRef = useRef<HTMLDivElement>(null);
    const maxPullDistance = 100;

    // Launch point position (left side, middle vertically)
    const launchPointX = 60;
    const launchPointY = 100;

    useEffect(() => {
        setDisplayValue(value);
    }, [value]);

    const calculateDistance = (x: number, y: number) => {
        return Math.sqrt(x * x + y * y);
    };

    const handleStart = (clientX: number, clientY: number) => {
        if (!slingshotRef.current || isReleasing) return;

        const rect = slingshotRef.current.getBoundingClientRect();
        const relativeX = clientX - rect.left;
        const relativeY = clientY - rect.top;

        // Check if click is near the launch point
        const dx = relativeX - launchPointX;
        const dy = relativeY - launchPointY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 40) {
            setIsDragging(true);
            setPullX(0);
            setPullY(0);
        }
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (!isDragging || !slingshotRef.current) return;

        const rect = slingshotRef.current.getBoundingClientRect();
        const relativeX = clientX - rect.left;
        const relativeY = clientY - rect.top;

        let offsetX = relativeX - launchPointX;
        let offsetY = relativeY - launchPointY;

        // Only allow pulling to the left and limited vertical
        if (offsetX > 0) offsetX = 0;
        if (offsetY < -30) offsetY = -30;
        if (offsetY > 30) offsetY = 30;

        const distance = calculateDistance(offsetX, offsetY);

        if (distance > maxPullDistance) {
            const angle = Math.atan2(offsetY, offsetX);
            offsetX = Math.cos(angle) * maxPullDistance;
            offsetY = Math.sin(angle) * maxPullDistance;
        }

        setPullX(offsetX);
        setPullY(offsetY);

        const normalizedDistance = Math.min(distance / maxPullDistance, 1);
        const progress = Math.round(normalizedDistance * 100);
        setDisplayValue(progress);
    };

    const handleEnd = () => {
        if (!isDragging) return;

        setIsDragging(false);
        setIsReleasing(true);
        setReleaseProgress(0);

        onChange(displayValue);

        // Animate the projectile flight
        const duration = 800; // ms
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setReleaseProgress(progress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Reset after animation
                setTimeout(() => {
                    setIsReleasing(false);
                    setPullX(0);
                    setPullY(0);
                    setReleaseProgress(0);
                }, 200);
            }
        };

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("touchmove", handleTouchMove, { passive: false });
            window.addEventListener("touchend", handleTouchEnd);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
                window.removeEventListener("touchmove", handleTouchMove);
                window.removeEventListener("touchend", handleTouchEnd);
            };
        }
    }, [isDragging, pullX, pullY, displayValue]);

    const handleMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
        handleEnd();
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
            e.preventDefault();
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const handleTouchEnd = () => {
        handleEnd();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        handleStart(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length > 0) {
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    // Calculate projectile position during flight
    const getProjectilePosition = () => {
        if (isReleasing) {
            // Container width for calculating landing position
            const containerWidth = 500; // approximate
            const landingX = 50 + (displayValue / 100) * (containerWidth - 100); // Land at progress position

            // Parabolic trajectory
            const t = releaseProgress;
            const startX = launchPointX + pullX;
            const startY = launchPointY + pullY;

            // Horizontal movement (linear)
            const currentX = startX + (landingX - startX) * t;

            // Vertical movement (parabolic arc)
            // Goes up then down
            const arcHeight = 80; // Maximum height of arc
            const currentY = startY - (4 * arcHeight * t * (1 - t)) + (210 - startY) * t;

            return { x: currentX, y: currentY };
        } else {
            return {
                x: launchPointX + pullX,
                y: launchPointY + pullY
            };
        }
    };

    const projectilePos = getProjectilePosition();

    return (
        <div className="space-y-3">
            {/* Header with value display */}
            <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
                <label className="text-slate-500">Progress (Slingshot)</label>
                <span
                    className={`px-3 py-1 rounded-full transition-all duration-200 ${isDragging
                        ? 'bg-cyan-500/20 text-cyan-300 scale-110'
                        : 'bg-cyan-500/10 text-cyan-400'
                        }`}
                >
                    {displayValue}%
                </span>
            </div>

            {/* Slingshot container */}
            <div
                ref={slingshotRef}
                className="relative h-64 rounded-xl border-2 border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden cursor-pointer select-none"
                onMouseDown={!isReleasing ? handleMouseDown : undefined}
                onTouchStart={!isReleasing ? handleTouchStart : undefined}
            >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `
                        radial-gradient(circle at 50% 50%, rgb(148 163 184 / 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px'
                }} />

                {/* Horizontal progress markers at bottom */}
                <div className="absolute bottom-8 left-12 right-12 h-12">
                    {/* Progress bar background */}
                    <div className="absolute bottom-4 left-0 right-0 h-2 bg-slate-700/30 rounded-full" />

                    {/* Active progress fill */}
                    <div
                        className="absolute bottom-4 left-0 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${value}%` }}
                    />

                    {/* Markers */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                        {[0, 25, 50, 75, 100].map((marker) => (
                            <div key={marker} className="flex flex-col items-center">
                                <div className="w-px h-3 bg-slate-600 mb-1" />
                                <span className="text-[10px] font-mono text-slate-500">{marker}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Slingshot base (left side) */}
                <div
                    className="absolute"
                    style={{
                        left: `${launchPointX}px`,
                        top: '30px',
                        bottom: '80px',
                        width: '8px'
                    }}
                >
                    {/* Pole */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-slate-600 to-slate-700 rounded-full" />

                    {/* Top anchor */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-600 border-2 border-slate-500" />

                    {/* Bottom anchor */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-600 border-2 border-slate-500" />
                </div>

                {/* Elastic bands */}
                {(isDragging || isReleasing) && (
                    <>
                        {/* Top band */}
                        <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                            <line
                                x1={launchPointX}
                                y1={35}
                                x2={projectilePos.x}
                                y2={projectilePos.y}
                                stroke="rgb(6 182 212)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                opacity={isDragging ? 0.8 : 0.8 * (1 - releaseProgress)}
                            />
                        </svg>

                        {/* Bottom band */}
                        <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                            <line
                                x1={launchPointX}
                                y1={175}
                                x2={projectilePos.x}
                                y2={projectilePos.y}
                                stroke="rgb(6 182 212)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                opacity={isDragging ? 0.8 : 0.8 * (1 - releaseProgress)}
                            />
                        </svg>
                    </>
                )}

                {/* Projectile (the ball) */}
                <div
                    className="absolute transition-opacity duration-200"
                    style={{
                        left: `${projectilePos.x}px`,
                        top: `${projectilePos.y}px`,
                        transform: 'translate(-50%, -50%)',
                        opacity: isReleasing && releaseProgress > 0.95 ? 0 : 1,
                    }}
                >
                    {/* Glow effect */}
                    {isDragging && (
                        <div className="absolute inset-0 -m-4 rounded-full bg-cyan-500/30 blur-xl animate-pulse" />
                    )}

                    {/* Motion blur trail during flight */}
                    {isReleasing && releaseProgress < 0.9 && (
                        <div
                            className="absolute inset-0 -m-2 rounded-full bg-cyan-400/20 blur-md"
                            style={{
                                transform: `translateX(${-30 * (1 - releaseProgress)}px)`,
                                opacity: 0.6 * (1 - releaseProgress)
                            }}
                        />
                    )}

                    {/* Main ball */}
                    <div
                        className={`relative z-10 w-12 h-12 rounded-full transition-all duration-200 ${isDragging
                            ? 'bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50 scale-110'
                            : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                            }`}
                        style={{
                            transform: isReleasing ? `scale(${1 + 0.2 * releaseProgress}) rotate(${releaseProgress * 360}deg)` : undefined
                        }}
                    >
                        {/* Inner circle */}
                        <div className="absolute inset-2 rounded-full bg-white/20" />

                        {/* Shine */}
                        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/40" />

                        {/* Power indicator while dragging */}
                        {isDragging && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-slate-900/95 border border-cyan-500/50 shadow-lg">
                                <span className="text-sm font-bold text-cyan-400">{displayValue}%</span>
                            </div>
                        )}
                    </div>

                    {/* Pulse rings while dragging */}
                    {isDragging && (
                        <>
                            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
                            <div className="absolute inset-0 rounded-full border border-cyan-400/50" />
                        </>
                    )}
                </div>

                {/* Landing spot indicator during drag */}
                {isDragging && pullX < -10 && (
                    <div
                        className="absolute bottom-14 opacity-40"
                        style={{
                            left: `${50 + (displayValue / 100) * 400}px`,
                            transform: 'translateX(-50%)'
                        }}
                    >
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-cyan-400 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-cyan-400">
                            {displayValue}%
                        </div>
                    </div>
                )}

                {/* Impact effect at landing */}
                {isReleasing && releaseProgress > 0.9 && (
                    <div
                        className="absolute bottom-14"
                        style={{
                            left: `${50 + (displayValue / 100) * 400}px`,
                            transform: 'translateX(-50%)'
                        }}
                    >
                        <div className="w-20 h-20 rounded-full bg-cyan-500/30 animate-ping" />
                        <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-cyan-400" style={{
                            animation: 'ping 0.5s cubic-bezier(0, 0, 0.2, 1)'
                        }} />
                    </div>
                )}

                {/* Instruction overlay */}
                {!isDragging && !isReleasing && value === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center space-y-2 bg-slate-900/80 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
                            <div className="flex justify-center mb-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                                    <Circle className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <p className="text-sm font-semibold text-slate-300">
                                Tarik Bola ke Kiri
                            </p>
                            <p className="text-xs text-slate-500">
                                Seperti Angry Birds! Lepas untuk lempar 🎯
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Helper text */}
            <p className="text-xs text-slate-500 text-center">
                {isDragging
                    ? `Tarik lebih jauh → Progress ${displayValue}% → Lepas untuk lempar!`
                    : isReleasing
                        ? '🚀 Meluncur...'
                        : 'Klik bola, tarik ke kiri, lepas untuk set progress dengan lemparan melengkung'
                }
            </p>
        </div>
    );
}
