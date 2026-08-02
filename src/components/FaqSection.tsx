import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQItem } from '../types';

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Strategy',
    question: 'What is the main difference between the Debt Snowball and Debt Avalanche methods?',
    answer:
      'The Debt Snowball method focuses on paying off your smallest debt balances first to give you fast psychological wins and momentum. The Debt Avalanche method focuses on paying off debts with the highest interest rates (APR) first to save the maximum amount of money in interest over time. Both methods are effective—choose Snowball if you need quick motivation or Avalanche if you prefer mathematical savings.',
  },
  {
    id: 'faq-2',
    category: 'Budgeting',
    question: 'Should I save an emergency fund before aggressively paying off debt?',
    answer:
      'Yes! Most financial planners recommend building a small starter emergency fund of $1,000 to $2,000 before pouring all extra income into debt. Having a liquid buffer prevents you from relying on credit cards again when an unexpected car repair or medical bill arises.',
  },
  {
    id: 'faq-3',
    category: 'Payments',
    question: 'What happens if I can only afford minimum payments right now?',
    answer:
      'Making minimum payments keeps your accounts in good standing and protects your credit score, but it prolongs your debt timeline and increases interest costs. If money is tight right now, focus on maintaining minimum payments, auditing your monthly expenses, and applying any small windfalls (tax refunds, side income) directly to principal until your budget opens up.',
  },
  {
    id: 'faq-4',
    category: 'Credit Score',
    question: 'Does paying off debt improve my credit score?',
    answer:
      'In almost all cases, yes! Your Credit Utilization Ratio (the percentage of available credit you are using) accounts for about 30% of your total credit score. As you reduce card balances below 30% and eventually 10%, your credit score will generally increase significantly.',
  },
  {
    id: 'faq-5',
    category: 'Consolidation',
    question: 'Should I consolidate my debts or transfer balances to a 0% APR card?',
    answer:
      'Balance transfer cards or low-interest debt consolidation loans can be powerful tools to temporarily pause high interest rates. However, they only work if you stop using credit cards and follow a strict payoff plan. Without a solid plan, balance transfers can create a false sense of security and lead to double the debt if old cards are charged up again.',
  },
  {
    id: 'faq-6',
    category: 'Calculator',
    question: 'How does this debt payoff calculator and debt freedom planner work?',
    answer:
      'Our free debt payoff calculator projects your exact debt-free date and total interest paid by combining your balances, interest rates (APR), and monthly payments. You can easily compare Snowball vs. Avalanche strategies, simulate credit card payoff calculator scenarios, and generate a customized debt payoff schedule to pay off debt faster.',
  },
];

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 md:py-24 border-b border-white/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 block mb-2">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 title-serif tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Everything you need to know about debt payoff strategies, interest savings, and financial planning.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl overflow-hidden border border-white/70 shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center justify-center flex-shrink-0">
                      Q
                    </span>
                    <span className="text-base sm:text-lg font-bold text-blue-950">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-slate-600 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 bg-emerald-50 text-emerald-700 border-emerald-300' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200/60 bg-white/40">
                    <p className="pl-11 font-medium">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
