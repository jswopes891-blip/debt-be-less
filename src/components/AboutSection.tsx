

import React from 'react';
import {
  Sparkles,
  HelpCircle,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Info,
  Layers,
  Compass,
  Users,
  Lock,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface AboutSectionProps {
  onCalculateClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onCalculateClick }) => {
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (onCalculateClick) onCalculateClick();
  };

  const keyQuestions = [
    'How long will it take to pay off my debt?',
    'When could I reach my estimated debt-free date?',
    'How much interest might I accumulate over time?',
    'What happens if I add an extra $50 or $100 each month?',
    'Would the Snowball or Avalanche method fit my goals better?'
  ];

  const featuresList = [
    'Single-debt payoff calculator with variable frequencies',
    'Multi-debt portfolio organizer & priority sequencer',
    'Estimated debt-free timeline projections',
    'Extra-payment interest & time savings modeling',
    'Side-by-side Debt Snowball vs. Avalanche comparisons',
    'Visual month-by-month balance trajectory charts',
    'Step-by-step practical educational debt guide',
    'Comprehensive frequently asked questions (FAQ)'
  ];

  return (
    <section id="about" className="py-16 md:py-24 border-b border-white/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>About Debt Be Less</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-950 title-serif tracking-tight">
            Our Purpose, Values, and Transparency
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            When you are dealing with debt, confusing financial websites and aggressive sales pitches can make an already stressful situation even harder. Debt Be Less was created to offer an honest, free, and private alternative.
          </p>
        </div>

        {/* 1. Purpose & Mission Hero Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 mb-12 border border-white/80 shadow-lg">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-700">
              The Purpose of Debt Be Less
            </p>
            
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-950 title-serif">
              Clarity Through Clean, Honest Mathematics
            </h3>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              Many debt calculators online are primarily designed as lead-generation tools to capture your contact details and sell your information to high-interest consolidation lenders or for-profit settlement companies.
            </p>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              <strong>Debt Be Less operates differently.</strong> Our mission is to provide clean, accessible debt repayment modeling with complete transparency. You enter your numbers, explore how extra payments affect your timeline, compare proven strategies, and walk away with actionable clarity—without giving up your personal privacy or being pressured into financial products.
            </p>

            <div className="pt-2">
              <p className="text-lg sm:text-xl font-bold text-blue-950 title-serif">
                Seeing the numbers changes the conversation.
              </p>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Instead of wondering, <span className="italic font-medium text-slate-800">"When will I ever get this paid off?"</span>, you can answer concrete questions:
              </p>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-4">
              {keyQuestions.map((question, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-slate-200/70 shadow-sm ${
                    idx === keyQuestions.length - 1 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-800">{question}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Who We Help & What Visitors Can Do (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card: Who Debt Be Less Helps */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-white/70">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shadow-sm">
                <Users className="w-6 h-6" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 title-serif">
                Who This Site Helps
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Debt Be Less is built for everyday individuals, couples, recent graduates, and families navigating consumer debt, including:
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Credit Card Borrowers:</strong> Individuals paying high interest rates who want to see how quickly balances diminish when adding discretionary extra payments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Multi-Debt Households:</strong> People managing several loans simultaneously who need a structured priority sequence (Snowball vs. Avalanche).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Planners Seeking Objectivity:</strong> Borrowers who want neutral mathematical comparisons rather than promotional loan sales pitches.</span>
                </li>
              </ul>

              <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200/80 text-slate-700 text-xs sm:text-sm">
                Paying off debt isn't a moral test—it is a financial project. Understanding where you stand is the most effective first step toward progress.
              </div>
            </div>
          </div>

          {/* Card: What You Can Do With Free Tools */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-white/70">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-sm">
                <Layers className="w-6 h-6" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 title-serif">
                What You Can Do Here
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                All features on Debt Be Less are 100% free, require no account creation, and perform calculations locally:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {featuresList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 text-xs sm:text-sm">
                <strong>No Paywalls, No Subscriptions:</strong> Every tool, comparison feature, and guide is openly available to any visitor without restrictions.
              </div>
            </div>
          </div>

        </div>

        {/* 3. Honest Background & Zero-Tracking Privacy (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card: Honest Background (No Fake Credentials or Testimonials) */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/70 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shadow-sm">
              <FileCheck className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-blue-950 title-serif">
              Honest Background
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Debt Be Less is an independent educational website created to provide clear, accessible debt payoff calculations and general personal finance information.
            </p>

            <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>Independence &amp; Transparency:</strong> The site is not affiliated with, endorsed by, or partnered with any bank, lender, credit card issuer, credit counseling service, or financial institution.
              </p>
              <p>
                The site does not claim certified financial qualifications, professional licensing, or institutional affiliations. We do not publish manufactured testimonials, invented credentials, or sponsored endorsements. All calculations are derived from standard amortization mathematics and published consumer finance education resources.
              </p>
            </div>
          </div>

          {/* Card: Client-Side Privacy Architecture */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/70 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-sm">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-blue-950 title-serif">
              100% In-Browser Privacy
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Your debt details and financial balances are personal. We respect that by keeping your data on your device.
            </p>

            <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>Local Computation:</strong> When you enter balances, interest rates, or extra payments into our calculator, the calculations run entirely inside your browser's JavaScript engine.
              </p>
              <p>
                We do not store your balances on external servers, we do not require account registration, and we do not sell or transmit your financial inputs to third-party lenders, credit bureaus, or advertising networks.
              </p>
            </div>
          </div>

        </div>

        {/* 4. Limitations of the Estimates & Disclaimers */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 mb-12 border border-white/70">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-1">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-950 title-serif">
                Limitations of the Estimates &amp; Educational Notice
              </h3>
              
              <p>
                While the mathematical models used by Debt Be Less are accurate under standard amortization assumptions, real-world credit accounts have variables that may cause actual outcomes to differ:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-blue-950 block mb-1">Variable Interest Rates</strong>
                  Most credit card APRs fluctuate with the Federal Prime Rate, altering future interest charges.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-blue-950 block mb-1">Daily Compounding &amp; Fees</strong>
                  Lenders compute daily periodic interest and may assess late, annual, or transfer fees not included in the model.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-blue-950 block mb-1">No Guarantees</strong>
                  Payoff dates are educational estimates, not guaranteed outcomes. Discipline and steady payments are essential.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 space-y-1.5 text-xs">
                <p className="font-bold text-slate-900">
                  Disclaimer of Professional Advice:
                </p>
                <p>
                  Debt Be Less is not a financial advisory service, law firm, accounting practice, or credit counseling agency. Nothing on this website constitutes personalized financial, legal, investment, or tax advice. If you face severe financial distress, consider contacting a certified nonprofit credit counseling organization through the National Foundation for Credit Counseling (NFCC.org).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Start With One Number (Interactive CTA Banner) */}
        <div className="glass-panel-dark rounded-3xl p-8 sm:p-12 text-center text-white border border-white/20 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-semibold">
              <Calculator className="w-4 h-4 text-emerald-300" />
              <span>Step-by-Step Clarity</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-white title-serif tracking-tight">
              Start With One Number
            </h3>

            <div className="space-y-3 text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              <p>You don't have to figure everything out today.</p>
              <p>Start by entering your debt information into the calculator.</p>
              <p className="font-semibold text-emerald-300">See where you are.</p>
              <p>Then see what happens if you make a little extra payment.</p>
              <p className="pt-2 text-sm sm:text-base text-slate-300">
                Sometimes the first step toward becoming debt-free isn't paying off the entire balance immediately.
              </p>
              <p className="text-sm sm:text-base text-slate-300">
                It's simply knowing where you stand.
              </p>
              <p className="font-medium text-white">
                That's what Debt Be Less is here to help you do.
              </p>
            </div>

            {/* Motto */}
            <div className="pt-4 pb-2">
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 title-serif tracking-tight block">
                Less debt. More clarity. One step at a time.
              </span>
            </div>

            {/* Action button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={scrollToCalculator}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
                <span>Start With Your First Debt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
