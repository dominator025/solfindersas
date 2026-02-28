"use client";

import { Raaga } from "@/data/raagas";
import { Clock, Sparkles, Music } from "lucide-react";
import { motion } from "framer-motion";

interface RaagaCardProps {
    raaga: Raaga;
    isSelected: boolean;
    onSelect: (raaga: Raaga) => void;
    isPlaying?: boolean;
}

export default function RaagaCard({
    raaga,
    isSelected,
    onSelect,
    isPlaying,
}: RaagaCardProps) {
    return (
        <motion.button
            onClick={() => onSelect(raaga)}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border-2 p-5 text-left transition-all duration-300"
            style={{
                background: isSelected
                    ? "linear-gradient(135deg, var(--soft-ivory), #fff)"
                    : "var(--soft-ivory)",
                borderColor: isSelected ? raaga.color : "transparent",
                boxShadow: isSelected
                    ? `0 8px 30px ${raaga.color}20, 0 2px 8px rgba(0,0,0,0.05)`
                    : "0 2px 8px rgba(0,0,0,0.04)",
            }}
        >
            {/* Animated mandala background */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                <div
                    className="transition-opacity duration-500"
                    style={{
                        width: "200px",
                        height: "200px",
                        opacity: isSelected ? 0.08 : 0.04,
                        animation: `slowRotate ${isSelected ? '20s' : '60s'} linear infinite`,
                    }}
                >
                    <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%", height: "100%", color: raaga.color }}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ellipse key={`p-${i}`} cx="200" cy="100" rx="16" ry="48"
                                stroke="currentColor" strokeWidth="1" transform={`rotate(${i * 45} 200 200)`} />
                        ))}
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ellipse key={`s-${i}`} cx="200" cy="130" rx="10" ry="30"
                                stroke="currentColor" strokeWidth="0.8" transform={`rotate(${i * 60} 200 200)`} />
                        ))}
                        <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.6" />
                        <circle cx="200" cy="200" r="70" stroke="currentColor" strokeWidth="0.6" />
                        <circle cx="200" cy="200" r="25" stroke="currentColor" strokeWidth="0.8" />
                    </svg>
                </div>
            </div>

            {/* Breathing glow ring when selected */}
            {isSelected && (
                <div
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                        boxShadow: `inset 0 0 30px ${raaga.color}12, 0 0 20px ${raaga.color}08`,
                        animation: "breathe 4s ease-in-out infinite",
                    }}
                />
            )}

            {/* Color accent dot + title */}
            <div className="relative z-10 mb-3 flex items-center gap-2.5">
                <div className="relative">
                    <motion.div
                        className="h-3.5 w-3.5 rounded-full"
                        animate={isSelected && isPlaying ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                            background: raaga.color,
                            boxShadow: `0 0 ${isSelected ? '12px' : '6px'} ${raaga.color}50`,
                        }}
                    />
                    {isSelected && isPlaying && (
                        <span
                            className="absolute inset-0 rounded-full"
                            style={{
                                border: `1.5px solid ${raaga.color}`,
                                animation: "pulseRing 1.5s ease-out infinite",
                            }}
                        />
                    )}
                </div>
                <h3
                    className="text-xl font-semibold"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}
                >
                    {raaga.name}
                </h3>
                {isSelected && isPlaying && (
                    <Music
                        className="ml-auto h-4 w-4"
                        style={{ color: raaga.color, animation: "breathe 3s ease-in-out infinite" }}
                    />
                )}
            </div>

            {/* Time of day */}
            <div className="relative z-10 mb-3 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" style={{ color: "var(--sandstone)" }} />
                <span
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--sandstone)" }}
                >
                    {raaga.timeOfDay}
                </span>
            </div>

            {/* Healing properties */}
            <div className="relative z-10 flex items-start gap-1.5">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--temple-gold)" }} />
                <p
                    className="line-clamp-2 text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-body)", color: "var(--muted-terracotta)" }}
                >
                    {raaga.healingProperties}
                </p>
            </div>

            {/* Hover glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at 50% 100%, ${raaga.color}15, transparent 70%)`,
                }}
            />

            {/* Selected indicator bar */}
            {isSelected && (
                <motion.div
                    layoutId="raaga-indicator"
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${raaga.color}, transparent)`,
                    }}
                />
            )}
        </motion.button>
    );
}
