"use client";

import DailyStory from "./DailyStory";
import BreathingExercise from "./BreathingExercise";
import { BookOpen, Wind } from "lucide-react";
import { motion } from "framer-motion";

export default function WellnessTools() {
    return (
        <section className="px-6 py-12">
            <div className="mx-auto max-w-5xl">

                {/* ──────────────────── STORY SECTION ──────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    {/* Story section heading */}
                    <div className="mb-6 text-center">
                        <div className="mb-3 flex items-center justify-center gap-2">
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-xl"
                                style={{
                                    background: "linear-gradient(135deg, var(--deep-maroon), var(--muted-terracotta))",
                                }}
                            >
                                <BookOpen className="h-4 w-4 text-white" />
                            </div>
                            <p
                                className="text-xs font-medium uppercase tracking-widest"
                                style={{
                                    color: "var(--saffron)",
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                Ancient Tales for Inner Peace
                            </p>
                        </div>
                        <h2
                            className="mb-2 text-3xl font-semibold"
                            style={{
                                fontFamily: "var(--font-heading)",
                                color: "var(--deep-maroon)",
                            }}
                        >
                            Stories That Heal the Mind
                        </h2>
                        <p
                            className="mx-auto max-w-2xl text-sm leading-relaxed"
                            style={{
                                color: "var(--muted-terracotta)",
                                opacity: 0.8,
                                fontFamily: "var(--font-body)",
                            }}
                        >
                            For thousands of years, Indian Panchatantra stories have been used as
                            tools for reflection and mental clarity. Each tale carries a timeless
                            moral that quiets the restless mind, cultivates wisdom, and nurtures
                            emotional resilience — a gentle form of therapy through narrative.
                        </p>
                    </div>

                    {/* Story card — full width */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        <DailyStory />
                    </motion.div>
                </motion.div>


                {/* ──────── Decorative divider between sections ──────── */}
                <div className="mx-auto mb-14 flex items-center justify-center gap-3">
                    <span className="block h-px w-20" style={{ background: "var(--sandstone)", opacity: 0.3 }} />
                    <span className="block h-1.5 w-1.5 rotate-45" style={{ background: "var(--temple-gold)", opacity: 0.5 }} />
                    <span className="block h-px w-20" style={{ background: "var(--sandstone)", opacity: 0.3 }} />
                </div>


                {/* ──────────────────── PRANAYAMA SECTION ──────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Pranayama section heading */}
                    <div className="mb-6 text-center">
                        <div className="mb-3 flex items-center justify-center gap-2">
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-xl"
                                style={{
                                    background: "linear-gradient(135deg, var(--saffron), var(--temple-gold))",
                                }}
                            >
                                <Wind className="h-4 w-4 text-white" />
                            </div>
                            <p
                                className="text-xs font-medium uppercase tracking-widest"
                                style={{
                                    color: "var(--saffron)",
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                Vedic Breathing Practice
                            </p>
                        </div>
                        <h2
                            className="mb-2 text-3xl font-semibold"
                            style={{
                                fontFamily: "var(--font-heading)",
                                color: "var(--deep-maroon)",
                            }}
                        >
                            Pranayama — The Breath of Life
                        </h2>
                        <p
                            className="mx-auto max-w-2xl text-sm leading-relaxed"
                            style={{
                                color: "var(--muted-terracotta)",
                                opacity: 0.8,
                                fontFamily: "var(--font-body)",
                            }}
                        >
                            Pranayama is the ancient Yogic science of breath control.
                            Sit in Padmasana (lotus pose), rest your hands on your knees
                            in Chin Mudra — thumb and index finger gently touching — and
                            follow the guided rhythm below.
                        </p>
                    </div>

                    {/* Pranayama card — full width, centered */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="mx-auto max-w-2xl"
                    >
                        <BreathingExercise />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
