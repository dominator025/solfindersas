"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen, Send, Feather, Sparkles, Wind, Music,
    Volume2, VolumeX, Globe, ArrowRight, Mic2,
} from "lucide-react";
import Link from "next/link";
import { getHeritageResponse, detectEntryLanguage, DiaryResponse } from "@/lib/diaryAI";

export default function DiaryPage() {
    const [entry, setEntry] = useState("");
    const [response, setResponse] = useState<DiaryResponse | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [lang, setLang] = useState<"en" | "hi">("en");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [history, setHistory] = useState<{ entry: string; response: DiaryResponse }[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const responseRef = useRef<HTMLDivElement>(null);

    const handleSubmit = () => {
        if (!entry.trim() || isThinking) return;
        setIsThinking(true);
        setResponse(null);

        const detectedLang = detectEntryLanguage(entry);
        setLang(detectedLang);

        setTimeout(() => {
            const aiResponse = getHeritageResponse(entry);
            setResponse(aiResponse);
            setHistory((prev) => [...prev, { entry: entry.trim(), response: aiResponse }]);
            setIsThinking(false);
        }, 1500 + Math.random() * 1000);
    };

    useEffect(() => {
        if (response && responseRef.current) {
            responseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [response]);

    /**
     * Deep male voice — tuned for Amitabh Bachchan-style baritone:
     * - Very low pitch (0.65) for that deep, resonant gravitas
     * - Slow rate (0.75) for deliberate, commanding delivery
     * - Prioritizes male voices in both Hindi and English
     */
    const speakResponse = useCallback(() => {
        if (!response) return;

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        // Build the full text: message + suggestion + blessing
        const message = lang === "hi"
            ? (response.messageHi || response.message)
            : response.message;
        const suggestion = response.suggestion
            ? `\n\n${response.suggestion.label}. ${lang === "hi" ? (response.suggestion.detailHi || response.suggestion.detail) : response.suggestion.detail}`
            : "";
        const blessing = `\n\n${lang === "hi" ? (response.blessingHi || response.blessing) : response.blessing}`;
        const fullText = message + suggestion + blessing;

        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.lang = lang === "hi" ? "hi-IN" : "en-US";
        // Deep baritone settings — like Amitabh Bachchan
        utterance.rate = 0.75;   // Slow, deliberate
        utterance.pitch = 0.65;  // Very deep
        utterance.volume = 1;

        // Find the best deep male voice
        const voices = window.speechSynthesis.getVoices();
        const langPrefix = lang === "hi" ? "hi" : "en";

        // Priority order for voice selection:
        // 1. Male voice with "Deep" or "Male" in name
        // 2. Any male Google/Microsoft/Natural voice
        // 3. Any voice matching the language
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

    const displayMessage = lang === "hi" ? (response?.messageHi || response?.message) : response?.message;
    const displaySuggestionDetail = lang === "hi" ? (response?.suggestion?.detailHi || response?.suggestion?.detail) : response?.suggestion?.detail;
    const displayBlessing = lang === "hi" ? (response?.blessingHi || response?.blessing) : response?.blessing;

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (lang === "hi") {
            if (hour < 12) return "Suprabhat, pyaare 🙏";
            if (hour < 17) return "Namaste, dost ✨";
            if (hour < 20) return "Shubh sandhya 🌅";
            return "Shubh raatri 🌙";
        }
        if (hour < 12) return "Good morning, dear soul ☀️";
        if (hour < 17) return "Good afternoon, dear soul ✨";
        if (hour < 20) return "Good evening, dear soul 🌅";
        return "Peaceful night, dear soul 🌙";
    };

    return (
        <>
            <Header />
            <main className="flex-1 px-4 py-8 md:px-8" style={{ background: "var(--background)" }}>
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
                            Pour your heart out in English or Hindi — I hear with the patience of centuries 🇮🇳
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
                                <div className="flex items-center gap-3 px-5 py-3"
                                    style={{ borderBottom: "1px solid rgba(196, 162, 101, 0.15)" }}>
                                    <BookOpen className="h-4 w-4" style={{ color: "var(--temple-gold)" }} />
                                    <p className="text-sm font-medium"
                                        style={{ color: "var(--deep-maroon)", fontFamily: "var(--font-heading)" }}>
                                        {getGreeting()}
                                    </p>
                                </div>

                                <div className="p-5">
                                    <textarea
                                        ref={textareaRef}
                                        value={entry}
                                        onChange={(e) => setEntry(e.target.value)}
                                        placeholder={lang === "hi" ? "Meri pyaari diary, aaj mujhe aisa lag raha hai..." : "Dear Diary, today I feel..."}
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
                                            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSubmit();
                                        }}
                                    />
                                </div>

                                <div className="flex items-center justify-between px-5 py-3"
                                    style={{ borderTop: "1px solid rgba(196, 162, 101, 0.15)" }}>
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

                            {history.length > 0 && (
                                <div className="mt-4">
                                    <p className="mb-2 text-xs uppercase tracking-wider"
                                        style={{ color: "var(--sandstone)", fontFamily: "var(--font-body)" }}>
                                        Earlier reflections
                                    </p>
                                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                        {history.slice().reverse().map((h, i) => (
                                            <div key={i}
                                                className="rounded-xl px-4 py-2 text-xs truncate"
                                                style={{
                                                    background: "rgba(196, 162, 101, 0.06)",
                                                    color: "var(--muted-terracotta)",
                                                    fontFamily: "var(--font-body)",
                                                    border: "1px solid rgba(196, 162, 101, 0.1)",
                                                }}>
                                                {h.entry.slice(0, 80)}...
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* RIGHT — AI Response Panel */}
                        <motion.div ref={responseRef}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}>
                            <div className="relative rounded-2xl overflow-hidden min-h-[400px] flex flex-col"
                                style={{
                                    background: "linear-gradient(145deg, var(--soft-ivory), #fff)",
                                    border: "1px solid rgba(196, 162, 101, 0.2)",
                                    boxShadow: "0 8px 32px rgba(59, 31, 11, 0.06)",
                                }}>
                                {/* Mandala background */}
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                                        style={{ width: "350px", height: "350px", opacity: isThinking ? 0.08 : 0.04 }}>
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

                                {/* Header with controls */}
                                <div className="relative z-10 flex items-center gap-3 px-5 py-3"
                                    style={{ borderBottom: "1px solid rgba(196, 162, 101, 0.12)" }}>
                                    <motion.div
                                        animate={isThinking ? { scale: [1, 1.2, 1] } : {}}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="flex h-8 w-8 items-center justify-center rounded-full"
                                        style={{
                                            background: "linear-gradient(135deg, var(--temple-gold), var(--saffron))",
                                            boxShadow: isThinking ? "0 0 16px rgba(201,162,39,0.3)" : "none",
                                        }}>
                                        <Sparkles className="h-4 w-4 text-white" />
                                    </motion.div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold"
                                            style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>
                                            Soul of Anti-Gravity
                                        </p>
                                        <p className="text-xs"
                                            style={{ color: "var(--sandstone)", fontFamily: "var(--font-body)" }}>
                                            {isThinking
                                                ? (lang === "hi" ? "Tumhare dil ki sun raha hoon..." : "Listening to your heart...")
                                                : (lang === "hi" ? "Tumhara heritage saathi" : "Your heritage companion")}
                                        </p>
                                    </div>

                                    {/* Controls */}
                                    {response && (
                                        <div className="flex items-center gap-1.5">
                                            <button onClick={toggleLang}
                                                className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition-all hover:scale-105"
                                                style={{
                                                    background: "rgba(201, 162, 39, 0.1)",
                                                    color: "var(--temple-gold)",
                                                    border: "1px solid rgba(201, 162, 39, 0.2)",
                                                }}>
                                                <Globe className="h-3 w-3" />
                                                {lang === "en" ? "हिंदी" : "ENG"}
                                            </button>
                                            <button onClick={speakResponse}
                                                className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition-all hover:scale-105"
                                                style={{
                                                    background: isSpeaking ? "var(--temple-gold)" : "rgba(201, 162, 39, 0.1)",
                                                    color: isSpeaking ? "white" : "var(--temple-gold)",
                                                    border: "1px solid rgba(201, 162, 39, 0.2)",
                                                }}>
                                                {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                                                {isSpeaking ? "Stop" : lang === "hi" ? "सुनो" : "Listen"}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-1 flex-col justify-center p-6">
                                    <AnimatePresence mode="wait">
                                        {isThinking ? (
                                            <motion.div key="thinking"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="flex flex-col items-center gap-4">
                                                <motion.div
                                                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="h-12 w-12 rounded-full"
                                                    style={{ background: "radial-gradient(circle, var(--temple-gold), transparent 70%)", opacity: 0.4 }} />
                                                <p className="text-xs tracking-widest uppercase animate-pulse"
                                                    style={{ color: "var(--sandstone)", fontFamily: "var(--font-body)" }}>
                                                    {lang === "hi" ? "Tumhare shabdon par soch raha hoon..." : "Reflecting on your words..."}
                                                </p>
                                            </motion.div>
                                        ) : response ? (
                                            <motion.div key="response"
                                                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                transition={{ duration: 0.6 }} className="space-y-4">
                                                <p className="text-sm leading-relaxed"
                                                    style={{ fontFamily: "var(--font-body)", color: "var(--foreground)", lineHeight: "1.8" }}>
                                                    {displayMessage}
                                                </p>

                                                {response.suggestion && (
                                                    <div className="flex items-start gap-2.5 rounded-xl px-4 py-3"
                                                        style={{ background: "rgba(201, 162, 39, 0.06)", border: "1px solid rgba(201, 162, 39, 0.12)" }}>
                                                        {response.suggestion.type === "raga" && <Music className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--temple-gold)" }} />}
                                                        {response.suggestion.type === "pranayama" && <Wind className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--temple-gold)" }} />}
                                                        {response.suggestion.type === "panchatantra" && <BookOpen className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--temple-gold)" }} />}
                                                        <div>
                                                            <p className="mb-0.5 text-xs font-medium uppercase tracking-wider"
                                                                style={{ color: "var(--temple-gold)", fontFamily: "var(--font-body)" }}>
                                                                {response.suggestion.label}
                                                            </p>
                                                            <p className="text-xs leading-relaxed"
                                                                style={{ color: "var(--muted-terracotta)", fontFamily: "var(--font-body)" }}>
                                                                {displaySuggestionDetail}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                <p className="text-xs italic"
                                                    style={{ fontFamily: "var(--font-heading)", color: "var(--temple-gold)", opacity: 0.8 }}>
                                                    &ldquo;{displayBlessing}&rdquo;
                                                </p>

                                                {/* ═══ READ ALOUD SECTION ═══ */}
                                                <div className="rounded-xl overflow-hidden"
                                                    style={{ background: "linear-gradient(135deg, rgba(59,31,11,0.06), rgba(201,162,39,0.04))", border: "1px solid rgba(201, 162, 39, 0.15)" }}>
                                                    <div className="flex items-center justify-between px-4 py-2.5">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex h-7 w-7 items-center justify-center rounded-full"
                                                                style={{ background: isSpeaking ? "var(--deep-maroon)" : "rgba(59,31,11,0.08)" }}>
                                                                <Mic2 className="h-3.5 w-3.5" style={{ color: isSpeaking ? "white" : "var(--deep-maroon)" }} />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-semibold" style={{ color: "var(--deep-maroon)", fontFamily: "var(--font-heading)" }}>
                                                                    {lang === "hi" ? "सुनिए — गहरी आवाज़ में" : "Listen — Deep Male Voice"}
                                                                </p>
                                                                <p className="text-[10px]" style={{ color: "var(--sandstone)" }}>
                                                                    {isSpeaking ? (lang === "hi" ? "बोल रहा हूँ..." : "Speaking...") : "Baritone narration"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={speakResponse}
                                                            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105"
                                                            style={{
                                                                background: isSpeaking
                                                                    ? "var(--deep-maroon)"
                                                                    : "linear-gradient(135deg, var(--deep-maroon), var(--saffron))",
                                                                color: "white",
                                                            }}>
                                                            {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                                                            {isSpeaking ? "Stop" : lang === "hi" ? "सुनो" : "Read Aloud"}
                                                        </button>
                                                    </div>
                                                    {/* Animated sound wave bars */}
                                                    {isSpeaking && (
                                                        <div className="flex items-end justify-center gap-[3px] px-4 pb-3">
                                                            {Array.from({ length: 20 }).map((_, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    className="rounded-full"
                                                                    style={{
                                                                        width: "3px",
                                                                        background: "linear-gradient(to top, var(--deep-maroon), var(--temple-gold))",
                                                                    }}
                                                                    animate={{
                                                                        height: [8, 16 + Math.random() * 20, 8],
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.4 + Math.random() * 0.4,
                                                                        repeat: Infinity,
                                                                        delay: i * 0.05,
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Feature recommendation */}
                                                {response.featureRecommendation && (
                                                    <Link href={response.featureRecommendation.route}
                                                        className="group flex items-center gap-2 rounded-xl px-4 py-3 transition-all hover:scale-[1.01]"
                                                        style={{
                                                            background: "linear-gradient(135deg, rgba(59,31,11,0.04), rgba(201,162,39,0.06))",
                                                            border: "1px solid rgba(201, 162, 39, 0.15)",
                                                        }}>
                                                        <div className="flex-1">
                                                            <p className="text-[10px] font-medium uppercase tracking-wider mb-0.5"
                                                                style={{ color: "var(--temple-gold)" }}>
                                                                💡 Try this feature
                                                            </p>
                                                            <p className="text-xs" style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}>
                                                                <strong>{response.featureRecommendation.feature}</strong> — {response.featureRecommendation.reason}
                                                            </p>
                                                        </div>
                                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                                            style={{ color: "var(--temple-gold)" }} />
                                                    </Link>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <motion.div key="empty"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="flex flex-col items-center gap-3 text-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full"
                                                    style={{ background: "rgba(201, 162, 39, 0.08)" }}>
                                                    <Feather className="h-7 w-7" style={{ color: "var(--temple-gold)", opacity: 0.5 }} />
                                                </div>
                                                <p className="text-sm" style={{ color: "var(--muted-terracotta)", opacity: 0.6 }}>
                                                    Write your heart out on the left,<br />
                                                    and ancient wisdom will find you here.
                                                </p>
                                                <p className="text-xs" style={{ color: "var(--sandstone)", opacity: 0.4 }}>
                                                    English ya Hindi — dono mein likh sakte ho 🇮🇳
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
