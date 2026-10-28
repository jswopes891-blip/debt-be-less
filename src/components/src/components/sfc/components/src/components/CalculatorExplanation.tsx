

import React, { useState } from 'react';
import {
  Calculator,
  HelpCircle,
  FileSpreadsheet,
  TrendingDown,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Percent,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle2,
  Info
} from 'lucide-react';

export const CalculatorExplanation: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<'single' | 'multi'>('single');

  return (
    <section id="calculator-guide" className="py-16 md:py-24 border-b border-white/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Under the Hood</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 title-serif tracking-tight">
            How the Calculator Works &amp; Worked Examples
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            Understanding the math behind debt repayment removes the mystery. Here is exactly what the inputs mean, how calculations are executed, and how to interpret your results.
          </p>
        </div>

        {/* 2-Column: Inputs vs Outputs Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Column 1: What Information You Enter */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/70 space-y-4">
            <div className="flex items-center gap-3 text-blue-950 border-b border-slate-200/80 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">What Information You Enter</h3>
                <p className="text-xs text-slate-500">The basic parameters required for the repayment model</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/70">
                <strong className="text-blue-950 block mb-0.5">1. Current Balance ($)</strong>
                The remaining principal you owe today on your card or loan as shown on your latest statement.
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/70">
                <strong className="text-blue-950 block mb-0.5">2. Annual Percentage Rate (APR %)</strong>
                The annual interest rate charged by your creditor. The calculator converts this to a monthly periodic rate (APR divided by 12).
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/70">
                <strong className="text-blue-950 block mb-0.5">3. Minimum Monthly Payment ($)</strong>
                The minimum amount required by the lender each billing cycle. This keeps the loan in good standing and avoids penalty fees.
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/70">
                <strong className="text-blue-950 block mb-0.5">4. Additional / Extra Payment ($)</strong>
                An optional extra amount you choose to pay each month. This extra amount directly reduces the principal balance each month.
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/70">
                <strong className="text-blue-950 block mb-0.5">5. Payment Frequency (Monthly vs. Bi-weekly)</strong>
                Paying bi-weekly equals 26 half-payments per year (equivalent to 13 full monthly payments), which accelerates principal reduction.
              </div>
            </div>
          </div>

          {/* Column 2: What the Results Mean */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/70 space-y-4">
            <div className="flex items-center gap-3 text-blue-950 border-b border-slate-200/80 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">What the Results Mean</h3>
                <p className="text-xs text-slate-500">How to interpret your generated estimates</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/70">
                <strong className="text-emerald-950 block mb-0.5">Estimated Payoff Date</strong>
                The projected month and year when your balance reaches exactly $0, assuming on-time payments and no new charges are added.
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/70">
                <strong className="text-emerald-950 block mb-0.5">Total Interest Paid</strong>
                The cumulative finance charges you will pay over the entire life of the debt from now until it is completely satisfied.
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/70">
                <strong className="text-emerald-950 block mb-0.5">Total Amount Paid</strong>
                The full out-of-pocket sum of your original principal balance plus all accrued interest combined.
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/70">
                <strong className="text-emerald-950 block mb-0.5">Interest Saved</strong>
                The dollar difference between the interest you would pay under minimum payments versus the accelerated payoff plan.
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-slate-200/70">
                <strong className="text-emerald-950 block mb-0.5">Time Saved (Months / Years)</strong>
                The number of months eliminated from your debt schedule as a direct result of making extra monthly payments.
              </div>
            </div>
          </div>

        </div>

        {/* Why Actual Results May Differ Box */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/70 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h4 className="text-base sm:text-lg font-bold text-blue-950">
                Why Actual Statements May Differ from Calculator Projections
              </h4>
              <p>
                The Debt Be Less calculator models standard monthly amortization. While very close to real-world figures, your official credit card or loan statement may show slight differences due to five key factors:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <strong className="text-blue-950 block">Daily Compounding (DPR):</strong>
                  Credit cards compute finance charges daily based on the average daily balance (APR ÷ 365 × days in cycle), rather than a single end-of-month calculation.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <strong className="text-blue-950 block">Shifting Minimum Payment Formulas:</strong>
                  Lenders typically recalculate required minimums downward as balances decline (e.g., 1% of balance plus interest). The calculator allows you to model fixed monthly payments to prevent dragged-out repayment.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <strong className="text-blue-950 block">Variable Interest Rates:</strong>
                  Most credit card APRs are variable, indexed to the Federal Reserve's Prime Rate. If the Prime Rate changes, your card's APR will adjust accordingly.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <strong className="text-blue-950 block">Account Fees &amp; New Purchases:</strong>
                  The calculator assumes no additional purchases, annual membership fees, late fees, or cash advance transaction fees are added to the balance.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WORKED EXAMPLES TABS */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/80 shadow-lg space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                Mathematically Consistent Illustrations
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 title-serif">
                Worked Examples with Real Numbers
              </h3>
            </div>
            
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                onClick={() => setSelectedExample('single')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedExample === 'single'
                    ? 'bg-blue-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-blue-950'
                }`}
              >
                Example 1: Single Debt ($10,000)
              </button>
              <button
                onClick={() => setSelectedExample('multi')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedExample === 'multi'
                    ? 'bg-blue-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-blue-950'
                }`}
              >
                Example 2: 3-Debt Portfolio ($12,500)
              </button>
            </div>
          </div>

          {/* Example 1: Single Debt ($10k @ 18.5%) */}
          {selectedExample === 'single' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-950 text-xs sm:text-sm">
                <strong>Hypothetical Scenario:</strong> A borrower has a <strong>$10,000</strong> credit card balance with an <strong>18.5% APR</strong>. The contractual minimum payment is <strong>$250/month</strong>. They want to see what happens if they add an extra <strong>$100/month</strong> (paying $350 total).
              </div>

              {/* Side-by-Side Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Baseline Option */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Option A: Minimum Payment Only
                  </span>
                  <div className="text-2xl font-bold text-slate-800">$250 / month</div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 border-t border-slate-200 pt-3">
                    <li className="flex justify-between">
                      <span>Payoff Timeline:</span>
                      <strong className="text-blue-950">63 Months (5 yrs 3 mos)</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Interest Paid:</span>
                      <strong className="text-amber-700">$5,669</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Cash Out of Pocket:</span>
                      <strong className="text-blue-950">$15,669</strong>
                    </li>
                  </ul>
                </div>

                {/* Accelerated Option */}
                <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                    Option B: Minimum + $100 Extra
                  </span>
                  <div className="text-2xl font-bold text-emerald-800">$350 / month</div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 border-t border-emerald-200 pt-3">
                    <li className="flex justify-between">
                      <span>Payoff Timeline:</span>
                      <strong className="text-emerald-950">38 Months (3 yrs 2 mos)</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Interest Paid:</span>
                      <strong className="text-emerald-800">$3,284</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Cash Out of Pocket:</span>
                      <strong className="text-emerald-950">$13,284</strong>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Verified Result Summary */}
              <div className="p-5 rounded-2xl bg-emerald-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-200">The Power of $100 Extra / Month</div>
                  <div className="text-xl sm:text-2xl font-bold title-serif">Saves $2,385 in Interest and Cuts 25 Months (Over 2 Years) Off Debt</div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md text-xs font-bold text-white shrink-0">
                  Verified Math
                </div>
              </div>
            </div>
          )}

          {/* Example 2: Multi-Debt Portfolio ($12,500 total) */}
          {selectedExample === 'multi' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-950 text-xs sm:text-sm">
                <strong>Hypothetical 3-Debt Portfolio:</strong>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                  <div className="p-2 rounded-lg bg-white/80 border border-blue-100">
                    <span className="font-bold block text-blue-950">Debt A: Medical / Small Loan</span>
                    <span className="text-slate-600">$1,500 balance @ 9.0% APR ($50 min)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/80 border border-blue-100">
                    <span className="font-bold text-blue-950 block">Debt B: Credit Card</span>
                    <span className="text-slate-600">$4,000 balance @ 22.0% APR ($110 min)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/80 border border-blue-100">
                    <span className="font-bold text-blue-950 block">Debt C: Auto Loan</span>
                    <span className="text-slate-600">$7,000 balance @ 14.0% APR ($180 min)</span>
                  </div>
                </div>
                <p className="mt-2 text-slate-700">
                  Total Debt: <strong>$12,500</strong>. Total Minimums: <strong>$340/month</strong>. Baseline payoff (minimums only) takes <strong>52 months</strong> with <strong>$5,011</strong> in interest. The borrower designates an extra <strong>$160/month</strong> ($500 total monthly debt budget).
                </p>
              </div>

              {/* Snowball vs Avalanche Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Snowball Plan */}
                <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                      Debt Snowball Order (Smallest Balance First)
                    </span>
                    <span className="text-xs font-bold text-blue-700">Priority: A → B → C</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 border-t border-blue-200 pt-3">
                    <li className="flex justify-between">
                      <span>Debt A ($1,500) Paid Off:</span>
                      <strong className="text-blue-950">Month 8 (Quick Win!)</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Debt B ($4,000) Paid Off:</span>
                      <strong className="text-blue-950">Month 21</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Debt C ($7,000) Paid Off:</span>
                      <strong className="text-blue-950">Month 31 (All Zero)</strong>
                    </li>
                    <li className="flex justify-between pt-1 border-t border-blue-100">
                      <span>Total Interest Paid:</span>
                      <strong className="text-blue-950">$2,813 ($2,198 saved)</strong>
                    </li>
                  </ul>
                </div>

                {/* Avalanche Plan */}
                <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                      Debt Avalanche Order (Highest Rate First)
                    </span>
                    <span className="text-xs font-bold text-emerald-700">Priority: B → C → A</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 border-t border-emerald-200 pt-3">
                    <li className="flex justify-between">
                      <span>Debt B ($4,000 @ 22%) Paid Off:</span>
                      <strong className="text-emerald-950">Month 18 (First zero balance)</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Debt C ($7,000 @ 14%) Paid Off:</span>
                      <strong className="text-emerald-950">Month 30</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Debt A ($1,500 @ 9%) Paid Off:</span>
                      <strong className="text-emerald-950">Month 31 (All Zero)</strong>
                    </li>
                    <li className="flex justify-between pt-1 border-t border-emerald-100">
                      <span>Total Interest Paid:</span>
                      <strong className="text-emerald-950">$2,566 ($2,445 saved)</strong>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Analysis of Trade-offs */}
              <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                <span className="font-bold text-blue-950 block">Understanding the Trade-Off:</span>
                <p>
                  Notice that both methods achieve a zero balance in <strong>Month 31</strong>. However:
                </p>
                <p>
                  • <strong>Snowball eliminates the first debt in Month 8</strong> (10 months earlier than Avalanche's Month 18 milestone), providing an early win and reducing open accounts from 3 to 2 quickly.
                </p>
                <p>
                  • <strong>Avalanche saves an additional $247 in interest</strong> ($2,566 vs. $2,813) because it tackled the expensive 22% credit card before the 9% small loan.
                </p>
                <p className="font-medium text-slate-800">
                  Conclusion: If early psychological momentum keeps you engaged, Snowball is an excellent behavioral choice. If maximizing every dollar of interest savings drives your discipline, Avalanche is mathematically superior.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
