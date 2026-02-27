"use client";

import DailyStory from "./DailyStory";
import BreathingExercise from "./BreathingExercise";
import MoodCheckin from "./MoodCheckin";
import { Compass } from "lucide-react";

export default function WellnessTools() {
    return (
        <section className="px-6 py-12">
            <div className="mx-auto max-w-5xl">
                {/* Section heading */}
                <div className="mb-8 text-center">
                    <div className="mb-3 flex items-center justify-center gap-2">
                        <Compass
                            className="h-5 w-5"
                            style={{ color: "var(--temple-gold)" }}
                        />
                        <p
                            className="text-xs font-medium uppercase tracking-widest"
                            style={{
                                color: "var(--saffron)",
                                fontFamily: "var(--font-body)",
                            }}
                        >
                            Interactive Wellness Tools
                        </p>
                    </div>
                    <h2
                        className="mb-2 text-3xl font-semibold"
                        style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--deep-maroon)",
                        }}
                    >
                        Your Daily Wellness Ritual
                    </h2>
                    <p
                        className="mx-auto max-w-lg text-sm"
                        style={{
                            color: "var(--muted-terracotta)",
                            opacity: 0.7,
                            fontFamily: "var(--font-body)",
                        }}
                    >
                        Ancient tools for modern minds — stories, breath, and
                        self-reflection rooted in Indian heritage.
                    </p>
                </div>

                {/* Tools grid */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                    {/* Daily Story — takes full width of first column */}
                    <div
                        className="lg:col-span-2"
                        style={{ animation: "fadeInUp 0.5s ease-out both" }}
                    >
                        <DailyStory />
                    </div>

                    {/* Mood Check-in */}
                    <div style={{ animation: "fadeInUp 0.5s ease-out 0.1s both" }}>
                        <MoodCheckin />
                    </div>

                    {/* Breathing Exercise — full width */}
                    <div
                        className="lg:col-span-3"
                        style={{ animation: "fadeInUp 0.5s ease-out 0.2s both" }}
                    >
                        <div className="mx-auto max-w-md">
                            <BreathingExercise />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
