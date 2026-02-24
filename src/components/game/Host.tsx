"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { audioManager } from "@/lib/audio";
import { ChevronRight, Gift } from "lucide-react";

const SCRIPT = [
    "Welcome to the Hot Seat! Relax, take a deep breath.",
    "We have 20 questions standing between you and 10 Crores.",
    "Aap is dhanraashi ka kya karenge?",
    "That sounds wonderful. I wish you the very best of luck. Let's play... Kaun Banega Crorepati!"
];

export default function Host() {
    const setPhase = useGameStore((state) => state.setPhase);
    const [index, setIndex] = useState(0);
    const [winningPlan, setWinningPlan] = useState("");
    const [showPlanUI, setShowPlanUI] = useState(false);
    const [showGreatPlanUI, setShowGreatPlanUI] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const greetingAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioManager.stopBgm();
        audioManager.stopAllSfx(); // Stop opening remarks and any other lingering SFX

        // Play greeting audio directly via ref so we can reliably stop it
        const greetingAudio = new Audio('/audio/kbc-amitabh-greeting.mp3');
        greetingAudio.volume = 0.8;
        greetingAudio.play().catch(e => console.log("Greeting audio blocked", e));
        greetingAudioRef.current = greetingAudio;

        return () => {
            // Cleanup on unmount
            greetingAudio.pause();
            greetingAudio.currentTime = 0;
        };
    }, []);

    const stopGreetingAudio = () => {
        if (greetingAudioRef.current) {
            greetingAudioRef.current.pause();
            greetingAudioRef.current.currentTime = 0;
            greetingAudioRef.current = null;
        }
    };

    const handleNext = () => {
        // Stop greeting audio only on the 2nd Continue (when "what will you do" video appears)
        if (index === 1) {
            stopGreetingAudio();
            audioManager.stopAllSfx();
            setShowPlanUI(true);
            setIndex(2);
            return;
        }

        if (index < SCRIPT.length - 1) {
            setIndex(index + 1);
        } else {
            setPhase('QUIZ');
        }
    };

    const handlePlanSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!winningPlan.trim()) return;

        audioManager.playSfx('VO_GREAT_PLAN');
        setShowPlanUI(false);
        setShowGreatPlanUI(true);
        setIndex(3);
    };

    useEffect(() => {
        if (showPlanUI && videoRef.current) {
            stopGreetingAudio(); // Final safety net
            videoRef.current.play().catch(e => console.log("Video autoplay blocked", e));
        }
    }, [showPlanUI]);

    return (
        <div className="flex flex-col items-center justify-end h-screen overflow-hidden relative p-4">
            <div className="absolute inset-0 bg-radial-gradient from-[#1e1e2e] to-black z-0" />

            {/* Host Visual Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none pb-[200px]"
            >
                <div className="relative w-fit h-fit rounded-2xl overflow-hidden p-[3px] bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                    <AnimatePresence mode="wait">
                        {showPlanUI ? (
                            <motion.div
                                key="video"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative h-[180px] md:h-[280px] aspect-video"
                            >
                                <video
                                    ref={videoRef}
                                    src="/kbc-amitabh-what-will-you-do.mp4"
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-3 backdrop-blur-sm">
                                    <p className="text-kbc-gold text-center italic font-bold">"Aap is dhanraashi ka kya karenge?"</p>
                                </div>
                            </motion.div>
                        ) : showGreatPlanUI ? (
                            <motion.img
                                key="great-plan"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                src="/kbc-amitabh-great-plan.gif"
                                alt="Great Plan Response"
                                className="h-[250px] md:h-[400px] w-auto object-contain rounded-xl"
                            />
                        ) : (
                            <motion.img
                                key="greeting"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                src="/kbc-amitabh-greeting.gif"
                                alt="Host Greeting"
                                className="h-[250px] md:h-[400px] w-auto object-contain rounded-xl"
                            />
                        )
                        }
                    </AnimatePresence>
                    <div className="w-full h-full bg-gradient-to-t from-black/20 via-transparent to-transparent absolute inset-0 pointer-events-none" />
                </div>
            </motion.div>

            {/* Dialogue Box */}
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative z-10 w-full max-w-3xl p-[2px] rounded-2xl bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] shadow-[0_0_40px_rgba(30,58,138,0.4)] backdrop-blur-md mb-12"
            >
                <div className="bg-black/90 rounded-[14px] p-8 w-full h-full">
                    <AnimatePresence mode="wait">
                        {!showPlanUI ? (
                            <motion.div
                                key="dialogue"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 rounded-full bg-kbc-gold/20 border-2 border-kbc-gold flex items-center justify-center shrink-0">
                                        <span className="text-2xl">🤵</span>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-kbc-gold font-bold uppercase tracking-widest mb-2 text-sm">Host</h3>
                                        <p className="text-white text-2xl leading-relaxed font-light">
                                            {SCRIPT[index]}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center gap-2 text-kbc-gold hover:text-white transition-colors uppercase tracking-widest font-bold text-sm"
                                    >
                                        {index === SCRIPT.length - 1 ? "Let's Play" : "Continue"} <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="plan-ui"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-6"
                            >
                                <form onSubmit={handlePlanSubmit} className="space-y-4">
                                    <label className="text-kbc-gold text-sm uppercase tracking-widest flex items-center gap-2 font-bold justify-center">
                                        <Gift className="w-4 h-4" /> Your Winning Plan
                                    </label>
                                    <textarea
                                        autoFocus
                                        value={winningPlan}
                                        onChange={(e) => setWinningPlan(e.target.value)}
                                        className="w-full bg-black/40 border border-kbc-blue/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kbc-gold transition-all text-center resize-none text-xl"
                                        placeholder="I will..."
                                        required
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={!winningPlan.trim()}
                                            className="bg-kbc-gold text-black font-black py-2 px-8 rounded-full hover:bg-white transition uppercase tracking-widest disabled:opacity-50"
                                        >
                                            Share Plan
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
