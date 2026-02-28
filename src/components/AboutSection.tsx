import { Leaf, Sun, Moon, BookOpen } from "lucide-react";
import { motion, Variants } from "framer-motion";

const features = [
    {
        icon: Sun,
        title: "Time-Based Healing",
        desc: "Each raaga is mapped to a specific time of day, following the ancient Prahar system for optimal therapeutic effect.",
    },
    {
        icon: Leaf,
        title: "Natural Sound Therapy",
        desc: "Pure sine-wave tones tuned to classical frequencies, enriched with subtle harmonics to create a deeply calming atmosphere.",
    },
    {
        icon: Moon,
        title: "Guided Breathing",
        desc: "A visual breathing guide synchronizes with the music — 3 seconds inhale, 3 seconds exhale — to activate the parasympathetic nervous system.",
    },
    {
        icon: BookOpen,
        title: "Vedic Wisdom",
        desc: "Every raaga carries centuries of documented healing properties from Ayurvedic and Sangeet Shastra traditions.",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export default function AboutSection() {
    return (
        <section className="px-6 pt-12 pb-6">
            <div className="mx-auto max-w-5xl">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 text-center"
                >
                    <p
                        className="mb-2 text-xs font-medium uppercase tracking-widest"
                        style={{ color: "var(--saffron)", fontFamily: "var(--font-body)" }}
                    >
                        Ancient Science, Modern Healing
                    </p>
                    <h2
                        className="mb-3 text-3xl font-semibold"
                        style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--deep-maroon)",
                        }}
                    >
                        How Raaga Therapy Works
                    </h2>
                    <p
                        className="mx-auto max-w-2xl text-sm leading-relaxed"
                        style={{
                            color: "var(--muted-terracotta)",
                            opacity: 0.75,
                            fontFamily: "var(--font-body)",
                        }}
                    >
                        Indian classical music has been used as a healing modality for over
                        3,000 years. Each raaga is a precise melodic framework that creates
                        specific emotional and physiological responses in the listener.
                    </p>
                </motion.div>

                {/* Feature cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
                >
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            variants={itemVariants}
                            whileHover={{ y: -5, boxShadow: "0 8px 25px rgba(212, 167, 106, 0.15)", borderColor: "var(--sandstone)" }}
                            className="group rounded-2xl p-5"
                            style={{
                                background: "var(--soft-ivory)",
                                border: "1px solid transparent",
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            <div
                                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                                style={{
                                    background:
                                        "linear-gradient(135deg, var(--saffron), var(--temple-gold))",
                                }}
                            >
                                <feat.icon className="h-5 w-5 text-white" />
                            </div>
                            <h3
                                className="mb-2 text-base font-semibold"
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    color: "var(--deep-maroon)",
                                }}
                            >
                                {feat.title}
                            </h3>
                            <p
                                className="text-xs leading-relaxed"
                                style={{
                                    color: "var(--muted-terracotta)",
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                {feat.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
