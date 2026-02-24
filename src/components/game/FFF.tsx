"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useGameStore } from "@/store/gameStore";
import { audioManager } from "@/lib/audio";
import { FFF_QUESTIONS } from "@/lib/fff_questions";
import { CheckCircle, XCircle, RefreshCcw } from "lucide-react";
import Clock from "./Clock";

interface Item {
    id: string;
    text: string;
}

// Sortable Item Component
function SortableItem(props: { id: string, text: string, disabled: boolean, index: number }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id, disabled: props.disabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-gradient-to-r from-kbc-blue to-black border border-kbc-gold/30 p-4 rounded-lg mb-2 text-center font-bold text-lg shadow-md cursor-grab active:cursor-grabbing touch-none select-none hover:border-kbc-gold">
            <span className="text-kbc-gold mr-3">{props.index + 1}.</span> {props.text}
        </div>
    );
}

export default function FFF() {
    const setPhase = useGameStore((state) => state.setPhase);
    const player = useGameStore((state) => state.player);

    const [roundIndex, setRoundIndex] = useState(0);
    const [questionQueue, setQuestionQueue] = useState<typeof FFF_QUESTIONS>([]);
    const [question, setQuestion] = useState(FFF_QUESTIONS[0]);
    const [items, setItems] = useState<Item[]>([]);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isLocked, setIsLocked] = useState(false);
    const [resultState, setResultState] = useState<'NONE' | 'WIN' | 'LOSE'>('NONE');

    // Refs to avoid stale closure
    const itemsRef = useRef<Item[]>([]);
    const questionRef = useRef(FFF_QUESTIONS[0]);
    const isLockedRef = useRef(false);
    const questionQueueRef = useRef<typeof FFF_QUESTIONS>([]);
    const roundIndexRef = useRef(0);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // Initialize 1 Random Question on Mount (files for 2nd/3rd rounds kept for future expansion)
    useEffect(() => {
        // Shuffle and pick 1 question
        const shuffledPool = [...FFF_QUESTIONS].sort(() => Math.random() - 0.5);
        const selected = shuffledPool.slice(0, 1);
        setQuestionQueue(selected);
        questionQueueRef.current = selected;

        // Start Round 1
        startRound(selected[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startRound = (q: typeof FFF_QUESTIONS[0]) => {
        setQuestion(q);
        questionRef.current = q;

        // Shuffle items for display
        const shuffledItems = [...q.items].sort(() => Math.random() - 0.5);
        setItems(shuffledItems);
        itemsRef.current = shuffledItems;

        // Reset State
        setTimeLeft(10);
        setIsLocked(false);
        isLockedRef.current = false;
        setResultState('NONE');

        // Play BGM
        audioManager.playBgm('THEME_FFF');
    };

    // Timer Logic - uses local var to avoid side effects inside state updater
    useEffect(() => {
        if (resultState !== 'NONE') return;

        let localTime = 10;

        const timer = setInterval(() => {
            localTime -= 1;
            setTimeLeft(localTime);

            if (localTime <= 0) {
                clearInterval(timer);
                // Lock if not already locked
                if (!isLockedRef.current) {
                    isLockedRef.current = true;
                    setIsLocked(true);
                }

                // Evaluate result after timer expires (whether locked early or at 0)
                setTimeout(() => {
                    audioManager.stopBgm();

                    const currentOrderIds = itemsRef.current.map(i => i.id);
                    const expectedOrder = questionRef.current.correctOrder;
                    const isCorrect = JSON.stringify(currentOrderIds) === JSON.stringify(expectedOrder);

                    if (isCorrect) {
                        setResultState('WIN');
                        audioManager.playSfx('SFX_FFFF_RIGHT');

                        setTimeout(() => {
                            setPhase('HOST_INTRO');
                        }, 4000);
                    } else {
                        setResultState('LOSE');
                        audioManager.playSfx('SFX_WRONG');
                    }
                }, 1000);
            }
        }, 1000);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roundIndex, resultState]);

    // Ensure BGM stops on unmount
    useEffect(() => {
        return () => {
            audioManager.stopBgm();
        };
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        if (isLockedRef.current) return;
        const { active, over } = event;
        if (active.id !== over?.id) {
            setItems((currentItems) => {
                const oldIndex = currentItems.findIndex((item) => item.id === active.id);
                const newIndex = currentItems.findIndex((item) => item.id === over!.id);
                const newItems = arrayMove(currentItems, oldIndex, newIndex);
                itemsRef.current = newItems;
                return newItems;
            });
        }
    };

    // Lock button = freeze the order, but timer keeps running until 0
    const handleLock = () => {
        if (isLockedRef.current) return;
        isLockedRef.current = true;
        setIsLocked(true);
    };

    const handleRetry = () => {
        // Reset and reload for clean state
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden p-4 relative">
            {/* Background */}
            <div className="absolute inset-0 bg-radial-gradient from-kbc-purple/20 to-black z-0 pointer-events-none" />

            <div className="z-10 w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-4">
                    <h2 className="text-kbc-gold text-xl md:text-2xl font-bold uppercase tracking-widest mb-1">
                        Fastest Finger First
                    </h2>
                    <p className="text-gray-300 text-base md:text-lg">{question.text}</p>
                </div>

                {/* Timer */}
                <div className="flex justify-center mb-4">
                    <Clock timer={timeLeft} maxTimer={10} size="sm" />
                </div>

                {/* Sortable List */}
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        <div className="space-y-3">
                            {items.map((item, index) => (
                                <SortableItem key={item.id} id={item.id} text={item.text} disabled={isLocked} index={index} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                {/* Lock Button */}
                {!isLocked && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleLock}
                            className="bg-[linear-gradient(135deg,#8a6e2f_0%,#f7ef8a_25%,#d2ac47_50%,#fff5cc_75%,#8a6e2f_100%)] hover:brightness-110 text-black font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.6)] uppercase tracking-wider transition-transform active:scale-95"
                        >
                            Lock Answer
                        </button>
                    </div>
                )}

                {/* Result Overlay */}
                <AnimatePresence>
                    {resultState !== 'NONE' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center z-50 rounded-xl bg-black/95"
                        >
                            {resultState === 'WIN' ? (
                                <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="text-center">
                                    <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-4xl text-kbc-gold font-bold mb-4">Correct Order!</h3>
                                    <p className="text-white text-2xl mb-2">Well done, {player?.name}</p>
                                    <p className="text-green-500 text-xl font-mono">Time: {(10 - timeLeft).toFixed(2)}s</p>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="text-center">
                                    <XCircle className="w-24 h-24 text-red-500 mx-auto mb-4" />
                                    <h3 className="text-4xl text-red-500 font-bold mb-4">Wrong Answer!</h3>
                                    <p className="text-white text-lg mb-8">Order was: {question.correctOrder.join(' - ')}</p>

                                    <button
                                        onClick={handleRetry}
                                        className="flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition mx-auto"
                                    >
                                        <RefreshCcw className="w-5 h-5" /> Try Again
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
