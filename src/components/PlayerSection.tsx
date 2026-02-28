"use client";

import { Raaga } from "@/data/raagas";
import BreathingOrb from "./BreathingOrb";
import PlayerControls from "./PlayerControls";
import SessionTimer from "./SessionTimer";
import { motion, AnimatePresence } from "framer-motion";

interface PlayerSectionProps {
    raaga: Raaga | null;
    isPlaying: boolean;
    volume: number;
    onTogglePlay: () => void;
    onVolumeChange: (v: number) => void;
}

export default function PlayerSection({
    raaga,
    isPlaying,
    volume,
    onTogglePlay,
    onVolumeChange,
}: PlayerSectionProps) {
    if (!raaga) {
        return (
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                id="player-section"
                className="px-6 py-16 text-center"
                style={{
                    background:
                        "linear-gradient(180deg, var(--twilight-indigo), #1a1440)",
                }}
            >
                {/* Decorative empty state */}
                <div className="mx-auto max-w-md">
                    <div
                        className="mx-auto flex h-32 w-32 items-center justify-center rounded-full"
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px dashed rgba(255,255,255,0.12)",
                            animation: "breathe 6s ease-in-out infinite",
                        }}
                    >
                        <p
                            className="text-sm text-white/25"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            ॐ
                        </p>
                    </div>
                    <p
                        className="mt-6 text-sm text-white/20"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Choose a raaga from above to begin your healing session
                    </p>
                </div>
            </motion.section>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <motion.section
                key={raaga.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                id="player-section"
                className="relative overflow-hidden px-6 py-12"
                style={{
                    background: "linear-gradient(180deg, var(--twilight-indigo), #1a1440)",
                }}
            >
                {/* Background ambient glow */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: `radial-gradient(ellipse at 50% 50%, ${raaga.color}10, transparent 70%)`,
                        transition: "background 1s ease",
                    }}
                />

                {/* Decorative corner flourish */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 10% 10%, ${raaga.color} 1px, transparent 1px),
            radial-gradient(circle at 90% 90%, ${raaga.color} 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />

                <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-16">
                    {/* Breathing Orb */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                        className="flex-shrink-0"
                    >
                        <BreathingOrb raaga={raaga} isPlaying={isPlaying} />
                    </motion.div>

                    {/* Controls */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-shrink-0 flex-col items-center gap-6"
                    >
                        <PlayerControls
                            raaga={raaga}
                            isPlaying={isPlaying}
                            volume={volume}
                            onTogglePlay={onTogglePlay}
                            onVolumeChange={onVolumeChange}
                        />

                        {/* Session Timer */}
                        <div
                            className="w-full rounded-xl px-4 py-3"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <SessionTimer isPlaying={isPlaying} accentColor={raaga.color} />
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </AnimatePresence>
    );
}
