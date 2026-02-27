"use client";

import { Raaga, raagas } from "@/data/raagas";
import RaagaCard from "./RaagaCard";

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
            <div className="mb-8 text-center">
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
            </div>

            {/* Grid */}
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {raagas.map((raaga, index) => (
                    <div key={raaga.id} style={{ animationDelay: `${index * 0.08}s` }}>
                        <RaagaCard
                            raaga={raaga}
                            isSelected={selectedRaaga?.id === raaga.id}
                            onSelect={onSelectRaaga}
                            isPlaying={isPlaying}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
