"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChequeProps {
    playerName: string;
    amount: number;
    amountText?: string;
    compact?: boolean;
}

export default function Cheque({ playerName, amount, amountText, compact = false }: ChequeProps) {
    const displayAmount = amount.toLocaleString('en-IN');

    const getAmountInWords = (amt: number) => {
        if (amt === 100000000) return "TEN CRORES ONLY";
        if (amt === 70000000) return "SEVEN CRORES ONLY";
        if (amt === 50000000) return "FIVE CRORES ONLY";
        if (amt === 10000000) return "ONE CRORE ONLY";
        if (amt === 5000000) return "FIFTY LAKHS ONLY";
        if (amt === 2500000) return "TWENTY FIVE LAKHS ONLY";
        if (amt === 1250000) return "TWELVE LAKHS FIFTY THOUSAND ONLY";
        if (amt === 640000) return "SIX LAKHS FORTY THOUSAND ONLY";
        if (amt === 320000) return "THREE LAKHS TWENTY THOUSAND ONLY";
        if (amt === 160000) return "ONE LAKH SIXTY THOUSAND ONLY";
        if (amt === 80000) return "EIGHTY THOUSAND ONLY";
        if (amt === 40000) return "FORTY THOUSAND ONLY";
        if (amt === 20000) return "TWENTY THOUSAND ONLY";
        if (amt === 10000) return "TEN THOUSAND ONLY";
        if (amt === 5000) return "FIVE THOUSAND ONLY";
        if (amt === 3000) return "THREE THOUSAND ONLY";
        if (amt === 2000) return "TWO THOUSAND ONLY";
        if (amt === 1000) return "ONE THOUSAND ONLY";
        return amountText || "SUM MENTIONED BELOW";
    };

    const today = new Date();
    const d1 = today.getDate().toString().padStart(2, '0')[0];
    const d2 = today.getDate().toString().padStart(2, '0')[1];
    const m1 = (today.getMonth() + 1).toString().padStart(2, '0')[0];
    const m2 = (today.getMonth() + 1).toString().padStart(2, '0')[1];
    const y1 = today.getFullYear().toString()[0];
    const y2 = today.getFullYear().toString()[1];
    const y3 = today.getFullYear().toString()[2];
    const y4 = today.getFullYear().toString()[3];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={cn(
                "relative mx-auto rounded-sm overflow-hidden text-[#2d3748] font-serif flex flex-col bg-[#e6f3f8] border border-gray-400 shadow-[20px_20px_60px_rgba(0,0,0,0.5)] transition-all",
                compact
                    ? 'w-full max-w-[500px] aspect-[2.4/1] p-2 md:p-3'
                    : 'w-full max-w-[950px] aspect-[2.4/1] p-5 md:p-8'
            )}
        >
            {/* Horizontal Line Pattern Background */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[linear-gradient(transparent_39px,#064e8e_40px)] bg-[size:100%_40px]" />

            {/* Header: Logo and Branch Details */}
            <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-1 md:gap-3">
                    <div className={cn(
                        "bg-[#064e8e] rounded-full flex items-center justify-center p-1 md:p-2",
                        compact ? "w-6 h-6" : "w-10 h-10 md:w-14 md:h-14"
                    )}>
                        <div className="w-full h-full border border-white rounded-full flex items-center justify-center">
                            <div className="w-1 h-1 bg-white rounded-full" />
                        </div>
                    </div>
                    <div>
                        <h2 className={cn(
                            "text-[#064e8e] font-bold leading-none flex flex-col",
                            compact ? "text-[8px]" : "text-lg md:text-2xl"
                        )}>
                            <span className="font-sans tracking-tight">भारतीय स्टेट बैंक</span>
                            <span className="font-sans font-black tracking-tighter uppercase italic -mt-0.5">State Bank of India</span>
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-0.5 md:gap-1">
                    <div className="flex items-center gap-1">
                        <span className={cn(
                            "text-[#064e8e] font-bold uppercase mr-1 md:mr-2",
                            compact ? "text-[4px]" : "text-[8px] md:text-[10px]"
                        )}>केवल 3 महीने के लिए वैध / VALID FOR 3 MONTHS ONLY</span>
                        <div className="flex gap-0.5">
                            {[d1, d2, m1, m2, y1, y2, y3, y4].map((char, i) => (
                                <div key={i} className={cn(
                                    "border border-[#064e8e] bg-white flex items-center justify-center font-sans font-bold text-[#064e8e]",
                                    compact ? "w-2.5 h-3 text-[6px]" : "w-4 h-5 md:w-6 md:h-8 text-xs md:text-lg"
                                )}>
                                    {char}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cn(
                        "flex items-center gap-0.5",
                        compact ? "mr-6" : "mr-18"
                    )}>
                        <span className={cn(
                            "font-sans font-bold text-[#064e8e]",
                            compact ? "text-[4px]" : "text-[6px] md:text-[8px]"
                        )}>D D M M Y Y Y Y</span>
                    </div>
                </div>
            </div>

            {/* Payee Line */}
            <div className={cn(
                "relative z-10",
                compact ? "mt-2" : "mt-4 md:mt-8"
            )}>
                <div className="flex items-end gap-1 md:gap-2 border-b border-[#064e8e]">
                    <span className={cn(
                        "text-[#064e8e] font-bold shrink-0 mb-0.5 font-sans",
                        compact ? "text-[8px]" : "text-xs md:text-lg"
                    )}>PAY</span>
                    <span className={cn(
                        "text-[#064e8e] shrink-0 font-sans mb-0.5 ml-1 md:ml-2",
                        compact ? "text-[4px]" : "text-[8px] md:text-[10px]"
                    )}>को या उनके आदेश पर</span>
                    <div className={cn(
                        "flex-1 px-2 font-bold uppercase font-sans text-stone-800 tracking-tight pb-0.5 overflow-hidden whitespace-nowrap",
                        compact ? "text-xs" : "text-xl md:text-4xl"
                    )}>
                        {playerName || "THE HOT SEAT PLAYER"}
                    </div>
                    <span className={cn(
                        "text-[#064e8e] font-bold shrink-0 mb-0.5 font-sans",
                        compact ? "text-[4px]" : "text-xs md:text-lg"
                    )}>OR ORDER</span>
                </div>
            </div>

            {/* Rupees Line */}
            <div className={cn(
                "relative z-10 flex flex-col",
                compact ? "mt-2 gap-1" : "mt-4 md:mt-6 gap-4"
            )}>
                <div className="flex items-end gap-1 md:gap-2 border-b border-[#064e8e]">
                    <span className={cn(
                        "text-[#064e8e] font-bold shrink-0 mb-0.5 font-sans",
                        compact ? "text-[6px]" : "text-[10px] md:text-sm"
                    )}>रुपये RUPEES</span>
                    <div className={cn(
                        "flex-1 px-1 font-bold italic text-stone-700 pb-0.5 overflow-hidden whitespace-nowrap",
                        compact ? "text-[8px]" : "text-sm md:text-2xl"
                    )}>
                        {getAmountInWords(amount)}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Amount Box and Signature */}
            <div className="mt-auto flex justify-between items-end pb-1 md:pb-4 z-10">
                <div className="flex flex-col gap-1">
                    <div className={cn(
                        "flex items-center gap-1 border-l-2 md:border-l-4 border-t border-b border-gray-400 p-1 bg-[#f0f8ff]/50",
                        compact ? "scale-75 origin-left" : ""
                    )}>
                        <span className="text-[6px] md:text-[10px] font-sans font-bold text-[#064e8e] uppercase whitespace-nowrap">खा. सं. A/c No.</span>
                        <div className="text-xs md:text-2xl font-black font-mono tracking-[0.1em] md:tracking-[0.2em] px-2 md:px-4">
                            15159000002
                        </div>
                    </div>
                    <div className={cn(
                        "font-sans font-bold text-[#064e8e] uppercase",
                        compact ? "text-[4px]" : "text-[8px] md:text-[10px]"
                    )}>
                        MULTI-CITY CHEQUE Payable at Par at All Branches of SBI
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 ml-2">
                    <span className={cn(
                        "text-[#064e8e] font-black font-sans shrink-0",
                        compact ? "text-xs mt-2" : "text-lg md:text-2xl mt-4"
                    )}>अदा करें</span>
                    <div className={cn(
                        "relative bg-white border border-[#064e8e] shadow-inner flex items-center px-2 md:px-4",
                        compact ? "w-24 h-8" : "w-40 md:w-64 h-12 md:h-20 border-2"
                    )}>
                        <span className={cn(
                            "text-[#064e8e] font-black mr-1 md:mr-4",
                            compact ? "text-sm" : "text-2xl md:text-4xl"
                        )}>₹</span>
                        <span className={cn(
                            "flex-1 text-right font-black font-sans tracking-tight text-[#064e8e]",
                            compact ? "text-sm" : "text-xl md:text-4xl"
                        )}>
                            {displayAmount}/-
                        </span>
                    </div>
                </div>

                <div className={cn(
                    "flex flex-col items-center relative pr-12 md:pr-16",
                    compact ? "min-w-[120px]" : "min-w-[150px] md:min-w-[250px]"
                )}>
                    {/* The Cursive Signature */}
                    <div
                        className={cn(
                            "text-[#064e8e] whitespace-nowrap absolute left-1/2 -translate-x-1/2",
                            compact ? "text-base -top-10" : "text-3xl md:text-6xl -top-16 md:-top-24"
                        )}
                        style={{ fontFamily: "'Edwardian Script ITC', 'Dancing Script', cursive" }}
                    >
                        Amitabh Bachchan
                    </div>
                    <span className={cn(
                        "text-[#064e8e] font-sans font-bold mb-0.5 md:mb-2 uppercase",
                        compact ? "text-[4px]" : "text-[8px] md:text-[10px]"
                    )}>Please sign above</span>
                    <div className="border-t-[1px] md:border-t-[1.5px] border-[#064e8e] w-full" />
                    <span className={cn(
                        "text-[#064e8e] font-black uppercase tracking-widest mt-0.5",
                        compact ? "text-[4px]" : "text-[8px] md:text-[10px]"
                    )}>Authorized Signatory</span>

                    {/* Official Seal Overlay */}
                    <div className={cn(
                        "absolute rounded-full border border-blue-800/20 bg-blue-100/10 flex items-center justify-center rotate-12 opacity-30 pointer-events-none",
                        compact ? "w-10 h-10 -left-4 -top-4 scale-75" : "w-20 h-20 md:w-28 md:h-28 -left-10 -top-10"
                    )}>
                        <div className={cn(
                            "font-sans font-black text-center leading-tight text-blue-900 uppercase",
                            compact ? "text-[3px]" : "text-[6px] md:text-[8px]"
                        )}>
                            KBC OFFICIAL SEAL
                        </div>
                    </div>
                </div>
            </div>

            {/* MICR Bottom Code */}
            <div className={cn(
                "absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center font-mono text-gray-400 select-none tracking-widest",
                compact ? "gap-2 text-[4px]" : "gap-8 text-[8px] md:text-xs"
            )}>
                <span>"950020"</span>
                <span>695002032 :</span>
                <span>002860"</span>
                <span>31</span>
            </div>
        </motion.div>
    );
}
