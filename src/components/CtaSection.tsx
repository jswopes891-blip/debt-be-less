import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, CalendarCheck } from 'lucide-react';

interface CtaSectionProps {
  onCalculateClick: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onCalculateClick }) => {
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    onCalculateClick();
  };

  return (
    <section className="py-20 relative overflow-hidden border-b border-white/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Glass Dark Container */}
        <div className="glass-panel-dark rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white border border-white/20 shadow-2xl relative overflow-hidden space-y-8">
          
          {/* Subtle internal mesh glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Take the First Step Today</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-bold text-white title-serif tracking-tight max-w-3xl mx-auto leading-tight">
            Start Your Journey Toward Financial Freedom Today
          </h2>

          {/* Subtitle */}
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            No sign-ups, no fees, and no bank linking required. Calculate your debt-free date in under two minutes and map out your path to total financial peace.
          </p>

          {/* Large Green Button */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={scrollToCalculator}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-lg px-9 py-4 rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>Calculate My Freedom Date</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Confidentiality note */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Your data stays 100% in your browser. We never store or sell personal info.</span>
          </div>

        </div>

      </div>
    </section>
  );
};
