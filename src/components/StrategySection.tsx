import React from 'react';
import { Snowflake, Flame, ArrowRight, CheckCircle2, Award, Zap, HelpCircle } from 'lucide-react';

interface StrategySectionProps {
  onCompareClick: () => void;
}

export const StrategySection: React.FC<StrategySectionProps> = ({ onCompareClick }) => {
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    onCompareClick();
  };

  return (
    <section id="strategies" className="py-16 md:py-24 border-b border-white/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 block mb-2">
            Proven Payoff Frameworks
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 title-serif tracking-tight">
            Snowball vs. Avalanche: Which Is Right For You?
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Both strategies work infinitely better than making minimum payments alone. Choose the method that best aligns with your personality and financial goals.
          </p>
        </div>

        {/* Strategy Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Debt Snowball Method */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between border border-white/70">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                  <Snowflake className="w-8 h-8" />
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/80 border border-blue-200 text-blue-900 shadow-sm">
                  Best for Quick Wins
                </span>
              </div>

              <h3 className="text-2xl font-bold text-blue-950 title-serif mb-2">
                The Debt Snowball Method
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Pay off your debts in order of <strong>smallest balance first</strong>, regardless of interest rate. You pay minimums on everything, throwing every extra dollar at the smallest balance.
              </p>

              <div className="space-y-3 border-t border-slate-200/80 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">How It Works:</h4>
                <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>List debts from smallest balance to largest.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Knock out the smallest balance as quickly as possible.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Roll freed money into the next smallest balance like a snowball!</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-blue-50/80 border border-blue-200/80 rounded-2xl">
                <span className="text-xs font-bold text-blue-950 block mb-1">
                  💡 Psychological Superpower:
                </span>
                <p className="text-xs text-blue-900 leading-normal font-medium">
                  Early victories boost your dopamine and confidence, building unstoppable momentum that helps you stay committed for the long haul.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Debt Avalanche Method */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between border border-white/70">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <Flame className="w-8 h-8" />
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/80 border border-emerald-200 text-emerald-900 shadow-sm">
                  Best for Interest Savings
                </span>
              </div>

              <h3 className="text-2xl font-bold text-blue-950 title-serif mb-2">
                The Debt Avalanche Method
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Pay off your debts in order of <strong>highest interest rate (APR) first</strong>. You target high-cost debt relentlessly to minimize overall interest accumulation.
              </p>

              <div className="space-y-3 border-t border-slate-200/80 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">How It Works:</h4>
                <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>List debts from highest interest rate to lowest interest rate.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Attack the highest rate debt with all extra funds.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Once paid, transfer the entire budget to the next highest rate.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl">
                <span className="text-xs font-bold text-emerald-950 block mb-1">
                  💡 Mathematical Superpower:
                </span>
                <p className="text-xs text-emerald-900 leading-normal font-medium">
                  Saves the maximum possible amount in total interest charges and mathematically shortens your debt journey to the absolute minimum.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Compare Strategies Button */}
        <div className="text-center">
          <button
            onClick={scrollToCalculator}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all inline-flex items-center gap-3 cursor-pointer group"
          >
            <span>Compare Strategies</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-slate-500 mt-3 font-medium">
            Instantly toggle between Snowball and Avalanche in our calculator to see the exact dollar difference for your balances.
          </p>
        </div>

      </div>
    </section>
  );
};
