"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PRIZE_LADDER, SAFETY_NETS } from "@/lib/constants";
import { useGameStore } from "@/store/gameStore";
import { cn } from "@/lib/utils";

export default function PrizeLadder() {
    const currentQuestionIndex = useGameStore((state) => state.currentQuestionIndex);
    const activeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [currentQuestionIndex]);

    const reversedLadder = [...PRIZE_LADDER].reverse();

    return (
        <div className="flex-1 w-full h-full bg-transparent px-4 pt-4 pb-4 overflow-hidden select-none relative flex flex-col">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.2)_0%,transparent_100%)] pointer-events-none" />

            <div className="flex-1 flex flex-col w-full h-full">
                {reversedLadder.map((level) => {
                    const idx = level.level - 1;
                    const isCurrent = idx === currentQuestionIndex;
                    const isCleared = idx < currentQuestionIndex;
                    const isSafetyNet = SAFETY_NETS.includes(level.amount);

                    return (
                        <div
                            key={level.level}
                            ref={isCurrent ? activeRef : null}
                            className={cn(
                                "relative flex-1 flex items-center px-4 transition-all w-full min-h-0",
                                isCurrent ? "z-10" : "z-0"
                            )}
                        >
                            {/* The Rounded Highlight Lozenge (SVG for precision) */}
                            {isCurrent && (
                                <motion.div
                                    layoutId="prize-highlight"
                                    className="absolute inset-0 my-0.5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <svg width="100%" height="100%" viewBox="0 0 280 28" preserveAspectRatio="none" className="drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">
                                        <defs>
                                            <linearGradient id="lozenge-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#8a6e2f" />
                                                <stop offset="25%" stopColor="#f7ef8a" />
                                                <stop offset="50%" stopColor="#d2ac47" />
                                                <stop offset="75%" stopColor="#fff5cc" />
                                                <stop offset="100%" stopColor="#8a6e2f" />
                                            </linearGradient>
                                        </defs>

                                        {/* HexagonBox-style Lozenge Path */}
                                        <path
                                            d="M 20,0 L 260,0 Q 266,0 272,6 L 278,11 Q 280,14 278,17 L 272,22 Q 266,28 260,28 L 20,28 Q 14,28 8,22 L 2,17 Q 0,14 2,11 L 8,6 Q 14,0 20,0 Z"
                                            fill="url(#lozenge-grad)"
                                        />

                                        {/* Internal Flare Line - Matches flat top width */}
                                        <path d="M 22,2 L 258,2" stroke="white" strokeOpacity="0.4" strokeWidth="0.8" />
                                    </svg>
                                </motion.div>
                            )}

                            <div className={cn(
                                "flex w-full items-center font-bold text-sm md:text-base relative z-10",
                                isCurrent ? "text-[#1e0a3d]" : (isCleared ? "text-[#d97706]/80" : (isSafetyNet ? "text-white" : "text-[#facc15]"))
                            )}>
                                {/* Level Number */}
                                <span className="w-6 shrink-0 text-left text-xs md:text-sm opacity-80">
                                    {level.level}
                                </span>

                                {/* Conditional Marker Logic */}
                                <div className="mx-2 w-3 shrink-0 flex justify-center items-center">
                                    {isCleared ? (
                                        <span className="text-white text-[10px] drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]">◆</span>
                                    ) : isCurrent ? (
                                        <div className="relative">
                                            {/* Intense multi-layered glow */}
                                            <div className="absolute inset-x-[-1.5px] inset-y-[-1.5px] bg-white rounded-full blur-[1px] animate-pulse" />
                                            <div className="absolute inset-x-[-3px] inset-y-[-3px] bg-white rounded-full blur-[3px] opacity-60 animate-pulse" />
                                            <div className="w-1.5 h-1.5 bg-white rounded-full relative z-10 shadow-[0_0_3px_white]" />
                                        </div>
                                    ) : null}
                                </div>

                                {/* Amount */}
                                <span className={cn(
                                    "flex-1 text-right tracking-wider",
                                    isSafetyNet && !isCurrent ? "text-white" : ""
                                )}>
                                    {level.amountText}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
