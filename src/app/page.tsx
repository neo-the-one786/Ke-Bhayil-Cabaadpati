"use client";

import { useGameStore } from "@/store/gameStore";
import Landing from "@/components/game/Landing";
import Registration from "@/components/game/Registration";
import FFF from "@/components/game/FFF";
import Host from "@/components/game/Host";
import Quiz from "@/components/game/Quiz";
import Result from "@/components/game/Result";

export default function Home() {
  const phase = useGameStore((state) => state.phase);

  return (
    <main className="min-h-screen text-white font-sans selection:bg-kbc-gold selection:text-black relative overflow-hidden">
      {/* Persistent Background for Intro Phases */}
      {(phase === 'LANDING' || phase === 'REGISTRATION') && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="/kbc-intro-screen.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0a0e17] opacity-80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-kbc-purple/20 blur-[100px] rounded-full animate-pulse-glow" />
        </div>
      )}

      <div className="relative z-10 w-full h-full min-h-screen">
        {phase === 'LANDING' && <Landing />}
        {phase === 'REGISTRATION' && <Registration />}
        {phase === 'FFF' && <FFF />}
        {phase === 'HOST_INTRO' && <Host />}
        {phase === 'QUIZ' && <Quiz />}
        {(phase === 'WIN' || phase === 'LOSE' || phase === 'QUIT') && <Result />}
      </div>
    </main>
  );
}
