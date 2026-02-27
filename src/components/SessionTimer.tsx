"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Timer, RotateCcw } from "lucide-react";

interface SessionTimerProps {
    isPlaying: boolean;
    accentColor: string;
}

const PRESETS = [
    { label: "5 min", seconds: 5 * 60 },
    { label: "10 min", seconds: 10 * 60 },
    { label: "15 min", seconds: 15 * 60 },
];

export default function SessionTimer({
    isPlaying,
    accentColor,
}: SessionTimerProps) {
    const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Timer countdown
    useEffect(() => {
        if (isTimerActive && isPlaying && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsTimerActive(false);
                        setIsComplete(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isTimerActive, isPlaying, timeLeft]);

    // Pause timer when audio pauses
    useEffect(() => {
        if (!isPlaying && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [isPlaying]);

    const selectPreset = useCallback((seconds: number) => {
        setSelectedDuration(seconds);
        setTimeLeft(seconds);
        setIsTimerActive(true);
        setIsComplete(false);
    }, []);

    const resetTimer = useCallback(() => {
        setSelectedDuration(null);
        setTimeLeft(0);
        setIsTimerActive(false);
        setIsComplete(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const progress = selectedDuration
        ? ((selectedDuration - timeLeft) / selectedDuration) * 100
        : 0;

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Label */}
            <div className="flex items-center gap-1.5">
                <Timer className="h-3.5 w-3.5 text-white/40" />
                <span
                    className="text-xs font-medium uppercase tracking-wider text-white/40"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    Session Timer
                </span>
            </div>

            {!selectedDuration ? (
                /* Preset buttons */
                <div className="flex items-center gap-2">
                    {PRESETS.map((p) => (
                        <button
                            key={p.seconds}
                            onClick={() => selectPreset(p.seconds)}
                            className="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105"
                            style={{
                                background: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                color: "rgba(255,255,255,0.6)",
                                fontFamily: "var(--font-body)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = `${accentColor}30`;
                                e.currentTarget.style.borderColor = `${accentColor}50`;
                                e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                            }}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            ) : (
                /* Active timer */
                <div className="flex flex-col items-center gap-2">
                    {/* Circular progress */}
                    <div className="relative flex h-16 w-16 items-center justify-center">
                        <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 64 64">
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="3"
                            />
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="none"
                                stroke={accentColor}
                                strokeWidth="3"
                                strokeDasharray={`${2 * Math.PI * 28}`}
                                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 1s linear" }}
                            />
                        </svg>
                        <span
                            className="relative text-sm font-medium"
                            style={{
                                fontFamily: "var(--font-body)",
                                color: isComplete ? accentColor : "rgba(255,255,255,0.8)",
                            }}
                        >
                            {isComplete ? "Done" : formatTime(timeLeft)}
                        </span>
                    </div>

                    {/* Reset button */}
                    <button
                        onClick={resetTimer}
                        className="flex items-center gap-1 text-white/40 transition-colors hover:text-white/70"
                    >
                        <RotateCcw className="h-3 w-3" />
                        <span
                            className="text-xs"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Reset
                        </span>
                    </button>

                    {/* Session complete message */}
                    {isComplete && (
                        <p
                            className="text-xs"
                            style={{
                                color: accentColor,
                                fontFamily: "var(--font-body)",
                                animation: "fadeInUp 0.5s ease-out",
                            }}
                        >
                            ✨ Session complete. Namaste.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
