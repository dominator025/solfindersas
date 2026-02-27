"use client";

import { Raaga } from "@/data/raagas";

interface BreathingOrbProps {
    raaga: Raaga | null;
    isPlaying: boolean;
}

export default function BreathingOrb({ raaga, isPlaying }: BreathingOrbProps) {
    const color = raaga?.color || "#C9A94E";

    return (
        <div className="relative flex items-center justify-center py-8">
            {/* Outermost ring */}
            <div
                className="absolute h-64 w-64 rounded-full md:h-72 md:w-72"
                style={{
                    border: `1px solid ${color}15`,
                    animation: isPlaying ? "pulseRing 6s ease-in-out infinite" : "none",
                    animationDelay: "0.5s",
                }}
            />

            {/* Second ring */}
            <div
                className="absolute h-52 w-52 rounded-full md:h-60 md:w-60"
                style={{
                    border: `1px solid ${color}20`,
                    animation: isPlaying
                        ? "pulseRing 6s ease-in-out infinite 0.3s"
                        : "none",
                }}
            />

            {/* Rotating decorative mandala ring (SVG) */}
            <div
                className="absolute h-48 w-48 md:h-56 md:w-56"
                style={{
                    animation: isPlaying ? "slowRotate 40s linear infinite" : "none",
                    opacity: isPlaying ? 0.4 : 0.15,
                    transition: "opacity 1s ease",
                }}
            >
                <svg viewBox="0 0 200 200" className="h-full w-full">
                    {/* 12 petal mandala pattern */}
                    {Array.from({ length: 12 }).map((_, i) => (
                        <g
                            key={i}
                            transform={`rotate(${i * 30} 100 100)`}
                        >
                            <ellipse
                                cx="100"
                                cy="30"
                                rx="8"
                                ry="18"
                                fill="none"
                                stroke={color}
                                strokeWidth="0.8"
                                opacity="0.5"
                            />
                            <circle
                                cx="100"
                                cy="15"
                                r="2"
                                fill={color}
                                opacity="0.3"
                            />
                        </g>
                    ))}
                    {/* Inner circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="none"
                        stroke={color}
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                        opacity="0.3"
                    />
                </svg>
            </div>

            {/* Inner glow ring */}
            <div
                className="absolute h-44 w-44 rounded-full md:h-48 md:w-48"
                style={{
                    background: `radial-gradient(circle, ${color}08, transparent 70%)`,
                    animation: isPlaying ? "breathe 6s ease-in-out infinite" : "none",
                }}
            />

            {/* Main orb */}
            <div
                className="relative flex h-36 w-36 items-center justify-center rounded-full md:h-40 md:w-40"
                style={{
                    background: `radial-gradient(circle at 35% 35%, ${color}90, ${color}50, ${color}20, transparent)`,
                    boxShadow: isPlaying
                        ? `0 0 60px ${color}30, 0 0 120px ${color}15, inset 0 0 40px ${color}20`
                        : `0 0 30px ${color}15, inset 0 0 20px ${color}10`,
                    animation: isPlaying ? "breathe 6s ease-in-out infinite" : "none",
                    transition: "box-shadow 1s ease, opacity 1s ease",
                    opacity: isPlaying ? 1 : 0.5,
                }}
            >
                {/* Inner shine */}
                <div
                    className="absolute h-20 w-20 rounded-full"
                    style={{
                        background: `radial-gradient(circle at 40% 40%, rgba(255,255,255,0.25), transparent 70%)`,
                    }}
                />

                {/* Center text */}
                <span
                    className="relative z-10 text-center text-xs font-medium tracking-widest uppercase"
                    style={{
                        fontFamily: "var(--font-body)",
                        color: "rgba(255,255,255,0.8)",
                        textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    }}
                >
                    {isPlaying ? "Breathe" : "Ready"}
                </span>
            </div>

            {/* Breathing guide text */}
            {isPlaying && (
                <div
                    className="absolute -bottom-2 text-center"
                    style={{ animation: "breathe 6s ease-in-out infinite" }}
                >
                    <p
                        className="text-xs tracking-widest uppercase"
                        style={{
                            fontFamily: "var(--font-body)",
                            color: `${color}90`,
                        }}
                    >
                        Inhale · · · Exhale
                    </p>
                </div>
            )}
        </div>
    );
}
