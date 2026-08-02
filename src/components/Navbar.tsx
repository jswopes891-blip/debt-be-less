import React, { useState } from 'react';
import { ShieldCheck, CalendarCheck, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  onCalculateClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCalculateClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/75 backdrop-blur-md border-b border-white/50 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-blue-950 title-serif flex items-center gap-1.5">
                Debt <span className="text-emerald-600 font-bold font-sans">Be Less</span>
              </span>
              <span className="block text-xs text-slate-500 font-medium">
                Your plan to keep moving toward a lesser debt.
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button
              onClick={() => scrollToSection('benefits')}
              className="hover:text-emerald-600 transition-colors py-2 cursor-pointer"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="hover:text-emerald-600 transition-colors py-2 cursor-pointer"
            >
              Calculator
            </button>
            <button
              onClick={() => scrollToSection('strategies')}
              className="hover:text-emerald-600 transition-colors py-2 cursor-pointer"
            >
              Payoff Strategies
            </button>
            <button
              onClick={() => scrollToSection('education')}
              className="hover:text-emerald-600 transition-colors py-2 cursor-pointer"
            >
              Extra Payment Savings
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-emerald-600 transition-colors py-2 cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => {
                scrollToSection('calculator');
                onCalculateClick();
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center gap-2 text-sm cursor-pointer active:scale-95"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Calculate Freedom Date</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-blue-950 hover:bg-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('benefits')}
            className="block w-full text-left py-2 px-3 text-slate-700 hover:bg-slate-100 rounded-lg text-base font-medium"
          >
            Benefits
          </button>
          <button
            onClick={() => scrollToSection('calculator')}
            className="block w-full text-left py-2 px-3 text-slate-700 hover:bg-slate-100 rounded-lg text-base font-medium"
          >
            Calculator
          </button>
          <button
            onClick={() => scrollToSection('strategies')}
            className="block w-full text-left py-2 px-3 text-slate-700 hover:bg-slate-100 rounded-lg text-base font-medium"
          >
            Payoff Strategies
          </button>
          <button
            onClick={() => scrollToSection('education')}
            className="block w-full text-left py-2 px-3 text-slate-700 hover:bg-slate-100 rounded-lg text-base font-medium"
          >
            Extra Payment Savings
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 px-3 text-slate-700 hover:bg-slate-100 rounded-lg text-base font-medium"
          >
            FAQ
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                scrollToSection('calculator');
                onCalculateClick();
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculate Freedom Date</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
