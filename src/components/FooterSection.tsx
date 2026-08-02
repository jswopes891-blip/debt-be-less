import React, { useState } from 'react';
import { ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { FooterModals } from './FooterModals';

export const FooterSection: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'disclaimer' | 'contact' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-slate-900/90 backdrop-blur-md text-slate-300 border-t border-white/20 text-sm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-bold text-white title-serif">
                  Debt <span className="text-emerald-400">Be Less</span>
                </span>
                <span className="block text-xs text-slate-300">
                  Your plan to keep moving toward a lesser debt.
                </span>
              </div>
            </div>

            {/* Footer Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
              <button
                onClick={() => setActiveModal('privacy')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveModal('terms')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Terms
              </button>
              <button
                onClick={() => setActiveModal('disclaimer')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Disclaimer
              </button>
              <button
                onClick={() => setActiveModal('contact')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>

            {/* Back to top button */}
            <div>
              <button
                onClick={scrollToTop}
                className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-slate-200 hover:text-white transition-colors flex items-center gap-2 text-xs font-semibold cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-4 h-4 text-emerald-400" />
              </button>
            </div>

          </div>

          {/* Copyright & Disclaimer note */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} Debt Be Less. All rights reserved. Free educational financial tool.
            </p>
            <p className="flex items-center gap-1 text-slate-400">
              <span>Empowering financial peace &amp; debt independence</span>
            </p>
          </div>

        </div>
      </footer>

      {/* Modal Dialog Manager */}
      <FooterModals modalType={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
};
