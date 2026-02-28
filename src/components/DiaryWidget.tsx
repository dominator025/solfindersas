"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Feather, Send, Sparkles, Wind, Music, BookOpen,
    Volume2, VolumeX, Globe, ArrowRight, Mic2,
} from "lucide-react";
import Link from "next/link";
import { getHeritageResponse, detectEntryLanguage, DiaryResponse } from "@/lib/diaryAI";

export default function DiaryWidget() {
    const [entry, setEntry] = useState("");
    const [response, setResponse] = useState<DiaryResponse | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [lang, setLang] = useState<"en" | "hi">("en");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = () => {
        if (!entry.trim() || isThinking) return;
        setIsThinking(true);
        setResponse(null);

        // Auto-detect language
        const detectedLang = detectEntryLanguage(entry);
        setLang(detectedLang);

        setTimeout(() => {
            const aiResponse = getHeritageResponse(entry);
            setResponse(aiResponse);
            setIsThinking(false);
        }, 1200 + Math.random() * 800);
    };

    /**
     * Deep male voice — Amitabh Bachchan-style baritone:
     * pitch 0.65, rate 0.75, prioritizes male voices
     */
    const speakResponse = useCallback(() => {
        if (!response) return;

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        const message = lang === "hi" ? (response.messageHi || response.message) : response.message;
        const suggestion = response.suggestion
            ? `\n\n${response.suggestion.label}. ${lang === "hi" ? (response.suggestion.detailHi || response.suggestion.detail) : response.suggestion.detail}`
            : "";
        const blessing = `\n\n${lang === "hi" ? (response.blessingHi || response.blessing) : response.blessing}`;
        const fullText = message + suggestion + blessing;

        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.lang = lang === "hi" ? "hi-IN" : "en-US";
        utterance.rate = 0.75;
        utterance.pitch = 0.65;
        utterance.volume = 1;

        const voices = window.speechSynthesis.getVoices();
        const langPrefix = lang === "hi" ? "hi" : "en";
        const deepMale = voices.find((v) =>
            v.lang.startsWith(langPrefix) &&
            (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("deep"))
        );
        const googleMale = voices.find((v) =>
            v.lang.startsWith(langPrefix) &&
            (v.name.includes("Google") || v.name.includes("Microsoft") || v.name.includes("Natural"))
        );
        const anyMatch = voices.find((v) => v.lang.startsWith(langPrefix));
        utterance.voice = deepMale || googleMale || anyMatch || null;

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
    }, [response, lang, isSpeaking]);

    const toggleLang = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setLang((prev) => (prev === "en" ? "hi" : "en"));
    };

    const displayMessage = lang === "hi"
        ? (response?.messageHi || response?.message)
        : response?.message;

    const displaySuggestionDetail = lang === "hi"
        ? (response?.suggestion?.detailHi || response?.suggestion?.detail)
        : response?.suggestion?.detail;

    const displayBlessing = lang === "hi"
        ? (response?.blessingHi || response?.blessing)
        : response?.blessing;

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
                    Share what&apos;s on your mind — I respond in English &amp; Hindi 🇮🇳
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
                    <div className="p-5">
                        <textarea
                            ref={textareaRef}
                            value={entry}
                            onChange={(e) => setEntry(e.target.value)}
                            placeholder="Dear Diary, today I feel... (English ya Hindi mein likh sakte ho)"
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
                                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSubmit();
                            }}
                        />
                    </div>

                    <div
                        className="flex items-center justify-between px-5 py-3"
                        style={{ borderTop: "1px solid rgba(196, 162, 101, 0.12)" }}
                    >
                        <Link
                            href="/diary"
                            className="group flex items-center gap-3 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                            style={{
                                background: "linear-gradient(135deg, rgba(201,162,39,0.08), rgba(201,162,39,0.15))",
                                color: "var(--deep-maroon)",
                                border: "1.5px solid rgba(201, 162, 39, 0.3)",
                                fontFamily: "var(--font-heading)",
                                animation: "glowPulse 3s ease-in-out infinite",
                            }}
                        >
                            <Feather className="h-4 w-4" style={{ color: "var(--temple-gold)" }} />
                            Open Full Journal
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: "var(--temple-gold)" }} />
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
                                {lang === "hi" ? "Tumhare shabdon par soch raha hoon..." : "Reflecting on your words..."}
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
                            {/* Header with controls */}
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
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
                                <div className="flex items-center gap-1.5">
                                    {/* Language toggle */}
                                    <button
                                        onClick={toggleLang}
                                        className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition-all hover:scale-105"
                                        style={{
                                            background: "rgba(201, 162, 39, 0.1)",
                                            color: "var(--temple-gold)",
                                            border: "1px solid rgba(201, 162, 39, 0.2)",
                                        }}
                                        title="Switch language"
                                    >
                                        <Globe className="h-3 w-3" />
                                        {lang === "en" ? "हिंदी" : "ENG"}
                                    </button>
                                    {/* Voice button */}
                                    <button
                                        onClick={speakResponse}
                                        className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition-all hover:scale-105"
                                        style={{
                                            background: isSpeaking ? "var(--temple-gold)" : "rgba(201, 162, 39, 0.1)",
                                            color: isSpeaking ? "white" : "var(--temple-gold)",
                                            border: "1px solid rgba(201, 162, 39, 0.2)",
                                        }}
                                        title={isSpeaking ? "Stop speaking" : "Listen"}
                                    >
                                        {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                                        {isSpeaking ? "Stop" : lang === "hi" ? "सुनो" : "Listen"}
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}>
                                {displayMessage}
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
                                            {displaySuggestionDetail}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <p className="text-xs italic" style={{ fontFamily: "var(--font-heading)", color: "var(--temple-gold)", opacity: 0.7 }}>
                                &ldquo;{displayBlessing}&rdquo;
                            </p>

                            {/* ═══ READ ALOUD SECTION ═══ */}
                            <div className="rounded-xl overflow-hidden"
                                style={{ background: "linear-gradient(135deg, rgba(59,31,11,0.06), rgba(201,162,39,0.04))", border: "1px solid rgba(201, 162, 39, 0.15)" }}>
                                <div className="flex items-center justify-between px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full"
                                            style={{ background: isSpeaking ? "var(--deep-maroon)" : "rgba(59,31,11,0.08)" }}>
                                            <Mic2 className="h-3 w-3" style={{ color: isSpeaking ? "white" : "var(--deep-maroon)" }} />
                                        </div>
                                        <p className="text-[10px] font-semibold" style={{ color: "var(--deep-maroon)", fontFamily: "var(--font-heading)" }}>
                                            {lang === "hi" ? "गहरी आवाज़ में सुनिए" : "Deep Male Voice"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={speakResponse}
                                        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium transition-all hover:scale-105"
                                        style={{
                                            background: isSpeaking ? "var(--deep-maroon)" : "linear-gradient(135deg, var(--deep-maroon), var(--saffron))",
                                            color: "white",
                                        }}>
                                        {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                                        {isSpeaking ? "Stop" : lang === "hi" ? "सुनो" : "Read Aloud"}
                                    </button>
                                </div>
                                {isSpeaking && (
                                    <div className="flex items-end justify-center gap-[2px] px-3 pb-2">
                                        {Array.from({ length: 16 }).map((_, i) => (
                                            <motion.div key={i} className="rounded-full"
                                                style={{ width: "2.5px", background: "linear-gradient(to top, var(--deep-maroon), var(--temple-gold))" }}
                                                animate={{ height: [6, 12 + Math.random() * 14, 6] }}
                                                transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.05 }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Feature recommendation */}
                            {response.featureRecommendation && (
                                <Link
                                    href={response.featureRecommendation.route}
                                    className="group mt-2 flex items-center gap-2 rounded-xl px-4 py-3 transition-all hover:scale-[1.01]"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(59,31,11,0.04), rgba(201,162,39,0.06))",
                                        border: "1px solid rgba(201, 162, 39, 0.15)",
                                    }}
                                >
                                    <div className="flex-1">
                                        <p className="text-[10px] font-medium uppercase tracking-wider mb-0.5"
                                            style={{ color: "var(--temple-gold)" }}>
                                            💡 Try this feature
                                        </p>
                                        <p className="text-xs" style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}>
                                            <strong>{response.featureRecommendation.feature}</strong> — {response.featureRecommendation.reason}
                                        </p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: "var(--temple-gold)" }} />
                                </Link>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
