"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feather, Send, Sparkles, Wind, Music, BookOpen } from "lucide-react";
import Link from "next/link";
import { getHeritageResponse, DiaryResponse } from "@/lib/diaryAI";

export default function DiaryWidget() {
    const [entry, setEntry] = useState("");
    const [response, setResponse] = useState<DiaryResponse | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = () => {
        if (!entry.trim() || isThinking) return;
        setIsThinking(true);
        setResponse(null);

        setTimeout(() => {
            const aiResponse = getHeritageResponse(entry);
            setResponse(aiResponse);
            setIsThinking(false);
        }, 1200 + Math.random() * 800);
    };

    return (
        <section className="px-6 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="mb-6 text-center"
            >
                <div className="mb-2 flex items-center justify-center gap-2">
                    <Feather className="h-4 w-4" style={{ color: "var(--temple-gold)" }} />
                    <p className="text-xs font-medium uppercase tracking-widest"
                        style={{ color: "var(--temple-gold)", fontFamily: "var(--font-body)" }}>
                        Soul Journal
                    </p>
                </div>
                <h2
                    className="mb-1 text-3xl font-semibold"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}
                >
                    Dear Diary
                </h2>
                <p className="text-sm" style={{ color: "var(--muted-terracotta)", opacity: 0.7 }}>
                    Share what&apos;s on your mind, receive ancient wisdom in return
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mx-auto max-w-2xl"
            >
                <div
                    className="overflow-hidden rounded-2xl"
                    style={{
                        background: "linear-gradient(145deg, #f5ede0, #faf5ea)",
                        border: "1px solid rgba(196, 162, 101, 0.25)",
                        boxShadow: "0 6px 24px rgba(59, 31, 11, 0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
                    }}
                >
                    {/* Input area */}
                    <div className="p-5">
                        <textarea
                            ref={textareaRef}
                            value={entry}
                            onChange={(e) => setEntry(e.target.value)}
                            placeholder="Dear Diary, today I feel..."
                            rows={4}
                            className="w-full resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:opacity-40"
                            style={{
                                fontFamily: "var(--font-body)",
                                color: "var(--foreground)",
                                lineHeight: "2",
                                backgroundImage:
                                    "repeating-linear-gradient(transparent, transparent 31px, rgba(196,162,101,0.1) 31px, rgba(196,162,101,0.1) 32px)",
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
                        style={{ borderTop: "1px solid rgba(196, 162, 101, 0.12)" }}
                    >
                        <Link
                            href="/diary"
                            className="text-xs underline decoration-dotted underline-offset-4 transition-colors hover:opacity-100"
                            style={{ color: "var(--sandstone)", opacity: 0.6 }}
                        >
                            Open full journal →
                        </Link>
                        <button
                            onClick={handleSubmit}
                            disabled={!entry.trim() || isThinking}
                            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                            style={{
                                background: "linear-gradient(135deg, var(--deep-maroon), var(--saffron))",
                                fontFamily: "var(--font-body)",
                                cursor: entry.trim() && !isThinking ? "pointer" : "not-allowed",
                            }}
                        >
                            <Send className="h-3 w-3" />
                            Share with Soul
                        </button>
                    </div>
                </div>

                {/* AI Response */}
                <AnimatePresence mode="wait">
                    {isThinking && (
                        <motion.div
                            key="thinking"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-4 flex items-center justify-center gap-3 rounded-2xl px-5 py-6"
                            style={{
                                background: "rgba(201, 162, 39, 0.04)",
                                border: "1px solid rgba(201, 162, 39, 0.1)",
                            }}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Sparkles className="h-5 w-5" style={{ color: "var(--temple-gold)" }} />
                            </motion.div>
                            <p className="text-xs animate-pulse" style={{ color: "var(--sandstone)" }}>
                                Reflecting on your words...
                            </p>
                        </motion.div>
                    )}

                    {!isThinking && response && (
                        <motion.div
                            key="response"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-4 space-y-3 rounded-2xl p-5"
                            style={{
                                background: "var(--soft-ivory)",
                                border: "1px solid rgba(196, 162, 101, 0.15)",
                            }}
                        >
                            {/* Soul header */}
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="flex h-6 w-6 items-center justify-center rounded-full"
                                    style={{ background: "linear-gradient(135deg, var(--temple-gold), var(--saffron))" }}
                                >
                                    <Sparkles className="h-3 w-3 text-white" />
                                </div>
                                <p className="text-xs font-medium" style={{ color: "var(--deep-maroon)", fontFamily: "var(--font-heading)" }}>
                                    Soul of Anti-Gravity
                                </p>
                            </div>

                            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}>
                                {response.message}
                            </p>

                            {response.suggestion && (
                                <div
                                    className="flex items-start gap-2 rounded-xl px-3 py-2.5"
                                    style={{ background: "rgba(201, 162, 39, 0.06)", border: "1px solid rgba(201, 162, 39, 0.1)" }}
                                >
                                    {response.suggestion.type === "raga" && <Music className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--temple-gold)" }} />}
                                    {response.suggestion.type === "pranayama" && <Wind className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--temple-gold)" }} />}
                                    {response.suggestion.type === "panchatantra" && <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--temple-gold)" }} />}
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--temple-gold)" }}>
                                            {response.suggestion.label}
                                        </p>
                                        <p className="text-xs leading-relaxed" style={{ color: "var(--muted-terracotta)", opacity: 0.8 }}>
                                            {response.suggestion.detail}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <p className="text-xs italic" style={{ fontFamily: "var(--font-heading)", color: "var(--temple-gold)", opacity: 0.7 }}>
                                &ldquo;{response.blessing}&rdquo;
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
