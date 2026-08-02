import React, { useState, useMemo, useRef } from 'react';
import {
  CalendarCheck,
  Clock,
  Award,
  TrendingDown,
  Sparkles,
  DollarSign,
  Calendar,
  Zap,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  Layers,
  Info,
  CheckCircle2,
  BarChart3,
  ListOrdered,
  ArrowRight,
  Calculator,
  ShieldCheck,
  Flame,
  Snowflake
} from 'lucide-react';
import { Debt, StrategyType, PaymentFrequency, SingleCalculatorInputs } from '../types';
import { calculateDebtPayoff, calculateSingleDebtPayoff, SAMPLE_DEBTS } from '../utils/calculatorEngine';
import { PayoffCharts } from './PayoffCharts';
import { FinancialCoaching } from './FinancialCoaching';

export const CalculatorSection: React.FC = () => {
  // Mode selection: 'single' (Quick Calculator) vs 'multi' (Multi-Debt Planner)
  const [calculatorMode, setCalculatorMode] = useState<'single' | 'multi'>('single');

  // Today's date string formatted as YYYY-MM-DD
  const todayStr = useMemo(() => {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }, []);

  // Single Debt Form Inputs
  const [singleInputs, setSingleInputs] = useState<SingleCalculatorInputs>({
    balance: 10000,
    interestRate: 18.5,
    minimumPayment: 250,
    extraPayment: 100,
    frequency: 'monthly',
    startDate: todayStr,
  });

  // Highlight state for calculated results
  const [hasCalculated, setHasCalculated] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Multi-Debt State
  const [debts, setDebts] = useState<Debt[]>(SAMPLE_DEBTS);
  const [extraPaymentMulti, setExtraPaymentMulti] = useState<number>(150);
  const [strategy, setStrategy] = useState<StrategyType>('avalanche');
  const [activeTab, setActiveTab] = useState<'chart' | 'order' | 'summary'>('chart');

  // Form State for Adding / Editing a Debt in Multi-Debt mode
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDebtId, setEditingDebtId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    balance: '',
    interestRate: '',
    minimumPayment: '',
    category: 'credit_card' as Debt['category'],
  });

  // Calculate single debt results on the fly
  const singleResult = useMemo(() => {
    return calculateSingleDebtPayoff(singleInputs);
  }, [singleInputs]);

  // Calculate multi debt results on the fly
  const multiResult = useMemo(() => {
    return calculateDebtPayoff(debts, extraPaymentMulti, strategy);
  }, [debts, extraPaymentMulti, strategy]);

  const handleCalculateClick = () => {
    setHasCalculated(true);
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Reset Single Inputs
  const handleResetSingle = () => {
    setSingleInputs({
      balance: 10000,
      interestRate: 18.5,
      minimumPayment: 250,
      extraPayment: 100,
      frequency: 'monthly',
      startDate: todayStr,
    });
    setHasCalculated(false);
  };

  // Multi Debt Handlers
  const handleOpenAddForm = () => {
    setEditingDebtId(null);
    setFormData({
      name: '',
      balance: '',
      interestRate: '',
      minimumPayment: '',
      category: 'credit_card',
    });
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (debt: Debt) => {
    setEditingDebtId(debt.id);
    setFormData({
      name: debt.name,
      balance: debt.balance.toString(),
      interestRate: debt.interestRate.toString(),
      minimumPayment: debt.minimumPayment.toString(),
      category: debt.category,
    });
    setIsFormOpen(true);
  };

  const handleSaveDebt = (e: React.FormEvent) => {
    e.preventDefault();
    const balanceNum = parseFloat(formData.balance) || 0;
    const rateNum = parseFloat(formData.interestRate) || 0;
    const minPayNum = parseFloat(formData.minimumPayment) || 0;

    if (!formData.name.trim() || balanceNum <= 0) return;

    if (editingDebtId) {
      setDebts((prev) =>
        prev.map((d) =>
          d.id === editingDebtId
            ? {
                ...d,
                name: formData.name.trim(),
                balance: balanceNum,
                interestRate: rateNum,
                minimumPayment: minPayNum,
                category: formData.category,
              }
            : d
        )
      );
    } else {
      const newDebt: Debt = {
        id: `debt-${Date.now()}`,
        name: formData.name.trim(),
        balance: balanceNum,
        interestRate: rateNum,
        minimumPayment: minPayNum,
        category: formData.category,
      };
      setDebts((prev) => [...prev, newDebt]);
    }

    setIsFormOpen(false);
  };

  const handleDeleteDebt = (id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleResetToDefaultMulti = () => {
    setDebts(SAMPLE_DEBTS);
    setExtraPaymentMulti(150);
    setStrategy('avalanche');
  };

  const handleSingleBoost = (additionalAmount: number) => {
    setSingleInputs((prev) => ({
      ...prev,
      extraPayment: prev.extraPayment + additionalAmount,
    }));
    setHasCalculated(true);
  };

  const handleMultiBoost = (additionalAmount: number) => {
    setExtraPaymentMulti((prev) => prev + additionalAmount);
  };

  return (
    <section id="calculator" className="py-16 md:py-24 border-b border-white/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-white/80 text-emerald-700 border border-emerald-200 shadow-sm backdrop-blur-md mb-3">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Instant Payoff Engine</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 title-serif tracking-tight">
            🎯 Your Debt Be Less Plan
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            See how long your payoff may take and how extra payments could help you reach your goal sooner.
          </p>

          {/* Mode Selector Buttons */}
          <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm">
            <button
              onClick={() => setCalculatorMode('single')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                calculatorMode === 'single'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-600 hover:text-blue-950'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Quick Debt Calculator</span>
            </button>
            <button
              onClick={() => setCalculatorMode('multi')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                calculatorMode === 'multi'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-600 hover:text-blue-950'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Multi-Debt Snowball / Avalanche</span>
            </button>
          </div>
        </div>

        {/* MODE 1: SINGLE DEBT QUICK CALCULATOR */}
        {calculatorMode === 'single' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/80 space-y-10">
            
            {/* Input Form Grid */}
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200/80">
                <h3 className="text-xl font-bold text-blue-950 title-serif flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  <span>Enter Your Debt Details</span>
                </h3>
                <button
                  onClick={handleResetSingle}
                  className="p-2 text-slate-500 hover:text-blue-950 bg-white/80 hover:bg-white border border-slate-200 rounded-xl transition-colors text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Form</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Current Debt Balance */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                    <span>Current Debt Balance</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={singleInputs.balance || ''}
                      onChange={(e) => setSingleInputs((prev) => ({ ...prev, balance: parseFloat(e.target.value) || 0 }))}
                      placeholder="10000"
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none font-bold text-blue-950 text-base shadow-sm transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">Total remaining balance on loan or card</p>
                </div>

                {/* 2. Interest Rate (%) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                    <span>Interest Rate (APR %)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={singleInputs.interestRate || ''}
                      onChange={(e) => setSingleInputs((prev) => ({ ...prev, interestRate: parseFloat(e.target.value) || 0 }))}
                      placeholder="18.5"
                      className="w-full pl-4 pr-8 py-3 rounded-xl bg-white border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none font-bold text-blue-950 text-base shadow-sm transition-all"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 font-bold">%</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Annual percentage rate charged</p>
                </div>

                {/* 3. Minimum Monthly Payment */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                    <span>Minimum Monthly Payment</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={singleInputs.minimumPayment || ''}
                      onChange={(e) => setSingleInputs((prev) => ({ ...prev, minimumPayment: parseFloat(e.target.value) || 0 }))}
                      placeholder="250"
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none font-bold text-blue-950 text-base shadow-sm transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">Required minimum payment per month</p>
                </div>

                {/* 4. Extra Monthly Payment */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Extra Monthly Payment (Optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-emerald-600 font-bold">$</span>
                    <input
                      type="number"
                      min="0"
                      step="25"
                      value={singleInputs.extraPayment || ''}
                      onChange={(e) => setSingleInputs((prev) => ({ ...prev, extraPayment: parseFloat(e.target.value) || 0 }))}
                      placeholder="100"
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-white border border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none font-bold text-emerald-950 text-base shadow-sm transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">Additional amount applied 100% to principal</p>
                </div>

                {/* 5. Payment Frequency */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                    <span>Payment Frequency</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setSingleInputs((prev) => ({ ...prev, frequency: 'monthly' }))}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        singleInputs.frequency === 'monthly'
                          ? 'bg-white text-blue-950 shadow-sm border border-slate-200'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setSingleInputs((prev) => ({ ...prev, frequency: 'biweekly' }))}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        singleInputs.frequency === 'biweekly'
                          ? 'bg-white text-blue-950 shadow-sm border border-slate-200'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Biweekly
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">Biweekly = 26 half-payments/yr</p>
                </div>

                {/* 6. Start Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                    <span>Start Date</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={singleInputs.startDate}
                      onChange={(e) => setSingleInputs((prev) => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none font-bold text-blue-950 text-base shadow-sm transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">First payoff payment start date</p>
                </div>

              </div>

              {/* ACTION BUTTON */}
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={handleCalculateClick}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-lg px-10 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 cursor-pointer group"
                >
                  <CalendarCheck className="w-6 h-6" />
                  <span>Calculate My Freedom Date</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* RESULTS CARDS SECTION */}
            <div ref={resultsRef} className="pt-6 border-t border-slate-200/80 space-y-8">
              
              {/* PERSONAL FINANCIAL COACHING MESSAGE */}
              <FinancialCoaching
                mode="single"
                singleInputs={singleInputs}
                singleResult={singleResult}
                onApplySingleBoost={handleSingleBoost}
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-1">
                    Your Personal Freedom Projections
                  </span>
                  <h3 className="text-2xl font-bold text-blue-950 title-serif">
                    Payoff Results
                  </h3>
                </div>
                {singleInputs.extraPayment > 0 && (
                  <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Paying +${singleInputs.extraPayment}/mo saves ${singleResult.interestSaved.toLocaleString()} in interest!</span>
                  </div>
                )}
              </div>

              {/* 6 Attractive Cards with Large Numbers and Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Card 1: Estimated Debt-Free Date */}
                <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-white/90 border border-emerald-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                      <CalendarCheck className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                      Target Date
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Estimated Debt-Free Date
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
                      {singleResult.debtFreeDateLabel}
                    </div>
                    <p className="text-xs text-emerald-800 font-medium mt-1">
                      Date balance reaches exactly $0
                    </p>
                  </div>
                </div>

                {/* Card 2: Months Until Debt-Free */}
                <div className="bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-white/90 border border-blue-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                      <Clock className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full border border-blue-200">
                      Duration
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Months Until Debt-Free
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
                      {singleResult.monthsToPayoff} Months
                    </div>
                    <p className="text-xs text-blue-800 font-medium mt-1">
                      {singleResult.baselineMonths > singleResult.monthsToPayoff ? (
                        <>Cut down from {singleResult.baselineMonths} months!</>
                      ) : (
                        <>Total payoff duration in months</>
                      )}
                    </p>
                  </div>
                </div>

                {/* Card 3: Years Until Debt-Free */}
                <div className="bg-gradient-to-br from-teal-500/10 via-teal-500/5 to-white/90 border border-teal-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-500/20">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-1 rounded-full border border-teal-200">
                      Time Horizon
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Years Until Debt-Free
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-teal-950 tracking-tight">
                      {singleResult.yearsToPayoffLabel}
                    </div>
                    <p className="text-xs text-teal-800 font-medium mt-1">
                      {singleResult.yearsToPayoff} Total Years
                    </p>
                  </div>
                </div>

                {/* Card 4: Total Interest Paid */}
                <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white/90 border border-amber-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                      <TrendingDown className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
                      Interest Cost
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Total Interest Paid
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-950 tracking-tight">
                      ${singleResult.totalInterestPaid.toLocaleString()}
                    </div>
                    <p className="text-xs text-amber-800 font-medium mt-1">
                      Total borrowing charges accrued
                    </p>
                  </div>
                </div>

                {/* Card 5: Interest Saved By Paying Extra */}
                <div className="bg-gradient-to-br from-emerald-600/15 via-emerald-500/10 to-white/90 border-2 border-emerald-400 rounded-2xl p-6 flex flex-col justify-between shadow-md relative overflow-hidden group hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-200 px-2.5 py-1 rounded-full border border-emerald-300">
                      Money Saved!
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Interest Saved By Extra Payment
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight">
                      ${singleResult.interestSaved.toLocaleString()}
                    </div>
                    <p className="text-xs text-emerald-800 font-bold mt-1">
                      Kept in your pocket instead of paid to banks
                    </p>
                  </div>
                </div>

                {/* Card 6: Total Amount Paid */}
                <div className="bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-white/90 border border-indigo-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-full border border-indigo-200">
                      Total Out of Pocket
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Total Amount Paid
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950 tracking-tight">
                      ${singleResult.totalAmountPaid.toLocaleString()}
                    </div>
                    <p className="text-xs text-indigo-800 font-medium mt-1">
                      Principal (${singleInputs.balance.toLocaleString()}) + Interest (${singleResult.totalInterestPaid.toLocaleString()})
                    </p>
                  </div>
                </div>

              </div>

              {/* COMPARISON SUMMARY BANNER */}
              <div className="p-6 bg-blue-950 text-white rounded-2xl border border-blue-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-bold text-lg text-white">
                      The Extra Payment Power Shift
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
                    With minimum payments only, this debt takes <strong>{singleResult.baselineMonths} months</strong> and incurs <strong>${singleResult.baselineInterestPaid.toLocaleString()}</strong> in interest.
                    Adding <strong>+${singleInputs.extraPayment}/mo</strong> eliminates the debt in <strong>{singleResult.monthsToPayoff} months</strong>, saving you <strong>${singleResult.interestSaved.toLocaleString()}</strong> in interest!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('education');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="whitespace-nowrap px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
                >
                  <span>See How Rollovers Accelerate This</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* VISUAL CHARTS SECTION */}
              <PayoffCharts
                singleResult={singleResult}
                singleInputs={singleInputs}
                mode="single"
              />

            </div>

          </div>
        )}

        {/* MODE 2: MULTI-DEBT SNOWBALL / AVALANCHE PLANNER */}
        {calculatorMode === 'multi' && (
          <div className="glass-card rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/70">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Debt Inputs & Controls (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Header & Add Button */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                  <div>
                    <h3 className="text-xl font-bold text-blue-950 title-serif flex items-center gap-2">
                      <span>Your Debts</span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        {debts.length} {debts.length === 1 ? 'Debt' : 'Debts'}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold">Total Balance: ${multiResult.totalOriginalDebt.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetToDefaultMulti}
                      title="Reset to Sample Debts"
                      className="p-2 text-slate-600 hover:text-blue-950 bg-white/80 hover:bg-white border border-slate-200/80 rounded-xl transition-colors text-xs flex items-center gap-1 shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline font-bold">Reset</span>
                    </button>
                    <button
                      onClick={handleOpenAddForm}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Add Debt</span>
                    </button>
                  </div>
                </div>

                {/* Debt List */}
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {debts.length === 0 ? (
                    <div className="text-center py-8 px-4 bg-white/60 rounded-xl border border-dashed border-slate-300">
                      <p className="text-slate-500 text-sm">No debts added yet.</p>
                      <button
                        onClick={handleOpenAddForm}
                        className="mt-3 text-emerald-600 font-semibold text-xs hover:underline inline-flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add your first debt
                      </button>
                    </div>
                  ) : (
                    debts.map((debt) => (
                      <div
                        key={debt.id}
                        className="bg-white/80 border border-slate-200/80 hover:border-slate-300 rounded-xl p-3.5 flex items-center justify-between transition-all shadow-sm"
                      >
                        <div>
                          <div className="font-bold text-blue-950 text-sm flex items-center gap-2">
                            <span>{debt.name}</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {debt.interestRate}% APR
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-3 font-medium">
                            <span>Balance: <strong className="text-slate-800">${debt.balance.toLocaleString()}</strong></span>
                            <span>Min Pay: <strong className="text-slate-800">${debt.minimumPayment}/mo</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditForm(debt)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Debt"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDebt(debt.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Delete Debt"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Extra Payment Controls */}
                <div className="bg-white/80 border border-slate-200/80 p-4 rounded-2xl space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-blue-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Extra Monthly Payment</span>
                    </label>
                    <span className="text-lg font-extrabold text-emerald-600">
                      +${extraPaymentMulti.toLocaleString()}/mo
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="25"
                    value={extraPaymentMulti}
                    onChange={(e) => setExtraPaymentMulti(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-200 h-2 rounded-lg cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>$0 (Minimums)</span>
                    <span>$1,000/mo</span>
                  </div>
                </div>

                {/* Strategy Selector (Snowball vs Avalanche) */}
                <div className="bg-white/80 border border-slate-200/80 p-4 rounded-2xl space-y-3 shadow-sm">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                    Choose Payoff Strategy
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setStrategy('avalanche')}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        strategy === 'avalanche'
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-emerald-800 mb-1">
                        <Flame className="w-4 h-4 text-emerald-600" />
                        <span>Avalanche</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Highest interest rate first. Saves most money.
                      </p>
                    </button>

                    <button
                      onClick={() => setStrategy('snowball')}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        strategy === 'snowball'
                          ? 'bg-blue-50 border-blue-400 text-blue-950 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-blue-800 mb-1">
                        <Snowflake className="w-4 h-4 text-blue-600" />
                        <span>Snowball</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Lowest balance first. Quick psychological wins.
                      </p>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Multi Results & Visualizer (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* FINANCIAL COACHING MESSAGE MULTI */}
                <FinancialCoaching
                  mode="multi"
                  debts={debts}
                  extraPaymentMulti={extraPaymentMulti}
                  strategy={strategy}
                  multiResult={multiResult}
                  onApplyMultiBoost={handleMultiBoost}
                />

                {/* 4 Summary Highlight Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  
                  <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-3.5 text-center shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Freedom Date</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-700 mt-1 block">
                      {multiResult.payoffDateLabel}
                    </span>
                  </div>

                  <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-3.5 text-center shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Months Left</span>
                    <span className="text-sm sm:text-base font-extrabold text-blue-950 mt-1 block">
                      {multiResult.monthsToPayoff} Mos
                    </span>
                  </div>

                  <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-3.5 text-center shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Total Interest</span>
                    <span className="text-sm sm:text-base font-extrabold text-amber-700 mt-1 block">
                      ${multiResult.totalInterestPaid.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-3.5 text-center shadow-sm bg-emerald-50/60 border-emerald-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Interest Saved</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-700 mt-1 block">
                      ${multiResult.interestSaved.toLocaleString()}
                    </span>
                  </div>

                </div>

                {/* View Tabs */}
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('chart')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'chart'
                          ? 'bg-blue-950 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-white/60'
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Timeline Chart</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('order')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'order'
                          ? 'bg-blue-950 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-white/60'
                      }`}
                    >
                      <ListOrdered className="w-3.5 h-3.5" />
                      <span>Payoff Sequence</span>
                    </button>
                  </div>
                </div>

                {/* Tab Content: Timeline Chart */}
                {activeTab === 'chart' && (
                  <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Balance Reduction Progress Over Time
                    </h4>

                    {/* Chart Bars */}
                    <div className="space-y-3 pt-2">
                      {multiResult.monthlyHistory.slice(0, 8).map((point, i) => {
                        const pct = Math.max(0, Math.min(100, (point.totalRemaining / multiResult.totalOriginalDebt) * 100));
                        return (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs font-medium text-slate-600">
                              <span>Month {point.month} ({point.dateLabel})</span>
                              <span className="font-bold text-blue-950">${point.totalRemaining.toLocaleString()} remaining</span>
                            </div>
                            <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200/60">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tab Content: Payoff Order */}
                {activeTab === 'order' && (
                  <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {strategy === 'avalanche' ? 'Avalanche Payoff Priority (Highest Interest First)' : 'Snowball Payoff Priority (Lowest Balance First)'}
                    </h4>

                    <div className="space-y-2.5">
                      {multiResult.debtDetails.map((detail, idx) => (
                        <div key={detail.debtId} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                          <div className="flex items-center gap-3 font-bold text-blue-950">
                            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                              #{idx + 1}
                            </span>
                            <div>
                              <div className="text-sm font-bold text-blue-950">{detail.debtName}</div>
                              <div className="text-slate-500 font-normal">${detail.originalBalance.toLocaleString()} @ {detail.interestRate}% APR</div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-emerald-700 block">{detail.payoffDateLabel}</span>
                            <span className="text-[11px] text-slate-500 font-medium">Interest: ${detail.totalInterest.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Multi Debt Visual Charts */}
            <PayoffCharts multiResult={multiResult} mode="multi" />

          </div>
        )}

      </div>

      {/* Add/Edit Debt Modal in Multi-Debt Mode */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-dark rounded-3xl max-w-md w-full p-6 text-white border border-white/20 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white title-serif mb-4">
              {editingDebtId ? 'Edit Debt Details' : 'Add New Debt'}
            </h3>

            <form onSubmit={handleSaveDebt} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">Debt Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rewards Credit Card"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 font-medium outline-none focus:border-emerald-400 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">Balance ($)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="5000"
                    value={formData.balance}
                    onChange={(e) => setFormData((prev) => ({ ...prev, balance: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 font-medium outline-none focus:border-emerald-400 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">Interest Rate (%)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    placeholder="18.9"
                    value={formData.interestRate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, interestRate: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 font-medium outline-none focus:border-emerald-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">Minimum Monthly Payment ($)</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="120"
                  value={formData.minimumPayment}
                  onChange={(e) => setFormData((prev) => ({ ...prev, minimumPayment: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 font-medium outline-none focus:border-emerald-400 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20"
                >
                  Save Debt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
