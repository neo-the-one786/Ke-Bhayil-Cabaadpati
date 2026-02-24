import { create } from 'zustand';
import { GamePhase, INITIAL_LIFELINES, LifelineState, PRIZE_LADDER } from '../lib/constants';
import { Question, QUESTION_POOL } from '../lib/questions';

interface Player {
    name: string;
    city?: string;
    profession?: string;
}

interface GameState {
    phase: GamePhase;
    player: Player | null;
    questions: Question[];
    currentQuestionIndex: number;
    moneyWon: number;
    lifelines: LifelineState;
    // Rule Tracking
    lifelinesUsedInCurrentQuestion: (keyof LifelineState)[];
    lifelinesUsedBetweenMilestones: (keyof LifelineState)[];
    isDoubleDipActive: boolean;
    codeRedUsed: boolean;
    isCodeRedActive: boolean;

    // Actions
    setPhase: (phase: GamePhase) => void;
    setPlayer: (player: Player) => void;
    initializeGame: () => void;
    advanceQuestion: () => void;
    useLifeline: (lifeline: keyof LifelineState) => void;
    restoreLifeline: (lifeline: keyof LifelineState) => void;
    setMoneyWon: (amount: number) => void;
    resetGame: () => void;
    setIsDoubleDipActive: (active: boolean) => void;
    setCodeRedActive: (active: boolean) => void;
    markCodeRedUsed: () => void;
    flipCurrentQuestion: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    phase: 'LANDING',
    player: null,
    questions: [],
    currentQuestionIndex: 0,
    moneyWon: 0,
    lifelines: INITIAL_LIFELINES,
    lifelinesUsedInCurrentQuestion: [],
    lifelinesUsedBetweenMilestones: [],
    isDoubleDipActive: false,
    codeRedUsed: false,
    isCodeRedActive: false,

    setPhase: (phase) => set({ phase }),
    setPlayer: (player) => set({ player }),
    initializeGame: () => {
        const selectedQuestions: Question[] = [];
        for (let i = 1; i <= 20; i++) {
            const pool = QUESTION_POOL[i];
            if (pool && pool.length > 0) {
                const randomIndex = Math.floor(Math.random() * pool.length);
                selectedQuestions.push(shuffleOptions(pool[randomIndex]));
            } else {
                // Fallback if pool is empty
                selectedQuestions.push({
                    id: `mock_${i}`, level: i, price: 0, text: `Missing Question Level ${i}`, options: ["A", "B", "C", "D"], correctAnswer: 0
                } as Question);
            }
        }
        set({
            questions: selectedQuestions,
            currentQuestionIndex: 0,
            moneyWon: 0,
            lifelines: INITIAL_LIFELINES,
            lifelinesUsedInCurrentQuestion: [],
            lifelinesUsedBetweenMilestones: [],
            isDoubleDipActive: false,
            codeRedUsed: false,
            isCodeRedActive: false
        });
    },
    advanceQuestion: () => set((state) => {
        const nextIndex = state.currentQuestionIndex + 1;
        // Milestones: Reset after Q5 (index 4->5) and Q10 (index 9->10)
        // Check if we JUST crossed into 5 or 10.
        // Index is 0-based. Q1=0, Q5=4.
        // Changing from 4 to 5 (Start of Q6 block) -> Reset.
        // Changing from 9 to 10 (Start of Q11 block) -> Reset.
        // Changing from 14 to 15 (Start of Q16 block) -> Reset? (User only mentioned 4 lifelines between milestones).
        // Let's reset at 5, 10, 15.
        const shouldResetMilestoneCount = nextIndex === 5 || nextIndex === 10 || nextIndex === 15;

        return {
            currentQuestionIndex: nextIndex,
            lifelinesUsedInCurrentQuestion: [],
            isDoubleDipActive: false,
            isCodeRedActive: false,
            lifelinesUsedBetweenMilestones: shouldResetMilestoneCount ? [] : state.lifelinesUsedBetweenMilestones
        };
    }),
    useLifeline: (lifeline) => set((state) => {
        const isWildCard = lifeline === 'wildCard';

        const newInCurrent = isWildCard
            ? state.lifelinesUsedInCurrentQuestion
            : [...state.lifelinesUsedInCurrentQuestion, lifeline];

        const newBetweenMilestones = isWildCard
            ? state.lifelinesUsedBetweenMilestones
            : [...state.lifelinesUsedBetweenMilestones, lifeline];

        return {
            lifelines: { ...state.lifelines, [lifeline]: false },
            lifelinesUsedInCurrentQuestion: newInCurrent,
            lifelinesUsedBetweenMilestones: newBetweenMilestones,
            isDoubleDipActive: lifeline === 'doubleDip' ? true : state.isDoubleDipActive
        };
    }),
    restoreLifeline: (lifeline) => set((state) => ({
        lifelines: { ...state.lifelines, [lifeline]: true }
    })),
    setMoneyWon: (amount) => set({ moneyWon: amount }),
    resetGame: () => set({
        phase: 'LANDING',
        currentQuestionIndex: 0,
        moneyWon: 0,
        lifelines: INITIAL_LIFELINES,
        questions: [],
        player: null,
        lifelinesUsedInCurrentQuestion: [],
        lifelinesUsedBetweenMilestones: [],
        isDoubleDipActive: false,
        codeRedUsed: false,
        isCodeRedActive: false
    }),
    setIsDoubleDipActive: (active) => set({ isDoubleDipActive: active }),
    setCodeRedActive: (active) => set({ isCodeRedActive: active }),
    markCodeRedUsed: () => set({ codeRedUsed: true }),
    flipCurrentQuestion: () => set((state) => {
        const level = state.currentQuestionIndex + 1;
        const currentQ = state.questions[state.currentQuestionIndex];
        const pool = QUESTION_POOL[level] || [];

        // Filter out current question to avoid same pick
        const available = pool.filter(q => q.id !== currentQ.id);

        // Fallback if no other questions (shouldn't happen with good pool)
        if (available.length === 0) return {};

        const randomQ = available[Math.floor(Math.random() * available.length)];
        // Shuffle the new question options too
        const shuffledQ = shuffleOptions(randomQ);

        const newQuestions = [...state.questions];
        newQuestions[state.currentQuestionIndex] = shuffledQ;

        return {
            questions: newQuestions,
            // Reset question-specific states
            lifelinesUsedInCurrentQuestion: [],
            isDoubleDipActive: false,
            isCodeRedActive: false,
            // Keep money, phase, index same
        };
    }),
}));

function shuffleOptions(question: Question): Question {
    const indices = [0, 1, 2, 3];
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const newOptions = indices.map(i => question.options[i]) as [string, string, string, string];
    const newCorrectAnswer = indices.indexOf(question.correctAnswer) as 0 | 1 | 2 | 3;

    return {
        ...question,
        options: newOptions,
        correctAnswer: newCorrectAnswer
    };
}
