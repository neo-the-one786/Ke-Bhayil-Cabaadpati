"use client";

import { useGameStore } from "@/store/gameStore";
import { audioManager } from "@/lib/audio";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import LifelineIcon from "./LifelineIcon";

interface LifelinesProps {
    onUse?: (key: string) => void;
    disabled?: boolean;
}

export default function Lifelines({ onUse, disabled = false }: LifelinesProps) {
    const lifelines = useGameStore((state) => state.lifelines);
    const lifelinesUsedInCurrentQuestion = useGameStore((state) => state.lifelinesUsedInCurrentQuestion);
    const lifelinesUsedBetweenMilestones = useGameStore((state) => state.lifelinesUsedBetweenMilestones);
    const isDoubleDipActive = useGameStore((state) => state.isDoubleDipActive);
    const currentQuestionIndex = useGameStore((state) => state.currentQuestionIndex);

    const allItems = [
        { key: 'audiencePoll', label: 'Audience' },
        { key: 'fiftyFifty', label: '50:50' },
        { key: 'phoneAFriend', label: 'Phone' },
        { key: 'flipQuestion', label: 'Flip' },
        { key: 'doubleDip', label: 'Double Dip' },
        { key: 'expertAdvice', label: 'Expert' },
        { key: 'plusOne', label: '+1' },
        { key: 'hint', label: 'Hint' },
        { key: 'jump', label: 'Jump' },
        { key: 'wildCard', label: 'Wild Card' },
    ];

    const handleUse = (key: string) => {
        audioManager.playSfx('SFX_LIFELINE_PING');
        if (onUse) {
            onUse(key);
        }
    };

    return (
        <div className="grid grid-cols-5 grid-rows-2 gap-2 justify-items-center w-full pointer-events-auto">
            {allItems.map((item) => {
                const isAvailable = lifelines[item.key as keyof typeof lifelines];
                const isWildCard = item.key === 'wildCard';

                // Logic to disable remaining unused lifelines
                let isDisabled = false;

                // 0. Prop disabled (Premature access block)
                if (disabled) isDisabled = true;

                // 1. Double Dip constraints (everything disabled except maybe Wild Card if we allow it, but usually everything)
                if (isDoubleDipActive) isDisabled = true;

                // 2. Max 2 per question (if current is NOT one of the used ones, disable it)
                if (!lifelinesUsedInCurrentQuestion.includes(item.key as any) && lifelinesUsedInCurrentQuestion.length >= 2) {
                    isDisabled = true;
                }

                // 3. Progressive Milestone Limits
                const level = currentQuestionIndex + 1;
                let milestoneLimit = 3; // Q1-Q5
                if (level >= 16) milestoneLimit = 99; // Unlimited after Level 15 (3rd M)
                else if (level >= 11) milestoneLimit = 5; // Q11-Q15
                else if (level >= 6) milestoneLimit = 4; // Q6-Q10

                if (!lifelinesUsedBetweenMilestones.includes(item.key as any) && lifelinesUsedBetweenMilestones.length >= milestoneLimit) {
                    isDisabled = true;
                }

                // 4. Jump cannot be used on the last question
                if (item.key === 'jump' && currentQuestionIndex >= 19) {
                    isDisabled = true;
                }

                // 5. Wild Card disabled if no revivable lifelines exist
                // (all used lifelines were used on the current question, so nothing to revive)
                if (isWildCard) {
                    const revivable = Object.entries(lifelines)
                        .filter(([k, available]) => !available && k !== 'wildCard' && !lifelinesUsedInCurrentQuestion.includes(k as any));
                    if (revivable.length === 0) {
                        isDisabled = true;
                    }
                }

                const isClickable = isAvailable && !isDisabled;

                return (
                    <motion.button
                        key={item.key}
                        whileHover={isClickable ? { scale: 1.1, y: -2 } : {}}
                        whileTap={isClickable ? { scale: 0.95 } : {}}
                        onClick={() => isClickable && handleUse(item.key)}
                        className={cn(
                            "relative flex items-center justify-center transition-all duration-300 group overflow-visible",
                            "w-12 h-8 md:w-16 md:h-10 rounded-[50%]",
                            // Outer Border
                            isClickable
                                ? "p-[2.5px] bg-gradient-to-br from-[#8a6e2f] via-[#fff5cc] to-[#8a6e2f] shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                                : "p-[2px] bg-gray-800 opacity-60"
                        )}
                        disabled={!isClickable}
                        title={item.label}
                    >
                        {/* Inner Content */}
                        <div className={cn(
                            "w-full h-full rounded-[50%] flex items-center justify-center relative",
                            isClickable
                                ? "bg-gradient-to-br from-[#1e1e2e] via-[#4a148c] to-[#000033] shadow-[inset_0_1px_5px_rgba(255,255,255,0.3)] text-[#ffd700] drop-shadow-[0_0_2px_rgba(255,215,0,0.5)]"
                                : "bg-gray-950 grayscale text-gray-600"
                        )}>
                            <div className="relative z-10 flex items-center justify-center scale-90 md:scale-100">
                                <LifelineIcon type={item.key} />
                            </div>

                            {!isAvailable && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-full h-[3px] bg-red-600 rotate-45 absolute rounded-full shadow-[0_0_2px_black]" />
                                    <div className="w-full h-[3px] bg-red-600 -rotate-45 absolute rounded-full shadow-[0_0_2px_black]" />
                                </div>
                            )}
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
}
