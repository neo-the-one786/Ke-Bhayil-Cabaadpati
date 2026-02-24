"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { audioManager } from "@/lib/audio";
import { Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import NextImage from "next/image";

export default function Landing() {
    const setPhase = useGameStore((state) => state.setPhase);

    const hasPlayedRef = useRef(false);

    useEffect(() => {
        const playInitial = () => {
            if (hasPlayedRef.current) return;
            hasPlayedRef.current = true;
            audioManager.playBgm('THEME_INTRO');
            audioManager.playSfx('VO_OPENING');
        };

        // Set up audio unlock on first interaction
        const unlockAndPlay = () => {
            audioManager.initialize();
            playInitial();
            document.removeEventListener('click', unlockAndPlay);
        };
        document.addEventListener('click', unlockAndPlay);

        // Also try playing immediately in case context is already unlocked
        playInitial();

        return () => document.removeEventListener('click', unlockAndPlay);
    }, []);

    const handleStart = () => {
        setPhase('REGISTRATION');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden relative">
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-8">

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                        <img
                            src="/kbc-logo.png"
                            alt="KBC Logo"
                            className="w-full h-full object-contain mix-blend-screen"
                        />
                    </div>
                </motion.div>

                {/* Start Button */}
                <motion.button
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px var(--kbc-gold)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStart}
                    className="px-12 py-4 bg-gradient-to-r from-kbc-purple to-kbc-blue border-2 border-kbc-gold/50 rounded-full text-white font-bold text-xl tracking-widest uppercase shadow-[0_0_15px_rgba(251,191,36,0.5)] flex items-center gap-3"
                >
                    <Play className="w-6 h-6 fill-current" />
                    Play Now
                </motion.button>
            </div>
        </div>
    );
}
