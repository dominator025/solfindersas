"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Music,
    Send,
    Mail,
    MessageSquare,
    User,
    ArrowLeft,
    MapPin,
    Phone,
    Heart,
} from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        // Simulate form submission
        setTimeout(() => {
            setIsSending(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <div
            className="min-h-screen"
            style={{ background: "var(--warm-cream, #FDF6EC)" }}
        >
            {/* ─── CTA Hero Banner ─── */}
            <section
                className="relative overflow-hidden"
                style={{
                    background:
                        "linear-gradient(135deg, var(--deep-maroon) 0%, #8B2E2E 40%, var(--saffron) 100%)",
                }}
            >
                {/* Decorative top bar */}
                <div
                    className="h-1.5 w-full"
                    style={{
                        background:
                            "linear-gradient(90deg, var(--temple-gold), var(--saffron), var(--temple-gold))",
                    }}
                />

                {/* Background pattern */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px),
              radial-gradient(circle at 80% 70%, #fff 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                />

                <div className="relative px-6 py-16 text-center md:py-24">
                    {/* Back to home */}
                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/70 transition-all duration-200 hover:text-white"
                        style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            fontFamily: "var(--font-body)",
                        }}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Sound Therapy
                    </Link>

                    {/* Logo */}
                    <div className="mb-6 flex items-center justify-center gap-3">
                        <div
                            className="flex h-14 w-14 items-center justify-center rounded-full"
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--saffron), var(--temple-gold))",
                                boxShadow: "0 4px 20px rgba(232, 144, 46, 0.4)",
                            }}
                        >
                            <Music className="h-7 w-7 text-white" />
                        </div>
                    </div>

                    <h1
                        className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Begin Your Healing Journey
                    </h1>

                    <p
                        className="mx-auto mb-8 max-w-xl text-lg text-white/80"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Join thousands transforming stress into serenity through the wisdom
                        of ancient India.
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{
                            background:
                                "linear-gradient(135deg, var(--temple-gold), var(--saffron))",
                            color: "var(--deep-maroon)",
                            fontFamily: "var(--font-body)",
                            boxShadow: "0 4px 15px rgba(201, 169, 78, 0.4)",
                        }}
                    >
                        <Heart className="h-5 w-5" />
                        Get Started Free
                    </Link>
                </div>

                {/* Bottom wave */}
                <div
                    className="h-6"
                    style={{
                        background: "var(--warm-cream, #FDF6EC)",
                        borderRadius: "100% 100% 0 0",
                    }}
                />
            </section>

            {/* ─── Contact Form Section ─── */}
            <section className="px-6 py-16">
                <div className="mx-auto max-w-2xl">
                    {/* Section heading */}
                    <div className="mb-10 text-center">
                        <p
                            className="mb-2 text-xs font-medium uppercase tracking-widest"
                            style={{
                                color: "var(--saffron)",
                                fontFamily: "var(--font-body)",
                            }}
                        >
                            We&apos;d Love to Hear From You
                        </p>
                        <h2
                            className="mb-3 text-3xl font-bold md:text-4xl"
                            style={{
                                fontFamily: "var(--font-heading)",
                                color: "var(--deep-maroon)",
                            }}
                        >
                            Connect With Us
                        </h2>
                        <p
                            className="text-sm"
                            style={{
                                color: "var(--muted-terracotta)",
                                fontFamily: "var(--font-body)",
                                opacity: 0.7,
                            }}
                        >
                            Whether you have questions about raaga therapy, feedback, or
                            collaboration ideas — reach out.
                        </p>
                    </div>

                    {isSubmitted ? (
                        /* Success state */
                        <div
                            className="rounded-2xl px-8 py-12 text-center"
                            style={{
                                background: "var(--soft-ivory)",
                                border: "1px solid var(--sandstone)",
                                animation: "fadeInUp 0.5s ease-out",
                            }}
                        >
                            <div
                                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                                style={{
                                    background:
                                        "linear-gradient(135deg, var(--saffron), var(--temple-gold))",
                                }}
                            >
                                <Send className="h-7 w-7 text-white" />
                            </div>
                            <h3
                                className="mb-2 text-2xl font-bold"
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    color: "var(--deep-maroon)",
                                }}
                            >
                                Message Sent! 🙏
                            </h3>
                            <p
                                className="mb-6 text-sm"
                                style={{
                                    color: "var(--muted-terracotta)",
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                Thank you for reaching out. We&apos;ll get back to you soon.
                                Namaste.
                            </p>
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setFormData({ name: "", email: "", message: "" });
                                }}
                                className="rounded-full px-6 py-2 text-sm transition-all duration-200 hover:scale-105"
                                style={{
                                    background: "rgba(107, 29, 42, 0.08)",
                                    color: "var(--deep-maroon)",
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        /* Form */
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-2xl px-6 py-8 md:px-8"
                            style={{
                                background: "var(--soft-ivory)",
                                border: "1px solid var(--sandstone)",
                                boxShadow: "0 4px 20px rgba(212, 167, 106, 0.1)",
                            }}
                        >
                            {/* Name field */}
                            <div className="mb-5">
                                <label
                                    className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider"
                                    style={{
                                        color: "var(--muted-terracotta)",
                                        fontFamily: "var(--font-body)",
                                    }}
                                >
                                    <User className="h-3.5 w-3.5" />
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                                    style={{
                                        background: "#fff",
                                        border: "1.5px solid var(--sandstone)",
                                        color: "var(--foreground)",
                                        fontFamily: "var(--font-body)",
                                    }}
                                    onFocus={(e) =>
                                        (e.currentTarget.style.borderColor = "var(--saffron)")
                                    }
                                    onBlur={(e) =>
                                        (e.currentTarget.style.borderColor = "var(--sandstone)")
                                    }
                                />
                            </div>

                            {/* Email field */}
                            <div className="mb-5">
                                <label
                                    className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider"
                                    style={{
                                        color: "var(--muted-terracotta)",
                                        fontFamily: "var(--font-body)",
                                    }}
                                >
                                    <Mail className="h-3.5 w-3.5" />
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                                    style={{
                                        background: "#fff",
                                        border: "1.5px solid var(--sandstone)",
                                        color: "var(--foreground)",
                                        fontFamily: "var(--font-body)",
                                    }}
                                    onFocus={(e) =>
                                        (e.currentTarget.style.borderColor = "var(--saffron)")
                                    }
                                    onBlur={(e) =>
                                        (e.currentTarget.style.borderColor = "var(--sandstone)")
                                    }
                                />
                            </div>

                            {/* Message field */}
                            <div className="mb-6">
                                <label
                                    className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider"
                                    style={{
                                        color: "var(--muted-terracotta)",
                                        fontFamily: "var(--font-body)",
                                    }}
                                >
                                    <MessageSquare className="h-3.5 w-3.5" />
                                    Your Message
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Tell us about your experience, questions, or ideas..."
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                    className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                                    style={{
                                        background: "#fff",
                                        border: "1.5px solid var(--sandstone)",
                                        color: "var(--foreground)",
                                        fontFamily: "var(--font-body)",
                                    }}
                                    onFocus={(e) =>
                                        (e.currentTarget.style.borderColor = "var(--saffron)")
                                    }
                                    onBlur={(e) =>
                                        (e.currentTarget.style.borderColor = "var(--sandstone)")
                                    }
                                />
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isSending}
                                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-70"
                                style={{
                                    background:
                                        "linear-gradient(135deg, var(--deep-maroon), var(--saffron))",
                                    fontFamily: "var(--font-body)",
                                    boxShadow: "0 4px 15px rgba(107, 29, 42, 0.3)",
                                }}
                            >
                                {isSending ? (
                                    <>
                                        <div
                                            className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                                            style={{ animation: "slowRotate 0.8s linear infinite" }}
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Contact info cards */}
                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {[
                            {
                                icon: Mail,
                                title: "Email",
                                info: "solfinderssupport@tech",
                            },
                            {
                                icon: Phone,
                                title: "Phone",
                                info: "+9192333XXXXX",
                            },
                            {
                                icon: MapPin,
                                title: "Location",
                                info: "Delhi, India",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="flex items-center gap-3 rounded-xl px-4 py-3"
                                style={{
                                    background: "var(--soft-ivory)",
                                    border: "1px solid var(--sandstone)",
                                }}
                            >
                                <item.icon
                                    className="h-4 w-4 shrink-0"
                                    style={{ color: "var(--saffron)" }}
                                />
                                <div>
                                    <p
                                        className="text-xs font-medium uppercase tracking-wider"
                                        style={{
                                            color: "var(--muted-terracotta)",
                                            fontFamily: "var(--font-body)",
                                        }}
                                    >
                                        {item.title}
                                    </p>
                                    <p
                                        className="text-sm"
                                        style={{
                                            color: "var(--deep-maroon)",
                                            fontFamily: "var(--font-body)",
                                        }}
                                    >
                                        {item.info}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Footer ─── */}
            <footer
                className="px-6 py-8 text-center"
                style={{ background: "var(--deep-maroon, #3D1E24)" }}
            >
                <p
                    className="mb-3 text-sm text-white/50"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    © 2026 SolFinders. Transforming Ancient Wisdom into Modern Healing.
                </p>
                <div className="flex items-center justify-center gap-4">
                    {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((social) => (
                        <a
                            key={social}
                            href="#"
                            className="text-xs text-white/30 transition-colors hover:text-white/60"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            {social}
                        </a>
                    ))}
                </div>
            </footer>
        </div>
    );
}
