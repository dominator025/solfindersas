"use client";

import { Music } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "#features", label: "Features" },
    { href: "#tools", label: "Tools" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header
            className="sticky top-0 z-50"
            style={{
                background:
                    "var(--header-gradient, linear-gradient(135deg, var(--deep-maroon) 0%, #8B4513 50%, var(--saffron) 100%))",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            }}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105"
                        style={{
                            background: "linear-gradient(135deg, var(--saffron), var(--temple-gold))",
                            boxShadow: "0 2px 8px rgba(232, 144, 46, 0.4)",
                        }}
                    >
                        <Music className="h-5 w-5 text-white" />
                    </div>
                    <span
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        SolFinders
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive =
                            link.href === "/"
                                ? pathname === "/"
                                : link.href.startsWith("#")
                                    ? pathname === "/"
                                    : pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: isActive ? "#fff" : "rgba(255,255,255,0.75)",
                                    background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.color = "#fff";
                                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                                        e.currentTarget.style.background = "transparent";
                                    }
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
