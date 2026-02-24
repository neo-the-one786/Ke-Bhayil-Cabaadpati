"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

interface ScaledContainerProps {
    children: ReactNode;
    baseWidth?: number;
    baseHeight?: number;
    className?: string;
}

/**
 * A container that automatically scales its content to fill the viewport.
 * Fills width completely and scales height proportionally.
 */
export default function ScaledContainer({
    children,
    baseWidth = 1920,
    baseHeight = 1080,
    className = "",
}: ScaledContainerProps) {
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculateScale = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Scale to fill the width completely
            const scaleX = viewportWidth / baseWidth;
            // Also check if height fits, use whichever is smaller to ensure fit
            const scaleY = viewportHeight / baseHeight;

            // Use the smaller scale to ensure everything fits on screen
            const newScale = Math.min(scaleX, scaleY);
            setScale(newScale);
        };

        calculateScale();
        window.addEventListener("resize", calculateScale);
        return () => window.removeEventListener("resize", calculateScale);
    }, [baseWidth, baseHeight]);

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 overflow-hidden ${className}`}
            style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                backgroundColor: "#0a0414",
            }}
        >
            <div
                style={{
                    width: `${baseWidth}px`,
                    height: `${baseHeight}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "top center",
                }}
            >
                {children}
            </div>
        </div>
    );
}
