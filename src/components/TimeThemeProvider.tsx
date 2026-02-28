"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";

/* ── Time periods ─────────────────────────────────────────────── */
type TimePeriod = "morning" | "afternoon" | "evening" | "night";

interface TimeTheme {
    period: TimePeriod;
    label: string;
    /** Header gradient */
    headerGradient: string;
    /** Page background */
    background: string;
    /** Primary accent */
    saffron: string;
    deepMaroon: string;
    warmCream: string;
    sandstone: string;
    templeGold: string;
    softIvory: string;
    mutedTerracotta: string;
    foreground: string;
}

const THEMES: Record<TimePeriod, TimeTheme> = {
    morning: {
        period: "morning",
        label: "Morning Raga",
        headerGradient: "linear-gradient(135deg, #3B1F0B 0%, #c9a227 50%, #d4952b 100%)",
        background: "#FDF6EC",
        saffron: "#d4952b",
        deepMaroon: "#3B1F0B",
        warmCream: "#FDF6EC",
        sandstone: "#c4a265",
        templeGold: "#c9a227",
        softIvory: "#f5ede0",
        mutedTerracotta: "#8b5e3c",
        foreground: "#2a1f1a",
    },
    afternoon: {
        period: "afternoon",
        label: "Afternoon Raga",
        headerGradient: "linear-gradient(135deg, #3B1F0B 0%, #5c3310 50%, #c9a227 100%)",
        background: "#FDF6EC",
        saffron: "#d4952b",
        deepMaroon: "#3B1F0B",
        warmCream: "#FDF6EC",
        sandstone: "#c4a265",
        templeGold: "#c9a227",
        softIvory: "#f5ede0",
        mutedTerracotta: "#8b5e3c",
        foreground: "#2a1f1a",
    },
    evening: {
        period: "evening",
        label: "Evening Raga",
        headerGradient: "linear-gradient(135deg, #3B1F0B 0%, #8B3A1F 35%, #c9a227 60%, #6B3FA0 100%)",
        background: "#faf0e6",
        saffron: "#c9882a",
        deepMaroon: "#3B1F0B",
        warmCream: "#faf0e6",
        sandstone: "#b8944e",
        templeGold: "#c9a227",
        softIvory: "#f0e4d4",
        mutedTerracotta: "#7a5030",
        foreground: "#2a1a14",
    },
    night: {
        period: "night",
        label: "Night Raga",
        headerGradient: "linear-gradient(135deg, #0f1b3d 0%, #1a2855 50%, #2c2450 100%)",
        background: "#0e1525",
        saffron: "#5a8fc7",
        deepMaroon: "#8ba5cb",
        warmCream: "#0e1525",
        sandstone: "#3d5a80",
        templeGold: "#6b8db5",
        softIvory: "#141e33",
        mutedTerracotta: "#7a9ac0",
        foreground: "#c8d6e5",
    },
};

function getTimePeriod(): TimePeriod {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 20) return "evening";
    return "night";
}

const TimeThemeContext = createContext<TimeTheme>(THEMES.afternoon);

export function useTimeTheme() {
    return useContext(TimeThemeContext);
}

export function TimeThemeProvider({ children }: { children: React.ReactNode }) {
    const [period, setPeriod] = useState<TimePeriod>(getTimePeriod);

    useEffect(() => {
        // Re-check every minute
        const id = setInterval(() => {
            setPeriod(getTimePeriod());
        }, 60_000);
        return () => clearInterval(id);
    }, []);

    const theme = useMemo(() => THEMES[period], [period]);

    // Apply CSS custom properties to <html> for global cascading
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--saffron", theme.saffron);
        root.style.setProperty("--deep-maroon", theme.deepMaroon);
        root.style.setProperty("--warm-cream", theme.warmCream);
        root.style.setProperty("--sandstone", theme.sandstone);
        root.style.setProperty("--temple-gold", theme.templeGold);
        root.style.setProperty("--soft-ivory", theme.softIvory);
        root.style.setProperty("--muted-terracotta", theme.mutedTerracotta);
        root.style.setProperty("--background", theme.background);
        root.style.setProperty("--foreground", theme.foreground);
        root.style.setProperty("--header-gradient", theme.headerGradient);
        // Also set a data attribute for any CSS-only selectors
        root.dataset.theme = period;
    }, [theme, period]);

    return (
        <TimeThemeContext.Provider value={theme}>
            {children}
        </TimeThemeContext.Provider>
    );
}
