import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Heart,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Flame,
  Lightbulb,
  Smile,
  Compass
} from 'lucide-react';
import { SingleCalculatorInputs, SingleCalculatorResult, Debt, StrategyType, CalculationResult } from '../types';
import { calculateSingleDebtPayoff, calculateDebtPayoff } from '../utils/calculatorEngine';

interface FinancialCoachingProps {
  mode: 'single' | 'multi';
  // Single mode props
  singleInputs?: SingleCalculatorInputs;
  singleResult?: SingleCalculatorResult;
  onApplySingleBoost?: (additionalAmount: number) => void;

  // Multi mode props
  debts?: Debt[];
  extraPaymentMulti?: number;
  strategy?: StrategyType;
  multiResult?: CalculationResult;
  onApplyMultiBoost?: (additionalAmount: number) => void;
}

export const FinancialCoaching: React.FC<FinancialCoachingProps> = ({
  mode,
  singleInputs,
  singleResult,
  onApplySingleBoost,
  debts,
  extraPaymentMulti,
  strategy,
  multiResult,
  onApplyMultiBoost,
}) => {
  // Single Debt Coaching Insights
  const singleCoachingData = useMemo(() => {
    if (mode !== 'single' || !singleInputs || !singleResult) return null;

    // Calculate boost scenario: +$50 extra
    const boostInputs = {
      ...singleInputs,
      extraPayment: singleInputs.extraPayment + 50,
    };
    const boostResult = calculateSingleDebtPayoff(boostInputs);

    const monthsSooner = Math.max(0, singleResult.monthsToPayoff - boostResult.monthsToPayoff);
    const additionalInterestSaved = Math.max(0, singleResult.totalInterestPaid - boostResult.totalInterestPaid);

    // Calculate +$100 boost scenario
    const boostInputs100 = {
      ...singleInputs,
      extraPayment: singleInputs.extraPayment + 100,
    };
    const boostResult100 = calculateSingleDebtPayoff(boostInputs100);
    const monthsSooner100 = Math.max(0, singleResult.monthsToPayoff - boostResult100.monthsToPayoff);
    const additionalInterestSaved100 = Math.max(0, singleResult.totalInterestPaid - boostResult100.totalInterestPaid);

    return {
      debtFreeDate: singleResult.debtFreeDateLabel,
      monthsToPayoff: singleResult.monthsToPayoff,
      yearsToPayoff: singleResult.yearsToPayoffLabel,
      totalSavedSoFar: singleResult.interestSaved,
      hasExtra: singleInputs.extraPayment > 0,
      boost50: {
        monthsSooner,
        additionalInterestSaved,
        newDate: boostResult.debtFreeDateLabel,
      },
      boost100: {
        monthsSooner: monthsSooner100,
        additionalInterestSaved: additionalInterestSaved100,
        newDate: boostResult100.debtFreeDateLabel,
      }
    };
  }, [mode, singleInputs, singleResult]);

  // Multi Debt Coaching Insights
  const multiCoachingData = useMemo(() => {
    if (mode !== 'multi' || !debts || !multiResult || extraPaymentMulti === undefined || !strategy) return null;

    const boostMultiResult = calculateDebtPayoff(debts, extraPaymentMulti + 50, strategy);
    const monthsSooner = Math.max(0, multiResult.monthsToPayoff - boostMultiResult.monthsToPayoff);
    const additionalInterestSaved = Math.max(0, multiResult.totalInterestPaid - boostMultiResult.totalInterestPaid);

    return {
      payoffDate: multiResult.payoffDateLabel,
      monthsToPayoff: multiResult.monthsToPayoff,
      debtCount: debts.length,
      totalSaved: multiResult.interestSaved,
      boost50: {
        monthsSooner,
        additionalInterestSaved,
        newDate: boostMultiResult.payoffDateLabel,
      }
    };
  }, [mode, debts, multiResult, extraPaymentMulti, strategy]);

  if (mode === 'single' && singleCoachingData && singleResult) {
    const { debtFreeDate, boost50, hasExtra, totalSavedSoFar } = singleCoachingData;

    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-blue-950 to-slate-950 p-6 sm:p-8 text-white shadow-2xl border border-emerald-500/30 my-8"
      >
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Header Badge & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-inner">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 block">
                  Personal Financial Coach
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white title-serif tracking-tight">
                  Your Path to Financial Freedom
                </h4>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Encouragement & Strategy Engine</span>
            </span>
          </div>

          {/* Core Congratulations Message */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-400 text-slate-950 shrink-0 mt-0.5 shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-base sm:text-lg font-bold text-white leading-snug">
                  🎉 Congratulations! At your current payment plan, you will become <span className="text-emerald-300 underline decoration-emerald-400/50 underline-offset-4">completely debt-free by {debtFreeDate}</span>!
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Every step you take brings you closer to owning 100% of your income. You are building momentum toward peace of mind and financial sovereignty.
                </p>
              </div>
            </div>
          </div>

          {/* Boost Insight Card: "What If You Increase by $50" */}
          {boost50.monthsSooner > 0 && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-transparent border border-emerald-400/30 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Accelerate Your Momentum
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                  💡 If you increase your payment by <strong className="text-emerald-300">only $50 per month</strong>, you could become debt-free <strong className="text-emerald-300">{boost50.monthsSooner} months sooner</strong> ({boost50.newDate}) and save an extra <strong className="text-emerald-300">${boost50.additionalInterestSaved.toLocaleString()}</strong> in interest!
                </p>
              </div>

              {onApplySingleBoost && (
                <button
                  type="button"
                  onClick={() => onApplySingleBoost(50)}
                  className="whitespace-nowrap px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 cursor-pointer flex items-center justify-center gap-2 shrink-0 group"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Try +$50/mo Boost</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          )}

          {/* Motivational Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block">Mindset Check</span>
                <span className="text-xs font-bold text-slate-200">Zero Guilt, Pure Progress</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block">Interest Advantage</span>
                <span className="text-xs font-bold text-slate-200">
                  ${totalSavedSoFar.toLocaleString()} Interest Slashed
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block">Financial Peace</span>
                <span className="text-xs font-bold text-slate-200">Freedom is 100% Attainable</span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    );
  }

  if (mode === 'multi' && multiCoachingData && multiResult) {
    const { payoffDate, debtCount, totalSaved, boost50 } = multiCoachingData;

    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-blue-950 to-slate-950 p-6 sm:p-8 text-white shadow-2xl border border-emerald-500/30 my-8"
      >
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-inner">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 block">
                  Multi-Debt Strategic Coach
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white title-serif tracking-tight">
                  Your Master Plan to Total Debt Freedom
                </h4>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Multi-Debt Accelerator</span>
            </span>
          </div>

          {/* Core Congratulations Message */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-400 text-slate-950 shrink-0 mt-0.5 shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-base sm:text-lg font-bold text-white leading-snug">
                  🎉 Outstanding progress! By executing your <strong className="text-emerald-300 uppercase">{strategy} Strategy</strong>, you will eliminate all <strong className="text-emerald-300">{debtCount} debt accounts</strong> and be 100% debt-free by <span className="text-emerald-300 underline decoration-emerald-400/50 underline-offset-4">{payoffDate}</span>!
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Your strategy is active, organized, and optimized. Already saving <strong>${totalSaved.toLocaleString()}</strong> in interest compared to minimum-only payments!
                </p>
              </div>
            </div>
          </div>

          {/* Boost Insight Card */}
          {boost50.monthsSooner > 0 && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-transparent border border-emerald-400/30 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Accelerate Your Freedom Timeline
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                  💡 If you add <strong className="text-emerald-300">+$50 more per month</strong> to your extra payment pool, you could eliminate all debts <strong className="text-emerald-300">{boost50.monthsSooner} months sooner</strong> ({boost50.newDate}) and save an additional <strong className="text-emerald-300">${boost50.additionalInterestSaved.toLocaleString()}</strong>!
                </p>
              </div>

              {onApplyMultiBoost && (
                <button
                  type="button"
                  onClick={() => onApplyMultiBoost(50)}
                  className="whitespace-nowrap px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 cursor-pointer flex items-center justify-center gap-2 shrink-0 group"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Boost Extra Payment +$50</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          )}

        </div>
      </motion.div>
    );
  }

  return null;
};
