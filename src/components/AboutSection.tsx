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
  Compass
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
    'When could I reach my debt-free date?',
    'How much interest might I pay?',
    'What happens if I pay a little extra each month?',
    'Could a different payoff strategy help me get there faster?'
  ];

  const featuresList = [
    'Debt payoff calculations',
    'Debt-free date estimates',
    'Extra-payment savings',
    'Debt payoff strategies',
    'Debt Snowball information',
    'Debt Avalanche information',
    'Snowball vs. Avalanche comparisons',
    'Debt payoff progress tracking',
    'Frequently asked questions',
    'Educational articles about reducing debt'
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
            Why Debt Be Less?
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            When you're dealing with debt, complicated financial websites and confusing calculations can make an already stressful situation even harder.
          </p>
        </div>

        {/* Story & Philosophy Hero Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 mb-12 border border-white/80 shadow-lg">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Debt Be Less was created with a different idea:
            </p>
            
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-950 title-serif">
              Keep it simple.
            </h3>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              The Debt Be Less calculator lets you enter your debt information and see an estimated payoff timeline. You can also explore how making additional payments may change your payoff date and reduce the amount of interest you pay.
            </p>

            <div className="pt-2">
              <p className="text-lg sm:text-xl font-bold text-blue-950 title-serif">
                Seeing the numbers can make a big difference.
              </p>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Instead of wondering, <span className="italic font-medium text-slate-800">"When will I ever get this paid off?"</span>, you can start answering questions such as:
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

        {/* 2-Column Content Grid: "You Don't Have to Be Perfect" & "What You'll Find" */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: You Don't Have to Be Perfect */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-white/70">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shadow-sm">
                <HeartHandshake className="w-6 h-6" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 title-serif">
                You Don't Have to Be Perfect
              </h3>

              <p className="text-slate-700 text-base leading-relaxed">
                Paying off debt isn't always a straight line.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Some months you may be able to make an extra payment. Other months, you may only be able to make the minimum payment. Unexpected expenses happen. Life happens.
              </p>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-900">
                <p className="text-sm sm:text-base font-semibold leading-relaxed">
                  The important thing is to understand where you are and keep moving in the right direction whenever you can.
                </p>
                <p className="text-xs sm:text-sm text-emerald-700 mt-2 font-medium">
                  Even a small additional payment can make a difference over time.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: What You'll Find at Debt Be Less */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-white/70">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shadow-sm">
                <Layers className="w-6 h-6" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 title-serif">
                What You'll Find at Debt Be Less
              </h3>

              <p className="text-slate-700 text-base leading-relaxed">
                <strong className="font-semibold text-blue-950">Debt Be Less is more than a calculator.</strong>
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The site provides information and tools designed to help you understand different ways of paying down debt, including:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {featuresList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm font-medium text-slate-600 pt-2 border-t border-slate-200/70">
                The goal is to give you information you can actually use—not make debt management more complicated.
              </p>
            </div>
          </div>

        </div>

        {/* Card 3: A Tool, Not a Promise */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 mb-12 border border-white/70">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-1">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-950 title-serif">
                A Tool, Not a Promise
              </h3>
              
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Debt Be Less provides calculations and general educational information.
              </p>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Calculator results are estimates based on the information you enter and assumptions used by the calculator. Your actual results may be different because interest rates, minimum payments, fees, payment dates, balances, and other factors can change.
              </p>

              <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-700 space-y-2 text-xs sm:text-sm">
                <p>
                  <strong>Debt Be Less is not a bank, lender, credit counselor, financial institution, or investment adviser.</strong>
                </p>
                <p>
                  Nothing on this website should be considered personalized financial, legal, tax, or investment advice.
                </p>
                <p className="text-slate-600 text-xs">
                  If you're dealing with significant financial difficulties, consider speaking with a qualified financial professional or nonprofit credit counseling organization about your individual situation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Start With One Number (Interactive CTA Banner) */}
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
                Sometimes the first step toward becoming debt-free isn't paying off the entire balance.
              </p>
              <p className="text-sm sm:text-base text-slate-300">
                It's simply finding out where you stand.
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
