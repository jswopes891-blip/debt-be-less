import React, { useState } from 'react';
import { X, ShieldCheck, FileText, AlertTriangle, Mail, Send, CheckCircle2 } from 'lucide-react';

interface FooterModalProps {
  modalType: 'privacy' | 'terms' | 'disclaimer' | 'contact' | null;
  onClose: () => void;
}

export const FooterModals: React.FC<FooterModalProps> = ({ modalType, onClose }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  if (!modalType) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.email.trim() || !contactForm.message.trim()) return;
    setContactSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel-dark border border-white/20 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal 1: Privacy Policy */}
        {modalType === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <ShieldCheck className="w-7 h-7" />
              <h3 className="text-2xl font-bold text-white">Privacy Policy</h3>
            </div>
            <p className="text-xs text-slate-400">Last updated: July 2026</p>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                At <strong>Debt Be Less</strong>, we respect your financial privacy. Our application is designed with client-side computation at its core.
              </p>
              <h4 className="text-white font-bold text-base pt-2">1. No Personal Financial Storage</h4>
              <p>
                We do not collect, store, transmit, or sell any credit card balances, interest rates, or loan numbers that you enter into our calculator. All calculations execute locally inside your browser session.
              </p>
              <h4 className="text-white font-bold text-base pt-2">2. Analytics & Cookies</h4>
              <p>
                We may use standard essential cookies or minimal aggregated performance analytics to improve site speed and accessibility. No financial profile or identifiable debt data is ever tied to these records.
              </p>
              <h4 className="text-white font-bold text-base pt-2">3. Third-Party Links</h4>
              <p>
                Our educational content may contain informational references. We do not share your calculator inputs with third-party lenders or advertising networks.
              </p>
            </div>
          </div>
        )}

        {/* Modal 2: Terms of Use */}
        {modalType === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <FileText className="w-7 h-7" />
              <h3 className="text-2xl font-bold text-white">Terms of Service</h3>
            </div>
            <p className="text-xs text-slate-400">Last updated: July 2026</p>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                Welcome to <strong>Debt Be Less</strong>. By utilizing our free debt payoff tools, you agree to the following terms and conditions:
              </p>
              <h4 className="text-white font-bold text-base pt-2">1. Educational Purpose Only</h4>
              <p>
                Debt Be Less is designed solely for educational and computational modeling purposes. Outputs are estimates based on user-supplied numbers.
              </p>
              <h4 className="text-white font-bold text-base pt-2">2. Accuracy of User Inputs</h4>
              <p>
                Payoff timelines, interest totals, and strategy comparisons depend directly on the accuracy of balance, APR, and payment figures provided by the user.
              </p>
              <h4 className="text-white font-bold text-base pt-2">3. No Lending or Debt Settlement</h4>
              <p>
                Debt Be Less is not a lender, debt consolidation service, or credit counseling agency. We do not issue loans or negotiate with creditors.
              </p>
            </div>
          </div>
        )}

        {/* Modal 3: Disclaimer */}
        {modalType === 'disclaimer' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-7 h-7" />
              <h3 className="text-2xl font-bold text-white">Financial Disclaimer</h3>
            </div>
            <p className="text-xs text-slate-400">Important Notice</p>
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-xs sm:text-sm">
                <strong>Debt Be Less does not provide certified financial, legal, or tax advice.</strong>
              </div>
              <p>
                All calculations, strategy recommendations (Snowball vs. Avalanche), interest savings metrics, and estimated payoff dates generated by this applet are for informational and illustrative purposes only.
              </p>
              <p>
                Actual credit card APR compound methods, introductory rate expiration dates, late fees, minimum payment formula variations, or lender-specific policies may cause actual debt schedules to differ.
              </p>
              <p>
                Users are encouraged to consult with a qualified fiduciary financial planner, certified credit counselor, or accountant prior to making major debt restructuring decisions.
              </p>
            </div>
          </div>
        )}

        {/* Modal 4: Contact Us */}
        {modalType === 'contact' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <Mail className="w-7 h-7" />
              <h3 className="text-2xl font-bold text-white">Contact Us</h3>
            </div>
            <p className="text-xs text-slate-400">Have feedback or questions? We'd love to hear from you.</p>

            {contactSubmitted ? (
              <div className="py-8 text-center space-y-3 bg-slate-800/80 rounded-2xl border border-emerald-500/30 p-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                <p className="text-slate-300 text-sm">
                  Thank you for reaching out. Our support team will review your message promptly.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how we can help or suggest a feature..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 resize-none"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
