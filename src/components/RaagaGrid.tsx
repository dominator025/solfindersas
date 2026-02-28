"use client";

import { Raaga, raagas } from "@/data/raagas";
import RaagaCard from "./RaagaCard";
import { motion } from "framer-motion";

interface RaagaGridProps {
    selectedRaaga: Raaga | null;
    onSelectRaaga: (raaga: Raaga) => void;
    isPlaying?: boolean;
}

export default function RaagaGrid({
    selectedRaaga,
    onSelectRaaga,
    isPlaying,
}: RaagaGridProps) {
    return (
        <section className="relative px-6 py-10 overflow-hidden">
            {/* Background mandala decorations */}
            <div className="pointer-events-none absolute left-0 top-0 opacity-[0.03]"
                style={{ width: "300px", height: "300px", animation: "slowRotate 90s linear infinite" }}>
                <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%", height: "100%", color: "var(--temple-gold)" }}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <ellipse key={i} cx="200" cy="70" rx="18" ry="60"
                            stroke="currentColor" strokeWidth="0.6" transform={`rotate(${i * 30} 200 200)`} />
                    ))}
                    <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.4" />
                    <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.4" />
                </svg>
            </div>
            <div className="pointer-events-none absolute right-0 bottom-0 opacity-[0.03]"
                style={{ width: "250px", height: "250px", animation: "slowRotate 70s linear infinite reverse" }}>
                <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%", height: "100%", color: "var(--saffron)" }}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ellipse key={i} cx="200" cy="90" rx="14" ry="50"
                            stroke="currentColor" strokeWidth="0.8" transform={`rotate(${i * 45} 200 200)`} />
                    ))}
                    <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Section heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mb-8 text-center"
            >
                <motion.div
                    className="mb-3 inline-block"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-2xl">🎵</span>
                </motion.div>
                <h2
                    className="mb-2 text-3xl font-semibold shimmer-text"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Choose Your Raaga
                </h2>
                <p className="text-sm" style={{ color: "var(--muted-terracotta)", opacity: 0.7 }}>
                    Each raaga resonates with a different part of your soul
                </p>
            </motion.div>

            {/* Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
                {raagas.map((raaga, index) => (
                    <motion.div
                        key={raaga.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                    >
                        <RaagaCard
                            raaga={raaga}
                            isSelected={selectedRaaga?.id === raaga.id}
                            onSelect={onSelectRaaga}
                            isPlaying={isPlaying}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
