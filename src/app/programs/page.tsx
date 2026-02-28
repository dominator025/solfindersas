"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, BarChart3, FileText, Users, Music,
    GraduationCap, Brain, Timer, BookOpen, Sparkles,
    Shield, Headphones, Target, Zap, X, TrendingDown,
    TrendingUp, Activity, Mail, Building, ArrowRight,
    Heart, AlertTriangle, CheckCircle2,
} from "lucide-react";
import Link from "next/link";

/* ═══════════════ DATA ═══════════════ */

const corporateFeatures = [
    { icon: BarChart3, title: "Anonymous Stress Analytics", description: "AI-powered, privacy-first dashboards that track team wellness trends without identifying individuals. Real-time mood heatmaps and stress pattern analysis.", color: "#c9a227" },
    { icon: FileText, title: "Weekly Wellness Reports", description: "Automated reports delivered to HR — aggregated team wellness scores, engagement metrics, and actionable recommendations based on Vedic wellness science.", color: "#E8902E" },
    { icon: Users, title: "Custom Raaga Sessions for Teams", description: "Curated group sound therapy sessions mapped to your team's collective stress levels. Morning raagas for focus, evening raagas for unwinding after sprints.", color: "#2D7D46" },
    { icon: Shield, title: "B2B Enterprise Model", description: "White-label integration into your company's wellness stack. SSO support, Slack/Teams integration, and per-seat licensing with dedicated account management.", color: "#2C2450" },
];

const studentFeatures = [
    { icon: Brain, title: "Exam Stress Raaga Sessions", description: "Specially curated raaga playlists designed for pre-exam anxiety. Raag Bhairavi for morning calm before papers, Raag Yaman for evening revision confidence.", color: "#6B1D2A" },
    { icon: Target, title: "Focus Mode Sessions", description: "Deep concentration soundscapes combining Raag Todi with binaural beats. Blocks distractions and enters a flow state — proven to boost retention by 40%.", color: "#c9a227" },
    { icon: Timer, title: "20-Minute Study Boosters", description: "Pomodoro-style sessions with heritage sound therapy. Each 20-minute cycle alternates between focused raaga listening and guided Pranayama breathing breaks.", color: "#E8902E" },
    { icon: BookOpen, title: "Academic Wellness Programs", description: "Semester-long wellness tracks designed with educational psychologists. Includes Panchatantra-based stress management stories and daily mindfulness routines.", color: "#4A3728" },
];

// Demo analytics data
const weeklyStress = [
    { day: "Mon", level: 72, color: "#E8902E" },
    { day: "Tue", level: 65, color: "#c9a227" },
    { day: "Wed", level: 58, color: "#c9a227" },
    { day: "Thu", level: 78, color: "#E8902E" },
    { day: "Fri", level: 45, color: "#2D7D46" },
    { day: "Sat", level: 30, color: "#2D7D46" },
    { day: "Sun", level: 25, color: "#2D7D46" },
];

const moodHeatmap = [
    ["😌", "😰", "😔", "😌", "😊"],
    ["😤", "😌", "😰", "😔", "😌"],
    ["😊", "😌", "😌", "😰", "😊"],
    ["😔", "😤", "😌", "😊", "😊"],
];

const heatmapColors = {
    "😊": "#2D7D4630", "😌": "#c9a22725", "😰": "#E8902E30",
    "😔": "#6B1D2A25", "😤": "#2C245030",
};

const deptLabels = ["Engineering", "Design", "Marketing", "Sales"];
const timeLabels = ["9 AM", "11 AM", "1 PM", "3 PM", "5 PM"];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

/* ═══════════════ COMPONENT ═══════════════ */

export default function ProgramsPage() {
    const [showReport, setShowReport] = useState(false);
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");

    const scrollToAnalytics = () => {
        document.getElementById("demo-analytics")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <Header />

            {/* ─── HERO ─── */}
            <section className="relative overflow-hidden px-6 py-20 text-center"
                style={{ background: "linear-gradient(180deg, var(--twilight-indigo), #1a1440 60%, var(--background))" }}>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ opacity: 0.03 }}>
                    <div style={{ width: "600px", height: "600px", animation: "slowRotate 120s linear infinite" }}>
                        <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%", height: "100%", color: "#c9a227" }}>
                            {Array.from({ length: 16 }).map((_, i) => (
                                <ellipse key={i} cx="200" cy="50" rx="14" ry="55" stroke="currentColor" strokeWidth="0.5" transform={`rotate(${i * 22.5} 200 200)`} />
                            ))}
                            <circle cx="200" cy="200" r="170" stroke="currentColor" strokeWidth="0.3" />
                            <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="0.3" />
                        </svg>
                    </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 mx-auto max-w-3xl">
                    <motion.div className="mb-4 inline-block" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
                            style={{ background: "linear-gradient(135deg, var(--temple-gold), var(--saffron))", boxShadow: "0 8px 30px rgba(201, 162, 39, 0.3)" }}>
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                    </motion.div>
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl shimmer-text" style={{ fontFamily: "var(--font-heading)" }}>
                        Our Programs
                    </h1>
                    <p className="mx-auto max-w-xl text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
                        Ancient heritage healing, designed for modern lives — whether you&apos;re leading a team of 500 or preparing for tomorrow&apos;s exam.
                    </p>
                </motion.div>
            </section>

            {/* ─── CORPORATE WELLNESS ─── */}
            <section className="relative overflow-hidden px-6 py-16">
                <div className="pointer-events-none absolute right-0 top-0 opacity-[0.03]" style={{ width: "300px", height: "300px", animation: "slowRotate 80s linear infinite" }}>
                    <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%", height: "100%", color: "var(--temple-gold)" }}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ellipse key={i} cx="200" cy="80" rx="14" ry="50" stroke="currentColor" strokeWidth="0.8" transform={`rotate(${i * 45} 200 200)`} />
                        ))}
                        <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="0.4" />
                    </svg>
                </div>
                <div className="mx-auto max-w-5xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="mb-12 text-center">
                        <div className="mb-3 flex items-center justify-center gap-2">
                            <Building2 className="h-5 w-5" style={{ color: "var(--temple-gold)" }} />
                            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--temple-gold)", fontFamily: "var(--font-body)" }}>For Organizations</p>
                        </div>
                        <h2 className="mb-3 text-3xl font-semibold md:text-4xl" style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>Corporate Wellness Dashboard</h2>
                        <p className="mx-auto max-w-lg text-sm leading-relaxed" style={{ color: "var(--muted-terracotta)", opacity: 0.8 }}>
                            Empower your workforce with data-driven wellness rooted in 5,000 years of Indian healing traditions.
                        </p>
                    </motion.div>

                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {corporateFeatures.map((f) => (
                            <motion.div key={f.title} variants={itemVariants} whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300"
                                style={{ background: "linear-gradient(145deg, var(--soft-ivory), #fff)", border: "1px solid rgba(196, 162, 101, 0.15)", boxShadow: "0 2px 12px rgba(59, 31, 11, 0.04)" }}>
                                <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]" style={{ width: "120px", height: "120px", animation: "slowRotate 60s linear infinite" }}>
                                    <svg viewBox="0 0 200 200" fill="none" style={{ width: "100%", height: "100%", color: f.color }}>
                                        {Array.from({ length: 8 }).map((_, i) => (<ellipse key={i} cx="100" cy="30" rx="8" ry="25" stroke="currentColor" strokeWidth="1" transform={`rotate(${i * 45} 100 100)`} />))}
                                    </svg>
                                </div>
                                <div className="relative z-10 flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                                        style={{ background: `linear-gradient(135deg, ${f.color}20, ${f.color}10)`, border: `1px solid ${f.color}25` }}>
                                        <f.icon className="h-5 w-5" style={{ color: f.color }} />
                                    </div>
                                    <div>
                                        <h3 className="mb-1.5 text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>{f.title}</h3>
                                        <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--muted-terracotta)" }}>{f.description}</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── LEAD CAPTURE FORM ─── */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="px-6 py-8"
            >
                <div className="mx-auto max-w-xl rounded-2xl overflow-hidden"
                    style={{
                        background: "linear-gradient(145deg, var(--twilight-indigo), #1a1440)",
                        border: "1px solid rgba(201, 162, 39, 0.15)",
                        boxShadow: "0 8px 32px rgba(44, 36, 80, 0.2)",
                    }}>
                    <div className="p-6 text-center">
                        <div className="mb-3 flex items-center justify-center gap-2">
                            <Activity className="h-4 w-4" style={{ color: "var(--temple-gold)" }} />
                            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--temple-gold)" }}>
                                Live Demo Preview
                            </p>
                        </div>
                        <h3 className="mb-1 text-xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                            See the Dashboard in Action
                        </h3>
                        <p className="mb-5 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                            Enter your details to explore our sample analytics dashboard
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5"
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                <Mail className="h-4 w-4 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                                <input
                                    type="email"
                                    placeholder="Work email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                                    style={{ fontFamily: "var(--font-body)" }}
                                />
                            </div>
                            <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5"
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                <Building className="h-4 w-4 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                                <input
                                    type="text"
                                    placeholder="Company name"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                                    style={{ fontFamily: "var(--font-body)" }}
                                />
                            </div>
                        </div>
                        <button
                            onClick={scrollToAnalytics}
                            className="mt-4 group flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02]"
                            style={{
                                background: "linear-gradient(135deg, var(--temple-gold), var(--saffron))",
                                boxShadow: "0 4px 16px rgba(201, 162, 39, 0.3)",
                                fontFamily: "var(--font-heading)",
                            }}
                        >
                            <BarChart3 className="h-4 w-4" />
                            View Demo Dashboard
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </motion.section>

            {/* ─── DEMO ANALYTICS DASHBOARD ─── */}
            <section id="demo-analytics" className="px-6 py-12">
                <div className="mx-auto max-w-5xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10 text-center">
                        <div className="mb-2 flex items-center justify-center gap-2">
                            <Activity className="h-4 w-4" style={{ color: "var(--temple-gold)" }} />
                            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--temple-gold)" }}>Demo Data • Sample Organization</p>
                        </div>
                        <h2 className="mb-2 text-3xl font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>Wellness Analytics Dashboard</h2>
                        <p className="text-xs" style={{ color: "var(--muted-terracotta)", opacity: 0.7 }}>Week of Feb 24 – Mar 2, 2026 • 127 employees anonymously tracked</p>
                    </motion.div>

                    {/* ── Metric Cards ── */}
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {[
                            { label: "Avg Stress Score", value: "53.3", icon: Activity, trend: "-12%", trendUp: false, color: "#c9a227" },
                            { label: "Sessions Completed", value: "342", icon: Headphones, trend: "+28%", trendUp: true, color: "#2D7D46" },
                            { label: "High Stress Alerts", value: "8", icon: AlertTriangle, trend: "-5", trendUp: false, color: "#E8902E" },
                            { label: "Wellness Score", value: "78/100", icon: Heart, trend: "+6", trendUp: true, color: "#6B1D2A" },
                        ].map((metric) => (
                            <motion.div key={metric.label} variants={itemVariants}
                                className="rounded-2xl p-4"
                                style={{ background: "linear-gradient(145deg, var(--soft-ivory), #fff)", border: "1px solid rgba(196, 162, 101, 0.15)", boxShadow: "0 2px 8px rgba(59,31,11,0.04)" }}>
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${metric.color}15` }}>
                                        <metric.icon className="h-4 w-4" style={{ color: metric.color }} />
                                    </div>
                                    <span className="flex items-center gap-0.5 text-[10px] font-medium"
                                        style={{ color: metric.trendUp ? "#2D7D46" : "#E8902E" }}>
                                        {metric.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                        {metric.trend}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>{metric.value}</p>
                                <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--sandstone)" }}>{metric.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* ── Charts Row ── */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Bar Chart — Weekly Stress */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                            className="rounded-2xl p-5"
                            style={{ background: "linear-gradient(145deg, var(--soft-ivory), #fff)", border: "1px solid rgba(196, 162, 101, 0.15)" }}>
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>Weekly Stress Levels</h3>
                                    <p className="text-[10px]" style={{ color: "var(--sandstone)" }}>Avg stress score per day (0–100)</p>
                                </div>
                                <BarChart3 className="h-4 w-4" style={{ color: "var(--sandstone)" }} />
                            </div>
                            <div className="flex items-end gap-2" style={{ height: "160px" }}>
                                {weeklyStress.map((d) => (
                                    <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${d.level * 1.4}px` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.1 }}
                                            className="w-full rounded-t-lg"
                                            style={{
                                                background: `linear-gradient(180deg, ${d.color}, ${d.color}80)`,
                                                minHeight: "4px",
                                                maxWidth: "32px",
                                                margin: "0 auto",
                                            }}
                                        />
                                        <span className="text-[9px] font-medium" style={{ color: "var(--sandstone)" }}>{d.day}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 flex items-center gap-4 text-[9px]" style={{ color: "var(--sandstone)" }}>
                                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: "#2D7D46" }} /> Low (&lt;50)</span>
                                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: "#c9a227" }} /> Medium</span>
                                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: "#E8902E" }} /> High (&gt;70)</span>
                            </div>
                        </motion.div>

                        {/* Mood Heatmap */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                            className="rounded-2xl p-5"
                            style={{ background: "linear-gradient(145deg, var(--soft-ivory), #fff)", border: "1px solid rgba(196, 162, 101, 0.15)" }}>
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>Team Mood Heatmap</h3>
                                    <p className="text-[10px]" style={{ color: "var(--sandstone)" }}>Anonymous mood by department × time</p>
                                </div>
                                <Activity className="h-4 w-4" style={{ color: "var(--sandstone)" }} />
                            </div>
                            {/* Time labels */}
                            <div className="mb-1 flex">
                                <div style={{ width: "80px" }} />
                                {timeLabels.map((t) => (
                                    <div key={t} className="flex-1 text-center text-[8px] font-medium" style={{ color: "var(--sandstone)" }}>{t}</div>
                                ))}
                            </div>
                            {/* Grid */}
                            <div className="space-y-1.5">
                                {moodHeatmap.map((row, ri) => (
                                    <div key={ri} className="flex items-center gap-1.5">
                                        <div className="text-[9px] font-medium text-right" style={{ width: "75px", color: "var(--muted-terracotta)" }}>{deptLabels[ri]}</div>
                                        {row.map((mood, ci) => (
                                            <motion.div
                                                key={ci}
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: (ri * 5 + ci) * 0.04 }}
                                                className="flex flex-1 items-center justify-center rounded-lg py-2"
                                                style={{
                                                    background: heatmapColors[mood as keyof typeof heatmapColors] || "rgba(196,162,101,0.1)",
                                                    border: "1px solid rgba(196,162,101,0.08)",
                                                }}
                                            >
                                                <span className="text-sm">{mood}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 flex flex-wrap items-center gap-3 text-[9px]" style={{ color: "var(--sandstone)" }}>
                                <span>😊 Happy</span><span>😌 Calm</span><span>😰 Anxious</span><span>😔 Sad</span><span>😤 Stressed</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Generate Report Button */}
                    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 text-center">
                        <button
                            onClick={() => setShowReport(true)}
                            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                            style={{ background: "linear-gradient(135deg, var(--deep-maroon), var(--saffron))", boxShadow: "0 4px 20px rgba(59, 31, 11, 0.2)", fontFamily: "var(--font-heading)" }}
                        >
                            <FileText className="h-4 w-4" />
                            Generate Weekly Report
                            <Zap className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ─── DIVIDER ─── */}
            <div className="mx-auto flex items-center justify-center gap-3 py-4">
                <span className="block h-px w-24" style={{ background: "var(--sandstone)", opacity: 0.3 }} />
                <span className="block h-1.5 w-1.5 rotate-45" style={{ background: "var(--temple-gold)", opacity: 0.5 }} />
                <span className="block h-px w-24" style={{ background: "var(--sandstone)", opacity: 0.3 }} />
            </div>

            {/* ─── STUDENT MODE ─── */}
            <section className="relative overflow-hidden px-6 py-16">
                <div className="pointer-events-none absolute left-0 bottom-0 opacity-[0.03]" style={{ width: "280px", height: "280px", animation: "slowRotate 70s linear infinite reverse" }}>
                    <svg viewBox="0 0 400 400" fill="none" style={{ width: "100%", height: "100%", color: "var(--saffron)" }}>
                        {Array.from({ length: 12 }).map((_, i) => (<ellipse key={i} cx="200" cy="60" rx="12" ry="48" stroke="currentColor" strokeWidth="0.6" transform={`rotate(${i * 30} 200 200)`} />))}
                        <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="0.3" />
                    </svg>
                </div>
                <div className="mx-auto max-w-5xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="mb-12 text-center">
                        <div className="mb-3 flex items-center justify-center gap-2">
                            <GraduationCap className="h-5 w-5" style={{ color: "var(--temple-gold)" }} />
                            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--temple-gold)", fontFamily: "var(--font-body)" }}>For Students</p>
                        </div>
                        <h2 className="mb-3 text-3xl font-semibold md:text-4xl" style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>Student Mode</h2>
                        <p className="mx-auto max-w-lg text-sm leading-relaxed" style={{ color: "var(--muted-terracotta)", opacity: 0.8 }}>
                            Ace your exams without burning out. Heritage-powered study sessions that sharpen focus, ease anxiety, and build academic resilience.
                        </p>
                    </motion.div>
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {studentFeatures.map((f) => (
                            <motion.div key={f.title} variants={itemVariants} whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300"
                                style={{ background: "linear-gradient(145deg, var(--soft-ivory), #fff)", border: "1px solid rgba(196, 162, 101, 0.15)", boxShadow: "0 2px 12px rgba(59, 31, 11, 0.04)" }}>
                                <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]" style={{ width: "120px", height: "120px", animation: "slowRotate 60s linear infinite" }}>
                                    <svg viewBox="0 0 200 200" fill="none" style={{ width: "100%", height: "100%", color: f.color }}>
                                        {Array.from({ length: 8 }).map((_, i) => (<ellipse key={i} cx="100" cy="30" rx="8" ry="25" stroke="currentColor" strokeWidth="1" transform={`rotate(${i * 45} 100 100)`} />))}
                                    </svg>
                                </div>
                                <div className="relative z-10 flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                                        style={{ background: `linear-gradient(135deg, ${f.color}20, ${f.color}10)`, border: `1px solid ${f.color}25` }}>
                                        <f.icon className="h-5 w-5" style={{ color: f.color }} />
                                    </div>
                                    <div>
                                        <h3 className="mb-1.5 text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>{f.title}</h3>
                                        <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--muted-terracotta)" }}>{f.description}</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }} />
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8 text-center">
                        <Link href="/" className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
                            style={{ background: "linear-gradient(135deg, rgba(201,162,39,0.1), rgba(201,162,39,0.18))", color: "var(--deep-maroon)", border: "1.5px solid rgba(201, 162, 39, 0.3)", fontFamily: "var(--font-heading)", animation: "glowPulse 3s ease-in-out infinite" }}>
                            <Music className="h-4 w-4" style={{ color: "var(--temple-gold)" }} />
                            Try a Free Study Session Now
                            <Zap className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" style={{ color: "var(--temple-gold)" }} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />

            {/* ─── WEEKLY REPORT MODAL ─── */}
            <AnimatePresence>
                {showReport && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
                        onClick={() => setShowReport(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl"
                            style={{
                                background: "linear-gradient(145deg, #fff, var(--soft-ivory))",
                                border: "1px solid rgba(196, 162, 101, 0.25)",
                                boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
                            }}
                        >
                            {/* Close button */}
                            <button onClick={() => setShowReport(false)}
                                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110"
                                style={{ background: "rgba(59,31,11,0.06)" }}>
                                <X className="h-4 w-4" style={{ color: "var(--deep-maroon)" }} />
                            </button>

                            <div className="p-6 md:p-8">
                                {/* Report header */}
                                <div className="mb-6 flex items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                                        style={{ background: "linear-gradient(135deg, var(--temple-gold), var(--saffron))" }}>
                                        <FileText className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>
                                            Weekly Wellness Report
                                        </h2>
                                        <p className="text-xs" style={{ color: "var(--sandstone)" }}>
                                            Week of Feb 24 – Mar 2, 2026 • {company || "Sample Corp"} • Generated for HR
                                        </p>
                                    </div>
                                </div>

                                {/* Executive Summary */}
                                <div className="mb-5 rounded-xl p-4" style={{ background: "rgba(201,162,39,0.06)", border: "1px solid rgba(201,162,39,0.12)" }}>
                                    <h3 className="mb-2 text-sm font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>📋 Executive Summary</h3>
                                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted-terracotta)" }}>
                                        Team wellness improved <strong>12% over last week</strong>. Average stress decreased from 60.5 to 53.3. Friday showed the lowest stress (45) as team Raaga sessions were introduced. Thursday spiked (78) due to sprint deadline — recommending pre-deadline Raag Bhairavi sessions.
                                    </p>
                                </div>

                                {/* Key Metrics */}
                                <div className="mb-5 grid grid-cols-3 gap-3">
                                    {[
                                        { label: "Stress Reduction", value: "-12%", icon: TrendingDown, ok: true },
                                        { label: "Sessions Used", value: "342", icon: Headphones, ok: true },
                                        { label: "High Alerts", value: "8", icon: AlertTriangle, ok: false },
                                    ].map((m) => (
                                        <div key={m.label} className="rounded-xl p-3 text-center" style={{ background: "var(--soft-ivory)", border: "1px solid rgba(196,162,101,0.1)" }}>
                                            <m.icon className="mx-auto mb-1 h-4 w-4" style={{ color: m.ok ? "#2D7D46" : "#E8902E" }} />
                                            <p className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>{m.value}</p>
                                            <p className="text-[9px] uppercase tracking-wider" style={{ color: "var(--sandstone)" }}>{m.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Recommendations */}
                                <div className="mb-5">
                                    <h3 className="mb-3 text-sm font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--deep-maroon)" }}>🕉️ Heritage-Based Recommendations</h3>
                                    <div className="space-y-2">
                                        {[
                                            { text: "Schedule team Raag Bhairavi sessions before Thursday sprint deadlines", icon: CheckCircle2 },
                                            { text: "Engineering team shows elevated stress — recommend Pranayama breaks at 3 PM", icon: CheckCircle2 },
                                            { text: "Continue Friday Raag Desh wind-down sessions (32% lower stress observed)", icon: CheckCircle2 },
                                            { text: "Consider Panchatantra story sharing for Monday morning team morale", icon: CheckCircle2 },
                                        ].map((r, i) => (
                                            <div key={i} className="flex items-start gap-2 rounded-lg px-3 py-2" style={{ background: "rgba(45,125,70,0.06)" }}>
                                                <r.icon className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#2D7D46" }} />
                                                <p className="text-xs leading-relaxed" style={{ color: "var(--foreground)" }}>{r.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="rounded-xl px-4 py-3 text-center" style={{ background: "rgba(44,36,80,0.04)", border: "1px solid rgba(44,36,80,0.08)" }}>
                                    <p className="text-[10px]" style={{ color: "var(--sandstone)" }}>
                                        🔒 All data is anonymous and aggregated • Powered by SolFinders Corporate Wellness • GDPR Compliant
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
