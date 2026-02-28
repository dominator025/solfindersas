"use client";

import { Raaga, raagas } from "@/data/raagas";
import RaagaCard from "./RaagaCard";
import { motion } from "framer-motion";

interface RaagaGridProps {
    selectedRaaga: Raaga | null;
    onSelectRaaga: (raaga: Raaga) => void;
    isPlaying?: boolean;
}

export default function RaagaGrid({
    selectedRaaga,
    onSelectRaaga,
    isPlaying,
}: RaagaGridProps) {
    return (
        <section className="px-6 py-10">
            {/* Section heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="mb-8 text-center"
            >
                <h2
                    className="mb-2 text-3xl font-semibold"
                    style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--deep-maroon)",
                    }}
                >
                    Choose Your Raaga
                </h2>
                <p
                    className="text-sm"
                    style={{ color: "var(--muted-terracotta)", opacity: 0.7 }}
                >
                    Select a raaga to begin your healing journey
                </p>
            </motion.div>

            {/* Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
                {raagas.map((raaga, index) => (
                    <motion.div
                        key={raaga.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                    >
                        <RaagaCard
                            raaga={raaga}
                            isSelected={selectedRaaga?.id === raaga.id}
                            onSelect={onSelectRaaga}
                            isPlaying={isPlaying}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
