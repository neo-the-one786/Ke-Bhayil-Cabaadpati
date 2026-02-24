import { cn } from "@/lib/utils";
import NextImage from "next/image";

interface LifelineIconProps {
    type: string;
    className?: string;
}

export default function LifelineIcon({ type, className }: LifelineIconProps) {
    const goldTextClass = "bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] bg-clip-text text-transparent font-black drop-shadow-sm";

    // Gradient definition component to be embedded in every SVG
    // Using userSpaceOnUse to avoid issues with zero-width/height paths (like vertical lines)
    const SvgGradient = ({ id }: { id: string }) => (
        <defs>
            <linearGradient id={id} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8a6e2f" />
                <stop offset="25%" stopColor="#f7ef8a" />
                <stop offset="50%" stopColor="#d2ac47" />
                <stop offset="75%" stopColor="#fff5cc" />
                <stop offset="100%" stopColor="#8a6e2f" />
            </linearGradient>
        </defs>
    );

    const gradId = `grad-${type}`;
    const svgProps = {
        fill: "none",
        stroke: `url(#${gradId})`,
        strokeWidth: "2.5",
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    };

    switch (type) {
        case 'audiencePoll':
            return (
                <svg viewBox="0 0 24 24" className={cn("w-6 h-6", className)} {...svgProps} strokeWidth="2">
                    <SvgGradient id={gradId} />
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M7 18c0-3 2-4.5 5-4.5s5 1.5 5 4.5" />
                    <circle cx="7" cy="11" r="2.5" />
                    <path d="M2.5 19c0-2 1.5-3 3-3" />
                    <circle cx="17" cy="11" r="2.5" />
                    <path d="M18.5 16c1.5 0 3 1 3 3" />
                </svg>
            );
        case 'fiftyFifty':
            return <span className={cn("text-xs tracking-tight leading-none uppercase", goldTextClass, className)}>50:50</span>;
        case 'plusOne':
            return (
                <div className={cn("flex items-center", className)}>
                    <span className={cn("text-xl mr-0.5", goldTextClass)} >+</span>
                    <svg viewBox="0 0 24 24" className="w-5 h-5" {...svgProps}>
                        <SvgGradient id={gradId} />
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
            );
        case 'expertAdvice':
            return (
                <svg viewBox="0 0 24 24" className={cn("w-6 h-6", className)} {...svgProps}>
                    <SvgGradient id={gradId} />
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
            );
        case 'doubleDip':
            return <span className={cn("text-lg italic", goldTextClass, className)}>x2</span>;
        case 'phoneAFriend':
            return (
                <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} {...svgProps}>
                    <SvgGradient id={gradId} />
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
            );
        case 'flipQuestion':
            return (
                <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} {...svgProps}>
                    <SvgGradient id={gradId} />
                    <path d="M17 2l4 4-4 4" />
                    <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                    <path d="M7 22l-4-4 4-4" />
                    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                </svg>
            );
        case 'hint':
            return (
                <svg viewBox="0 0 24 24" className={cn("w-6 h-6", className)} {...svgProps}>
                    <SvgGradient id={gradId} />
                    {/* Lucide Lightbulb Path */}
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                </svg>
            );
        case 'jump':
            return (
                <svg viewBox="0 0 24 24" className={cn("w-6 h-6", className)} {...svgProps} strokeWidth={3}>
                    <SvgGradient id={gradId} />
                    {/* Lucide ArrowUp Path */}
                    <path d="M5 12l7-7 7 7" />
                    <path d="M12 19V5" />
                </svg>
            );
        case 'wildCard':
            return (
                <div className={cn("relative w-7 h-7 md:w-9 md:h-9", className)}>
                    <NextImage
                        src="/kbc-wild-card.png"
                        alt="Wild Card"
                        fill
                        className="object-contain"
                        style={{ filter: 'invert(84%) sepia(35%) saturate(718%) hue-rotate(352deg) brightness(101%) contrast(104%) drop-shadow(0 0 4px rgba(251, 191, 36, 0.6))' }}
                    />
                </div>
            );
        default:
            return null;
    }
}
