"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Raaga } from "@/data/raagas";

interface AudioPlayerState {
    isPlaying: boolean;
    currentRaaga: Raaga | null;
    volume: number;
    play: () => void;
    pause: () => void;
    togglePlayPause: () => void;
    setVolume: (v: number) => void;
    loadRaaga: (raaga: Raaga) => void;
}

export function useAudioPlayer(): AudioPlayerState {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentRaaga, setCurrentRaaga] = useState<Raaga | null>(null);
    const [volume, setVolumeState] = useState(0.5);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const nodesRef = useRef<{
        oscillators: OscillatorNode[];
        gains: GainNode[];
        masterGain: GainNode | null;
    }>({ oscillators: [], gains: [], masterGain: null });

    const getAudioContext = useCallback(() => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === "suspended") {
            audioCtxRef.current.resume();
        }
        return audioCtxRef.current;
    }, []);

    const stopAllNodes = useCallback(() => {
        const { masterGain } = nodesRef.current;
        const ctx = audioCtxRef.current;

        if (masterGain && ctx) {
            masterGain.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
        }

        setTimeout(() => {
            nodesRef.current.oscillators.forEach((osc) => {
                try { osc.stop(); } catch { /* already stopped */ }
            });
            nodesRef.current = { oscillators: [], gains: [], masterGain: null };
        }, 300);
    }, []);

    const createSound = useCallback(
        (raaga: Raaga, vol: number) => {
            const ctx = getAudioContext();
            const oscillators: OscillatorNode[] = [];
            const gains: GainNode[] = [];

            // ---- Master gain with soft attack ----
            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0, ctx.currentTime);
            masterGain.gain.linearRampToValueAtTime(vol * 0.35, ctx.currentTime + 2);
            masterGain.connect(ctx.destination);

            // ---- 1. Main note (sine) ----
            const osc1 = ctx.createOscillator();
            osc1.type = "sine";
            osc1.frequency.setValueAtTime(raaga.frequency, ctx.currentTime);
            const g1 = ctx.createGain();
            g1.gain.setValueAtTime(1.0, ctx.currentTime);
            osc1.connect(g1).connect(masterGain);
            oscillators.push(osc1);
            gains.push(g1);

            // ---- 2. Slightly detuned second voice (warmth) ----
            const osc2 = ctx.createOscillator();
            osc2.type = "sine";
            osc2.frequency.setValueAtTime(raaga.frequency * 1.003, ctx.currentTime);
            const g2 = ctx.createGain();
            g2.gain.setValueAtTime(0.3, ctx.currentTime);
            osc2.connect(g2).connect(masterGain);
            oscillators.push(osc2);
            gains.push(g2);

            // ---- 3. Fifth harmonic (depth) ----
            const osc3 = ctx.createOscillator();
            osc3.type = "sine";
            osc3.frequency.setValueAtTime(raaga.frequency * 1.5, ctx.currentTime);
            const g3 = ctx.createGain();
            g3.gain.setValueAtTime(0.1, ctx.currentTime);
            osc3.connect(g3).connect(masterGain);
            oscillators.push(osc3);
            gains.push(g3);

            // ---- 4. Tanpura drone (Sa - fundamental) ----
            const tanpuraSa = ctx.createOscillator();
            tanpuraSa.type = "sine";
            // Drone on C3 (130.81 Hz) as the Sa
            tanpuraSa.frequency.setValueAtTime(130.81, ctx.currentTime);
            const gDrone1 = ctx.createGain();
            gDrone1.gain.setValueAtTime(0.12, ctx.currentTime);
            tanpuraSa.connect(gDrone1).connect(masterGain);
            oscillators.push(tanpuraSa);
            gains.push(gDrone1);

            // ---- 5. Tanpura drone (Pa - fifth) ----
            const tanpuraPa = ctx.createOscillator();
            tanpuraPa.type = "sine";
            tanpuraPa.frequency.setValueAtTime(196.0, ctx.currentTime); // G3
            const gDrone2 = ctx.createGain();
            gDrone2.gain.setValueAtTime(0.08, ctx.currentTime);
            tanpuraPa.connect(gDrone2).connect(masterGain);
            oscillators.push(tanpuraPa);
            gains.push(gDrone2);

            // ---- 6. Tanpura upper Sa ----
            const tanpuraHighSa = ctx.createOscillator();
            tanpuraHighSa.type = "sine";
            tanpuraHighSa.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
            const gDrone3 = ctx.createGain();
            gDrone3.gain.setValueAtTime(0.06, ctx.currentTime);
            tanpuraHighSa.connect(gDrone3).connect(masterGain);
            oscillators.push(tanpuraHighSa);
            gains.push(gDrone3);

            // ---- 7. Slow vibrato LFO on main note ----
            const lfo = ctx.createOscillator();
            lfo.type = "sine";
            lfo.frequency.setValueAtTime(0.15, ctx.currentTime);
            const lfoGain = ctx.createGain();
            lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
            lfo.connect(lfoGain).connect(osc1.frequency);
            oscillators.push(lfo);
            gains.push(lfoGain);

            // ---- 8. Slow amplitude modulation for tanpura feel ----
            const amLfo = ctx.createOscillator();
            amLfo.type = "sine";
            amLfo.frequency.setValueAtTime(0.08, ctx.currentTime); // very slow
            const amGain = ctx.createGain();
            amGain.gain.setValueAtTime(0.03, ctx.currentTime);
            amLfo.connect(amGain).connect(gDrone1.gain);
            oscillators.push(amLfo);
            gains.push(amGain);

            // Start all oscillators
            oscillators.forEach((osc) => osc.start());

            nodesRef.current = { oscillators, gains, masterGain };
        },
        [getAudioContext]
    );

    const play = useCallback(() => {
        if (!currentRaaga) return;
        createSound(currentRaaga, volume);
        setIsPlaying(true);
    }, [currentRaaga, createSound, volume]);

    const pause = useCallback(() => {
        stopAllNodes();
        setIsPlaying(false);
    }, [stopAllNodes]);

    const togglePlayPause = useCallback(() => {
        if (isPlaying) pause();
        else play();
    }, [isPlaying, play, pause]);

    const setVolume = useCallback((v: number) => {
        setVolumeState(v);
        const { masterGain } = nodesRef.current;
        const ctx = audioCtxRef.current;
        if (masterGain && ctx) {
            masterGain.gain.setTargetAtTime(v * 0.35, ctx.currentTime, 0.1);
        }
    }, []);

    const loadRaaga = useCallback(
        (raaga: Raaga) => {
            const wasPlaying = isPlaying;
            if (isPlaying) stopAllNodes();
            setCurrentRaaga(raaga);
            if (wasPlaying) {
                setTimeout(() => {
                    createSound(raaga, volume);
                    setIsPlaying(true);
                }, 350);
            }
        },
        [isPlaying, stopAllNodes, createSound, volume]
    );

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            nodesRef.current.oscillators.forEach((osc) => {
                try { osc.stop(); } catch { /* */ }
            });
            try { audioCtxRef.current?.close(); } catch { /* */ }
        };
    }, []);

    return {
        isPlaying,
        currentRaaga,
        volume,
        play,
        pause,
        togglePlayPause,
        setVolume,
        loadRaaga,
    };
}
