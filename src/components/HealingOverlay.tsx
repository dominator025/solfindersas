"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface HealingOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

/* ── Mandala SVG (same design used in HeroSection) ────────────── */
function MandalaSVG({ style }: { style?: React.CSSProperties }) {
    return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
            {Array.from({ length: 12 }).map((_, i) => (
                <ellipse key={`o-${i}`} cx="200" cy="80" rx="18" ry="55"
                    stroke="currentColor" strokeWidth="0.8" transform={`rotate(${i * 30} 200 200)`} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
                <ellipse key={`m-${i}`} cx="200" cy="120" rx="14" ry="38"
                    stroke="currentColor" strokeWidth="0.7" transform={`rotate(${i * 45} 200 200)`} />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
                <ellipse key={`n-${i}`} cx="200" cy="150" rx="10" ry="26"
                    stroke="currentColor" strokeWidth="0.6" transform={`rotate(${i * 60} 200 200)`} />
            ))}
            <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="200" cy="200" r="12" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.08" />
            {Array.from({ length: 24 }).map((_, i) => {
                const a = (i * 15 * Math.PI) / 180;
                return (
                    <circle key={`d-${i}`}
                        cx={200 + 160 * Math.sin(a)} cy={200 - 160 * Math.cos(a)}
                        r="2" fill="currentColor" fillOpacity="0.3" />
                );
            })}
        </svg>
    );
}

export default function HealingOverlay({ isOpen, onClose }: HealingOverlayProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    style={{
                        background: "radial-gradient(ellipse at center, #1a0f0a 0%, #0d0806 100%)",
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110"
                        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}
                    >
                        <X className="h-5 w-5 text-white/60" />
                    </button>

                    {/* Text prompt */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="absolute bottom-12 text-sm tracking-widest uppercase text-center"
                        style={{ color: "rgba(212, 167, 106, 0.5)", fontFamily: "var(--font-body)" }}
                    >
                        Close your eyes · Breathe deeply · Let the sound heal
                    </motion.p>

                    {/* ─── SOUND WAVE RINGS ─── */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={`wave-${i}`}
                            className="absolute rounded-full"
                            style={{
                                border: "1px solid rgba(212, 167, 106, 0.12)",
                            }}
                            initial={{ width: 60, height: 60, opacity: 0.6 }}
                            animate={{
                                width: [60, 600 + i * 100],
                                height: [60, 600 + i * 100],
                                opacity: [0.5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 0.8,
                                ease: "easeOut",
                            }}
                        />
                    ))}

                    {/* ─── ROTATING MANDALA — outer ─── */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute"
                        style={{ width: "min(80vw, 500px)", height: "min(80vw, 500px)" }}
                    >
                        <MandalaSVG
                            style={{ width: "100%", height: "100%", color: "var(--temple-gold)", opacity: 0.1 }}
                        />
                    </motion.div>

                    {/* ─── ROTATING MANDALA — inner (counter) ─── */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                        className="absolute"
                        style={{ width: "min(55vw, 340px)", height: "min(55vw, 340px)" }}
                    >
                        <MandalaSVG
                            style={{ width: "100%", height: "100%", color: "var(--saffron)", opacity: 0.08 }}
                        />
                    </motion.div>

                    {/* ─── BREATHING CIRCLE ─── */}
                    <motion.div
                        animate={{ scale: [1, 1.5, 1.5, 1, 1] }}
                        transition={{
                            duration: 16,
                            repeat: Infinity,
                            times: [0, 0.25, 0.5, 0.875, 1],
                            ease: "easeInOut",
                        }}
                        className="relative flex items-center justify-center"
                        style={{ width: "120px", height: "120px" }}
                    >
                        {/* Outer glow */}
                        <motion.div
                            animate={{ scale: [1, 1.3, 1.3, 1, 1], opacity: [0.15, 0.3, 0.3, 0.15, 0.15] }}
                            transition={{
                                duration: 16,
                                repeat: Infinity,
                                times: [0, 0.25, 0.5, 0.875, 1],
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(232,144,46,0.2), transparent 70%)",
                            }}
                        />

                        {/* Main circle */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                border: "2px solid rgba(212, 167, 106, 0.3)",
                                background: "radial-gradient(circle, rgba(201, 169, 78, 0.08), transparent 70%)",
                            }}
                        />

                        {/* Inner dot */}
                        <motion.div
                            animate={{ scale: [0.8, 1.2, 1.2, 0.8, 0.8], opacity: [0.6, 1, 1, 0.6, 0.6] }}
                            transition={{
                                duration: 16,
                                repeat: Infinity,
                                times: [0, 0.25, 0.5, 0.875, 1],
                                ease: "easeInOut",
                            }}
                            className="h-4 w-4 rounded-full"
                            style={{ background: "var(--temple-gold)" }}
                        />
                    </motion.div>

                    {/* ─── BREATHING TEXT ─── */}
                    <motion.div
                        className="absolute flex flex-col items-center"
                        style={{ bottom: "35%" }}
                    >
                        <BreathingText />
                    </motion.div>

                    {/* Particles */}
                    {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                            key={`particle-${i}`}
                            className="absolute rounded-full"
                            style={{
                                width: 2 + Math.random() * 3,
                                height: 2 + Math.random() * 3,
                                background: "var(--temple-gold)",
                            }}
                            initial={{
                                x: (Math.random() - 0.5) * 100,
                                y: (Math.random() - 0.5) * 100,
                                opacity: 0,
                            }}
                            animate={{
                                x: (Math.random() - 0.5) * 400,
                                y: (Math.random() - 0.5) * 400,
                                opacity: [0, 0.4, 0],
                            }}
                            transition={{
                                duration: 6 + Math.random() * 6,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ── Breathing text that cycles through phases ──────────────────── */
function BreathingText() {
    const phases = [
        { label: "Breathe In", duration: 4 },
        { label: "Hold", duration: 4 },
        { label: "Breathe Out", duration: 6 },
        { label: "Rest", duration: 2 },
    ];
    const totalCycle = phases.reduce((s, p) => s + p.duration, 0); // 16s

    // We use a CSS animation approach for a lighter footprint
    return (
        <div className="relative h-8 w-48 overflow-hidden">
            <div
                className="absolute inset-0 flex flex-col"
                style={{
                    animation: `breathTextCycle ${totalCycle}s ease-in-out infinite`,
                }}
            >
                {phases.map((p, i) => (
                    <span
                        key={i}
                        className="flex h-8 items-center justify-center text-sm font-light tracking-widest uppercase"
                        style={{
                            color: "rgba(212, 167, 106, 0.7)",
                            fontFamily: "var(--font-body)",
                        }}
                    >
                        {p.label}
                    </span>
                ))}
            </div>
            <style jsx>{`
                @keyframes breathTextCycle {
                    0%, 24% { transform: translateY(0); }
                    25%, 49% { transform: translateY(-32px); }
                    50%, 86% { transform: translateY(-64px); }
                    87%, 100% { transform: translateY(-96px); }
                }
            `}</style>
        </div>
    );
}
