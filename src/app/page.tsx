"use client";

import { useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RaagaGrid from "@/components/RaagaGrid";
import PlayerSection from "@/components/PlayerSection";
import WellnessTools from "@/components/WellnessTools";
import Footer from "@/components/Footer";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Raaga } from "@/data/raagas";

export default function Home() {
  const {
    isPlaying,
    currentRaaga,
    volume,
    togglePlayPause,
    setVolume,
    loadRaaga,
  } = useAudioPlayer();

  const handleSelectRaaga = useCallback(
    (raaga: Raaga) => {
      loadRaaga(raaga);
      setTimeout(() => {
        document
          .getElementById("player-section")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    },
    [loadRaaga]
  );

  return (
    <>
      <Header />
      <HeroSection />

      <div id="about">
        <AboutSection />
      </div>

      {/* Decorative divider */}
      <div className="mx-auto flex items-center justify-center gap-3 py-2">
        <span className="block h-px w-20" style={{ background: "var(--sandstone)", opacity: 0.3 }} />
        <span className="block h-1.5 w-1.5 rotate-45" style={{ background: "var(--temple-gold)", opacity: 0.5 }} />
        <span className="block h-px w-20" style={{ background: "var(--sandstone)", opacity: 0.3 }} />
      </div>

      <div id="features">
        <RaagaGrid
          selectedRaaga={currentRaaga}
          onSelectRaaga={handleSelectRaaga}
          isPlaying={isPlaying}
        />
      </div>

      <PlayerSection
        raaga={currentRaaga}
        isPlaying={isPlaying}
        volume={volume}
        onTogglePlay={togglePlayPause}
        onVolumeChange={setVolume}
      />

      {/* Decorative divider */}
      <div className="mx-auto flex items-center justify-center gap-3 py-4">
        <span className="block h-px w-20" style={{ background: "var(--sandstone)", opacity: 0.3 }} />
        <span className="block h-1.5 w-1.5 rotate-45" style={{ background: "var(--temple-gold)", opacity: 0.5 }} />
        <span className="block h-px w-20" style={{ background: "var(--sandstone)", opacity: 0.3 }} />
      </div>

      <div id="tools">
        <WellnessTools />
      </div>

      <Footer />
    </>
  );
}
