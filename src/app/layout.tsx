import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { TimeThemeProvider } from "@/components/TimeThemeProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SolFinders — Raaga Sound Therapy",
  description:
    "Discover the ancient science of Indian Raaga therapy. Curated soundscapes rooted in Vedic tradition to calm the mind, heal the body, and uplift the spirit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        <TimeThemeProvider>
          <div className="flex min-h-screen flex-col">{children}</div>
        </TimeThemeProvider>
      </body>
    </html>
  );
}

