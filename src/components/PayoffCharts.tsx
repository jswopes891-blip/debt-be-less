import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingDown,
  PieChart as PieIcon,
  BarChart3,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  ArrowRight,
  Layers,
  Zap,
  Info
} from 'lucide-react';
import { SingleCalculatorInputs, SingleCalculatorResult, TrajectoryPoint, CalculationResult } from '../types';

interface PayoffChartsProps {
  singleResult?: SingleCalculatorResult;
  singleInputs?: SingleCalculatorInputs;
  multiResult?: CalculationResult;
  mode: 'single' | 'multi';
}

export const PayoffCharts: React.FC<PayoffChartsProps> = ({
  singleResult,
  singleInputs,
  multiResult,
  mode,
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'balance' | 'comparison' | 'progress' | 'timeline'>('balance');
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'milestones' | 'yearly'>('milestones');

  if (mode === 'single' && singleResult && singleInputs) {
    const trajectoryData = singleResult.trajectoryData || [];
    const balance = singleInputs.balance || 0;
    const extra = singleInputs.extraPayment || 0;

    // Data for Principal vs Interest Comparison
    const comparisonData = [
      {
        name: 'Minimum Only',
        Principal: balance,
        Interest: singleResult.baselineInterestPaid,
        Total: balance + singleResult.baselineInterestPaid,
      },
      {
        name: 'With Extra Payment',
        Principal: balance,
        Interest: singleResult.totalInterestPaid,
        Total: singleResult.totalAmountPaid,
      },
    ];

    const pieDataMin = [
      { name: 'Principal', value: balance, color: '#0d9488' }, // teal-600
      { name: 'Interest', value: singleResult.baselineInterestPaid, color: '#f59e0b' }, // amber-500
    ];

    const pieDataExtra = [
      { name: 'Principal', value: balance, color: '#10b981' }, // emerald-500
      { name: 'Interest', value: singleResult.totalInterestPaid, color: '#f59e0b' }, // amber-500
    ];

    // Percentage of Interest Saved
    const interestSavePercent = singleResult.baselineInterestPaid > 0
      ? Math.round((singleResult.interestSaved / singleResult.baselineInterestPaid) * 100)
      : 0;

    // Time reduction percentage
    const timeReducedPercent = singleResult.baselineMonths > 0
      ? Math.round(((singleResult.baselineMonths - singleResult.monthsToPayoff) / singleResult.baselineMonths) * 100)
      : 0;

    // Filter timeline points
    const filteredTimeline = trajectoryData.filter((point) => {
      if (point.month === 0 || point.balanceWithExtra === 0 || point.month === singleResult.monthsToPayoff) return true;
      if (timelineFilter === 'yearly') return point.month % 12 === 0;
      if (timelineFilter === 'milestones') return point.month % 6 === 0 || point.month % 3 === 0;
      return true;
    });

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-10 space-y-8"
      >
        {/* Visual Charts Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Interactive Freedom Visualizer</span>
            </div>
            <h3 className="text-2xl font-bold text-blue-950 title-serif">
              Visualizing Your Debt Elimination Trajectory
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Explore how adding +${extra}/month alters your debt trajectory, slashes interest, and speeds up your payoff date.
            </p>
          </div>

          {/* Chart View Switcher Tabs */}
          <div className="flex overflow-x-auto max-w-full p-1 rounded-xl bg-slate-100 border border-slate-200/80 shadow-inner self-start md:self-auto gap-1">
            <button
              onClick={() => setActiveChartTab('balance')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeChartTab === 'balance'
                  ? 'bg-white text-emerald-950 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-blue-950'
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
              <span>Balance Trajectory</span>
            </button>

            <button
              onClick={() => setActiveChartTab('comparison')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeChartTab === 'comparison'
                  ? 'bg-white text-emerald-950 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-blue-950'
              }`}
            >
              <PieIcon className="w-3.5 h-3.5 text-teal-600" />
              <span>Principal vs Interest</span>
            </button>

            <button
              onClick={() => setActiveChartTab('progress')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeChartTab === 'progress'
                  ? 'bg-white text-emerald-950 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-blue-950'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Milestone Progress</span>
            </button>

            <button
              onClick={() => setActiveChartTab('timeline')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                activeChartTab === 'timeline'
                  ? 'bg-white text-emerald-950 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-blue-950'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Payoff Schedule</span>
            </button>
          </div>
        </div>

        {/* TAB 1: DEBT BALANCE DECREASING OVER TIME (LINE & AREA GRAPH) */}
        {activeChartTab === 'balance' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-bold text-blue-950 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-emerald-600" />
                  <span>Debt Balance Drop Over Time ($)</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Compare minimum payments vs. your +${extra}/mo accelerated plan.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm"></span>
                  <span>With Extra (+${extra}/mo)</span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-700">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-sm"></span>
                  <span>Minimums Only</span>
                </span>
              </div>
            </div>

            {/* Chart Canvas */}
            <div className="h-[320px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trajectoryData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="extraGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="minGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="dateLabel"
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `$${val.toLocaleString()}`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const withEx = payload.find((p) => p.dataKey === 'balanceWithExtra')?.value as number;
                        const minOnly = payload.find((p) => p.dataKey === 'balanceMinimumOnly')?.value as number;
                        const saved = (minOnly || 0) - (withEx || 0);

                        return (
                          <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-2">
                            <div className="font-bold text-slate-300 border-b border-slate-800 pb-1 flex justify-between gap-4">
                              <span>{label}</span>
                              <span className="text-emerald-400 font-extrabold">Month {payload[0]?.payload?.month}</span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between gap-4 text-emerald-400 font-bold">
                                <span>With Extra (+${extra}):</span>
                                <span>${withEx?.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between gap-4 text-amber-300 font-semibold">
                                <span>Minimums Only:</span>
                                <span>${minOnly?.toLocaleString()}</span>
                              </div>
                              {saved > 0 && (
                                <div className="flex justify-between gap-4 text-emerald-300 text-[11px] font-bold pt-1 border-t border-slate-800">
                                  <span>Accelerated Lead:</span>
                                  <span>+${saved.toLocaleString()} lower</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="balanceMinimumOnly"
                    name="Minimum Payment Only"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill="url(#minGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="balanceWithExtra"
                    name="With Extra Payment"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#extraGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Chart Insight Footer */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-950">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Trajectory Advantage:</strong> You reach <strong>$0 balance</strong> in <strong>{singleResult.monthsToPayoff} months</strong> vs {singleResult.baselineMonths} months on minimums!
                </span>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white font-extrabold rounded-lg shrink-0">
                {singleResult.baselineMonths - singleResult.monthsToPayoff} Months Faster
              </span>
            </div>
          </motion.div>
        )}

        {/* TAB 2: PRINCIPAL VERSUS INTEREST PAID COMPARISON */}
        {activeChartTab === 'comparison' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Bar Chart Side (7 Cols) */}
            <div className="lg:col-span-7 bg-white/90 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
              <div>
                <h4 className="text-base font-bold text-blue-950 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  <span>Total Cost Breakdown: Principal vs Interest</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Comparing the total money paid out of pocket between both plans.
                </p>
              </div>

              <div className="h-[280px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val.toLocaleString()}`} />
                    <Tooltip
                      formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar dataKey="Principal" stackId="a" fill="#0d9488" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="Interest" stackId="a" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut / Comparison Cards Side (5 Cols) */}
            <div className="lg:col-span-5 bg-white/90 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-base font-bold text-blue-950 flex items-center gap-2">
                  <PieIcon className="w-5 h-5 text-emerald-600" />
                  <span>Interest Reduction Impact</span>
                </h4>
                <p className="text-xs text-slate-500">
                  See how much borrowing interest is completely eliminated.
                </p>
              </div>

              {/* Two Donut Mini Summaries */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {/* Donut A: Minimums */}
                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">Minimums Only</span>
                  <div className="h-[100px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieDataMin}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          paddingAngle={2}
                        >
                          {pieDataMin.map((entry, idx) => (
                            <Cell key={`cell-min-${idx}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-xs font-bold text-amber-900">
                    ${singleResult.baselineInterestPaid.toLocaleString()} Interest
                  </div>
                </div>

                {/* Donut B: Extra Payment */}
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">With +${extra}/mo</span>
                  <div className="h-[100px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieDataExtra}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          paddingAngle={2}
                        >
                          {pieDataExtra.map((entry, idx) => (
                            <Cell key={`cell-extra-${idx}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-xs font-bold text-emerald-900">
                    ${singleResult.totalInterestPaid.toLocaleString()} Interest
                  </div>
                </div>
              </div>

              {/* Total Interest Saved Banner */}
              <div className="p-4 bg-emerald-500 text-white rounded-xl shadow-md shadow-emerald-500/20 text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-100 block">
                  Total Interest Slashed
                </span>
                <div className="text-2xl font-extrabold tracking-tight">
                  ${singleResult.interestSaved.toLocaleString()}
                </div>
                <p className="text-[11px] text-emerald-100 font-medium">
                  {interestSavePercent}% reduction in interest costs!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: PROGRESS BAR & MILESTONES */}
        {activeChartTab === 'progress' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-6"
          >
            <div>
              <h4 className="text-base font-bold text-blue-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Payoff Progress & Time Saved Breakdown</span>
              </h4>
              <p className="text-xs text-slate-500">
                Visualizing your journey from Day 1 to complete financial freedom.
              </p>
            </div>

            {/* Progress Bar 1: Time Reduction Progress */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="flex justify-between items-center text-xs font-bold text-blue-950">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Timeline Reduction Advantage</span>
                </span>
                <span className="text-emerald-700 font-extrabold">{timeReducedPercent}% Faster Payoff</span>
              </div>

              <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(10, timeReducedPercent))}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 rounded-full shadow-sm"
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 font-medium pt-1">
                <span>Original Plan: {singleResult.baselineMonths} Months</span>
                <span className="font-bold text-emerald-800">Accelerated Plan: {singleResult.monthsToPayoff} Months</span>
              </div>
            </div>

            {/* Progress Bar 2: Interest Savings Percentage */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="flex justify-between items-center text-xs font-bold text-blue-950">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-500" />
                  <span>Interest Elimination Percentage</span>
                </span>
                <span className="text-emerald-700 font-extrabold">{interestSavePercent}% Interest Saved</span>
              </div>

              <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(10, interestSavePercent))}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-500 rounded-full shadow-sm"
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 font-medium pt-1">
                <span>Baseline Interest: ${singleResult.baselineInterestPaid.toLocaleString()}</span>
                <span className="font-bold text-emerald-800">You Keep: ${singleResult.interestSaved.toLocaleString()}</span>
              </div>
            </div>

            {/* 4 Payoff Freedom Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1">
                <div className="w-7 h-7 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                  25%
                </div>
                <div className="text-xs font-bold text-emerald-950 mt-1">First Quarter Off</div>
                <p className="text-[10px] text-emerald-800">Month {Math.round(singleResult.monthsToPayoff * 0.25)}</p>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1">
                <div className="w-7 h-7 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  50%
                </div>
                <div className="text-xs font-bold text-emerald-950 mt-1">Halfway Mark</div>
                <p className="text-[10px] text-emerald-800">Month {Math.round(singleResult.monthsToPayoff * 0.5)}</p>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1">
                <div className="w-7 h-7 mx-auto rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  75%
                </div>
                <div className="text-xs font-bold text-emerald-950 mt-1">Final Stretch</div>
                <p className="text-[10px] text-emerald-800">Month {Math.round(singleResult.monthsToPayoff * 0.75)}</p>
              </div>

              <div className="p-3.5 bg-emerald-600 text-white rounded-xl border border-emerald-700 text-center space-y-1 shadow-sm">
                <div className="w-7 h-7 mx-auto rounded-full bg-white text-emerald-700 flex items-center justify-center font-bold text-xs">
                  100%
                </div>
                <div className="text-xs font-bold mt-1">DEBT FREE!</div>
                <p className="text-[10px] text-emerald-100">{singleResult.debtFreeDateLabel}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: MONTHLY PAYOFF TIMELINE TABLE */}
        {activeChartTab === 'timeline' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
              <div>
                <h4 className="text-base font-bold text-blue-950 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span>Monthly Payoff Schedule & Milestones</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Detailed month-by-month projection of remaining principal and cumulative interest.
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
                <button
                  onClick={() => setTimelineFilter('milestones')}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                    timelineFilter === 'milestones' ? 'bg-white text-blue-950 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Quarterly
                </button>
                <button
                  onClick={() => setTimelineFilter('yearly')}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                    timelineFilter === 'yearly' ? 'bg-white text-blue-950 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setTimelineFilter('all')}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                    timelineFilter === 'all' ? 'bg-white text-blue-950 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  All Months
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto max-h-[360px] overflow-y-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                    <th className="py-2.5 px-3">Month</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Balance (With Extra)</th>
                    <th className="py-2.5 px-3">Balance (Min Only)</th>
                    <th className="py-2.5 px-3">Cumulative Interest</th>
                    <th className="py-2.5 px-3">Principal Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {filteredTimeline.map((pt, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-slate-50 transition-colors ${
                        pt.balanceWithExtra === 0 ? 'bg-emerald-50/80 font-bold text-emerald-950' : ''
                      }`}
                    >
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold">
                          m{pt.month}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-semibold text-blue-950">{pt.dateLabel}</td>
                      <td className="py-2 px-3 text-emerald-700 font-extrabold">
                        ${pt.balanceWithExtra.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-slate-500">
                        ${pt.balanceMinimumOnly.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-amber-700 font-semibold">
                        ${pt.cumulativeInterestWithExtra.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-teal-700 font-semibold">
                        ${pt.principalPaidWithExtra.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  // MULTI DEBT CHARTS
  if (mode === 'multi' && multiResult) {
    const history = multiResult.monthlyHistory || [];
    const totalDebt = multiResult.totalOriginalDebt || 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-8 bg-white/90 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-1">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Multi-Debt Elimination Curve</span>
            </div>
            <h3 className="text-xl font-bold text-blue-950 title-serif">
              Total Debt Paydown Trajectory (${totalDebt.toLocaleString()})
            </h3>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Saves ${multiResult.interestSaved.toLocaleString()} in interest</span>
          </div>
        </div>

        {/* Multi Line Chart */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="multiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="dateLabel" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v.toLocaleString()}`} />
              <Tooltip
                formatter={(val: number, name: string) => [`$${val.toLocaleString()}`, name]}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="totalRemaining" name="Total Remaining Debt" stroke="#0284c7" strokeWidth={3} fill="url(#multiGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    );
  }

  return null;
};
