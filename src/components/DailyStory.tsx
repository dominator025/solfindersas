"use client";

import { useState } from "react";
import { getDailyStory, stories } from "@/data/panchatantra";
import { BookOpen, ChevronDown, ChevronUp, Sparkles, RefreshCw } from "lucide-react";

export default function DailyStory() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentStory, setCurrentStory] = useState(getDailyStory());
    const [isShuffling, setIsShuffling] = useState(false);

    const shuffleStory = () => {
        setIsShuffling(true);
        const otherStories = stories.filter((s) => s.id !== currentStory.id);
        const random = otherStories[Math.floor(Math.random() * otherStories.length)];
        setTimeout(() => {
            setCurrentStory(random);
            setIsShuffling(false);
            setIsExpanded(true);
        }, 400);
    };

    return (
        <div
            className="rounded-2xl overflow-hidden transition-all duration-500"
            style={{
                background: "linear-gradient(135deg, var(--soft-ivory), #fff)",
                border: "1px solid var(--sandstone)",
                boxShadow: "0 4px 20px rgba(212, 167, 106, 0.12)",
            }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                            background: "linear-gradient(135deg, var(--deep-maroon), var(--muted-terracotta))",
                        }}
                    >
                        <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p
                            className="text-xs font-medium uppercase tracking-wider"
                            style={{ color: "var(--saffron)", fontFamily: "var(--font-body)" }}
                        >
                            Daily Panchatantra
                        </p>
                        <h3
                            className="text-lg font-semibold"
                            style={{
                                fontFamily: "var(--font-heading)",
                                color: "var(--deep-maroon)",
                            }}
                        >
                            {currentStory.character} {currentStory.title}
                        </h3>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            shuffleStory();
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                        style={{
                            background: "rgba(107, 29, 42, 0.08)",
                        }}
                        title="Random story"
                    >
                        <RefreshCw
                            className="h-3.5 w-3.5"
                            style={{
                                color: "var(--deep-maroon)",
                                animation: isShuffling ? "slowRotate 0.4s linear" : "none",
                            }}
                        />
                    </button>
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5" style={{ color: "var(--sandstone)" }} />
                    ) : (
                        <ChevronDown className="h-5 w-5" style={{ color: "var(--sandstone)" }} />
                    )}
                </div>
            </div>

            {/* Expandable content */}
            <div
                className="overflow-hidden transition-all duration-500"
                style={{
                    maxHeight: isExpanded ? "800px" : "0",
                    opacity: isExpanded ? 1 : 0,
                }}
            >
                <div className="px-5 pb-5">
                    {/* Book tag */}
                    <span
                        className="mb-3 inline-block rounded-full px-3 py-1 text-xs"
                        style={{
                            background: "rgba(107, 29, 42, 0.06)",
                            color: "var(--deep-maroon)",
                            fontFamily: "var(--font-body)",
                            border: "1px solid rgba(107, 29, 42, 0.1)",
                        }}
                    >
                        📖 {currentStory.book}
                    </span>

                    {/* Story text */}
                    <div
                        className="mb-4 rounded-xl px-4 py-3"
                        style={{
                            background: "rgba(212, 167, 106, 0.06)",
                            borderLeft: "3px solid var(--temple-gold)",
                        }}
                    >
                        <p
                            className="text-sm leading-relaxed"
                            style={{
                                fontFamily: "var(--font-body)",
                                color: "var(--foreground)",
                                lineHeight: "1.75",
                            }}
                        >
                            {currentStory.tale}
                        </p>
                    </div>

                    {/* Moral */}
                    <div className="flex items-start gap-2">
                        <Sparkles
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: "var(--temple-gold)" }}
                        />
                        <div>
                            <p
                                className="mb-1 text-xs font-semibold uppercase tracking-wider"
                                style={{ color: "var(--saffron)", fontFamily: "var(--font-body)" }}
                            >
                                Moral of the Story
                            </p>
                            <p
                                className="text-sm italic leading-relaxed"
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    color: "var(--deep-maroon)",
                                }}
                            >
                                &ldquo;{currentStory.moral}&rdquo;
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview when collapsed */}
            {!isExpanded && (
                <div className="px-5 pb-4">
                    <p
                        className="text-xs text-left"
                        style={{
                            color: "var(--muted-terracotta)",
                            fontFamily: "var(--font-body)",
                            opacity: 0.7,
                        }}
                    >
                        Tap to read today&apos;s ancient wisdom ↓
                    </p>
                </div>
            )}
        </div>
    );
}
