import React from 'react';
import { Calendar, TrendingDown, DollarSign, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onCalculateClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCalculateClick }) => {
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    onCalculateClick();
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/40">
      {/* Subtle Ambient Mesh Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-white/80 text-emerald-800 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Free &amp; Confidential • No Account or Credit Card Needed</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-950 title-serif tracking-tight leading-[1.15]">
            See Your Debt Payoff Date—and Find Ways to Reach It Sooner
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            <span className="font-bold text-blue-950 block mb-2 text-xl sm:text-2xl tracking-tight">
              Your plan to keep moving toward a lesser debt.
            </span>
            Use our free <strong className="font-semibold text-blue-950">debt payoff calculator</strong> and <strong className="font-semibold text-blue-950">Debt Be Less planner</strong> to calculate your exact payoff date, build a custom <strong className="font-semibold text-blue-950">debt payoff schedule</strong>, and see how to <strong className="font-semibold text-emerald-700">pay off debt faster</strong> with real-time interest savings.
          </p>

          {/* Large CTA Button */}
          <div className="pt-2 pb-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToCalculator}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>Calculate My Freedom Date</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Key Quick Benefits List */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-700 text-xs sm:text-sm font-semibold border-t border-slate-200/80 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 py-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Exact Payoff Timeline</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Snowball vs Avalanche</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Interest Savings Visualizer</span>
            </div>
          </div>

        </div>

        {/* Hero Visual Card Preview */}
        <div className="mt-12 max-w-4xl mx-auto glass-card rounded-2xl p-6 shadow-xl border border-white/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            
            <div className="bg-white/90 rounded-xl p-4 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
                <span>ESTIMATED FREEDOM DATE</span>
                <Calendar className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-emerald-600">Oct 2027</div>
              <div className="text-xs text-slate-500 mt-1">26 Months ahead of standard plan</div>
            </div>

            <div className="bg-white/90 rounded-xl p-4 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
                <span>TOTAL INTEREST SAVED</span>
                <TrendingDown className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-extrabold text-blue-950">$4,850.00</div>
              <div className="text-xs text-slate-500 mt-1">By adding +$100/mo extra payment</div>
            </div>

            <div className="bg-white/90 rounded-xl p-4 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
                <span>STRATEGY MATCH</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-extrabold text-amber-600">Debt Avalanche</div>
              <div className="text-xs text-slate-500 mt-1">Maximum mathematical savings</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
