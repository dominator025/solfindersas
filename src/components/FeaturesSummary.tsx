"use client";

import { motion } from "framer-motion";
import { Music, Wind, BookOpen, Feather } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
    {
        icon: Music,
        title: "Raaga Therapy",
        description: "Ancient Indian melodies curated for healing — each raaga calibrated to a specific time of day and emotional state.",
        color: "#c9a227",
        image: "/images/feature_raaga.png",
        href: "#features",
    },
    {
        icon: Wind,
        title: "Pranayama Guide",
        description: "Guided Vedic breathing exercises with visual coaching — from Nadi Shodhana to Bhramari, synced to your inner rhythm.",
        color: "#8b5e3c",
        image: "/images/feature_pranayama.png",
        href: "#tools",
    },
    {
        icon: BookOpen,
        title: "Panchatantra Wisdom",
        description: "Daily ancient Indian fables that heal the mind — timeless stories for modern emotional resilience and inner peace.",
        color: "#3B1F0B",
        image: "/images/feature_stories.png",
        href: "#tools",
    },
    {
        icon: Feather,
        title: "Dear Diary",
        description: "Pour your heart into a soul journal and receive ancient wisdom — an AI companion rooted in 5,000 years of heritage.",
        color: "#c4a265",
        image: null,
        href: "/diary",
    },
];

export default function FeaturesSummary() {
    return (
        <section className="px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="mb-8 text-center"
            >
                <p
                    className="mb-2 text-xs font-medium uppercase tracking-widest"
                    style={{ color: "var(--temple-gold)", fontFamily: "var(--font-body)" }}
                >
                    What We Offer
                </p>
                <h2
                    className="mb-2 text-3xl font-semibold md:text-4xl"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}
                >
                    Four Pillars of Healing
                </h2>
                <p
                    className="mx-auto max-w-lg text-sm"
                    style={{ color: "var(--muted-terracotta)", opacity: 0.7 }}
                >
                    Ancient sciences, reimagined for the modern soul
                </p>
            </motion.div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    const isLink = feature.href.startsWith("/");

                    const card = (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer"
                            style={{
                                background: "var(--soft-ivory)",
                                border: "1px solid rgba(196, 162, 101, 0.15)",
                                boxShadow: "0 4px 20px rgba(59, 31, 11, 0.04)",
                            }}
                        >
                            {/* Image or gradient top */}
                            <div
                                className="relative h-36 w-full overflow-hidden"
                                style={{
                                    background: feature.image
                                        ? undefined
                                        : `linear-gradient(135deg, ${feature.color}15, ${feature.color}08)`,
                                }}
                            >
                                {feature.image ? (
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        {/* Decorative mandala behind icon */}
                                        <div className="absolute opacity-[0.06]" style={{ width: "120px", height: "120px" }}>
                                            <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%", height: "100%", color: feature.color }}>
                                                {Array.from({ length: 8 }).map((_, i) => (
                                                    <ellipse key={i} cx="200" cy="110" rx="14" ry="42"
                                                        stroke="currentColor" strokeWidth="1" transform={`rotate(${i * 45} 200 200)`} />
                                                ))}
                                                <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.8" />
                                                <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="0.8" />
                                            </svg>
                                        </div>
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
                                            style={{
                                                background: `linear-gradient(135deg, ${feature.color}, ${feature.color}cc)`,
                                                boxShadow: `0 4px 16px ${feature.color}30`,
                                            }}
                                        >
                                            <Icon className="h-7 w-7 text-white" />
                                        </motion.div>
                                    </div>
                                )}

                                {/* Overlay gradient for image cards */}
                                {feature.image && (
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: "linear-gradient(to top, rgba(245,237,224,0.9) 0%, transparent 60%)",
                                        }}
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    {feature.image && (
                                        <Icon className="h-4 w-4" style={{ color: feature.color }} />
                                    )}
                                    <h3
                                        className="text-sm font-semibold"
                                        style={{
                                            fontFamily: "var(--font-heading)",
                                            color: "var(--deep-maroon)",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {feature.title}
                                    </h3>
                                </div>
                                <p
                                    className="text-xs leading-relaxed"
                                    style={{
                                        color: "var(--muted-terracotta)",
                                        fontFamily: "var(--font-body)",
                                        opacity: 0.8,
                                    }}
                                >
                                    {feature.description}
                                </p>
                            </div>

                            {/* Hover glow */}
                            <div
                                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                style={{ boxShadow: `inset 0 0 0 1px ${feature.color}30, 0 8px 30px ${feature.color}10` }}
                            />
                        </motion.div>
                    );

                    return isLink ? (
                        <Link key={feature.title} href={feature.href}>{card}</Link>
                    ) : (
                        <a key={feature.title} href={feature.href}>{card}</a>
                    );
                })}
            </div>
        </section>
    );
}
