"use client";

import { Raaga } from "@/data/raagas";

interface BreathingOrbProps {
    raaga: Raaga | null;
    isPlaying: boolean;
}

export default function BreathingOrb({ raaga, isPlaying }: BreathingOrbProps) {
    const color = raaga?.color || "#C9A94E";

    return (
        <div className="relative flex items-center justify-center" style={{ width: "320px", height: "320px" }}>
            {/* ─── OUTER GLOW ─────────────────────────── */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `radial-gradient(circle, ${color}12 0%, ${color}06 40%, transparent 70%)`,
                    animation: isPlaying ? "breathe 6s ease-in-out infinite" : "breathe 8s ease-in-out infinite",
                    filter: "blur(8px)",
                }}
            />

            {/* ─── LAYER 1: Outermost ring — slow clockwise ─── */}
            <div
                className="absolute"
                style={{
                    width: "310px", height: "310px",
                    animation: `slowRotate ${isPlaying ? '50s' : '90s'} linear infinite`,
                    opacity: isPlaying ? 0.35 : 0.18,
                    transition: "opacity 1.5s ease",
                }}
            >
                <svg viewBox="0 0 400 400" className="h-full w-full">
                    <defs>
                        <linearGradient id="outerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={color} stopOpacity="0.7" />
                            <stop offset="50%" stopColor="#c9a227" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#6B8CC4" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                    {/* 16 outer petals */}
                    {Array.from({ length: 16 }).map((_, i) => (
                        <g key={`op-${i}`} transform={`rotate(${i * 22.5} 200 200)`}>
                            <ellipse cx="200" cy="45" rx="12" ry="35"
                                fill="none" stroke="url(#outerGrad)" strokeWidth="0.8" />
                            <ellipse cx="200" cy="55" rx="6" ry="18"
                                fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
                        </g>
                    ))}
                    {/* Outer circle */}
                    <circle cx="200" cy="200" r="185" fill="none"
                        stroke={color} strokeWidth="0.4" opacity="0.25"
                        strokeDasharray="2 6" />
                    <circle cx="200" cy="200" r="175" fill="none"
                        stroke={color} strokeWidth="0.3" opacity="0.15" />
                </svg>
            </div>

            {/* ─── LAYER 2: Middle ring — slow counter-clockwise ─── */}
            <div
                className="absolute"
                style={{
                    width: "250px", height: "250px",
                    animation: `slowRotate ${isPlaying ? '35s' : '70s'} linear infinite reverse`,
                    opacity: isPlaying ? 0.45 : 0.2,
                    transition: "opacity 1.5s ease",
                }}
            >
                <svg viewBox="0 0 400 400" className="h-full w-full">
                    <defs>
                        <linearGradient id="midGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#c9a227" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#4A6FA5" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>
                    {/* 12 mid petals — more elaborate */}
                    {Array.from({ length: 12 }).map((_, i) => (
                        <g key={`mp-${i}`} transform={`rotate(${i * 30} 200 200)`}>
                            <ellipse cx="200" cy="70" rx="14" ry="45"
                                fill="none" stroke="url(#midGrad)" strokeWidth="0.9" />
                            <ellipse cx="200" cy="80" rx="8" ry="28"
                                fill="none" stroke={color} strokeWidth="0.6" opacity="0.5" />
                            {/* Teardrop accent */}
                            <circle cx="200" cy="40" r="3"
                                fill={color} opacity="0.2" />
                        </g>
                    ))}
                    {/* Mid circles */}
                    <circle cx="200" cy="200" r="145" fill="none"
                        stroke={color} strokeWidth="0.5" opacity="0.2" />
                    <circle cx="200" cy="200" r="130" fill="none"
                        stroke="#6B8CC4" strokeWidth="0.3" opacity="0.12"
                        strokeDasharray="3 8" />
                </svg>
            </div>

            {/* ─── LAYER 3: Inner intricate ring — slow clockwise ─── */}
            <div
                className="absolute"
                style={{
                    width: "190px", height: "190px",
                    animation: `slowRotate ${isPlaying ? '25s' : '55s'} linear infinite`,
                    opacity: isPlaying ? 0.55 : 0.25,
                    transition: "opacity 1.5s ease",
                }}
            >
                <svg viewBox="0 0 400 400" className="h-full w-full">
                    <defs>
                        <linearGradient id="innerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#c9a227" stopOpacity="0.9" />
                            <stop offset="50%" stopColor={color} stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#5B79A8" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>
                    {/* 8 inner petals — thicker, more visible */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <g key={`ip-${i}`} transform={`rotate(${i * 45} 200 200)`}>
                            <ellipse cx="200" cy="90" rx="16" ry="50"
                                fill="none" stroke="url(#innerGrad)" strokeWidth="1.2" />
                            <ellipse cx="200" cy="100" rx="9" ry="32"
                                fill="none" stroke={color} strokeWidth="0.7" opacity="0.4" />
                            <ellipse cx="200" cy="110" rx="5" ry="18"
                                fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
                        </g>
                    ))}
                    {/* Inner decorative circles */}
                    <circle cx="200" cy="200" r="105" fill="none"
                        stroke={color} strokeWidth="0.6" opacity="0.25" />
                    <circle cx="200" cy="200" r="85" fill="none"
                        stroke="#c9a227" strokeWidth="0.4" opacity="0.2"
                        strokeDasharray="1 4" />
                </svg>
            </div>

            {/* ─── LAYER 4: Core star pattern — very slow ─── */}
            <div
                className="absolute"
                style={{
                    width: "130px", height: "130px",
                    animation: `slowRotate ${isPlaying ? '40s' : '80s'} linear infinite reverse`,
                    opacity: isPlaying ? 0.5 : 0.2,
                    transition: "opacity 1.5s ease",
                }}
            >
                <svg viewBox="0 0 400 400" className="h-full w-full">
                    {/* 6-pointed star geometry */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <g key={`sp-${i}`} transform={`rotate(${i * 60} 200 200)`}>
                            <line x1="200" y1="100" x2="200" y2="300"
                                stroke={color} strokeWidth="0.6" opacity="0.3" />
                            <ellipse cx="200" cy="120" rx="12" ry="35"
                                fill="none" stroke="#c9a227" strokeWidth="0.8" opacity="0.35" />
                        </g>
                    ))}
                    <circle cx="200" cy="200" r="60" fill="none"
                        stroke={color} strokeWidth="0.5" opacity="0.3" />
                </svg>
            </div>

            {/* ─── CENTER: Glowing orb with ॐ symbol ─── */}
            <div
                className="relative z-10 flex items-center justify-center rounded-full"
                style={{
                    width: "90px", height: "90px",
                    background: `radial-gradient(circle at 35% 35%, ${color}80, ${color}40, ${color}15, transparent)`,
                    boxShadow: isPlaying
                        ? `0 0 40px ${color}25, 0 0 80px ${color}12, inset 0 0 30px ${color}15`
                        : `0 0 20px ${color}10, inset 0 0 15px ${color}08`,
                    animation: isPlaying ? "breathe 6s ease-in-out infinite" : "none",
                    transition: "box-shadow 1.5s ease",
                }}
            >
                {/* Inner shine highlight */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: "40px", height: "40px",
                        top: "12px", left: "16px",
                        background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.2), transparent 70%)",
                    }}
                />
                {/* OM symbol or status */}
                <span
                    className="relative z-10 text-center"
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: isPlaying ? "1.6rem" : "0.65rem",
                        fontWeight: isPlaying ? 400 : 500,
                        letterSpacing: isPlaying ? "0" : "0.15em",
                        textTransform: isPlaying ? "none" : "uppercase" as const,
                        color: "rgba(255,255,255,0.75)",
                        textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                        transition: "all 0.8s ease",
                    }}
                >
                    {isPlaying ? "ॐ" : "Ready"}
                </span>
            </div>

            {/* ─── BREATHING GUIDE TEXT ─── */}
            {isPlaying && (
                <div
                    className="absolute"
                    style={{
                        bottom: "-10px",
                        animation: "breathe 6s ease-in-out infinite",
                    }}
                >
                    <p
                        className="text-xs tracking-widest uppercase text-center"
                        style={{
                            fontFamily: "var(--font-body)",
                            color: `${color}90`,
                        }}
                    >
                        Inhale · · · Exhale
                    </p>
                </div>
            )}

            {/* ─── PULSE RINGS (playing only) ─── */}
            {isPlaying && (
                <>
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: "280px", height: "280px",
                            border: `1px solid ${color}18`,
                            animation: "pulseRing 4s ease-out infinite",
                        }}
                    />
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: "300px", height: "300px",
                            border: `1px solid ${color}10`,
                            animation: "pulseRing 4s ease-out infinite 1s",
                        }}
                    />
                </>
            )}
        </div>
    );
}
