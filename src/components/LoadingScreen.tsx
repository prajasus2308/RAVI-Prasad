import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface LoadingScreenProps {
  name: string;
  designation: string;
  organization: string;
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  name,
  designation,
  organization,
  onFinish
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let rafId: number;
    const duration = 10000; // 10 seconds loading animation
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const currentProgress = Math.round(t * 100);
      setProgress(currentProgress);

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !isExiting) {
      const holdTimer = setTimeout(() => {
        setIsExiting(true);
        const doneTimer = setTimeout(() => {
          onFinish();
        }, 650);
        return () => clearTimeout(doneTimer);
      }, 300);

      return () => clearTimeout(holdTimer);
    }
  }, [progress, isExiting, onFinish]);

  const handleEnterNow = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onFinish();
    }, 500);
  };

  // SVG circular gauge geometry
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getStatusLabel = (pct: number) => {
    if (pct < 25) return 'INITIALIZING PORTFOLIO';
    if (pct < 50) return 'LOADING 20+ YRS CAREER TIMELINE';
    if (pct < 75) return 'CALIBRATING 350 M³ BF BENCHMARKS';
    if (pct < 100) return 'SYNCHRONIZING EXECUTIVE INTERFACE';
    return 'READY';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to My Portfolio Loading Screen"
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#070C17] text-[#F8FAFC] select-none overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isExiting
          ? 'opacity-0 -translate-y-6 scale-[1.02] pointer-events-none'
          : 'opacity-100 translate-y-0 scale-100'
      }`}
    >
      {/* Ultra-Clean Subtle Architectural Grid & Molten Horizon Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #94A3B8 1px, transparent 1px), linear-gradient(to bottom, #94A3B8 1px, transparent 1px)',
            backgroundSize: '64px 64px'
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-amber-500/[0.07] rounded-full blur-[130px]" />
      </div>

      {/* Top Minimal Bar */}
      <div className="relative z-10 responsive-container pt-6 sm:pt-8 flex items-center justify-between text-[11px] font-mono tracking-widest text-slate-400">
        <span>PORTFOLIO // {new Date().getFullYear()}</span>
        <button
          type="button"
          onClick={handleEnterNow}
          className="min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <span>ENTER</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Choreographed Welcome Typography & SVG Gauge Ring */}
      <div className="relative z-10 px-6 flex flex-col items-center text-center max-w-2xl mx-auto my-auto space-y-7">
        {/* Precision SVG Circular Progress Emblem */}
        <div className="animate-intro-rise-1 relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 92 92">
            <circle
              cx="46"
              cy="46"
              r={radius}
              fill="none"
              stroke="rgba(51, 65, 85, 0.45)"
              strokeWidth="1.75"
            />
            <circle
              cx="46"
              cy="46"
              r={radius}
              fill="none"
              stroke="#FBBF24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-[stroke-dashoffset] duration-75 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-lg font-bold tracking-tight text-white">RP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />
          </div>
        </div>

        {/* Main Welcome Typography */}
        <div className="space-y-3">
          <p className="animate-intro-rise-1 text-xs font-mono tracking-[0.24em] uppercase text-amber-400">
            Executive Portfolio
          </p>

          <h1 className="animate-intro-rise-2 font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gold-shimmer leading-[1.12]">
            Welcome to My Portfolio
          </h1>

          <div className="animate-intro-rise-3 pt-2 space-y-1">
            <div className="text-base sm:text-lg font-semibold text-slate-100 tracking-tight">
              {name}
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {designation} · {organization}
            </p>
          </div>
        </div>

        {/* Minimal Hair-Line Progress Track */}
        <div className="animate-intro-rise-3 w-full max-w-xs sm:max-w-sm space-y-2.5 pt-2">
          <div className="h-[2px] w-full bg-slate-800/90 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-slate-400">
            <span>{getStatusLabel(progress)}</span>
            <span className="text-amber-400 font-semibold tabular-nums">
              {String(progress).padStart(3, '0')}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Minimal Architectural Footer Strip */}
      <div className="relative z-10 responsive-container pb-6 sm:pb-8 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>20+ YEARS BLAST FURNACE LEADERSHIP</span>
        <span>KHARAGPUR, INDIA</span>
      </div>
    </div>
  );
};
