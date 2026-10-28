import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingDown,
  Snowflake,
  Flame,
  ShieldCheck,
  Scale,
  ListOrdered,
  PiggyBank,
  DollarSign,
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const DebtPayoffGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'listing' | 'budget' | 'methods' | 'mistakes'>('all');

  return (
    <section id="guide" className="py-16 md:py-24 border-b border-white/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Comprehensive Educational Resource</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-950 title-serif tracking-tight">
            The Practical Debt Payoff Guide
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            A clear, step-by-step educational guide to organizing your balances, comparing payoff methods, choosing a sustainable budget, and avoiding common financial traps.
          </p>
        </div>

        {/* Quick Guide Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-blue-950 text-white shadow-md'
                : 'glass-card text-slate-600 hover:text-blue-950 hover:bg-white/90'
            }`}
          >
            Complete Guide
          </button>
          <button
            onClick={() => setActiveTab('listing')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'listing'
                ? 'bg-blue-950 text-white shadow-md'
                : 'glass-card text-slate-600 hover:text-blue-950 hover:bg-white/90'
            }`}
          >
            1. Listing Debts &amp; Budget
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'methods'
                ? 'bg-blue-950 text-white shadow-md'
                : 'glass-card text-slate-600 hover:text-blue-950 hover:bg-white/90'
            }`}
          >
            2. Snowball vs. Avalanche
          </button>
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'mistakes'
                ? 'bg-blue-950 text-white shadow-md'
                : 'glass-card text-slate-600 hover:text-blue-950 hover:bg-white/90'
            }`}
          >
            3. Mistakes &amp; Realities
          </button>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="space-y-12">

          {/* CHAPTER 1: How to List Debts & Build a Realistic Budget */}
          {(activeTab === 'all' || activeTab === 'listing') && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/80 shadow-lg space-y-8">
              
              <div className="border-b border-slate-200/80 pb-6">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                  Phase 1: Getting Organized
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 title-serif">
                  How to Inventory Your Debts and Establish a Realistic Budget
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-2">
                  Before choosing a payoff order, you need a precise snapshot of what you owe. Relying on rough estimates or memory often causes people to miss interest rate adjustments or minimum payment changes.
                </p>
              </div>

              {/* Step 1.1: The 4 Vital Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-blue-950 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-sm font-extrabold flex items-center justify-center">1</span>
                    Gather the Four Essential Numbers for Every Account
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Collect the most recent monthly statements for each credit card, personal loan, auto loan, or student debt. Note these four data points:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Current Principal Balance:</strong> The total amount you owe right now.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Annual Percentage Rate (APR):</strong> The annual interest rate charged by the lender. Check whether it is fixed or variable.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Minimum Monthly Payment:</strong> The contractual minimum payment due each billing cycle to keep the account in good standing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Payment Due Date:</strong> The day of the month payment must post to avoid late fees.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-blue-950 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 text-sm font-extrabold flex items-center justify-center">2</span>
                    Build a Sustainable Monthly Repayment Budget
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A successful repayment plan requires a monthly payment amount you can maintain consistently for months or years.
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs sm:text-sm text-slate-700">
                    <p>
                      <strong>1. Calculate Essential Living Expenses:</strong> Tally your non-negotiable costs: housing, basic groceries, utilities, transportation, and health insurance.
                    </p>
                    <p>
                      <strong>2. Cover All Minimum Payments First:</strong> Sum the minimum monthly payments across all your debts. This is your non-negotiable debt baseline.
                    </p>
                    <p>
                      <strong>3. Determine Your Extra Acceleration Amount:</strong> Any cash left over after essentials and minimums represents your discretionary acceleration fund. Even $25, $50, or $100 per month significantly accelerates payoff.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Starter Emergency Buffer */}
              <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 flex flex-col sm:flex-row items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
                  <h5 className="font-bold text-sm sm:text-base text-amber-950">
                    Practical Example: Maintaining a Starter Emergency Cushion
                  </h5>
                  <p className="text-amber-900">
                    When paying down debt, having zero cash reserves can create vulnerability. If an unexpected emergency occurs—such as an urgent medical bill, car repair, or household expense—borrowers without a small cash buffer may feel forced to use high-interest credit cards again.
                  </p>
                  <p className="text-amber-900 font-semibold pt-1">
                    Illustrative Example, Not a Universal Requirement: Many financial educators suggest holding a small starter cushion—for example, $500, $1,000, or up to $1,500, or whatever modest amount fits an individual's budget—before directing all discretionary cash toward debt. This is an example guideline, not a rigid rule, as individual income stability, living expenses, and family circumstances vary widely.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* CHAPTER 2: Debt Snowball vs. Debt Avalanche Deep Dive */}
          {(activeTab === 'all' || activeTab === 'methods') && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/80 shadow-lg space-y-8">
              
              <div className="border-b border-slate-200/80 pb-6">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                  Phase 2: Strategy Mechanics
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 title-serif">
                  Snowball vs. Avalanche: Detailed Comparison &amp; Trade-Offs
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-2">
                  Both strategies are structured, debt-reduction acceleration frameworks. Neither strategy is universally superior; each solves a different challenge.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Method A: Debt Snowball Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-blue-800">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                        <Snowflake className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-blue-950">The Debt Snowball Method</h4>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      Behavioral Focus
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    In the Snowball method, you list all debts in order of <strong>smallest balance to largest balance</strong>, completely ignoring the interest rates. You pay the minimum on every debt, while sending your entire extra payment to the smallest balance until it hits zero.
                  </p>

                  <div className="space-y-2 pt-2 border-t border-blue-200/60">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-blue-900">Key Advantages:</h5>
                    <ul className="text-xs sm:text-sm space-y-1.5 text-slate-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Fast Psychological Wins:</strong> Crossing an entire account off your list in the first few months provides an emotional boost and builds momentum.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Reduces Complexity:</strong> Fewer creditors and due dates make monthly bill-paying easier to manage.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Frees Up Cash Flow:</strong> Eliminating a minimum payment obligation quickly gives you breathing room if your income fluctuates.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-blue-200/60">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900">Disadvantages:</h5>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      If your largest debts carry high interest rates (like 25% APR credit cards), leaving them until later means you will accumulate more total interest over the life of the payoff plan.
                    </p>
                  </div>
                </div>

                {/* Method B: Debt Avalanche Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-emerald-800">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                        <Flame className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-blue-950">The Debt Avalanche Method</h4>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Mathematical Focus
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    In the Avalanche method, you list all debts in order of <strong>highest interest rate (APR) to lowest interest rate</strong>, regardless of balance size. You make minimum payments on all accounts and direct all extra money to the debt with the highest APR.
                  </p>

                  <div className="space-y-2 pt-2 border-t border-emerald-200/60">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900">Key Advantages:</h5>
                    <ul className="text-xs sm:text-sm space-y-1.5 text-slate-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Minimizes Total Interest:</strong> Eliminating the most expensive borrowing costs first stops compounding interest from compounding against you.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Fastest Mathematical Path:</strong> In terms of pure numbers, paying the highest rate first guarantees the lowest total dollar cost.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Ideal for Analytical Minds:</strong> If you are motivated by spreadsheets and seeing dollar savings, Avalanche provides clear mathematical efficiency.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-emerald-200/60">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900">Disadvantages:</h5>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      If your highest-APR balance is large (e.g., $12,000 on a 24% card), it may take 18–24 months before you eliminate your first account. Without early milestones, some borrowers lose motivation.
                    </p>
                  </div>
                </div>

              </div>

              {/* Side-by-Side Comparison Matrix */}
              <div className="overflow-x-auto pt-4">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-300 bg-slate-100/80 text-blue-950">
                      <th className="p-3 font-bold">Comparison Factor</th>
                      <th className="p-3 font-bold text-blue-800">Debt Snowball</th>
                      <th className="p-3 font-bold text-emerald-800">Debt Avalanche</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Primary Goal</td>
                      <td className="p-3 text-slate-600">Behavioral momentum &amp; quick emotional wins</td>
                      <td className="p-3 text-slate-600">Total interest savings &amp; mathematical efficiency</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Prioritization Order</td>
                      <td className="p-3 text-slate-600">Lowest balance to highest balance</td>
                      <td className="p-3 text-slate-600">Highest interest rate (APR) to lowest</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">First Paid-Off Account</td>
                      <td className="p-3 text-slate-600">Usually achieved much sooner</td>
                      <td className="p-3 text-slate-600">May take longer if highest APR balance is high</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Total Interest Paid</td>
                      <td className="p-3 text-slate-600">Slightly higher if high-APR accounts are large</td>
                      <td className="p-3 text-slate-600">Mathematically lowest possible interest</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Best Suited For</td>
                      <td className="p-3 text-slate-600">Borrowers who feel overwhelmed and need early proof of progress</td>
                      <td className="p-3 text-slate-600">Disciplined borrowers who want to save the maximum money</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* CHAPTER 3: Common Payoff Mistakes & How to Avoid Them */}
          {(activeTab === 'all' || activeTab === 'mistakes') && (
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/80 shadow-lg space-y-8">
              
              <div className="border-b border-slate-200/80 pb-6">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                  Phase 3: Risk Management
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 title-serif">
                  Six Common Debt Payoff Mistakes and How to Avoid Them
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-2">
                  Paying off debt is rarely just about math. Understanding these practical stumbling blocks helps you stay consistent over the entire journey.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm sm:text-base">
                    <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-xs">1</span>
                    Continuing to Use Cards While Paying Them Down
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Adding new purchases to an account with an existing balance compounds your debt because new charges immediately accrue interest without the benefit of a grace period. Remove cards from digital wallets and store them safely out of sight while in payoff mode.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm sm:text-base">
                    <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-xs">2</span>
                    Adopting an Unrealistically Restrictive Budget
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Extreme "starvation budgets" that eliminate every social outing, hobby, or modest comfort frequently lead to fatigue and spending binges. Build a modest allowance for small personal joys into your plan to make long-term consistency sustainable.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm sm:text-base">
                    <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-xs">3</span>
                    Closing Paid-Off Accounts Without Understanding Utilization
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Closing an old credit card immediately reduces your total available credit limit, which can cause your overall credit utilization ratio to spike and negatively impact your credit score. Unless an account has an expensive annual fee, keeping it open with a zero balance is often advantageous.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm sm:text-base">
                    <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-xs">4</span>
                    Overlooking Promotional Rate Expirations
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    0% APR balance transfer promotions or "deferred interest" store promotions have hard deadlines. If a deferred-interest balance is not paid in full by the end date, retroactive interest from day one may be billed to your account. Always track the promotional end date carefully.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm sm:text-base">
                    <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-xs">5</span>
                    Falling for Upfront "Debt Settlement" Fees
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The Federal Trade Commission (FTC) warns consumers about for-profit debt relief companies that demand high upfront fees, instruct clients to stop paying lenders, and cause severe credit damage. Reputable nonprofit credit counseling agencies (NFCC) do not charge large upfront fees.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm sm:text-base">
                    <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-xs">6</span>
                    Giving Up Entirely When an Unplanned Expense Occurs
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Life happens. If you face a medical bill or job interruption, dropping down to minimum payments for a couple of months is not a failure. When the financial storm passes, simply resume your extra payments and keep moving forward.
                  </p>
                </div>

              </div>

              {/* Reputable Consumer Protection Sources */}
              <div className="p-6 rounded-2xl bg-slate-100/90 border border-slate-200 text-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-blue-950 font-bold text-sm sm:text-base">
                  <ExternalLink className="w-4 h-4 text-emerald-600" />
                  <span>Reputable Consumer Protection &amp; Primary Resources</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For official, government-backed consumer protection guidance on debt collection rights, credit card disclosures, and finding verified nonprofit credit assistance, explore these trusted public resources:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <a
                    href="https://www.consumerfinance.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 transition-colors block text-xs"
                  >
                    <span className="font-bold text-blue-950 block">CFPB</span>
                    <span className="text-slate-500 text-[11px] block mt-0.5">Consumer Financial Protection Bureau</span>
                    <span className="text-emerald-700 font-semibold text-[11px] mt-1 inline-flex items-center gap-1">
                      consumerfinance.gov <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>

                  <a
                    href="https://www.ftc.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 transition-colors block text-xs"
                  >
                    <span className="font-bold text-blue-950 block">FTC</span>
                    <span className="text-slate-500 text-[11px] block mt-0.5">Federal Trade Commission Consumer Advice</span>
                    <span className="text-emerald-700 font-semibold text-[11px] mt-1 inline-flex items-center gap-1">
                      ftc.gov <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>

                  <a
                    href="https://www.nfcc.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 transition-colors block text-xs"
                  >
                    <span className="font-bold text-blue-950 block">NFCC</span>
                    <span className="text-slate-500 text-[11px] block mt-0.5">National Foundation for Credit Counseling</span>
                    <span className="text-emerald-700 font-semibold text-[11px] mt-1 inline-flex items-center gap-1">
                      nfcc.org <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
