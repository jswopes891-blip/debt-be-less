import React, { useState } from 'react';
import {
  TrendingDown,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Zap,
  PiggyBank,
  Check
} from 'lucide-react';

export const EducationalSection: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<number>(100);

  // Sample scenario: $10,000 credit card balance @ 20% APR with $250 min payment (independently calculated)
  const scenarios: Record<number, { months: number; interest: number; yearsSaved: string; interestSaved: number }> = {
    0: { months: 67, interest: 6617, yearsSaved: '0 years', interestSaved: 0 },
    25: { months: 57, interest: 5499, yearsSaved: '10 months', interestSaved: 1118 },
    50: { months: 50, interest: 4718, yearsSaved: '1 year 5 months', interestSaved: 1899 },
    100: { months: 40, interest: 3692, yearsSaved: '2 years 3 months', interestSaved: 2925 },
    200: { months: 28, interest: 2595, yearsSaved: '3 years 3 months', interestSaved: 4022 },
  };

  const currentScenario = scenarios[selectedTier] || scenarios[100];
  const baselineScenario = scenarios[0];

  return (
    <section id="education" className="py-16 md:py-24 border-b border-white/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 block mb-2">
            Educational Visualizer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 title-serif tracking-tight">
            How an Interest Savings Calculator Helps You Pay Off Debt Faster
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Minimum payments on a <strong className="font-semibold text-blue-950">credit card payoff calculator</strong> illustrate how interest accumulates over time. See how adding even small monthly extra payments affects your <strong className="font-semibold text-blue-950">debt payoff schedule</strong> and can help you reach a debt-free date sooner.
          </p>
        </div>

        {/* Visual Illustration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Illustration 1: The Minimum Payment Trap */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/70">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold mb-4 shadow-sm">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 title-serif mb-2">1. Minimum Payment Dynamics</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When paying only the minimum, a substantial portion of your monthly payment often covers interest charges rather than reducing the balance. The exact portion going toward interest versus principal varies depending on the balance, interest rate, payment amount, and lender terms.
              </p>
            </div>

            {/* Visual Bar Diagram */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-2">
              <div className="text-xs text-slate-500 font-bold flex justify-between">
                <span>Payment Breakdown Example (High-APR Balance)</span>
              </div>
              <div className="h-6 w-full bg-slate-100 rounded-lg overflow-hidden flex">
                <div className="h-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center" style={{ width: '70%' }}>
                  ~70% Interest (Example)
                </div>
                <div className="h-full bg-slate-400 text-[10px] font-bold text-white flex items-center justify-center" style={{ width: '30%' }}>
                  ~30% Principal (Example)
                </div>
              </div>
            </div>
          </div>

          {/* Illustration 2: The Extra Payment Leverage */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/70">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4 shadow-sm">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 title-serif mb-2">2. Extra Payment Impact</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Additional payments can reduce the outstanding balance and may reduce future interest costs, depending on the lender's payment rules and whether there are accrued interest or fees.
              </p>
            </div>

            {/* Visual Bar Diagram */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-2">
              <div className="text-xs text-slate-500 font-bold flex justify-between">
                <span>Extra Payment Allocation</span>
              </div>
              <div className="h-6 w-full bg-slate-100 rounded-lg overflow-hidden flex">
                <div className="h-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center w-full">
                  Applied to Balance (Per Lender Terms)
                </div>
              </div>
            </div>
          </div>

          {/* Illustration 3: The Compound Rollover */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/70">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold mb-4 shadow-sm">
                <PiggyBank className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 title-serif mb-2">3. The Rollover Effect</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                As each loan is paid off, its payment amount can be rolled into your next priority debt, helping accelerate the payoff of subsequent balances.
              </p>
            </div>

            {/* Visual Bar Diagram */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-2">
              <div className="text-xs text-slate-500 font-bold flex justify-between">
                <span>Snowball Momentum Scale</span>
              </div>
              <div className="h-6 w-full bg-slate-100 rounded-lg overflow-hidden flex gap-1">
                <div className="h-full bg-teal-600 rounded text-[9px] font-bold text-white flex items-center justify-center w-1/4">Debt 1</div>
                <div className="h-full bg-teal-500 rounded text-[9px] font-bold text-white flex items-center justify-center w-2/4">Debt 2 (+Debt 1)</div>
                <div className="h-full bg-emerald-500 rounded text-[9px] font-bold text-white flex items-center justify-center w-1/4">Debt 3</div>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Comparison Simulator Box */}
        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto border border-white/80">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-2xl font-bold text-blue-950 title-serif">
              Simulate a $10,000 Credit Card Balance
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Select an extra monthly payment below to see how drastically it changes payoff time and interest:
            </p>
          </div>

          {/* Buttons for extra payment tiers */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[0, 25, 50, 100, 200].map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedTier(amount)}
                className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  selectedTier === amount
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105'
                    : 'bg-white/80 border border-slate-200 text-slate-700 hover:text-blue-950 hover:bg-white'
                }`}
              >
                {amount === 0 ? 'Minimums Only ($0)' : `+$${amount}/month`}
              </button>
            ))}
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/90 rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            
            {/* Standard Minimum Payment Result */}
            <div className="space-y-3 opacity-75">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Minimum Payment Only
              </span>
              <div className="text-3xl font-extrabold text-slate-800">
                {baselineScenario.months} Months
              </div>
              <div className="text-xs text-slate-600 font-medium">
                Total Interest Paid: <strong className="text-red-500">${baselineScenario.interest.toLocaleString()}</strong>
              </div>
            </div>

            {/* Extra Payment Result */}
            <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                With +${selectedTier}/month Extra
              </span>
              <div className="text-3xl font-extrabold text-emerald-600">
                {currentScenario.months} Months
              </div>
              <div className="text-xs text-slate-600 space-y-1 font-medium">
                <p>
                  Time Saved: <strong className="text-emerald-700">{currentScenario.yearsSaved} faster!</strong>
                </p>
                <p>
                  Interest Saved: <strong className="text-teal-700">${currentScenario.interestSaved.toLocaleString()} saved!</strong>
                </p>
              </div>
            </div>

          </div>

          <p className="text-center text-xs text-slate-500 mt-4 font-medium">
            Even an extra $25/month cuts nearly a year (10 months) off your payoff schedule and saves $1,118 in interest. Every bit adds up!
          </p>
        </div>

      </div>
    </section>
  );
};
