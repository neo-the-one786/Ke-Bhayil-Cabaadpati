"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClockProps {
    timer: number;
    maxTimer: number;
    size?: "sm" | "md" | "lg";
    showText?: boolean;
    className?: string;
}

export default function Clock({
    timer,
    maxTimer,
    size = "md",
    showText = true,
    className
}: ClockProps) {
    const dimensions = {
        sm: "w-12 h-12",
        md: "w-20 h-20",
        lg: "w-32 h-32"
    };

    const textSizes = {
        sm: "text-base",
        md: "text-2xl md:text-3xl",
        lg: "text-4xl md:text-5xl"
    };

    const currentHue = (timer / maxTimer) * 120;
    const currentColor = `hsl(${currentHue}, 100%, 50%)`;

    return (
        <div className={cn(
            "relative flex items-center justify-center rounded-full bg-black border border-white/5 overflow-visible shadow-[0_0_20px_rgba(0,0,0,0.8)]",
            dimensions[size],
            className
        )}>
            {/* SVG Circular Progress */}
            <svg
                viewBox="0 0 80 80"
                className="absolute inset-0 w-full h-full -rotate-90 overflow-visible"
            >
                {/* Background Track */}
                <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="4"
                    fill="transparent"
                />

                {/* Decreasing Progress Ring */}
                <motion.circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke={currentColor}
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray="226.2" // 2 * PI * R (36)
                    initial={{ strokeDashoffset: 0 }}
                    animate={{
                        strokeDashoffset: 226.2 * (1 - (timer / maxTimer))
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "linear"
                    }}
                    strokeLinecap="round"
                    style={{
                        filter: `drop-shadow(0 0 6px ${currentColor})`
                    }}
                />
            </svg>

            {showText && (
                <div className="relative z-10 flex flex-col items-center justify-center">
                    <span className={cn(
                        "font-black font-serif transition-colors duration-300",
                        timer <= 10 ? "text-red-500 animate-pulse" : "text-white",
                        textSizes[size]
                    )}>
                        {timer}
                    </span>
                </div>
            )}
        </div>
    );
}
