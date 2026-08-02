import React from 'react';
import { Calendar, DollarSign, Compass, ArrowUpRight } from 'lucide-react';

interface BenefitsSectionProps {
  onCardClick: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onCardClick }) => {
  const benefits = [
    {
      icon: Calendar,
      title: 'Find Your Debt-Free Date',
      description:
        'Transform vague debt stress into a precise, crystal-clear calendar milestone. See the exact month and year when every credit card and loan is paid off in full.',
      highlight: 'Clear Calendar Target',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: DollarSign,
      title: 'Save Thousands in Interest',
      description:
        'Uncover how interest compounding drains your wallet each month. Learn how applying even modest extra payments crushes interest before it accumulates.',
      highlight: 'Direct Dollar Savings',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      icon: Compass,
      title: 'Build a Personalized Payoff Plan',
      description:
        'Compare proven payoff strategies tailored to your exact debts and budget. Get a custom step-by-step roadmap that keeps you motivated until $0 balance.',
      highlight: 'Custom Step-by-Step Strategy',
      color: 'from-teal-600 to-emerald-700',
    },
  ];

  return (
    <section id="benefits" className="py-16 md:py-24 border-b border-white/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 mb-2">
            Why Use Debt Be Less
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-blue-950 title-serif tracking-tight">
            Take Full Control with a Financial Freedom Calculator
          </p>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Say goodbye to minimum payment treadmills. Our comprehensive <strong className="font-semibold text-blue-950">debt payoff planner</strong> provides total clarity, interest savings projections, and a proven route to complete financial independence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  const el = document.getElementById('calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  onCardClick();
                }}
                className="glass-card glass-card-hover rounded-2xl p-8 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} text-white flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-7 h-7 stroke-[2]" />
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/80 border border-slate-200/80 text-blue-950 mb-3">
                    {benefit.highlight}
                  </span>

                  <h3 className="text-2xl font-bold text-blue-950 title-serif mb-3 group-hover:text-emerald-600 transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center text-sm font-bold text-emerald-600 group-hover:text-emerald-700">
                  <span>Calculate this for your debts</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
