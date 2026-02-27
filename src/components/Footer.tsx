"use client";

export default function Footer() {
    return (
        <footer className="relative mt-auto">
            {/* Decorative top border */}
            <div
                className="h-px w-full"
                style={{ background: "var(--sandstone)", opacity: 0.4 }}
            />

            <div className="px-6 py-8 text-center">
                <p
                    className="text-sm"
                    style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--muted-terracotta)",
                        opacity: 0.7,
                    }}
                >
                    Built with ♡ for{" "}
                    <span style={{ color: "var(--saffron)", fontWeight: 500 }}>
                        Heritage Aesthetics Track
                    </span>{" "}
                    — Hackathon 2026
                </p>
                <p
                    className="mt-2 text-xs"
                    style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--sandstone)",
                        letterSpacing: "0.15em",
                    }}
                >
                    SolFinders • Raaga Sound Therapy
                </p>
            </div>
        </footer>
    );
}
