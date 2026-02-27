"use client";

import { Raaga } from "@/data/raagas";
import { Clock, Sparkles, Music } from "lucide-react";

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
        <button
            onClick={() => onSelect(raaga)}
            className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border-2 p-5 text-left transition-all duration-300 hover:-translate-y-0.5"
            style={{
                background: isSelected
                    ? "linear-gradient(135deg, var(--soft-ivory), #fff)"
                    : "var(--soft-ivory)",
                borderColor: isSelected ? raaga.color : "transparent",
                boxShadow: isSelected
                    ? `0 8px 30px ${raaga.color}20, 0 2px 8px rgba(0,0,0,0.05)`
                    : "0 2px 8px rgba(0,0,0,0.04)",
                animation: "fadeInUp 0.5s ease-out both",
            }}
        >
            {/* Color accent dot + title */}
            <div className="mb-3 flex items-center gap-2.5">
                <div className="relative">
                    <div
                        className="h-3 w-3 rounded-full transition-transform duration-300 group-hover:scale-125"
                        style={{
                            background: raaga.color,
                            boxShadow: `0 0 8px ${raaga.color}40`,
                        }}
                    />
                    {/* Playing indicator */}
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
                    style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--deep-maroon)",
                    }}
                >
                    {raaga.name}
                </h3>
                {/* Now playing icon */}
                {isSelected && isPlaying && (
                    <Music
                        className="ml-auto h-4 w-4"
                        style={{ color: raaga.color, animation: "breathe 3s ease-in-out infinite" }}
                    />
                )}
            </div>

            {/* Time of day */}
            <div className="mb-3 flex items-center gap-1.5">
                <Clock
                    className="h-3.5 w-3.5"
                    style={{ color: "var(--sandstone)" }}
                />
                <span
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--sandstone)" }}
                >
                    {raaga.timeOfDay}
                </span>
            </div>

            {/* Healing properties */}
            <div className="flex items-start gap-1.5">
                <Sparkles
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    style={{ color: "var(--temple-gold)" }}
                />
                <p
                    className="line-clamp-2 text-sm leading-relaxed"
                    style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--muted-terracotta)",
                    }}
                >
                    {raaga.healingProperties}
                </p>
            </div>

            {/* Hover glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at 50% 100%, ${raaga.color}10, transparent 70%)`,
                }}
            />

            {/* Selected indicator bar at bottom */}
            {isSelected && (
                <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${raaga.color}, transparent)`,
                    }}
                />
            )}
        </button>
    );
}
