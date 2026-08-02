import { Debt, StrategyType, CalculationResult, DebtPayoffDetail, MonthlyHistory, SingleCalculatorInputs, SingleCalculatorResult, TrajectoryPoint } from '../types';

export function calculateSingleDebtPayoff(inputs: SingleCalculatorInputs): SingleCalculatorResult {
  const { balance, interestRate, minimumPayment, extraPayment, frequency, startDate } = inputs;

  const startParsed = startDate ? new Date(startDate) : new Date();
  if (isNaN(startParsed.getTime())) {
    startParsed.setTime(Date.now());
  }

  if (balance <= 0 || (minimumPayment <= 0 && extraPayment <= 0)) {
    return {
      debtFreeDate: startParsed,
      debtFreeDateLabel: startParsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      monthsToPayoff: 0,
      yearsToPayoff: 0,
      yearsToPayoffLabel: '0 Years',
      totalInterestPaid: 0,
      interestSaved: 0,
      totalAmountPaid: 0,
      baselineMonths: 0,
      baselineInterestPaid: 0,
      baselinePayoffDateLabel: startParsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      periodsToPayoff: 0,
      trajectoryData: [],
    };
  }

  // Period setup
  const periodsPerYear = frequency === 'biweekly' ? 26 : 12;
  const periodRate = (interestRate / 100) / periodsPerYear;
  
  const minPeriodPayment = frequency === 'biweekly' ? (minimumPayment / 2) : minimumPayment;
  const extraPeriodPayment = frequency === 'biweekly' ? (extraPayment / 2) : extraPayment;
  const totalPeriodPayment = minPeriodPayment + extraPeriodPayment;

  const maxPeriods = 1200; // 50 years max guard

  // 1. Baseline Simulation (Minimum Payment Only)
  let bBal = balance;
  let bInterest = 0;
  let bPeriod = 0;
  const bHistory: { period: number; balance: number; interest: number }[] = [{ period: 0, balance: bBal, interest: 0 }];

  while (bBal > 0.01 && bPeriod < maxPeriods) {
    bPeriod++;
    const interest = bBal * periodRate;
    bInterest += interest;
    bBal += interest;
    const payment = Math.min(bBal, minPeriodPayment);
    if (payment <= interest && bBal > payment) {
      bPeriod = maxPeriods;
      break;
    }
    bBal -= payment;
    bHistory.push({ period: bPeriod, balance: Math.max(0, bBal), interest: bInterest });
  }

  // 2. Active Simulation (Minimum + Extra Payment)
  let aBal = balance;
  let aInterest = 0;
  let aPeriod = 0;
  let aPaidPrincipal = 0;
  const aHistory: { period: number; balance: number; interest: number; principalPaid: number }[] = [
    { period: 0, balance: aBal, interest: 0, principalPaid: 0 }
  ];

  while (aBal > 0.01 && aPeriod < maxPeriods) {
    aPeriod++;
    const interest = aBal * periodRate;
    aInterest += interest;
    aBal += interest;
    const payment = Math.min(aBal, totalPeriodPayment);
    const principalPart = Math.max(0, payment - interest);
    aPaidPrincipal += principalPart;
    aBal -= payment;
    aHistory.push({ period: aPeriod, balance: Math.max(0, aBal), interest: aInterest, principalPaid: aPaidPrincipal });
  }

  // Calculate Months and Years
  const monthsToPayoff = Math.ceil(aPeriod * (12 / periodsPerYear));
  const baselineMonths = Math.ceil(bPeriod * (12 / periodsPerYear));

  const yearsToPayoff = Number((monthsToPayoff / 12).toFixed(1));
  const fullYears = Math.floor(monthsToPayoff / 12);
  const remMonths = monthsToPayoff % 12;

  let yearsToPayoffLabel = `${yearsToPayoff} Yrs`;
  if (fullYears > 0 && remMonths > 0) {
    yearsToPayoffLabel = `${fullYears}y ${remMonths}m`;
  } else if (fullYears > 0 && remMonths === 0) {
    yearsToPayoffLabel = `${fullYears} Years`;
  } else {
    yearsToPayoffLabel = `${remMonths} Months`;
  }

  // Debt Free Date
  const debtFreeDate = new Date(startParsed);
  if (frequency === 'biweekly') {
    debtFreeDate.setDate(debtFreeDate.getDate() + aPeriod * 14);
  } else {
    debtFreeDate.setMonth(debtFreeDate.getMonth() + monthsToPayoff);
  }

  const baselineDate = new Date(startParsed);
  if (frequency === 'biweekly') {
    baselineDate.setDate(baselineDate.getDate() + bPeriod * 14);
  } else {
    baselineDate.setMonth(baselineDate.getMonth() + baselineMonths);
  }

  const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const interestSaved = Math.max(0, Math.round(bInterest - aInterest));

  // Build Trajectory Points for Charts (Monthly resolution)
  const trajectoryData: TrajectoryPoint[] = [];
  const maxSimMonths = Math.min(360, Math.max(monthsToPayoff, baselineMonths));
  
  // Decide sampling interval for chart performance
  let step = 1;
  if (maxSimMonths > 120) step = 6;
  else if (maxSimMonths > 60) step = 3;
  else if (maxSimMonths > 24) step = 2;

  for (let m = 0; m <= maxSimMonths; m += step) {
    const periodIndex = Math.round(m * (periodsPerYear / 12));
    
    // Find closest records in aHistory and bHistory
    const aRec = aHistory.find((h) => h.period >= periodIndex) || aHistory[aHistory.length - 1];
    const bRec = bHistory.find((h) => h.period >= periodIndex) || bHistory[bHistory.length - 1];

    const pointDate = new Date(startParsed);
    pointDate.setMonth(pointDate.getMonth() + m);

    trajectoryData.push({
      month: m,
      period: periodIndex,
      dateLabel: m === 0 ? 'Start' : pointDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      balanceWithExtra: Math.round(aRec ? aRec.balance : 0),
      balanceMinimumOnly: Math.round(bRec ? bRec.balance : 0),
      cumulativeInterestWithExtra: Math.round(aRec ? aRec.interest : 0),
      cumulativeInterestMinimumOnly: Math.round(bRec ? bRec.interest : 0),
      principalPaidWithExtra: Math.round(aRec ? aRec.principalPaid : 0),
    });

    if (aRec.balance === 0 && bRec.balance === 0) {
      break;
    }
  }

  return {
    debtFreeDate,
    debtFreeDateLabel: debtFreeDate.toLocaleDateString('en-US', dateOptions),
    monthsToPayoff,
    yearsToPayoff,
    yearsToPayoffLabel,
    totalInterestPaid: Math.round(aInterest),
    interestSaved,
    totalAmountPaid: Math.round(balance + aInterest),
    baselineMonths,
    baselineInterestPaid: Math.round(bInterest),
    baselinePayoffDateLabel: baselineDate.toLocaleDateString('en-US', dateOptions),
    periodsToPayoff: aPeriod,
    trajectoryData,
  };
}

export const SAMPLE_DEBTS: Debt[] = [
  {
    id: 'debt-1',
    name: 'Rewards Credit Card',
    balance: 4800,
    interestRate: 21.99,
    minimumPayment: 145,
    category: 'credit_card',
  },
  {
    id: 'debt-2',
    name: 'Auto Loan',
    balance: 11500,
    interestRate: 6.49,
    minimumPayment: 265,
    category: 'car_loan',
  },
  {
    id: 'debt-3',
    name: 'Store Card',
    balance: 1800,
    interestRate: 26.99,
    minimumPayment: 65,
    category: 'credit_card',
  },
  {
    id: 'debt-4',
    name: 'Federal Student Loan',
    balance: 14200,
    interestRate: 4.99,
    minimumPayment: 175,
    category: 'student_loan',
  },
];

function formatDate(monthIndex: number): string {
  const startDate = new Date();
  const targetDate = new Date(startDate.getFullYear(), startDate.getMonth() + monthIndex, 1);
  return targetDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function calculateDebtPayoff(
  debts: Debt[],
  extraMonthlyPayment: number,
  strategy: StrategyType
): CalculationResult {
  const validDebts = debts.filter((d) => d.balance > 0 && d.minimumPayment > 0);
  
  if (validDebts.length === 0) {
    return {
      strategy,
      totalOriginalDebt: 0,
      totalMonthlyMinimum: 0,
      extraMonthlyPayment: 0,
      totalMonthlyPayment: 0,
      monthsToPayoff: 0,
      payoffDateLabel: 'Today',
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      baselineMonths: 0,
      baselineInterestPaid: 0,
      baselinePayoffDateLabel: 'Today',
      monthsSaved: 0,
      interestSaved: 0,
      debtDetails: [],
      monthlyHistory: [],
    };
  }

  const totalOriginalDebt = validDebts.reduce((sum, d) => sum + d.balance, 0);
  const totalMonthlyMinimum = validDebts.reduce((sum, d) => sum + d.minimumPayment, 0);

  // Baseline calculation (min payments only, 0 extra payment)
  const baselineResult = simulatePayoff(validDebts, 0, strategy);

  // Active calculation (with extra payment)
  const activeResult = simulatePayoff(validDebts, extraMonthlyPayment, strategy);

  const monthsSaved = Math.max(0, baselineResult.monthsToPayoff - activeResult.monthsToPayoff);
  const interestSaved = Math.max(0, baselineResult.totalInterestPaid - activeResult.totalInterestPaid);

  return {
    strategy,
    totalOriginalDebt,
    totalMonthlyMinimum,
    extraMonthlyPayment,
    totalMonthlyPayment: totalMonthlyMinimum + extraMonthlyPayment,
    monthsToPayoff: activeResult.monthsToPayoff,
    payoffDateLabel: formatDate(activeResult.monthsToPayoff),
    totalInterestPaid: activeResult.totalInterestPaid,
    totalAmountPaid: totalOriginalDebt + activeResult.totalInterestPaid,

    baselineMonths: baselineResult.monthsToPayoff,
    baselineInterestPaid: baselineResult.totalInterestPaid,
    baselinePayoffDateLabel: formatDate(baselineResult.monthsToPayoff),

    monthsSaved,
    interestSaved,

    debtDetails: activeResult.debtDetails,
    monthlyHistory: activeResult.monthlyHistory,
  };
}

interface SimulationOutcome {
  monthsToPayoff: number;
  totalInterestPaid: number;
  debtDetails: DebtPayoffDetail[];
  monthlyHistory: MonthlyHistory[];
}

function simulatePayoff(
  initialDebts: Debt[],
  extraPayment: number,
  strategy: StrategyType
): SimulationOutcome {
  // Deep clone working state
  let currentDebts = initialDebts.map((d) => ({
    id: d.id,
    name: d.name,
    balance: d.balance,
    originalBalance: d.balance,
    interestRate: d.interestRate,
    monthlyRate: d.interestRate / 100 / 12,
    minimumPayment: d.minimumPayment,
    payoffMonth: 0,
    totalInterest: 0,
    totalPaid: 0,
    isPaidOff: false,
  }));

  let totalInterestPaid = 0;
  let month = 0;
  const maxMonths = 360; // 30 year safety cap
  const monthlyHistory: MonthlyHistory[] = [];

  // Sort function helper
  const getSortedUnpaidDebts = () => {
    return currentDebts
      .filter((d) => !d.isPaidOff)
      .sort((a, b) => {
        if (strategy === 'snowball') {
          // Lowest balance first
          return a.balance - b.balance;
        } else {
          // Highest interest rate first
          return b.interestRate - a.interestRate;
        }
      });
  };

  while (currentDebts.some((d) => !d.isPaidOff) && month < maxMonths) {
    month++;
    let rolledOverBudget = extraPayment;

    // 1. Accrue monthly interest for all active debts
    for (const d of currentDebts) {
      if (!d.isPaidOff) {
        const interestForMonth = d.balance * d.monthlyRate;
        d.totalInterest += interestForMonth;
        totalInterestPaid += interestForMonth;
        d.balance += interestForMonth;
      }
    }

    // 2. Make minimum payments on all active debts
    for (const d of currentDebts) {
      if (!d.isPaidOff) {
        const requiredPay = Math.min(d.balance, d.minimumPayment);
        d.balance -= requiredPay;
        d.totalPaid += requiredPay;

        if (d.balance <= 0.01) {
          d.balance = 0;
          d.isPaidOff = true;
          d.payoffMonth = month;
          // Rollover minimum payment of newly freed debt into extra payment pool for this month & future months!
          rolledOverBudget += (d.minimumPayment - requiredPay);
        }
      } else {
        // Freed minimum payment from previously paid off debt rolls over into the snowball/avalanche budget!
        rolledOverBudget += d.minimumPayment;
      }
    }

    // 3. Apply extra payment + rolled over minimum payments to top priority debt
    const priorityDebts = getSortedUnpaidDebts();
    let availableExtra = rolledOverBudget;

    for (const topDebt of priorityDebts) {
      if (availableExtra <= 0) break;

      const extraPay = Math.min(topDebt.balance, availableExtra);
      topDebt.balance -= extraPay;
      topDebt.totalPaid += extraPay;
      availableExtra -= extraPay;

      if (topDebt.balance <= 0.01) {
        topDebt.balance = 0;
        topDebt.isPaidOff = true;
        topDebt.payoffMonth = month;
      }
    }

    // Snapshot month (sample every 1 month or skip to reduce array size if very long)
    const totalRemaining = currentDebts.reduce((sum, d) => sum + d.balance, 0);
    
    // Store timeline data
    if (month <= 12 || month % 3 === 0 || totalRemaining === 0) {
      monthlyHistory.push({
        month,
        dateLabel: formatDate(month),
        totalRemaining: Math.round(totalRemaining),
        totalInterestPaid: Math.round(totalInterestPaid),
        totalPrincipalPaid: Math.round(
          currentDebts.reduce((sum, d) => sum + d.totalPaid, 0) - totalInterestPaid
        ),
        debts: currentDebts.map((d) => ({
          debtId: d.id,
          debtName: d.name,
          remainingBalance: Math.round(d.balance),
          interestPaid: Math.round(d.totalInterest),
          principalPaid: Math.round(d.totalPaid - d.totalInterest),
        })),
      });
    }

    if (totalRemaining === 0) break;
  }

  const debtDetails: DebtPayoffDetail[] = currentDebts.map((d) => ({
    debtId: d.id,
    debtName: d.name,
    originalBalance: d.originalBalance,
    interestRate: d.interestRate,
    payoffMonth: d.payoffMonth || month,
    payoffDateLabel: formatDate(d.payoffMonth || month),
    totalInterest: Math.round(d.totalInterest),
    totalPaid: Math.round(d.totalPaid),
  }));

  return {
    monthsToPayoff: month,
    totalInterestPaid: Math.round(totalInterestPaid),
    debtDetails,
    monthlyHistory,
  };
}
