"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Wind, Play, Square, RotateCcw } from "lucide-react";
import Image from "next/image";

type Phase = "idle" | "inhale" | "hold" | "exhale" | "rest";

interface BreathStep {
    phase: Phase;
    duration: number;
    label: string;
}

const BREATH_CYCLE: BreathStep[] = [
    { phase: "inhale", duration: 4, label: "Breathe In" },
    { phase: "hold", duration: 4, label: "Hold" },
    { phase: "exhale", duration: 6, label: "Breathe Out" },
    { phase: "rest", duration: 2, label: "Rest" },
];

const TOTAL_CYCLE = BREATH_CYCLE.reduce((s, b) => s + b.duration, 0); // 16s

export default function BreathingExercise() {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [countdown, setCountdown] = useState(0);
    const [cycleCount, setCycleCount] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const currentPhase = isActive ? BREATH_CYCLE[currentStep] : null;

    const tick = useCallback(() => {
        setCountdown((prev) => {
            if (prev <= 1) {
                setCurrentStep((step) => {
                    const nextStep = (step + 1) % BREATH_CYCLE.length;
                    if (nextStep === 0) setCycleCount((c) => c + 1);
                    return nextStep;
                });
                return BREATH_CYCLE[(currentStep + 1) % BREATH_CYCLE.length].duration;
            }
            return prev - 1;
        });
    }, [currentStep]);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(tick, 1000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, tick]);

    const start = () => {
        setIsActive(true);
        setCurrentStep(0);
        setCountdown(BREATH_CYCLE[0].duration);
        setCycleCount(0);
    };

    const stop = () => {
        setIsActive(false);
        setCurrentStep(0);
        setCountdown(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const reset = () => {
        stop();
        setCycleCount(0);
    };

    // Visual scale for the circle
    const getScale = () => {
        if (!currentPhase) return 1;
        switch (currentPhase.phase) {
            case "inhale":
                return 1.3;
            case "hold":
                return 1.3;
            case "exhale":
                return 0.85;
            case "rest":
                return 1;
            default:
                return 1;
        }
    };

    // Color for each phase
    const getColor = () => {
        if (!currentPhase) return "var(--sandstone)";
        switch (currentPhase.phase) {
            case "inhale":
                return "var(--saffron)";
            case "hold":
                return "var(--temple-gold)";
            case "exhale":
                return "var(--muted-terracotta)";
            case "rest":
                return "var(--sandstone)";
            default:
                return "var(--sandstone)";
        }
    };

    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{
                background: "linear-gradient(135deg, var(--soft-ivory), #fff)",
                border: "1px solid var(--sandstone)",
                boxShadow: "0 4px 20px rgba(212, 167, 106, 0.12)",
            }}
        >
            {/* Header */}
            <div className="px-5 py-4">
                <div className="flex items-center gap-3 mb-4">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                            background: "linear-gradient(135deg, var(--saffron), var(--temple-gold))",
                        }}
                    >
                        <Wind className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p
                            className="text-xs font-medium uppercase tracking-wider"
                            style={{ color: "var(--saffron)", fontFamily: "var(--font-body)" }}
                        >
                            Pranayama Guide
                        </p>
                        <h3
                            className="text-lg font-semibold"
                            style={{
                                fontFamily: "var(--font-heading)",
                                color: "var(--deep-maroon)",
                            }}
                        >
                            4-4-6 Breathing
                        </h3>
                    </div>
                </div>

                {/* Breathing circle */}
                <div className="flex flex-col items-center gap-4 py-4">
                    {/* Pranayama posture illustration — animated breathing */}
                    <div className="mb-2 overflow-hidden rounded-xl border border-[rgba(212,167,106,0.25)] shadow-sm relative">
                        {/* Glow effect behind image that pulses with breath */}
                        <div
                            className="absolute inset-0 transition-all"
                            style={{
                                background: `radial-gradient(ellipse at 50% 60%, ${getColor()}15, transparent 70%)`,
                                transitionDuration: currentPhase ? `${currentPhase.duration}s` : "3s",
                                transitionTimingFunction: "ease-in-out",
                                opacity: isActive ? 1 : 0.5,
                            }}
                        />
                        <div
                            className="relative h-64 sm:h-80 w-full overflow-hidden"
                            style={{ minWidth: "280px", background: "rgba(253, 246, 236, 0.5)" }}
                        >
                            <div
                                className="absolute inset-0 transition-all origin-bottom"
                                style={{
                                    transform: isActive
                                        ? `scaleY(${currentPhase?.phase === "inhale" || currentPhase?.phase === "hold" ? 1.06 : currentPhase?.phase === "exhale" ? 0.97 : 1}) scaleX(${currentPhase?.phase === "inhale" || currentPhase?.phase === "hold" ? 1.03 : currentPhase?.phase === "exhale" ? 0.99 : 1})`
                                        : "scaleY(1) scaleX(1)",
                                    transitionDuration: currentPhase ? `${currentPhase.duration}s` : "3s",
                                    transitionTimingFunction: "ease-in-out",
                                    animation: !isActive ? "gentleBreath 5s ease-in-out infinite" : "none",
                                }}
                            >
                                <Image
                                    src="/images/pranayama_posture.png"
                                    alt="Pranayama sitting posture — Padmasana with Chin Mudra"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 500px"
                                />
                            </div>

                            {/* Phase label overlay on image */}
                            {isActive && currentPhase && (
                                <div
                                    className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm transition-all duration-500"
                                    style={{
                                        background: `${getColor()}cc`,
                                        color: "#fff",
                                        fontFamily: "var(--font-body)",
                                        boxShadow: `0 2px 12px ${getColor()}40`,
                                    }}
                                >
                                    {currentPhase.label}
                                </div>
                            )}
                        </div>
                        <p
                            className="px-3 py-2 text-center text-xs"
                            style={{
                                color: "var(--muted-terracotta)",
                                fontFamily: "var(--font-body)",
                                background: "rgba(212, 167, 106, 0.06)",
                                opacity: 0.8,
                            }}
                        >
                            Sit in Padmasana · Hands in Chin Mudra · Spine straight · Eyes closed
                        </p>
                    </div>
                    <div className="relative flex h-32 w-32 items-center justify-center">
                        {/* Animated circle */}
                        <div
                            className="absolute inset-0 rounded-full transition-all"
                            style={{
                                background: `radial-gradient(circle, ${getColor()}20, transparent 70%)`,
                                transform: `scale(${getScale()})`,
                                transitionDuration: currentPhase
                                    ? `${currentPhase.duration}s`
                                    : "0.5s",
                                transitionTimingFunction: "ease-in-out",
                            }}
                        />
                        <div
                            className="absolute inset-2 rounded-full transition-all"
                            style={{
                                border: `2px solid ${getColor()}`,
                                opacity: 0.4,
                                transform: `scale(${getScale()})`,
                                transitionDuration: currentPhase
                                    ? `${currentPhase.duration}s`
                                    : "0.5s",
                                transitionTimingFunction: "ease-in-out",
                            }}
                        />
                        <div className="relative z-10 text-center">
                            {isActive ? (
                                <>
                                    <p
                                        className="text-2xl font-bold"
                                        style={{ color: getColor(), fontFamily: "var(--font-heading)" }}
                                    >
                                        {countdown}
                                    </p>
                                    <p
                                        className="text-xs uppercase tracking-wider"
                                        style={{
                                            color: "var(--muted-terracotta)",
                                            fontFamily: "var(--font-body)",
                                        }}
                                    >
                                        {currentPhase?.label}
                                    </p>
                                </>
                            ) : (
                                <p
                                    className="text-xs uppercase tracking-wider"
                                    style={{
                                        color: "var(--sandstone)",
                                        fontFamily: "var(--font-body)",
                                    }}
                                >
                                    Ready
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Phase indicators */}
                    {isActive && (
                        <div className="flex items-center gap-1.5">
                            {BREATH_CYCLE.map((step, i) => (
                                <div
                                    key={step.phase}
                                    className="h-1.5 rounded-full transition-all duration-300"
                                    style={{
                                        width: i === currentStep ? "24px" : "8px",
                                        background:
                                            i === currentStep ? getColor() : "var(--sandstone)",
                                        opacity: i === currentStep ? 1 : 0.3,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        {!isActive ? (
                            <button
                                onClick={start}
                                className="flex items-center gap-2 rounded-full px-5 py-2 text-white text-sm transition-all duration-200 hover:scale-105"
                                style={{
                                    background: "linear-gradient(135deg, var(--saffron), var(--temple-gold))",
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                <Play className="h-4 w-4" />
                                Begin
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={stop}
                                    className="flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-200 hover:scale-105"
                                    style={{
                                        background: "rgba(107, 29, 42, 0.08)",
                                        color: "var(--deep-maroon)",
                                        fontFamily: "var(--font-body)",
                                    }}
                                >
                                    <Square className="h-3 w-3" />
                                    Stop
                                </button>
                                <button
                                    onClick={reset}
                                    className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                                    style={{ background: "rgba(107, 29, 42, 0.06)" }}
                                >
                                    <RotateCcw className="h-3.5 w-3.5" style={{ color: "var(--deep-maroon)" }} />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Cycle counter */}
                    {cycleCount > 0 && (
                        <p
                            className="text-xs"
                            style={{
                                color: "var(--muted-terracotta)",
                                fontFamily: "var(--font-body)",
                                opacity: 0.6,
                            }}
                        >
                            {cycleCount} cycle{cycleCount !== 1 ? "s" : ""} completed
                        </p>
                    )}
                </div>

                {/* Description */}
                <p
                    className="text-xs leading-relaxed text-center"
                    style={{
                        color: "var(--muted-terracotta)",
                        fontFamily: "var(--font-body)",
                        opacity: 0.6,
                    }}
                >
                    Inhale 4s · Hold 4s · Exhale 6s · Rest 2s — following the Vedic
                    Pranayama tradition for calming the nervous system.
                </p>
            </div>
        </div>
    );
}
