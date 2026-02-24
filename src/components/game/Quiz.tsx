"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { audioManager } from "@/lib/audio";
import { SAFETY_NETS, PRIZE_LADDER } from "@/lib/constants";
import PrizeLadder from "./PrizeLadder";
import Lifelines from "./Lifelines";
import HexagonBox from "./HexagonBox";
import Clock from "./Clock";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Cheque from "./Cheque";
import NextImage from "next/image";
import LifelineIcon from "./LifelineIcon";

export default function Quiz() {
    const currentQuestionIndex = useGameStore((state) => state.currentQuestionIndex);
    const moneyWon = useGameStore((state) => state.moneyWon);
    const advanceQuestion = useGameStore((state) => state.advanceQuestion);
    const setPhase = useGameStore((state) => state.setPhase);
    const setMoneyWon = useGameStore((state) => state.setMoneyWon);
    const markLifelineUsed = useGameStore((state) => state.useLifeline);
    const flipCurrentQuestion = useGameStore((state) => state.flipCurrentQuestion);

    const player = useGameStore((state) => state.player);
    const questions = useGameStore((state) => state.questions);
    const lifelines = useGameStore((state) => state.lifelines);
    const lifelinesUsedInCurrentQuestion = useGameStore((state) => state.lifelinesUsedInCurrentQuestion);
    const lifelinesUsedBetweenMilestones = useGameStore((state) => state.lifelinesUsedBetweenMilestones);
    const isDoubleDipActive = useGameStore((state) => state.isDoubleDipActive);
    const setIsDoubleDipActive = useGameStore((state) => state.setIsDoubleDipActive);
    const codeRedUsed = useGameStore((state) => state.codeRedUsed);
    const isCodeRedActive = useGameStore((state) => state.isCodeRedActive);
    const setCodeRedActive = useGameStore((state) => state.setCodeRedActive);
    const markCodeRedUsed = useGameStore((state) => state.markCodeRedUsed);

    // Fallback if empty (shouldn't happen if initialized correctly)
    const question = questions[currentQuestionIndex] || {
        id: 'err', text: "Loading...", options: ["", "", "", ""], correctAnswer: 0, price: 0
    };

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isLocked, setIsLocked] = useState(false);
    const [status, setStatus] = useState<'IDLE' | 'LOCKED' | 'CORRECT' | 'WRONG'>('IDLE');
    const [showCorrect, setShowCorrect] = useState(false);

    // Lifeline States
    const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
    const [showPoll, setShowPoll] = useState(false);
    const [pollData, setPollData] = useState<{ name: string, value: number }[]>([]);

    const [showPhone, setShowPhone] = useState(false);
    const [phoneTimer, setPhoneTimer] = useState(30);
    const [phoneMessage, setPhoneMessage] = useState("");
    const [phoneStage, setPhoneStage] = useState<'DIALING' | 'CONNECTED' | 'CONVERSATION' | 'THINKING' | 'ANSWER'>('DIALING');
    const [phoneConversation, setPhoneConversation] = useState<string[]>([]);


    const [showQuitConfirm, setShowQuitConfirm] = useState(false);
    const [showCodeRedPopup, setShowCodeRedPopup] = useState(false);

    // Expert / Plus One States
    const [showExpert, setShowExpert] = useState(false);
    const [expertState, setExpertState] = useState<'INTRO' | 'THINKING' | 'ANSWER'>('INTRO');
    const [expertMessage, setExpertMessage] = useState("");
    const [expertTimer, setExpertTimer] = useState(30);

    const [showPlusOne, setShowPlusOne] = useState(false);
    const [plusOneState, setPlusOneState] = useState<'INTRO' | 'THINKING' | 'ANSWER'>('INTRO');
    const [plusOneMessage, setPlusOneMessage] = useState("");
    const [plusOneTimer, setPlusOneTimer] = useState(30);

    const [showHint, setShowHint] = useState(false);
    const [hintText, setHintText] = useState("");

    const [showWildCard, setShowWildCard] = useState(false);

    // Question Timer
    const [timer, setTimer] = useState<number | null>(null);
    const [maxTimer, setMaxTimer] = useState<number>(60);

    // Cheque Milestone States
    const [showCheque, setShowCheque] = useState(false);
    const [chequeValue, setChequeValue] = useState(0);

    // Option Reveal States
    const [optionsVisibleCount, setOptionsVisibleCount] = useState(0);
    const [reaction, setReaction] = useState<'right' | 'wrong' | null>(null);
    const [videoRemark, setVideoRemark] = useState<string | null>(null);
    const [showLockConfirm, setShowLockConfirm] = useState<number | null>(null);

    // Determine Timer Duration based on Level
    const getTimerDuration = (level: number) => {
        if (level <= 5) return 45;
        if (level <= 10) return 60;
        return null; // Unlimited for higher levels
    };

    useEffect(() => {
        setStatus('IDLE');
        setIsLocked(false);
        setSelectedOption(null);
        setShowCorrect(false);
        setReaction(null);
        setHiddenOptions([]);
        setShowPoll(false);
        setShowPhone(false);
        setPhoneMessage("");
        setPhoneStage('DIALING');
        setPhoneConversation([]);
        setIsDoubleDipActive(false);
        setShowQuitConfirm(false);
        setShowExpert(false);
        setExpertMessage("");
        setExpertState('INTRO');
        setExpertTimer(30);
        setShowPlusOne(false);
        setPlusOneMessage("");
        setPlusOneState('INTRO');
        setPlusOneTimer(30);
        setShowCheque(false);
        setChequeValue(0);
        setOptionsVisibleCount(0);

        if (question.text !== "Loading...") {
            const lvl = currentQuestionIndex + 1;
            let theme: any = 'THEME_TENSION_LOW';
            if (lvl > 5) theme = 'THEME_TENSION_MED';
            if (lvl > 10) theme = 'THEME_TENSION_HIGH';
            if (lvl > 15) theme = 'THEME_TENSION_ELITE';

            audioManager.playSfx('SFX_QUESTION_OPENING');
            const bgmTimeout = setTimeout(() => {
                audioManager.playBgm(theme);
            }, 1500);

            const duration = getTimerDuration(currentQuestionIndex + 1);
            setTimer(duration);
            if (duration) setMaxTimer(duration);

            return () => {
                clearTimeout(bgmTimeout);
                audioManager.stopBgm();
            };
        }
        return () => audioManager.stopBgm();
    }, [currentQuestionIndex, question]);

    // Delayed Sequential Option Reveal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.key === 'q' || e.key === 'Q') && !isLocked && !showQuitConfirm) {
                handleQuit();
            }
            if ((e.key === 'q' || e.key === 'Q') && !isLocked && !showQuitConfirm) {
                handleQuit();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLocked, showQuitConfirm, selectedOption, codeRedUsed, isCodeRedActive, status]);

    // Code Red Audio Effect
    useEffect(() => {
        if (isCodeRedActive) {
            audioManager.playSfx('SFX_CODE_RED', true);
        } else {
            audioManager.stopSfx('SFX_CODE_RED');
        }
        return () => audioManager.stopSfx('SFX_CODE_RED');
    }, [isCodeRedActive]);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            let count = 0;
            const revealInterval = setInterval(() => {
                count++;
                setOptionsVisibleCount(count);
                if (count === 1) audioManager.playSfx('SFX_OPTIONS');
                if (count >= 4) clearInterval(revealInterval);
            }, 1666);

            return () => clearInterval(revealInterval);
        }, 5000);

        return () => clearTimeout(startTimeout);
    }, [currentQuestionIndex, question.id]);

    useEffect(() => {
        if (timer === null || isLocked || showQuitConfirm || showPoll || showPhone || showExpert || showPlusOne || status !== 'IDLE' || optionsVisibleCount < 4) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev !== null && prev > 0) return prev - 1;
                if (prev === 0) {
                    clearInterval(interval);
                    setStatus('WRONG');
                    audioManager.playSfx('SFX_WRONG');
                    setTimeout(() => setPhase('LOSE'), 3000);
                    return 0;
                }
                return prev;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [timer, isLocked, showQuitConfirm, showPoll, showPhone, showExpert, showPlusOne, status, optionsVisibleCount]);

    // Audience Poll Logic
    useEffect(() => {
        if (!showPoll) return;
        const correct = question.correctAnswer;
        let finalValues = [0, 0, 0, 0];
        let remaining = 100;
        finalValues[correct] = Math.floor(Math.random() * 30) + 40;
        remaining -= finalValues[correct];
        let pool = [0, 1, 2, 3].filter(i => i !== correct && !hiddenOptions.includes(i));
        pool.forEach((idx, i) => {
            if (i === pool.length - 1) finalValues[idx] = remaining;
            else {
                let share = Math.floor(Math.random() * (remaining / 2));
                finalValues[idx] = share;
                remaining -= share;
            }
        });

        const startTime = Date.now();
        const animationDuration = 9000; // 9 seconds voting
        const totalDuration = 13000;   // 13 seconds total
        let resultsShown = false;

        audioManager.playSfx('SFX_LIFELINE_POLL', false); // No loop

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;

            if (elapsed < animationDuration) {
                // Voting phase
                setPollData([
                    { name: 'A', value: Math.floor(Math.random() * 100) },
                    { name: 'B', value: Math.floor(Math.random() * 100) },
                    { name: 'C', value: Math.floor(Math.random() * 100) },
                    { name: 'D', value: Math.floor(Math.random() * 100) },
                ]);
            } else if (elapsed >= animationDuration && !resultsShown) {
                // At 9s: Show results, Play remark
                resultsShown = true;
                audioManager.playSfx('VO_POLL_REMARK');
                setPollData([
                    { name: 'A', value: finalValues[0] },
                    { name: 'B', value: finalValues[1] },
                    { name: 'C', value: finalValues[2] },
                    { name: 'D', value: finalValues[3] },
                ]);
            } else if (elapsed >= totalDuration) {
                // At 13s: Auto-close
                clearInterval(interval);
                setShowPoll(false);
            }
        }, 50);

        return () => {
            clearInterval(interval);
            audioManager.stopSfx('SFX_LIFELINE_POLL');
        };
    }, [showPoll, question.correctAnswer, hiddenOptions]);

    // Phone-a-Friend logic
    useEffect(() => {
        if (!showPhone) return;
        setPhoneTimer(30);
        audioManager.playSfx('VO_PHONE_OPEN');

        const t1 = setTimeout(() => {
            setPhoneStage('CONNECTED');
            audioManager.playSfx('VO_PHONE_MID');
            setPhoneConversation(["Host: Hello? We have a friend in the Hot Seat..."]);
        }, 15000);



        const t2 = setTimeout(() => {
            setPhoneConversation(prev => [...prev, "Friend: Oh hi! I'm ready."]);
        }, 21000);
        const t3 = setTimeout(() => {
            const qText = question.text.length > 50 ? question.text.substring(0, 50) + "..." : question.text;
            setPhoneConversation(prev => [...prev, `Player: Reads: "${qText}"`]);
        }, 20000);
        const t4 = setTimeout(() => setPhoneStage('THINKING'), 25000);
        const t5 = setTimeout(() => {
            const correctChar = ['A', 'B', 'C', 'D'][question.correctAnswer];
            const confidence = Math.random() > 0.3 ? "I'm fairly sure" : "I'm guessing";
            setPhoneMessage(`"Listen, ${confidence} it's option ${correctChar}. Good luck!"`);
            audioManager.playSfx('VO_PHONE_EARLY_MID');
            setPhoneStage('ANSWER');
        }, 35000);



        audioManager.playSfx('SFX_LIFELINE_PHONE', false);

        return () => {
            [t1, t2, t3, t4, t5].forEach(clearTimeout);
            audioManager.stopSfx('SFX_LIFELINE_PHONE');
        };
    }, [showPhone, question.correctAnswer, question.text]);

    // Audio for phone closing
    useEffect(() => {
        if (showPhone && phoneTimer === 2) { // Trigger when 2s left on clock
            audioManager.playSfx('VO_PHONE_CLOSE');
        }
    }, [showPhone, phoneTimer]);

    // Auto-close Phone-a-friend 2s after timer hits 0
    useEffect(() => {
        if (showPhone && phoneTimer === 0) {
            const closeTimeout = setTimeout(() => {
                setShowPhone(false);
                audioManager.stopSfx('SFX_LIFELINE_PHONE');
            }, 2000);
            return () => clearTimeout(closeTimeout);
        }
    }, [showPhone, phoneTimer]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (showPhone && phoneStage !== 'DIALING' && phoneTimer > 0) {
            interval = setInterval(() => setPhoneTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [showPhone, phoneStage, phoneTimer]);

    // Expert Advice Logic
    useEffect(() => {
        if (!showExpert) return;
        audioManager.playSfx('SFX_LIFELINE_EXPERT', false);
        setExpertState('INTRO');
        const t1 = setTimeout(() => setExpertState('THINKING'), 2000);
        const t2 = setTimeout(() => {
            const correctChar = ['A', 'B', 'C', 'D'][question.correctAnswer];
            setExpertMessage(`I'm certain the answer is ${correctChar}.`);
            setExpertState('ANSWER');
        }, 5000);
        const tClose = setTimeout(() => setShowExpert(false), 30000);
        return () => {
            [t1, t2, tClose].forEach(clearTimeout);
            audioManager.stopSfx('SFX_LIFELINE_EXPERT');
        };
    }, [showExpert, question.correctAnswer]);

    // Plus One Logic
    useEffect(() => {
        if (!showPlusOne) return;
        audioManager.playSfx('SFX_LIFELINE_PLUSONE', false);
        setPlusOneState('INTRO');
        const t1 = setTimeout(() => setPlusOneState('THINKING'), 2000);
        const t2 = setTimeout(() => {
            const correctChar = ['A', 'B', 'C', 'D'][question.correctAnswer];
            setPlusOneMessage(`My gut says it's ${correctChar}.`);
            audioManager.playSfx('VO_PLUS_ONE');
            setPlusOneState('ANSWER');
        }, 5000);
        const tClose = setTimeout(() => setShowPlusOne(false), 30000);
        return () => {
            [t1, t2, tClose].forEach(clearTimeout);
            audioManager.stopSfx('SFX_LIFELINE_PLUSONE');
        };
    }, [showPlusOne, question.correctAnswer]);

    // Double Dip Logic
    useEffect(() => {
        if (!isDoubleDipActive) return;
        return () => {
            audioManager.stopSfx('SFX_LIFELINE_DIP');
        };
    }, [isDoubleDipActive]);

    // Cheque Logic
    useEffect(() => {
        if (!showCheque) return;
        // removed VO_CHEQUE_REMARK per request
        const t = setTimeout(() => setShowCheque(false), 6000);
        return () => {
            clearTimeout(t);
            audioManager.stopSfx('SFX_APPLAUSE');
        };
    }, [showCheque]);

    const handleOptionClick = (index: number) => {
        if (isLocked || hiddenOptions.includes(index) || showQuitConfirm || showLockConfirm !== null || optionsVisibleCount < 4) return;
        if (status === 'CORRECT' || status === 'WRONG') return;

        // Code Red Logic: If active, deselecting/changing option clears it
        if (isCodeRedActive) {
            setCodeRedActive(false);
            // If they click the SAME option, deselect it (toggle behavior)
            if (selectedOption === index) {
                setSelectedOption(null);
                return;
            }
            // If they click DIFFERENT option, reset state and treat as new attempt
            setSelectedOption(null); // Clear the wrong one
            audioManager.playSfx('VO_LOCK_ASK');
            setShowLockConfirm(index);
            return;
        }

        if (selectedOption === index) {
            // Deselect
            setSelectedOption(null);
            return;
        }

        // New Logic: Check for WRONG answer + Code Red available
        const isWrong = index !== question.correctAnswer;
        if (isWrong && !codeRedUsed && !isCodeRedActive) {
            // Activate Code Red
            setCodeRedActive(true);
            markCodeRedUsed();
            setSelectedOption(index); // Select it visually so they see what they picked
            setShowCodeRedPopup(true); // Show warning popup
            // Do NOT show lock confirm
            return;
        }

        audioManager.playSfx('VO_LOCK_ASK');
        setShowLockConfirm(index);
    };

    const confirmLock = () => {
        if (showLockConfirm === null) return;
        const index = showLockConfirm;
        setShowLockConfirm(null);

        audioManager.playSfx('SFX_LOCK');
        setSelectedOption(index);
        setIsLocked(true);
        setStatus('LOCKED');
        audioManager.stopBgm();
        setTimeout(() => verifyAnswer(index), 3000);
    };

    const verifyAnswer = (index: number) => {
        const isCorrect = index === question.correctAnswer;
        if (isCorrect) {
            setStatus('CORRECT');
            setReaction('right');
            audioManager.playSfx('SFX_CORRECT');

            // Handle specific Congrats Videos
            let hasSpecificCongrats = false;
            if (question.price === 70000000) {
                setVideoRemark('congrats-7cr');
                hasSpecificCongrats = true;
            } else if (question.price === 100000000) {
                setVideoRemark('congrats-10cr');
                hasSpecificCongrats = true;
            }

            audioManager.stopSfx('SFX_LIFELINE_DIP');
            setMoneyWon(question.price);

            const isMilestone = SAFETY_NETS.includes(question.price) || (currentQuestionIndex === questions.length - 1);
            if (isMilestone) {
                audioManager.playSfx('SFX_APPLAUSE', true);
                setChequeValue(question.price);

                // Only show generic milestone video if no specific congrats video is playing
                if (!hasSpecificCongrats) {
                    setVideoRemark('milestone');
                }

                // For 10Cr jackpot, wait longer for the congrats video before showing cheque
                const delay = question.price === 100000000 ? 5000 : 2000;

                setTimeout(() => {
                    setShowCheque(true);
                }, delay);
            }

            setTimeout(() => {
                setVideoRemark(null);
                if (currentQuestionIndex < questions.length - 1) advanceQuestion();
                else setPhase('WIN');
            }, isMilestone ? 14000 : 12000);
        } else {
            if (isDoubleDipActive) {
                audioManager.playSfx('SFX_WRONG');
                setHiddenOptions(prev => [...prev, index]);
                setIsDoubleDipActive(false);
                setStatus('IDLE');
                setIsLocked(false);
                setSelectedOption(null);
            } else {
                setStatus('WRONG');
                setReaction('wrong'); // Play Wrong GIF immediately
                setVideoRemark(null);
                setShowCorrect(true);
                audioManager.playSfx('SFX_WRONG');
                audioManager.stopSfx('SFX_LIFELINE_DIP');

                // Delay the video remark video by 3 seconds
                setTimeout(() => {
                    setVideoRemark('wrong-remark');
                }, 3000);

                let safeAmount = 0;
                const sortedNets = [...SAFETY_NETS].sort((a, b) => b - a);
                for (const net of sortedNets) {
                    if (moneyWon >= net) {
                        safeAmount = net;
                        break;
                    }
                }
                setMoneyWon(safeAmount);
                setTimeout(() => setPhase('LOSE'), 11000); // 3s GIF + ~8s video
            }
        }
    };

    const handleUseLifeline = (key: string) => {
        if (isLocked || showQuitConfirm) return;

        // RULE: Max 2 lifelines per question
        if (lifelinesUsedInCurrentQuestion.length >= 2) {
            // Maybe play error sound?
            audioManager.playSfx('SFX_WRONG');
            return;
        }

        // RULE: Double Dip active -> No other lifelines
        if (isDoubleDipActive) {
            audioManager.playSfx('SFX_WRONG');
            return;
        }

        // RULE: 50:50 and Double Dip cannot be used on same question
        if (key === 'fiftyFifty' && lifelinesUsedInCurrentQuestion.includes('doubleDip')) {
            audioManager.playSfx('SFX_WRONG');
            return;
        }
        if (key === 'doubleDip' && lifelinesUsedInCurrentQuestion.includes('fiftyFifty')) {
            audioManager.playSfx('SFX_WRONG');
            return;
        }

        // RULE: Progressive milestone lifeline limits (Excluding Wild Card)
        const level = currentQuestionIndex + 1;
        let milestoneLimit = 3; // Q1-Q5
        if (level >= 16) milestoneLimit = 99; // Unlimited after 3rd milestone
        else if (level >= 11) milestoneLimit = 5; // Q11-Q15
        else if (level >= 6) milestoneLimit = 4; // Q6-Q10

        if (key !== 'wildCard' && lifelinesUsedBetweenMilestones.length >= milestoneLimit) {
            audioManager.playSfx('SFX_WRONG');
            return;
        }

        // RULE: Wild Card cannot be used unless there's a revivable lifeline
        // (a lifeline that was used, but NOT on the current question)
        if (key === 'wildCard') {
            const revivable = Object.entries(lifelines)
                .filter(([k, available]) => !available && k !== 'wildCard' && !lifelinesUsedInCurrentQuestion.includes(k as any));
            if (revivable.length === 0) {
                audioManager.playSfx('SFX_WRONG');
                return;
            }
        }

        if (key === 'fiftyFifty') {
            const correct = question.correctAnswer;
            const wrongs = [0, 1, 2, 3].filter(i => i !== correct && !hiddenOptions.includes(i));
            const toHide = wrongs.sort(() => 0.5 - Math.random()).slice(0, 2);
            setHiddenOptions(prev => [...prev, ...toHide]);
            audioManager.playSfx('SFX_LIFELINE_GENERIC');
            markLifelineUsed('fiftyFifty');
        } else if (key === 'audiencePoll') {
            setShowPoll(true);
            markLifelineUsed('audiencePoll');
        } else if (key === 'phoneAFriend') {
            setShowPhone(true);
            setPhoneStage('DIALING');
            setPhoneConversation([]);
            setPhoneTimer(30);
            markLifelineUsed('phoneAFriend');
        } else if (key === 'doubleDip') {
            setIsDoubleDipActive(true);
            audioManager.playSfx('SFX_LIFELINE_DIP', false);
            markLifelineUsed('doubleDip');
        } else if (key === 'flipQuestion') {
            audioManager.playSfx('SFX_LIFELINE_FLIP');
            audioManager.playSfx('VO_FLIP_REMARK');
            markLifelineUsed('flipQuestion');
            // Slight delay before flip
            setTimeout(() => {
                flipCurrentQuestion();
            }, 3000);
        } else if (key === 'expertAdvice') {
            markLifelineUsed('expertAdvice');
            setShowExpert(true);
        } else if (key === 'plusOne') {
            markLifelineUsed('plusOne');
            setShowPlusOne(true);
        } else if (key === 'hint') {
            const clue = question.hint || `Level ${question.level} hint: Focus on the options and narrow them down.`;
            setHintText(clue);
            setShowHint(true);
            markLifelineUsed('hint');
        } else if (key === 'jump') {
            markLifelineUsed('jump');
            audioManager.playSfx('SFX_LIFELINE_PING');
            if (currentQuestionIndex < questions.length - 1) {
                advanceQuestion();
            } else {
                setPhase('WIN');
            }
        } else if (key === 'wildCard') {
            setShowWildCard(true);
            markLifelineUsed('wildCard');
            audioManager.playSfx('VO_WILD_CARD');
        }
    };

    const letters = ['A', 'B', 'C', 'D'];
    // Expert Timer Effect
    useEffect(() => {
        if (!showExpert || expertState === 'INTRO') return;
        const interval = setInterval(() => {
            setExpertTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [showExpert, expertState]);

    // Plus One Timer Effect
    useEffect(() => {
        if (!showPlusOne || plusOneState === 'INTRO') return;
        const interval = setInterval(() => {
            setPlusOneTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [showPlusOne, plusOneState]);

    const handleQuit = () => {
        if (isLocked || isDoubleDipActive) {
            audioManager.playSfx('SFX_WRONG'); // Deny sound
            return;
        }
        setShowQuitConfirm(true);
    };

    const confirmQuit = () => {
        if (isLocked || isDoubleDipActive) return; // Parse safety
        // Set money to the prize for the current question level
        const currentPrize = PRIZE_LADDER[currentQuestionIndex]?.amount ?? 0;
        setMoneyWon(currentPrize);
        setPhase('QUIT');
        audioManager.playSfx('SFX_WIN');
    };

    if (questions.length === 0) return <div className="flex items-center justify-center h-screen text-white">Initializing Game...</div>;

    return (
        <div className="fixed inset-0 w-screen h-screen flex flex-col overflow-hidden bg-gradient-to-br from-[#1b0a2e] to-[#0a0414] select-none">
            <div className="absolute inset-0 bg-radial-gradient from-[#1e1e2e] to-black z-0 pointer-events-none" />

            {/* Large Dimmed Background Logo */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
                <img
                    src="/kbc-logo.png"
                    alt="KBC Background Logo"
                    className="w-[80vh] h-[80vh] object-contain mix-blend-screen"
                />
            </div>

            {/* Main Layout Container - Flattened */}
            <div className="flex-1 flex flex-row w-full h-full relative z-10 overflow-hidden">
                {/* Center Quiz Area - Grid Layout to guarantee fit */}
                <div className="flex-1 grid grid-rows-[auto_1fr_auto] h-full p-6 relative z-30 gap-4">

                    {/* ROW 1: Top Bar */}
                    <div className="w-full flex justify-between items-center">
                        <button
                            onClick={handleQuit}
                            disabled={isLocked || isDoubleDipActive}
                            className={cn(
                                "flex items-center gap-2 px-4 py-1.5 rounded-full transition border shadow-lg shadow-black/20 group shrink-0",
                                isLocked || isDoubleDipActive
                                    ? "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
                                    : "bg-red-600/10 hover:bg-red-600/20 text-red-500 border-red-500/20"
                            )}
                        >
                            <LogOut className={cn("w-4 h-4 transition-transform", !(isLocked || isDoubleDipActive) && "group-hover:-translate-x-1")} />
                            <span className="text-xs font-black tracking-widest uppercase">Quit</span>
                        </button>
                        <div className="flex-1" />
                        <div className="w-24 pointer-events-none shrink-0" />
                    </div>

                    <div className="w-full flex items-center justify-center min-h-0 overflow-hidden">
                        <div className="relative h-full aspect-video max-h-[30vh] rounded-xl overflow-hidden p-[3px] bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] shadow-[0_0_30px_rgba(251,191,36,0.4)]">
                            <div className="relative h-full w-full flex items-center justify-center p-1 bg-black rounded-[9px] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {videoRemark ? (
                                        <motion.video
                                            key={videoRemark}
                                            src={
                                                videoRemark === 'milestone' ? "/kbc-amitabh-milestone.mp4" :
                                                    videoRemark === 'congrats-7cr' ? "/kbc-amitabh-congrats-7cr.mp4" :
                                                        videoRemark === 'congrats-10cr' ? "/kbc-amitabh-congrats-10cr.mp4" :
                                                            "/kbc-amitabh-wrong-answer-remark.mp4"
                                            }
                                            autoPlay
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <motion.img
                                            key={isCodeRedActive ? 'code-red' : reaction || 'stage'}
                                            src={
                                                isCodeRedActive ? "/audio/red-light.gif" :
                                                    reaction === 'right' ? "/kbc-amitabh-right-answer.gif" :
                                                        reaction === 'wrong' ? "/kbc-amitabh-wrong-answer.gif" :
                                                            "/kbc-stage.gif"
                                            }
                                            initial={{ opacity: 0.5 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0.5 }}
                                            transition={{ duration: 0.3 }}
                                            alt="Game Screen"
                                            className="h-full w-full object-contain"
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* ROW 3: Quiz Content (Fixed Bottom) */}
                    <div className="w-full flex flex-col items-center justify-end shrink-0">

                        {/* Metadata Row */}
                        <div className="flex items-center gap-4 mb-2">
                            {/* Metallic Gradient Badge Wrapper */}
                            <div className="p-[1.5px] rounded-full bg-[linear-gradient(to_bottom,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                                <div className="bg-black/60 px-6 py-1.5 rounded-full backdrop-blur-sm">
                                    <span className="text-kbc-gold text-base font-bold tracking-widest uppercase shadow-black drop-shadow-md">
                                        Question {currentQuestionIndex + 1} of {questions.length}
                                    </span>
                                </div>
                            </div>
                            {timer !== null && <Clock timer={timer} maxTimer={maxTimer} size="md" />}
                        </div>

                        {isDoubleDipActive && <span className="text-yellow-400 text-xs animate-pulse font-bold tracking-widest uppercase mb-2">Double Dip Active!</span>}

                        {/* Question Box - Compact */}
                        <div className="w-full max-w-6xl mb-4 relative z-30">
                            <HexagonBox
                                variant="question"
                                text={question.text}
                                state="idle"
                                className="h-[100px] md:h-[110px]"
                            />
                        </div>

                        {/* Options Grid - Compact */}
                        <div className="grid grid-cols-2 gap-x-12 gap-y-3 w-full max-w-6xl relative z-30">

                            {question.options.map((option, idx) => {
                                const isSelected = selectedOption === idx;
                                const isCorrect = idx === question.correctAnswer;
                                const isHidden = hiddenOptions.includes(idx);
                                const isContentVisible = idx < optionsVisibleCount;

                                let boxState: 'idle' | 'selected' | 'correct' | 'wrong' | 'locked' | 'waiting' = 'idle';

                                if (status === 'LOCKED' && isSelected) {
                                    boxState = 'locked';
                                } else if (status === 'CORRECT') {
                                    if (isSelected || (showCorrect && isCorrect)) boxState = 'correct';
                                } else if (status === 'WRONG') {
                                    if (isSelected) boxState = 'wrong';
                                    if (showCorrect && isCorrect) boxState = 'correct';
                                } else if (isSelected) {
                                    boxState = 'selected';
                                }

                                return (
                                    <div key={idx} className="relative flex items-center justify-center">
                                        <HexagonBox
                                            variant="option"
                                            text={option}
                                            label={letters[idx]}
                                            state={boxState}
                                            onClick={() => !isLocked && !isHidden && !showQuitConfirm && handleOptionClick(idx)}
                                            disabled={isLocked || isHidden || showQuitConfirm}
                                            visible={!isHidden}
                                            isContentVisible={isContentVisible}
                                            className="h-[70px] md:h-[75px]"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Fixed Width, Independent Scroll if needed */}
                <div className="hidden lg:flex w-[350px] h-full z-40 flex-col bg-[#1e0a3d]/95 backdrop-blur-xl relative shadow-[-20px_0_50px_rgba(0,0,0,0.6)]">
                    {/* Metallic Border Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] z-50 bg-[linear-gradient(to_bottom,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                    <div className="p-4 border-b border-kbc-gold/10">
                        <Lifelines onUse={handleUseLifeline} disabled={optionsVisibleCount < 4} />
                    </div>
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <PrizeLadder />
                    </div>
                </div>

                <AnimatePresence>
                    {showPoll && (
                        <motion.div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                            {/* Metallic Modal Wrapper */}
                            <div className="p-[3px] rounded-xl bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] shadow-[0_0_40px_rgba(251,191,36,0.4)] w-full max-w-lg">
                                <div className="bg-black p-8 rounded-[9px] w-full">
                                    <h3 className="text-kbc-gold text-2xl font-bold mb-6 text-center font-serif">Audience Poll Results</h3>
                                    <div className="flex justify-around items-end h-64 gap-4">
                                        {pollData.map((d, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2 w-full h-full justify-end">
                                                <span className="text-white font-bold">{d.value}%</span>
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${d.value}%` }}
                                                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                                                    className="w-full bg-blue-600 rounded-t-sm relative shadow-[0_0_10px_blue]"
                                                >
                                                    {/* Metallic Top Border for Bars */}
                                                    <div className="absolute top-0 inset-x-0 h-[3px] bg-[linear-gradient(to_right,#8a6e2f,#fff5cc,#8a6e2f)]" />
                                                </motion.div>
                                                <span className="text-kbc-gold font-bold text-xl">{d.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => {
                                        setShowPoll(false);
                                        audioManager.playSfx('SFX_LIFELINE_GENERIC'); // Fixed: was stopSfx but usually close makes a sound
                                    }}
                                        className="mt-8 w-full bg-[linear-gradient(to_bottom,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] text-black font-bold py-3 rounded-lg hover:brightness-110 transition shadow-[0_0_15px_#fbbf2466]"
                                    >
                                        Close Poll
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {(showExpert || showPlusOne) && (
                        <motion.div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                            <div className="p-[3px] rounded-xl bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] shadow-[0_0_40px_rgba(251,191,36,0.4)] w-full max-w-lg">
                                <div className="bg-black p-8 rounded-[9px] w-full text-center flex flex-col items-center">
                                    <h3 className="text-kbc-gold text-2xl font-bold mb-4 font-serif">{showExpert ? "Expert Advice" : "Plus One"}</h3>

                                    <div className="mb-6">
                                        <Clock
                                            timer={showExpert ? expertTimer : plusOneTimer}
                                            maxTimer={30}
                                            size="sm"
                                        />
                                    </div>

                                    <div className="w-24 h-24 bg-gray-700 rounded-full mb-6 flex items-center justify-center border-2 border-white relative overflow-hidden">
                                        <span className="text-4xl">{(showExpert ? expertState : plusOneState) === 'THINKING' ? '🤔' : (showExpert ? '🎓' : '🤝')}</span>
                                        {((showExpert && expertState === 'THINKING') || (!showExpert && plusOneState === 'THINKING')) && <div className="absolute inset-0 bg-white/20 animate-ping rounded-full" />}
                                    </div>
                                    {((showExpert && expertState === 'INTRO') || (!showExpert && plusOneState === 'INTRO')) && <p className="text-gray-300 animate-pulse">Connecting...</p>}
                                    {((showExpert && expertState === 'THINKING') || (!showExpert && plusOneState === 'THINKING')) && <p className="text-yellow-400 italic animate-pulse">Thinking...</p>}
                                    {((showExpert && expertState === 'ANSWER') || (!showExpert && plusOneState === 'ANSWER')) && (
                                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                            <p className="text-xl text-white italic mb-8">"{showExpert ? expertMessage : plusOneMessage}"</p>
                                            <button onClick={() => {
                                                setShowExpert(false);
                                                setShowPlusOne(false);
                                                audioManager.stopSfx(showExpert ? 'SFX_LIFELINE_EXPERT' : 'SFX_LIFELINE_PLUSONE');
                                            }} className="px-6 py-2 bg-[linear-gradient(to_bottom,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] text-black font-bold rounded-full hover:brightness-110 transition shadow-[0_0_15px_#fbbf2466]">Thank You</button>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {showPhone && (
                        <motion.div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                            <div className="p-[3px] rounded-xl bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] shadow-[0_0_40px_rgba(251,191,36,0.4)] w-full max-w-lg">
                                <div className="bg-black p-8 rounded-[9px] w-full text-center min-h-[400px] flex flex-col">
                                    <h3 className="text-kbc-gold text-2xl font-bold mb-4 font-serif">Phone-a-Friend</h3>
                                    <div className="mb-6 self-center">
                                        <Clock timer={phoneTimer} maxTimer={30} size="sm" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center items-center gap-4">
                                        {phoneStage === 'DIALING' && (
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 border-4 border-t-kbc-gold border-r-transparent border-b-current border-l-transparent rounded-full animate-spin mb-4 text-white" />
                                                <p className="text-xl text-white tracking-widest animate-pulse">DIALING...</p>
                                            </div>
                                        )}
                                        {phoneStage !== 'DIALING' && (
                                            <div className="w-full text-left space-y-2 bg-gray-900/50 p-4 rounded-lg h-[180px] overflow-y-auto mb-4 border border-gray-800">
                                                {phoneConversation.map((line, i) => <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-gray-300 border-l-2 border-kbc-gold pl-2">{line}</motion.p>)}
                                                {phoneStage === 'THINKING' && <p className="text-yellow-500 text-sm animate-pulse italic">Friend is thinking...</p>}
                                            </div>
                                        )}
                                        {phoneStage === 'ANSWER' && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-green-900/40 p-4 rounded-lg border border-green-500 w-full"><p className="text-xl text-white font-bold">{phoneMessage}</p></motion.div>}
                                    </div>
                                    <button onClick={() => {
                                        setShowPhone(false);
                                        audioManager.stopSfx('SFX_LIFELINE_PHONE');
                                    }} className="mt-4 px-6 py-2 bg-[linear-gradient(to_bottom,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] text-black font-bold rounded-full hover:brightness-110 transition self-center shadow-[0_0_15px_rgba(251,191,36,0.4)]">End Call</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {showHint && (
                        <motion.div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
                            <div className="p-[3px] rounded-xl bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] shadow-[0_0_50px_rgba(251,191,36,0.3)] w-full max-w-md">
                                <div className="bg-black p-8 rounded-[9px] w-full text-center">
                                    <h3 className="text-kbc-gold text-2xl font-bold mb-4 uppercase tracking-[0.2em] font-serif">Hint</h3>
                                    <div className="w-16 h-16 bg-kbc-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-kbc-gold/30">
                                        <span className="text-3xl">💡</span>
                                    </div>
                                    <p className="text-white text-xl italic mb-8">
                                        "{hintText}"
                                    </p>
                                    <button
                                        onClick={() => setShowHint(false)}
                                        className="px-8 py-3 bg-[linear-gradient(to_bottom,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] text-black font-bold rounded-full transition hover:brightness-110 shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                                    >
                                        Got it, Thank You
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {showWildCard && (
                        <motion.div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
                            <div className="bg-black border-2 border-kbc-gold p-8 rounded-xl w-full max-w-lg text-center shadow-[0_0_50px_rgba(251,191,36,0.3)]">
                                <h3 className="text-kbc-gold text-2xl font-bold mb-2 uppercase tracking-[0.2em]">Wild Card</h3>
                                <p className="text-gray-400 mb-6 font-medium">Select a used lifeline to restore it:</p>

                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    {Object.entries(lifelines)
                                        .filter(([key, available]) => !available && key !== 'wildCard' && !lifelinesUsedInCurrentQuestion.includes(key as any))
                                        .map(([key, _]) => (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    const restoreLifeline = useGameStore.getState().restoreLifeline;
                                                    restoreLifeline(key as any);
                                                    setShowWildCard(false);
                                                    audioManager.playSfx('SFX_LIFELINE_PING');
                                                }}
                                                className="bg-gray-800/50 hover:bg-kbc-gold/20 border-2 border-gray-700 hover:border-kbc-gold p-4 rounded-xl text-white font-bold transition-all flex flex-col items-center gap-3 group"
                                            >
                                                <div className="scale-125 transition-transform group-hover:scale-150 text-kbc-gold">
                                                    <LifelineIcon type={key} />
                                                </div>
                                                <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                            </button>
                                        ))
                                    }
                                    {Object.entries(lifelines).filter(([key, available]) => !available && key !== 'wildCard' && !lifelinesUsedInCurrentQuestion.includes(key as any)).length === 0 && (
                                        <p className="col-span-2 text-gray-500 italic py-4">No used lifelines available for restoration.</p>
                                    )}
                                </div>

                                <button
                                    onClick={() => setShowWildCard(false)}
                                    className="px-8 py-2 text-gray-400 hover:text-white transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {showLockConfirm !== null && (
                        <motion.div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
                            <div className="p-[3px] rounded-xl bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] shadow-[0_0_50px_rgba(251,191,36,0.2)] w-full max-w-md">
                                <div className="bg-black p-8 rounded-[9px] w-full text-center">
                                    <h3 className="text-kbc-gold text-2xl font-bold mb-4 uppercase tracking-[0.2em] font-serif">Confirm Lock</h3>
                                    <p className="text-white text-xl mb-8">
                                        Aapka chayan hai vikalp <span className="text-kbc-gold font-black">{letters[showLockConfirm]}</span>.<br />
                                        Kya ise lock kar diya jaye?
                                    </p>
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={confirmLock}
                                            className="px-10 py-3 bg-[linear-gradient(to_bottom,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] text-black font-black rounded-full transition-all shadow-lg hover:brightness-110 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                                        >
                                            Lock Kar Diya Jaye
                                        </button>
                                        <button
                                            onClick={() => setShowLockConfirm(null)}
                                            className="px-10 py-3 bg-gray-800 text-white font-bold rounded-full transition hover:bg-gray-700"
                                        >
                                            Nahin, Rukiye
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {showQuitConfirm && (
                        <motion.div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
                            <div className="p-[3px] rounded-xl bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] shadow-[0_0_50px_rgba(251,191,36,0.4)] w-full max-w-md">
                                <div className="bg-black p-8 rounded-[9px] w-full text-center">
                                    <h3 className="text-kbc-gold text-3xl font-bold mb-4 uppercase tracking-widest font-serif">Quit Game?</h3>
                                    <p className="text-white text-lg mb-8">Are you sure you want to walk away with <span className="text-kbc-gold font-bold">₹{moneyWon.toLocaleString('en-IN')}</span>?</p>
                                    <div className="flex gap-4 justify-center">
                                        <button onClick={() => { }} className="hidden" />
                                        <button onClick={confirmQuit} className="px-8 py-3 bg-[linear-gradient(to_bottom,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] hover:brightness-110 text-black font-bold rounded-full transition shadow-[0_0_15px_#fbbf244d]">Yes, Quit</button>
                                        <button onClick={() => setShowQuitConfirm(false)} className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-full transition">No, Play On</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {showCheque && (
                        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md">
                            <Cheque playerName={player ? player.name : "The Hot Seat Player"} amount={chequeValue} />
                        </div>
                    )}
                    {showCodeRedPopup && (
                        <motion.div className="absolute inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-md">
                            <div className="p-[3px] rounded-xl bg-[linear-gradient(135deg,#ff0000_0%,#800000_100%)] shadow-[0_0_50px_rgba(255,0,0,0.6)] w-full max-w-lg">
                                <div className="bg-black p-8 rounded-[9px] w-full text-center">
                                    <h3 className="text-red-500 text-3xl font-bold mb-4 uppercase tracking-widest font-serif">⚠️ CODE RED TRIGGERED ⚠️</h3>
                                    <p className="text-white text-lg mb-8">
                                        Your companion has activated <strong>Code Red</strong>!
                                        <br /><br />
                                        They strongly assume your selected answer is <strong>WRONG</strong>.
                                        <br />
                                        Please reconsider your choice.
                                    </p>
                                    <button
                                        onClick={() => setShowCodeRedPopup(false)}
                                        className="px-8 py-3 bg-[linear-gradient(to_bottom,#ff0000_0%,#990000_100%)] hover:brightness-110 text-white font-bold rounded-full transition shadow-[0_0_15px_#ff00004d]"
                                    >
                                        I Understand
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div >
        </div >
    );
}
