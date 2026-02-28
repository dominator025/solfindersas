"use client";

import { useState } from "react";
import { Heart, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import HealingOverlay from "./HealingOverlay";

/* Reusable mandala SVG path — a layered petal/circle pattern */
function MandalaSVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <svg
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
        >
            {/* Outer ring of petals */}
            {Array.from({ length: 12 }).map((_, i) => (
                <ellipse
                    key={`outer-${i}`}
                    cx="200"
                    cy="80"
                    rx="18"
                    ry="55"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    transform={`rotate(${i * 30} 200 200)`}
                />
            ))}
            {/* Middle ring of petals */}
            {Array.from({ length: 8 }).map((_, i) => (
                <ellipse
                    key={`mid-${i}`}
                    cx="200"
                    cy="120"
                    rx="14"
                    ry="38"
                    stroke="currentColor"
                    strokeWidth="0.7"
                    transform={`rotate(${i * 45} 200 200)`}
                />
            ))}
            {/* Inner ring of petals */}
            {Array.from({ length: 6 }).map((_, i) => (
                <ellipse
                    key={`inner-${i}`}
                    cx="200"
                    cy="150"
                    rx="10"
                    ry="26"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    transform={`rotate(${i * 60} 200 200)`}
                />
            ))}
            {/* Concentric circles */}
            <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="200" cy="200" r="12" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.08" />
            {/* Decorative dots on outer circle */}
            {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 15 * Math.PI) / 180;
                return (
                    <circle
                        key={`dot-${i}`}
                        cx={200 + 160 * Math.sin(angle)}
                        cy={200 - 160 * Math.cos(angle)}
                        r="2"
                        fill="currentColor"
                        fillOpacity="0.3"
                    />
                );
            })}
        </svg>
    );
}

export default function HeroSection() {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <section
            className="relative overflow-hidden text-center"
            style={{
                background: "var(--warm-cream, #FDF6EC)",
            }}
        >
            {/* Animated Mandala — top-right */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute"
                style={{ top: "-18%", right: "-12%", width: "520px", height: "520px" }}
            >
                <MandalaSVG
                    style={{ width: "100%", height: "100%", color: "var(--temple-gold)", opacity: 0.07 }}
                />
            </motion.div>

            {/* Animated Mandala — bottom-left (counter-rotate) */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute"
                style={{ bottom: "-22%", left: "-14%", width: "480px", height: "480px" }}
            >
                <MandalaSVG
                    style={{ width: "100%", height: "100%", color: "var(--saffron)", opacity: 0.055 }}
                />
            </motion.div>

            {/* Subtle center mandala (pulsing) */}
            <motion.div
                animate={{ rotate: 180, scale: [1, 1.06, 1] }}
                transition={{ rotate: { duration: 150, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
                className="pointer-events-none absolute left-1/2 top-1/2"
                style={{ width: "700px", height: "700px", transform: "translate(-50%, -50%)" }}
            >
                <MandalaSVG
                    style={{ width: "100%", height: "100%", color: "var(--sandstone)", opacity: 0.035 }}
                />
            </motion.div>

            <div className="relative px-6 py-16 md:py-20">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-3 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                    style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--deep-maroon)",
                    }}
                >
                    SolFinders
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="mx-auto max-w-md text-lg font-light tracking-widest uppercase"
                    style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--muted-terracotta)",
                        letterSpacing: "0.2em",
                    }}
                >
                    Heal through Heritage
                </motion.p>

                {/* Decorative line */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    className="mx-auto mt-6 flex items-center justify-center gap-3"
                >
                    <span className="block h-px w-16" style={{ background: "var(--sandstone)" }} />
                    <span className="block h-2 w-2 rotate-45" style={{ background: "var(--temple-gold)" }} />
                    <span className="block h-px w-16" style={{ background: "var(--sandstone)" }} />
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                    className="mx-auto mt-5 max-w-xl text-sm leading-relaxed"
                    style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--muted-terracotta)",
                        opacity: 0.8,
                    }}
                >
                    Discover the ancient science of Indian Raaga therapy — curated
                    soundscapes rooted in centuries of Vedic tradition to calm the mind,
                    heal the body, and uplift the spirit.
                </motion.p>

                {/* CTA button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                    className="mt-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            y: [0, -5, 0],
                        }}
                        transition={{
                            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        onClick={() => setShowOverlay(true)}
                        className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#3B1F0B]/30 cursor-pointer"
                        style={{
                            background: "linear-gradient(135deg, var(--deep-maroon), var(--saffron))",
                            fontFamily: "var(--font-body)",
                        }}
                    >
                        <Heart className="h-4 w-4" />
                        Start Healing
                    </motion.button>
                </motion.div>

                {/* Healing Overlay */}
                <HealingOverlay isOpen={showOverlay} onClose={() => setShowOverlay(false)} />

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="mt-10 flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown
                            className="h-5 w-5"
                            style={{ color: "var(--sandstone)", opacity: 0.5 }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
