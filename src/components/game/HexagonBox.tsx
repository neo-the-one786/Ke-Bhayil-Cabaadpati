"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface HexagonBoxProps {
    variant?: 'question' | 'option';
    state?: 'idle' | 'selected' | 'correct' | 'wrong' | 'locked' | 'waiting';
    text: string;
    label?: string; // e.g., "A", "B"
    onClick?: () => void;
    disabled?: boolean;
    className?: string; // For positioning or additional styles
    visible?: boolean;
    isContentVisible?: boolean; // New prop for sequential reveal
}

export default function HexagonBox({
    variant = 'option',
    state = 'idle',
    text,
    label,
    onClick,
    disabled = false,
    className,
    visible = true,
    isContentVisible = true
}: HexagonBoxProps) {
    if (!visible) return <div className={cn("h-[70px] md:h-[90px] w-full opacity-0 pointer-events-none", className)} />;

    // State Styles - FIXED MAPPING TO DEFS
    const getFillColor = () => {
        switch (state) {
            case 'selected':
            case 'locked':
            case 'waiting': return "url(#grad-selected-v2)";
            case 'correct': return "url(#grad-correct-v2)";
            case 'wrong': return "url(#grad-wrong-v2)";
            default: return "url(#grad-idle-refined)";
        }
    };

    const getTextColor = () => {
        switch (state) {
            case 'selected':
            case 'locked':
            case 'waiting': return "text-black";
            default: return "text-white";
        }
    };

    const isQuestion = variant === 'question';

    // Smooth Rounded Lozenge Path
    const smoothPath = "M 35,5 L 365,5 Q 375,5 385,25 L 398,45 Q 402,50 398,55 L 385,75 Q 375,95 365,95 L 35,95 Q 25,95 15,75 L 2,55 Q -2,50 2,45 L 15,25 Q 25,5 35,5 Z";

    return (
        <motion.div
            className={cn("relative w-full flex items-center justify-center group select-none", className)}
            onClick={!disabled ? onClick : undefined}
            whileHover={!disabled && state === 'idle' ? { scale: 1.01 } : {}}
            whileTap={!disabled && state === 'idle' ? { scale: 0.99 } : {}}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="absolute inset-0 w-full h-full">
                <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none" className="overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    <defs>
                        {/* Premium Gradients - Ensure IDs match getFillColor */}
                        <linearGradient id="grad-idle-refined" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#150a33" />
                            <stop offset="50%" stopColor="#2a1b5d" />
                            <stop offset="100%" stopColor="#150a33" />
                        </linearGradient>
                        <linearGradient id="grad-selected-v2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                        <linearGradient id="grad-correct-v2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#047857" />
                        </linearGradient>
                        <linearGradient id="grad-wrong-v2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#b91c1c" />
                        </linearGradient>

                        <linearGradient id="gold-border-v3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8a6e2f" />
                            <stop offset="25%" stopColor="#f7ef8a" />
                            <stop offset="50%" stopColor="#d2ac47" />
                            <stop offset="75%" stopColor="#fff5cc" />
                            <stop offset="100%" stopColor="#8a6e2f" />
                        </linearGradient>
                    </defs>

                    {/* Rounded Lozenge Shape */}
                    <path
                        d={smoothPath}
                        fill={getFillColor()}
                        stroke="url(#gold-border-v3)"
                        strokeWidth="2.5"
                        vectorEffect="non-scaling-stroke"
                        className="transition-all duration-400"
                    />

                    {/* Inner Bevel Highlight */}
                    <path
                        d="M 40,12 L 360,12"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </div>

            {/* Content Container - Controllable via isContentVisible */}
            <AnimatePresence>
                {isContentVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn("relative z-10 flex items-center justify-start w-full px-8 md:px-12 h-full", getTextColor())}
                    >
                        {!isQuestion && (
                            <div className="flex items-center gap-2 mr-4 shrink-0">
                                <span className={cn(
                                    "text-base md:text-lg drop-shadow-sm",
                                    (state === 'selected' || state === 'locked' || state === 'waiting') ? "text-black" : "text-kbc-gold"
                                )}>
                                    ◆
                                </span>
                                {label && (
                                    <span className={cn(
                                        "font-black text-xl md:text-2xl tracking-tighter",
                                        (state === 'selected' || state === 'locked' || state === 'waiting') ? "text-black" : "text-kbc-gold"
                                    )}>
                                        {label}:
                                    </span>
                                )}
                            </div>
                        )}
                        <span className={cn(
                            "font-bold leading-tight drop-shadow-sm transition-colors duration-300",
                            isQuestion ? "text-xl md:text-2xl text-center w-full px-4" : "text-lg md:text-xl text-left"
                        )}>
                            {text}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
