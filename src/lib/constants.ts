export const PRIZE_LADDER = [
    { level: 1, amount: 1000, amountText: "1,000" },
    { level: 2, amount: 2000, amountText: "2,000" },
    { level: 3, amount: 3000, amountText: "3,000" },
    { level: 4, amount: 5000, amountText: "5,000" },
    { level: 5, amount: 10000, amountText: "10,000" },
    { level: 6, amount: 20000, amountText: "20,000" },
    { level: 7, amount: 40000, amountText: "40,000" },
    { level: 8, amount: 80000, amountText: "80,000" },
    { level: 9, amount: 160000, amountText: "1,60,000" },
    { level: 10, amount: 320000, amountText: "3,20,000" },
    { level: 11, amount: 640000, amountText: "6,40,000" },
    { level: 12, amount: 1250000, amountText: "12,50,000" },
    { level: 13, amount: 2500000, amountText: "25,00,000" },
    { level: 14, amount: 5000000, amountText: "50,00,000" },
    { level: 15, amount: 10000000, amountText: "1 Crore" },
    { level: 16, amount: 20000000, amountText: "2 Crores" },
    { level: 17, amount: 30000000, amountText: "3 Crores" },
    { level: 18, amount: 50000000, amountText: "5 Crores" },
    { level: 19, amount: 70000000, amountText: "7 Crores" },
    { level: 20, amount: 100000000, amountText: "10 Crores" },
];

// Safety Nets: Level 5 (10k), Level 10 (3.2L), Level 15 (1Cr)
export const SAFETY_NETS = [10000, 320000, 10000000];

export type GamePhase = 'LANDING' | 'REGISTRATION' | 'FFF' | 'FFF_RESULT' | 'WINNING_PLAN' | 'HOST_INTRO' | 'QUIZ' | 'WIN' | 'LOSE' | 'QUIT';

export interface LifelineState {
    fiftyFifty: boolean;
    audiencePoll: boolean;
    phoneAFriend: boolean;
    expertAdvice: boolean;
    doubleDip: boolean;
    flipQuestion: boolean;
    plusOne: boolean;
    hint: boolean;
    jump: boolean;
    wildCard: boolean;
}

export const INITIAL_LIFELINES: LifelineState = {
    fiftyFifty: true,
    audiencePoll: true,
    phoneAFriend: true,
    expertAdvice: true,
    doubleDip: true,
    flipQuestion: true,
    plusOne: true,
    hint: true,
    jump: true,
    wildCard: true,
};
