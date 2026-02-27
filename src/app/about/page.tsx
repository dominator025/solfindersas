"use client";

import Link from "next/link";
import { ArrowLeft, Users, Lightbulb, Heart, Zap, GraduationCap } from "lucide-react";

const founders = [
    {
        name: "Adrika Gaur",
        role: "Research & Content Lead",
        emoji: "📚",
        bio: "Deep-diving into Vedic texts and Ayurvedic traditions to bring authentic healing knowledge to every feature.",
    },
    {
        name: "Kashish Bharti",
        role: "Backend & Audio Engineer",
        emoji: "🎵",
        bio: "Fascinated by the intersection of music, technology, and wellness — building the sonic foundation of SolFinders.",
    },
    {
        name: "Bhaskar Thakur",
        role: "Frontend & UI/UX Lead",
        emoji: "🎨",
        bio: "Passionate about creating intuitive, heritage-inspired digital experiences that bring ancient wisdom to modern screens.",
    },
    {
        name: "Laxmi Singh",
        role: "Product & Strategy Lead",
        emoji: "🚀",
        bio: "Turning the vision of accessible heritage wellness into a product that truly impacts people's daily lives.",
    },
];

const problems = [
    {
        title: "Modern Stress Needs Soulful Solutions",
        description:
            "In our hyperconnected world, traditional stress management tools fall short. We need interventions that touch the soul — interventions rooted in millennia of human wisdom.",
        icon: Heart,
    },
    {
        title: "The Disconnect",
        description:
            "Digital wellness tools are often impersonal and data-driven. Yet the most profound healing comes from practices that engage emotion, spirituality, and cultural resonance.",
        icon: Zap,
    },
    {
        title: "Our Solution",
        description:
            "Integrate time-tested Indian healing practices — Raagas, Mandalas, and Sacred Tales — into accessible digital experiences that transform stress into serenity.",
        icon: Lightbulb,
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen" style={{ background: "var(--warm-cream, #FDF6EC)" }}>
            {/* ─── Hero ─── */}
            <section
                className="relative overflow-hidden"
                style={{
                    background:
                        "linear-gradient(135deg, var(--deep-maroon) 0%, #8B4513 50%, var(--saffron) 100%)",
                }}
            >
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px),
              radial-gradient(circle at 80% 70%, #fff 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                />

                <div className="relative px-6 py-16 text-center md:py-20">
                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/70 transition-all duration-200 hover:text-white"
                        style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            fontFamily: "var(--font-body)",
                        }}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>

                    <h1
                        className="mb-4 text-4xl font-bold text-white md:text-5xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        About SolFinders
                    </h1>
                    <p
                        className="mx-auto max-w-xl text-lg text-white/80"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        We are B.Tech students on a mission to make India&apos;s ancient
                        healing heritage accessible to everyone through technology.
                    </p>
                </div>

                <div
                    className="h-6"
                    style={{
                        background: "var(--warm-cream, #FDF6EC)",
                        borderRadius: "100% 100% 0 0",
                    }}
                />
            </section>

            {/* ─── The Problem We Solve ─── */}
            <section className="px-6 py-16">
                <div className="mx-auto max-w-5xl">
                    <h2
                        className="mb-10 text-center text-3xl font-bold md:text-4xl"
                        style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--deep-maroon)",
                        }}
                    >
                        The Problem We Solve
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {problems.map((item, i) => (
                            <div
                                key={item.title}
                                className="group rounded-2xl px-6 py-6 transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background:
                                        i === 2
                                            ? "linear-gradient(135deg, var(--soft-ivory), rgba(232, 144, 46, 0.08))"
                                            : "var(--soft-ivory)",
                                    borderLeft: "3px solid var(--deep-maroon)",
                                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                                    animation: `fadeInUp 0.5s ease-out ${i * 0.15}s both`,
                                }}
                            >
                                <h3
                                    className="mb-3 text-lg font-bold"
                                    style={{
                                        fontFamily: "var(--font-heading)",
                                        color: "var(--deep-maroon)",
                                    }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        color: "var(--muted-terracotta)",
                                    }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Meet the Founders ─── */}
            <section className="px-6 py-16">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-10 text-center">
                        <div className="mb-3 flex items-center justify-center gap-2">
                            <Users className="h-5 w-5" style={{ color: "var(--temple-gold)" }} />
                            <p
                                className="text-xs font-medium uppercase tracking-widest"
                                style={{ color: "var(--saffron)", fontFamily: "var(--font-body)" }}
                            >
                                The Team Behind SolFinders
                            </p>
                        </div>
                        <h2
                            className="mb-3 text-3xl font-bold md:text-4xl"
                            style={{
                                fontFamily: "var(--font-heading)",
                                color: "var(--deep-maroon)",
                            }}
                        >
                            Meet Our Founders
                        </h2>
                        <div className="mx-auto mb-2 flex items-center justify-center gap-1.5">
                            <GraduationCap className="h-4 w-4" style={{ color: "var(--sandstone)" }} />
                            <p
                                className="text-sm"
                                style={{
                                    color: "var(--muted-terracotta)",
                                    fontFamily: "var(--font-body)",
                                    opacity: 0.7,
                                }}
                            >
                                B.Tech Students · Heritage Aesthetics Track
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {founders.map((founder, i) => (
                            <div
                                key={founder.name}
                                className="group rounded-2xl px-5 py-6 text-center transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: "var(--soft-ivory)",
                                    border: "1px solid transparent",
                                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                                    animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "var(--sandstone)";
                                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(212, 167, 106, 0.18)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "transparent";
                                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                                }}
                            >
                                {/* Avatar */}
                                <div
                                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl"
                                    style={{
                                        background: "linear-gradient(135deg, var(--saffron), var(--temple-gold))",
                                        boxShadow: "0 4px 12px rgba(232, 144, 46, 0.25)",
                                    }}
                                >
                                    {founder.emoji}
                                </div>

                                <h3
                                    className="mb-1 text-lg font-bold"
                                    style={{
                                        fontFamily: "var(--font-heading)",
                                        color: "var(--deep-maroon)",
                                    }}
                                >
                                    {founder.name}
                                </h3>

                                <p
                                    className="mb-3 text-xs font-medium uppercase tracking-wider"
                                    style={{
                                        color: "var(--saffron)",
                                        fontFamily: "var(--font-body)",
                                    }}
                                >
                                    {founder.role}
                                </p>

                                <p
                                    className="text-xs leading-relaxed"
                                    style={{
                                        color: "var(--muted-terracotta)",
                                        fontFamily: "var(--font-body)",
                                    }}
                                >
                                    {founder.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Our Vision ─── */}
            <section className="px-6 py-12">
                <div
                    className="mx-auto max-w-3xl rounded-2xl px-8 py-10 text-center"
                    style={{
                        background: "linear-gradient(135deg, var(--deep-maroon), #8B2E2E)",
                    }}
                >
                    <h2
                        className="mb-3 text-2xl font-bold text-white md:text-3xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Our Vision
                    </h2>
                    <p
                        className="mx-auto max-w-lg text-sm leading-relaxed text-white/70"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        To create a world where ancient Indian healing practices are as
                        accessible as any modern wellness app — bridging 5,000 years of
                        wisdom with today&apos;s technology, one raaga at a time.
                    </p>
                </div>
            </section>

            {/* ─── Footer ─── */}
            <footer
                className="px-6 py-8 text-center"
                style={{ background: "var(--deep-maroon, #3D1E24)" }}
            >
                <p className="text-sm text-white/50" style={{ fontFamily: "var(--font-body)" }}>
                    © 2026 SolFinders. Transforming Ancient Wisdom into Modern Healing.
                </p>
            </footer>
        </div>
    );
}
