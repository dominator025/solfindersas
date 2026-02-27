"use client";

import { Leaf, Sun, Moon, BookOpen } from "lucide-react";

const features = [
    {
        icon: Sun,
        title: "Time-Based Healing",
        desc: "Each raaga is mapped to a specific time of day, following the ancient Prahar system for optimal therapeutic effect.",
    },
    {
        icon: Leaf,
        title: "Natural Sound Therapy",
        desc: "Pure sine-wave tones tuned to classical frequencies, enriched with subtle harmonics to create a deeply calming atmosphere.",
    },
    {
        icon: Moon,
        title: "Guided Breathing",
        desc: "A visual breathing guide synchronizes with the music — 3 seconds inhale, 3 seconds exhale — to activate the parasympathetic nervous system.",
    },
    {
        icon: BookOpen,
        title: "Vedic Wisdom",
        desc: "Every raaga carries centuries of documented healing properties from Ayurvedic and Sangeet Shastra traditions.",
    },
];

export default function AboutSection() {
    return (
        <section className="px-6 py-12">
            <div className="mx-auto max-w-5xl">
                {/* Section heading */}
                <div className="mb-10 text-center">
                    <p
                        className="mb-2 text-xs font-medium uppercase tracking-widest"
                        style={{ color: "var(--saffron)", fontFamily: "var(--font-body)" }}
                    >
                        Ancient Science, Modern Healing
                    </p>
                    <h2
                        className="mb-3 text-3xl font-semibold"
                        style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--deep-maroon)",
                        }}
                    >
                        How Raaga Therapy Works
                    </h2>
                    <p
                        className="mx-auto max-w-2xl text-sm leading-relaxed"
                        style={{
                            color: "var(--muted-terracotta)",
                            opacity: 0.75,
                            fontFamily: "var(--font-body)",
                        }}
                    >
                        Indian classical music has been used as a healing modality for over
                        3,000 years. Each raaga is a precise melodic framework that creates
                        specific emotional and physiological responses in the listener.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feat, i) => (
                        <div
                            key={feat.title}
                            className="group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
                            style={{
                                background: "var(--soft-ivory)",
                                border: "1px solid transparent",
                                animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "var(--sandstone)";
                                e.currentTarget.style.boxShadow =
                                    "0 8px 25px rgba(212, 167, 106, 0.15)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "transparent";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div
                                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                                style={{
                                    background:
                                        "linear-gradient(135deg, var(--saffron), var(--temple-gold))",
                                }}
                            >
                                <feat.icon className="h-5 w-5 text-white" />
                            </div>
                            <h3
                                className="mb-2 text-base font-semibold"
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    color: "var(--deep-maroon)",
                                }}
                            >
                                {feat.title}
                            </h3>
                            <p
                                className="text-xs leading-relaxed"
                                style={{
                                    color: "var(--muted-terracotta)",
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
