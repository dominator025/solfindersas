"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

interface MoodOption {
    emoji: string;
    label: string;
    suggestion: string;
    suggestedRaaga: string;
    color: string;
}

const moods: MoodOption[] = [
    {
        emoji: "😰",
        label: "Anxious",
        suggestion: "Try Raag Bhairavi — its gentle morning melodies calm the restless mind and ease anxiety.",
        suggestedRaaga: "bhairavi",
        color: "#E8902E",
    },
    {
        emoji: "😔",
        label: "Sad",
        suggestion: "Try Raag Yaman — its uplifting evening notes elevate the mood and inspire hope.",
        suggestedRaaga: "yaman",
        color: "#C9A94E",
    },
    {
        emoji: "😤",
        label: "Restless",
        suggestion: "Try Raag Darbari Kanada — its deep, majestic phrases bring profound stillness and peace.",
        suggestedRaaga: "darbari",
        color: "#2C2450",
    },
    {
        emoji: "🤯",
        label: "Overwhelmed",
        suggestion: "Try Raag Todi — its focused, introspective character sharpens the scattered mind.",
        suggestedRaaga: "todi",
        color: "#6B1D2A",
    },
    {
        emoji: "😶",
        label: "Numb",
        suggestion: "Try Raag Malkauns — its ancient pentatonic power grounds the spirit and awakens courage.",
        suggestedRaaga: "malkauns",
        color: "#4A3728",
    },
    {
        emoji: "🏠",
        label: "Homesick",
        suggestion: "Try Raag Desh — its monsoon sweetness evokes warmth, nostalgia, and a sense of belonging.",
        suggestedRaaga: "desh",
        color: "#2D7D46",
    },
];

export default function MoodCheckin() {
    const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);

    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{
                background: "linear-gradient(135deg, var(--soft-ivory), #fff)",
                border: "1px solid var(--sandstone)",
                boxShadow: "0 4px 20px rgba(212, 167, 106, 0.12)",
            }}
        >
            <div className="px-5 py-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                            background: "linear-gradient(135deg, var(--muted-terracotta), var(--saffron))",
                        }}
                    >
                        <Heart className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p
                            className="text-xs font-medium uppercase tracking-wider"
                            style={{ color: "var(--saffron)", fontFamily: "var(--font-body)" }}
                        >
                            Wellness Check-in
                        </p>
                        <h3
                            className="text-lg font-semibold"
                            style={{
                                fontFamily: "var(--font-heading)",
                                color: "var(--deep-maroon)",
                            }}
                        >
                            How Are You Feeling?
                        </h3>
                    </div>
                </div>

                {/* Mood options */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {moods.map((mood) => (
                        <button
                            key={mood.label}
                            onClick={() =>
                                setSelectedMood(selectedMood?.label === mood.label ? null : mood)
                            }
                            className="flex flex-col items-center gap-1 rounded-xl py-3 px-2 transition-all duration-200 hover:scale-105"
                            style={{
                                background:
                                    selectedMood?.label === mood.label
                                        ? `${mood.color}15`
                                        : "rgba(212, 167, 106, 0.06)",
                                border:
                                    selectedMood?.label === mood.label
                                        ? `1.5px solid ${mood.color}40`
                                        : "1.5px solid transparent",
                            }}
                        >
                            <span className="text-2xl">{mood.emoji}</span>
                            <span
                                className="text-xs font-medium"
                                style={{
                                    color:
                                        selectedMood?.label === mood.label
                                            ? mood.color
                                            : "var(--muted-terracotta)",
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                {mood.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Suggestion */}
                {selectedMood && (
                    <div
                        className="rounded-xl px-4 py-3"
                        style={{
                            background: `${selectedMood.color}08`,
                            borderLeft: `3px solid ${selectedMood.color}`,
                            animation: "fadeInUp 0.3s ease-out",
                        }}
                    >
                        <p
                            className="text-sm leading-relaxed"
                            style={{
                                fontFamily: "var(--font-body)",
                                color: "var(--foreground)",
                            }}
                        >
                            {selectedMood.suggestion}
                        </p>
                    </div>
                )}

                {/* Prompt when no mood selected */}
                {!selectedMood && (
                    <p
                        className="text-xs text-center"
                        style={{
                            color: "var(--muted-terracotta)",
                            fontFamily: "var(--font-body)",
                            opacity: 0.5,
                        }}
                    >
                        Select your current mood for a personalized raaga suggestion
                    </p>
                )}
            </div>
        </div>
    );
}
