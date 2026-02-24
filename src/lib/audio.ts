export const KBC_AUDIO = {
    BGM: {
        THEME_INTRO: '/audio/kbc-intro-screen-theme.mp3',
        THEME_TENSION_LOW: '/audio/kbc-1000-to-10000-suspense-bgm.mp3',
        THEME_TENSION_MED: '/audio/kbc-20000-320000-suspense-bgm.mp3',
        THEME_TENSION_HIGH: '/audio/kbc-640000-10000000-suspense-bgm.mp3',
        THEME_TENSION_ELITE: '/audio/kbc-10000000-100000000-suspense-bgm.mp3',
        THEME_FFF: '/audio/kbc-fastest-finger-first.mp3',
        THEME_DECISION: '/audio/kbc-1000-to-10000-suspense-bgm.mp3',
    },
    SFX: {
        SFX_LIFELINE_PING: '/audio/kcb-lifeline-ping.mp3',
        SFX_LOCK: '/audio/kbc-answer-locked-in.mp3',
        SFX_CORRECT: '/audio/kbc-right-answer.mp3',
        SFX_WRONG: '/audio/kbc-wrong-answer.mp3',
        SFX_APPLAUSE: '/audio/kbc-applause.mp3',
        SFX_QUESTION_OPENING: '/audio/kbc-question-opening.mp3',
        SFX_OPTIONS: '/audio/kcb-options.mp3',
        SFX_TIMER: '/audio/kbc-timer.mp3',
        SFX_WIN: '/audio/kbc-fastest-finger-first-right-answer.mp3',
        SFX_FFFF_RIGHT: '/audio/kbc-fastest-finger-first-right-answer.mp3',
        SFX_LIFELINE_GENERIC: '/audio/kbc-50-50-flip-the-question.mp3',
        SFX_LIFELINE_POLL: '/audio/kbc-audience-poll.mp3',
        SFX_LIFELINE_PHONE: '/audio/kbc-phone-a-friend.mp3',
        SFX_LIFELINE_DIP: '/audio/kbc-double-dip.mp3',
        SFX_LIFELINE_EXPERT: '/audio/kbc-ask-the-expert.mp3',
        SFX_LIFELINE_PLUSONE: '/audio/kbc-plus-one.mp3',
        SFX_LIFELINE_FLIP: '/audio/kbc-50-50-flip-the-question.mp3',

        // Amitabh Voiceovers
        VO_OPENING: '/audio/kbc-amitabh-opening-remarks.mp3',
        VO_GREETING: '/audio/kbc-amitabh-greeting.mp3',
        VO_GREAT_PLAN: '/audio/kbc-amitabh-great-plan.mp3',
        VO_LOCK_ASK: '/audio/kbc-lock-amitabh-ask.mp3',
        VO_POLL_REMARK: '/audio/kbc-audience-poll-amitabh-remark.mp3',
        VO_PHONE_OPEN: '/audio/kbc-amitabh-phone-opening-remarks.mp3',
        VO_PHONE_MID: '/audio/kbc-amitabh-phone-middle-remarks.mp3',
        VO_PHONE_EARLY_MID: '/audio/kbc-phone-a-friend-early-mid-remark.mp3',
        VO_PHONE_CLOSE: '/audio/kbc-amitabh-phone-closing-remarks.mp3',
        VO_FLIP_REMARK: '/audio/kbc-flip-question-amitabh-remark.mp3',
        VO_CHEQUE_REMARK: '/audio/kbc-amitabh-cheque-remark.mp3',
        VO_QUIT_REMARK: '/audio/kbc-quit-amitabh-remarks.mp3',
        VO_MONEY_REMARK: '/audio/kbc-amitabh-money-remark.mp3',
        VO_PLUS_ONE: '/audio/kbc-plus-one-vo.mp3',
        VO_WILD_CARD: '/audio/kbc-amitabh-wild-card-remark.mp3',
        SFX_CODE_RED: '/audio/buzzer.mp3'
    }
} as const;

export type BgmKey = keyof typeof KBC_AUDIO.BGM;
export type SfxKey = keyof typeof KBC_AUDIO.SFX;

class KbcAudioManager {
    private bgm: HTMLAudioElement | null = null;
    private currentBgmKey: BgmKey | null = null;
    private sfx: Map<string, HTMLAudioElement> = new Map();
    private isMuted: boolean = false;
    private initialized: boolean = false;

    initialize() {
        if (this.initialized) return;
        this.initialized = true;

        // Preload all audio on first interaction
        Object.values(KBC_AUDIO.BGM).forEach(src => new Audio(src).load());
        Object.values(KBC_AUDIO.SFX).forEach(src => new Audio(src).load());
    }

    playBgm(key: BgmKey, loop: boolean = true) {
        if (this.currentBgmKey === key) return; // Seamless transition if same track

        if (this.bgm) {
            this.bgm.pause();
            this.bgm = null;
        }

        const audio = new Audio(KBC_AUDIO.BGM[key]);
        audio.loop = loop;
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play blocked", e));
        this.bgm = audio;
        this.currentBgmKey = key;
    }

    stopBgm() {
        if (this.bgm) {
            this.bgm.pause();
            this.bgm = null;
            this.currentBgmKey = null;
        }
    }

    playSfx(key: SfxKey, loop: boolean = false) {
        // Stop previous instance of the same SFX if it's still playing
        this.stopSfx(key);

        const audio = new Audio(KBC_AUDIO.SFX[key]);
        audio.loop = loop;
        audio.volume = 0.8;

        // Track the instance
        this.sfx.set(key, audio);

        audio.play().catch(e => {
            console.log("Audio play blocked", e);
            this.sfx.delete(key);
        });

        // Cleanup on end if not looping
        if (!loop) {
            audio.onended = () => {
                const current = this.sfx.get(key);
                if (current === audio) {
                    this.sfx.delete(key);
                }
            };
        }
    }

    stopSfx(key: SfxKey) {
        const audio = this.sfx.get(key);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            this.sfx.delete(key);
        }
    }

    stopAllSfx() {
        this.sfx.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
        this.sfx.clear();
    }
}

export const audioManager = new KbcAudioManager();
