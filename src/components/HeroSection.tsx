"use client";

import { Heart, ChevronDown } from "lucide-react";

export default function HeroSection() {
    return (
        <section
            className="relative overflow-hidden text-center"
            style={{
                background: "var(--warm-cream, #FDF6EC)",
            }}
        >
            {/* Background pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, var(--saffron) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, var(--temple-gold) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative px-6 py-16 md:py-20">
                {/* Title */}
                <h1
                    className="mb-3 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                    style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--deep-maroon)",
                    }}
                >
                    SolFinders
                </h1>

                {/* Tagline */}
                <p
                    className="mx-auto max-w-md text-lg font-light tracking-widest uppercase"
                    style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--muted-terracotta)",
                        letterSpacing: "0.2em",
                    }}
                >
                    Heal through Heritage
                </p>

                {/* Decorative line */}
                <div className="mx-auto mt-6 flex items-center justify-center gap-3">
                    <span className="block h-px w-16" style={{ background: "var(--sandstone)" }} />
                    <span className="block h-2 w-2 rotate-45" style={{ background: "var(--temple-gold)" }} />
                    <span className="block h-px w-16" style={{ background: "var(--sandstone)" }} />
                </div>

                {/* Subtitle */}
                <p
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
                </p>

                {/* CTA button */}
                <div className="mt-8">
                    <a
                        href="#features"
                        className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                        style={{
                            background: "linear-gradient(135deg, var(--deep-maroon), var(--saffron))",
                            fontFamily: "var(--font-body)",
                            boxShadow: "0 4px 15px rgba(107, 29, 42, 0.3)",
                        }}
                    >
                        <Heart className="h-4 w-4" />
                        Start Healing
                    </a>
                </div>

                {/* Scroll indicator */}
                <div className="mt-10 flex justify-center">
                    <ChevronDown
                        className="h-5 w-5 animate-bounce"
                        style={{ color: "var(--sandstone)", opacity: 0.5 }}
                    />
                </div>
            </div>
        </section>
    );
}
