"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { audioManager } from "@/lib/audio";
import { User, MapPin, Briefcase, ChevronRight } from "lucide-react";

export default function Registration() {
    const setPlayer = useGameStore((state) => state.setPlayer);
    const setPhase = useGameStore((state) => state.setPhase);
    const initializeGame = useGameStore((state) => state.initializeGame);

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [profession, setProfession] = useState("");

    useEffect(() => {
        const unlock = () => {
            audioManager.initialize();
            document.removeEventListener('click', unlock);
        };
        document.addEventListener('click', unlock);
        audioManager.playBgm('THEME_INTRO');

        return () => document.removeEventListener('click', unlock);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setPlayer({ name, city, profession });
        initializeGame();
        setPhase('FFF');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden bg-transparent relative z-10 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-black/50 backdrop-blur-md border border-kbc-blue/50 rounded-2xl p-8 shadow-[0_0_30px_rgba(30,58,138,0.3)]"
            >
                <h2 className="text-3xl font-bold text-center mb-8 text-kbc-gold drop-shadow-md">
                    Player Registration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm uppercase tracking-wider flex items-center gap-2">
                            <User className="w-4 h-4" /> Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/40 border border-kbc-blue rounded-lg px-4 py-3 text-white focus:outline-none focus:border-kbc-gold transition-all"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm uppercase tracking-wider flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> City / State
                        </label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-black/40 border border-kbc-blue rounded-lg px-4 py-3 text-white focus:outline-none focus:border-kbc-gold transition-all"
                            placeholder="Where are you from?"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm uppercase tracking-wider flex items-center gap-2">
                            <Briefcase className="w-4 h-4" /> Profession
                        </label>
                        <input
                            type="text"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="w-full bg-black/40 border border-kbc-blue rounded-lg px-4 py-3 text-white focus:outline-none focus:border-kbc-gold transition-all"
                            placeholder="What do you do?"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full mt-8 bg-gradient-to-r from-kbc-blue to-kbc-purple border border-kbc-gold/30 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50"
                        disabled={!name.trim()}
                    >
                        Join Fastest Finger First <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
