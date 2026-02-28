"use client";

import { Music, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative mt-auto overflow-hidden">
            {/* Decorative top border with gradient */}
            <div
                className="h-px w-full"
                style={{
                    background: "linear-gradient(90deg, transparent, var(--temple-gold), transparent)",
                    opacity: 0.4,
                }}
            />

            {/* Subtle background mandala */}
            <div
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03]"
                style={{ width: "200px", height: "200px" }}
            >
                <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%", height: "100%", color: "var(--temple-gold)" }}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ellipse key={i} cx="200" cy="100" rx="14" ry="45" stroke="currentColor" strokeWidth="0.8" transform={`rotate(${i * 45} 200 200)`} />
                    ))}
                    <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </div>

            <div className="px-6 py-10 text-center">
                {/* Logo mark */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 flex items-center justify-center gap-2"
                >
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{
                            background: "linear-gradient(135deg, var(--deep-maroon), var(--saffron))",
                            opacity: 0.8,
                        }}
                    >
                        <Music className="h-4 w-4 text-white" />
                    </div>
                    <span
                        className="text-lg font-semibold"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)", opacity: 0.7 }}
                    >
                        SolFinders
                    </span>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-5 text-xs tracking-widest uppercase"
                    style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--sandstone)",
                        letterSpacing: "0.2em",
                    }}
                >
                    Raaga Sound Therapy • Heal Through Heritage
                </motion.p>

                {/* Divider */}
                <div className="mx-auto mb-5 flex items-center justify-center gap-3">
                    <span className="block h-px w-12" style={{ background: "var(--sandstone)", opacity: 0.25 }} />
                    <span className="block h-1 w-1 rotate-45" style={{ background: "var(--temple-gold)", opacity: 0.4 }} />
                    <span className="block h-px w-12" style={{ background: "var(--sandstone)", opacity: 0.25 }} />
                </div>

                {/* Credit */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center justify-center gap-1.5 text-xs"
                    style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--muted-terracotta)",
                        opacity: 0.6,
                    }}
                >
                    Built with <Heart className="h-3 w-3" style={{ color: "var(--temple-gold)" }} /> for{" "}
                    <span style={{ color: "var(--temple-gold)", fontWeight: 500, opacity: 1 }}>
                        Heritage Aesthetics Track
                    </span>
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-2 text-xs"
                    style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--sandstone)",
                        opacity: 0.4,
                    }}
                >
                    © 2026 SolFinders. All rights reserved.
                </motion.p>
            </div>
        </footer>
    );
}
