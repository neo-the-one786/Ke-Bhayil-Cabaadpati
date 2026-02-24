"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { audioManager } from "@/lib/audio";
import { useEffect, useRef } from "react";
import { CheckCircle, XCircle, RefreshCcw } from "lucide-react";
import Cheque from "./Cheque";


export default function Result() {
    const phase = useGameStore((state) => state.phase);
    const moneyWon = useGameStore((state) => state.moneyWon);
    const player = useGameStore((state) => state.player);
    const resetGame = useGameStore((state) => state.resetGame);

    const hasPlayedRef = useRef(false);

    useEffect(() => {
        let timeout1: NodeJS.Timeout;
        let timeout2: NodeJS.Timeout;

        if (phase === 'WIN' || phase === 'QUIT' || phase === 'LOSE') {
            // Small delay to ensure clean transition/audio context
            timeout1 = setTimeout(() => {
                if (phase === 'WIN') {
                    audioManager.playSfx('SFX_WIN');
                    // Chain: Win SFX -> Quit Remark -> Cheque Remark (sequential, not overlapping)
                    timeout2 = setTimeout(() => {
                        audioManager.playSfx('VO_QUIT_REMARK');
                        setTimeout(() => {
                            audioManager.playSfx('VO_CHEQUE_REMARK');
                        }, 4000);
                    }, 4000);
                } else if (phase === 'QUIT') {
                    audioManager.playSfx('VO_MONEY_REMARK');
                    // Chain: Money Remark -> Cheque Remark
                    // Assuming Money Remark is ~4s long
                    timeout2 = setTimeout(() => {
                        audioManager.playSfx('VO_CHEQUE_REMARK');
                    }, 4000);
                } else if (phase === 'LOSE') {
                    audioManager.playSfx('VO_QUIT_REMARK');
                }
            }, 500);
        }

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            audioManager.stopSfx('VO_MONEY_REMARK');
            audioManager.stopSfx('VO_QUIT_REMARK');
            audioManager.stopSfx('VO_CHEQUE_REMARK');
            audioManager.stopSfx('SFX_WIN');
        };
    }, [phase]);



    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden relative bg-black">
            {/* Background Particles/Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-kbc-blue/20 to-black z-0 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 text-center p-[3px] bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] rounded-2xl shadow-[0_0_50px_rgba(30,58,138,0.5)] max-w-xl w-full"
            >
                <div className="bg-gradient-to-b from-[#2e1065] to-black backdrop-blur-md p-4 rounded-[13px] w-full h-full">
                    {phase === 'WIN' || phase === 'QUIT' ? (
                        <div className="mb-4">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                            <h2 className="text-2xl md:text-3xl text-kbc-gold font-bold uppercase tracking-widest mb-1">
                                {phase === 'QUIT' ? 'You Quit With' : 'Congratulations!'}
                            </h2>
                            <p className="text-white/80 text-lg font-light">Well Played, {player?.name}</p>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <XCircle className="w-16 h-16 text-red-600 mx-auto mb-2 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
                            <h2 className="text-2xl md:text-3xl text-red-600 font-bold uppercase tracking-widest mb-1">Game Over</h2>
                            <p className="text-white/80 text-lg font-light">Better luck next time, {player?.name}</p>
                        </div>
                    )}

                    {(phase === 'QUIT' || phase === 'LOSE' || phase === 'WIN') && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-4 relative w-fit h-fit mx-auto rounded-xl overflow-hidden p-[3px] bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                        >
                            <div className="relative h-32 md:h-48 w-auto flex items-center justify-center p-1">
                                <img
                                    src={
                                        phase === 'QUIT' || phase === 'LOSE' ? "/kbc-amitabh-quit.gif" :
                                            "/kbc-amitabh-right-answer.gif"
                                    }
                                    alt="Amitabh Response"
                                    className="h-full w-auto object-contain rounded-lg"
                                />
                            </div>
                        </motion.div>
                    )}

                    <div className="my-8 flex justify-center w-full px-2">
                        <Cheque playerName={player ? player.name : "The Hot Seat Player"} amount={moneyWon} compact />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetGame}
                        className="px-8 py-3 bg-gradient-to-r from-kbc-blue to-kbc-purple rounded-full text-white font-bold flex items-center gap-2 mx-auto hover:shadow-[0_0_20px_rgba(30,58,138,0.6)] transition-all"
                    >
                        <RefreshCcw className="w-5 h-5" /> Play Again
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
