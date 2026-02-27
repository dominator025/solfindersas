"use client";

import { Raaga } from "@/data/raagas";
import { Play, Pause, Volume2, VolumeX, Clock, Heart, Info } from "lucide-react";
import { useState } from "react";

interface PlayerControlsProps {
    raaga: Raaga | null;
    isPlaying: boolean;
    volume: number;
    onTogglePlay: () => void;
    onVolumeChange: (v: number) => void;
}

export default function PlayerControls({
    raaga,
    isPlaying,
    volume,
    onTogglePlay,
    onVolumeChange,
}: PlayerControlsProps) {
    const [showDescription, setShowDescription] = useState(false);

    if (!raaga) return null;

    return (
        <div className="flex flex-col items-center gap-5">
            {/* Raaga info */}
            <div className="text-center">
                <h3
                    className="mb-1 text-2xl font-bold md:text-3xl"
                    style={{
                        fontFamily: "var(--font-heading)",
                        color: "#fff",
                    }}
                >
                    {raaga.name}
                </h3>
                <div className="mb-2 flex items-center justify-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-white/50" />
                    <span
                        className="text-xs font-medium uppercase tracking-wider text-white/50"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        {raaga.timeOfDay}
                    </span>
                </div>
                {/* Frequency badge */}
                <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-xs"
                    style={{
                        background: `${raaga.color}20`,
                        color: `${raaga.color}`,
                        fontFamily: "var(--font-body)",
                        border: `1px solid ${raaga.color}30`,
                    }}
                >
                    {raaga.frequency} Hz
                </span>
            </div>

            {/* Play/Pause button */}
            <button
                id="play-pause-btn"
                onClick={onTogglePlay}
                className="group relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                    background: `linear-gradient(135deg, ${raaga.color}, ${raaga.color}CC)`,
                    boxShadow: isPlaying
                        ? `0 0 30px ${raaga.color}50, 0 4px 20px ${raaga.color}40`
                        : `0 4px 20px ${raaga.color}40`,
                }}
            >
                {isPlaying ? (
                    <Pause className="h-7 w-7 text-white" />
                ) : (
                    <Play className="ml-1 h-7 w-7 text-white" />
                )}
                {/* Pulse ring when playing */}
                {isPlaying && (
                    <span
                        className="absolute inset-0 rounded-full"
                        style={{
                            border: `2px solid ${raaga.color}`,
                            animation: "pulseRing 2s ease-out infinite",
                        }}
                    />
                )}
            </button>

            {/* Volume controls */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onVolumeChange(volume === 0 ? 0.5 : 0)}
                    className="text-white/60 transition-colors hover:text-white"
                >
                    {volume === 0 ? (
                        <VolumeX className="h-4 w-4" />
                    ) : (
                        <Volume2 className="h-4 w-4" />
                    )}
                </button>
                <input
                    id="volume-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="h-1 w-32 cursor-pointer appearance-none rounded-full bg-white/20 accent-white"
                    style={{ accentColor: raaga.color }}
                />
            </div>

            {/* Healing properties */}
            <div
                className="mx-auto flex max-w-sm items-start gap-2 rounded-xl px-4 py-3"
                style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <Heart
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: raaga.color }}
                />
                <p
                    className="text-xs leading-relaxed text-white/60"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    {raaga.healingProperties}
                </p>
            </div>

            {/* Description toggle */}
            <button
                onClick={() => setShowDescription(!showDescription)}
                className="flex items-center gap-1 text-white/30 transition-colors hover:text-white/60"
            >
                <Info className="h-3.5 w-3.5" />
                <span className="text-xs" style={{ fontFamily: "var(--font-body)" }}>
                    {showDescription ? "Hide Details" : "Learn More"}
                </span>
            </button>

            {/* Description panel */}
            {showDescription && (
                <div
                    className="mx-auto max-w-sm rounded-xl px-4 py-3"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        animation: "fadeInUp 0.3s ease-out",
                    }}
                >
                    <p
                        className="text-xs leading-relaxed italic text-white/40"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {raaga.description}
                    </p>
                </div>
            )}
        </div>
    );
}
