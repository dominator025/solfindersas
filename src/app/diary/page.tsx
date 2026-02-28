"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Send,
    Feather,
    Sparkles,
    Wind,
    Music,
} from "lucide-react";
import { getHeritageResponse, DiaryResponse } from "@/lib/diaryAI";

export default function DiaryPage() {
    const [entry, setEntry] = useState("");
    const [response, setResponse] = useState<DiaryResponse | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [history, setHistory] = useState<{ entry: string; response: DiaryResponse }[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const responseRef = useRef<HTMLDivElement>(null);

    const handleSubmit = () => {
        if (!entry.trim() || isThinking) return;
        setIsThinking(true);
        setResponse(null);

        // Simulate AI thinking delay
        setTimeout(() => {
            const aiResponse = getHeritageResponse(entry);
            setResponse(aiResponse);
            setHistory((prev) => [...prev, { entry: entry.trim(), response: aiResponse }]);
            setIsThinking(false);
        }, 1500 + Math.random() * 1000);
    };

    // Auto-scroll to response
    useEffect(() => {
        if (response && responseRef.current) {
            responseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [response]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning, dear soul";
        if (hour < 17) return "Good afternoon, dear soul";
        if (hour < 20) return "Good evening, dear soul";
        return "Peaceful night, dear soul";
    };

    return (
        <>
            <Header />
            <main
                className="flex-1 px-4 py-8 md:px-8"
                style={{ background: "var(--background)" }}
            >
                <div className="mx-auto max-w-5xl">
                    {/* Page header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 text-center"
                    >
                        <div className="mb-3 flex items-center justify-center gap-2">
                            <Feather className="h-5 w-5" style={{ color: "var(--temple-gold)" }} />
                            <p className="text-xs font-medium uppercase tracking-widest"
                                style={{ color: "var(--temple-gold)", fontFamily: "var(--font-body)" }}>
                                Soul Journal
                            </p>
                        </div>
                        <h1
                            className="mb-2 text-4xl font-bold md:text-5xl"
                            style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}
                        >
                            Dear Diary
                        </h1>
                        <p
                            className="mx-auto max-w-lg text-sm leading-relaxed"
                            style={{ color: "var(--muted-terracotta)", opacity: 0.8, fontFamily: "var(--font-body)" }}
                        >
                            Pour your heart out and receive ancient wisdom. Your words are
                            heard by a soul that has journeyed through millennia of Indian heritage.
                        </p>
                    </motion.div>

                    {/* Split layout */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                        {/* LEFT — Parchment Diary Editor */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div
                                className="rounded-2xl overflow-hidden"
                                style={{
                                    background: "linear-gradient(145deg, #f5ede0, #faf5ea, #f0e6d2)",
                                    border: "1px solid rgba(196, 162, 101, 0.3)",
                                    boxShadow: "0 8px 32px rgba(59, 31, 11, 0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
                                }}
                            >
                                {/* Editor header */}
                                <div
                                    className="flex items-center gap-3 px-5 py-3"
                                    style={{ borderBottom: "1px solid rgba(196, 162, 101, 0.15)" }}
                                >
                                    <BookOpen className="h-4 w-4" style={{ color: "var(--temple-gold)" }} />
                                    <p
                                        className="text-sm font-medium"
                                        style={{ color: "var(--deep-maroon)", fontFamily: "var(--font-heading)" }}
                                    >
                                        {getGreeting()} ✨
                                    </p>
                                </div>

                                {/* Textarea */}
                                <div className="p-5">
                                    <textarea
                                        ref={textareaRef}
                                        value={entry}
                                        onChange={(e) => setEntry(e.target.value)}
                                        placeholder="Dear Diary, today I feel..."
                                        rows={10}
                                        className="w-full resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:opacity-40"
                                        style={{
                                            fontFamily: "var(--font-body)",
                                            color: "var(--foreground)",
                                            lineHeight: "2",
                                            backgroundImage:
                                                "repeating-linear-gradient(transparent, transparent 31px, rgba(196,162,101,0.12) 31px, rgba(196,162,101,0.12) 32px)",
                                            backgroundAttachment: "local",
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                                handleSubmit();
                                            }
                                        }}
                                    />
                                </div>

                                {/* Submit bar */}
                                <div
                                    className="flex items-center justify-between px-5 py-3"
                                    style={{ borderTop: "1px solid rgba(196, 162, 101, 0.15)" }}
                                >
                                    <p className="text-xs" style={{ color: "var(--sandstone)", opacity: 0.6 }}>
                                        Ctrl + Enter to send
                                    </p>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!entry.trim() || isThinking}
                                        className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                                        style={{
                                            background: "linear-gradient(135deg, var(--deep-maroon), var(--saffron))",
                                            fontFamily: "var(--font-body)",
                                            cursor: entry.trim() && !isThinking ? "pointer" : "not-allowed",
                                        }}
                                    >
                                        <Send className="h-3.5 w-3.5" />
                                        Share with Soul
                                    </button>
                                </div>
                            </div>

                            {/* Past entries */}
                            {history.length > 0 && (
                                <div className="mt-4">
                                    <p className="mb-2 text-xs uppercase tracking-wider"
                                        style={{ color: "var(--sandstone)", fontFamily: "var(--font-body)" }}>
                                        Earlier reflections
                                    </p>
                                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                        {history.slice().reverse().map((h, i) => (
                                            <div
                                                key={i}
                                                className="rounded-xl px-4 py-2 text-xs truncate"
                                                style={{
                                                    background: "rgba(196, 162, 101, 0.06)",
                                                    color: "var(--muted-terracotta)",
                                                    fontFamily: "var(--font-body)",
                                                    border: "1px solid rgba(196, 162, 101, 0.1)",
                                                }}
                                            >
                                                {h.entry.slice(0, 80)}...
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* RIGHT — AI Response Panel */}
                        <motion.div
                            ref={responseRef}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div
                                className="relative rounded-2xl overflow-hidden min-h-[400px] flex flex-col"
                                style={{
                                    background: "linear-gradient(145deg, var(--soft-ivory), #fff)",
                                    border: "1px solid rgba(196, 162, 101, 0.2)",
                                    boxShadow: "0 8px 32px rgba(59, 31, 11, 0.06)",
                                }}
                            >
                                {/* Mandala background */}
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                                        style={{ width: "350px", height: "350px", opacity: isThinking ? 0.08 : 0.04 }}
                                    >
                                        <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%", height: "100%", color: "var(--temple-gold)" }}>
                                            {Array.from({ length: 12 }).map((_, i) => (
                                                <ellipse key={`o-${i}`} cx="200" cy="80" rx="18" ry="55"
                                                    stroke="currentColor" strokeWidth="0.8" transform={`rotate(${i * 30} 200 200)`} />
                                            ))}
                                            {Array.from({ length: 8 }).map((_, i) => (
                                                <ellipse key={`m-${i}`} cx="200" cy="120" rx="14" ry="38"
                                                    stroke="currentColor" strokeWidth="0.7" transform={`rotate(${i * 45} 200 200)`} />
                                            ))}
                                            <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="0.5" />
                                            <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.5" />
                                            <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="0.5" />
                                            <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="0.6" />
                                        </svg>
                                    </motion.div>
                                </div>

                                {/* Header */}
                                <div
                                    className="relative z-10 flex items-center gap-3 px-5 py-3"
                                    style={{ borderBottom: "1px solid rgba(196, 162, 101, 0.12)" }}
                                >
                                    <motion.div
                                        animate={isThinking ? { scale: [1, 1.2, 1] } : {}}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="flex h-8 w-8 items-center justify-center rounded-full"
                                        style={{
                                            background: "linear-gradient(135deg, var(--temple-gold), var(--saffron))",
                                            boxShadow: isThinking ? "0 0 16px rgba(201,162,39,0.3)" : "none",
                                        }}
                                    >
                                        <Sparkles className="h-4 w-4 text-white" />
                                    </motion.div>
                                    <div>
                                        <p className="text-sm font-semibold"
                                            style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>
                                            Soul of Anti-Gravity
                                        </p>
                                        <p className="text-xs"
                                            style={{ color: "var(--sandstone)", fontFamily: "var(--font-body)" }}>
                                            {isThinking ? "Listening to your heart..." : "Your heritage companion"}
                                        </p>
                                    </div>
                                </div>

                                {/* Content area */}
                                <div className="relative z-10 flex flex-1 flex-col justify-center p-6">
                                    <AnimatePresence mode="wait">
                                        {isThinking ? (
                                            /* Thinking animation */
                                            <motion.div
                                                key="thinking"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex flex-col items-center gap-4"
                                            >
                                                <motion.div
                                                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="h-12 w-12 rounded-full"
                                                    style={{
                                                        background: "radial-gradient(circle, var(--temple-gold), transparent 70%)",
                                                        opacity: 0.4,
                                                    }}
                                                />
                                                <p className="text-xs tracking-widest uppercase animate-pulse"
                                                    style={{ color: "var(--sandstone)", fontFamily: "var(--font-body)" }}>
                                                    Reflecting on your words...
                                                </p>
                                            </motion.div>
                                        ) : response ? (
                                            /* AI Response */
                                            <motion.div
                                                key="response"
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.6 }}
                                                className="space-y-4"
                                            >
                                                {/* Main wisdom */}
                                                <p
                                                    className="text-sm leading-relaxed"
                                                    style={{
                                                        fontFamily: "var(--font-body)",
                                                        color: "var(--foreground)",
                                                        lineHeight: "1.8",
                                                    }}
                                                >
                                                    {response.message}
                                                </p>

                                                {/* Heritage suggestion */}
                                                {response.suggestion && (
                                                    <div
                                                        className="flex items-start gap-2.5 rounded-xl px-4 py-3"
                                                        style={{
                                                            background: "rgba(201, 162, 39, 0.06)",
                                                            border: "1px solid rgba(201, 162, 39, 0.12)",
                                                        }}
                                                    >
                                                        {response.suggestion.type === "raga" && (
                                                            <Music className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--temple-gold)" }} />
                                                        )}
                                                        {response.suggestion.type === "pranayama" && (
                                                            <Wind className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--temple-gold)" }} />
                                                        )}
                                                        {response.suggestion.type === "panchatantra" && (
                                                            <BookOpen className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--temple-gold)" }} />
                                                        )}
                                                        <div>
                                                            <p className="mb-0.5 text-xs font-medium uppercase tracking-wider"
                                                                style={{ color: "var(--temple-gold)", fontFamily: "var(--font-body)" }}>
                                                                {response.suggestion.label}
                                                            </p>
                                                            <p className="text-xs leading-relaxed"
                                                                style={{ color: "var(--muted-terracotta)", fontFamily: "var(--font-body)" }}>
                                                                {response.suggestion.detail}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Closing blessing */}
                                                <p
                                                    className="text-xs italic"
                                                    style={{
                                                        fontFamily: "var(--font-heading)",
                                                        color: "var(--temple-gold)",
                                                        opacity: 0.8,
                                                    }}
                                                >
                                                    &ldquo;{response.blessing}&rdquo;
                                                </p>
                                            </motion.div>
                                        ) : (
                                            /* Empty state */
                                            <motion.div
                                                key="empty"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex flex-col items-center gap-3 text-center"
                                            >
                                                <div
                                                    className="flex h-16 w-16 items-center justify-center rounded-full"
                                                    style={{ background: "rgba(201, 162, 39, 0.08)" }}
                                                >
                                                    <Feather className="h-7 w-7" style={{ color: "var(--temple-gold)", opacity: 0.5 }} />
                                                </div>
                                                <p className="text-sm" style={{ color: "var(--muted-terracotta)", opacity: 0.6 }}>
                                                    Write your heart out on the left,<br />
                                                    and ancient wisdom will find you here.
                                                </p>
                                                <p className="text-xs" style={{ color: "var(--sandstone)", opacity: 0.4 }}>
                                                    I hear with the patience of centuries
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
