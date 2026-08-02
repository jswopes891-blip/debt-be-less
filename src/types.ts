export type PaymentFrequency = 'monthly' | 'biweekly';

export interface SingleCalculatorInputs {
  balance: number;
  interestRate: number;
  minimumPayment: number;
  extraPayment: number;
  frequency: PaymentFrequency;
  startDate: string; // YYYY-MM-DD
}

export interface TrajectoryPoint {
  month: number;
  period: number;
  dateLabel: string;
  balanceWithExtra: number;
  balanceMinimumOnly: number;
  cumulativeInterestWithExtra: number;
  cumulativeInterestMinimumOnly: number;
  principalPaidWithExtra: number;
}

export interface SingleCalculatorResult {
  debtFreeDate: Date;
  debtFreeDateLabel: string;
  monthsToPayoff: number;
  yearsToPayoff: number;
  yearsToPayoffLabel: string;
  totalInterestPaid: number;
  interestSaved: number;
  totalAmountPaid: number;
  baselineMonths: number;
  baselineInterestPaid: number;
  baselinePayoffDateLabel: string;
  periodsToPayoff: number;
  trajectoryData: TrajectoryPoint[];
}

export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number; // annual percentage rate e.g. 18.5
  minimumPayment: number;
  category: 'credit_card' | 'car_loan' | 'student_loan' | 'personal_loan' | 'medical' | 'other';
}

export type StrategyType = 'snowball' | 'avalanche';

export interface MonthlyDebtSnapshot {
  debtId: string;
  debtName: string;
  remainingBalance: number;
  interestPaid: number;
  principalPaid: number;
}

export interface MonthlyHistory {
  month: number;
  dateLabel: string; // e.g. "Aug 2026"
  totalRemaining: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  debts: MonthlyDebtSnapshot[];
}

export interface DebtPayoffDetail {
  debtId: string;
  debtName: string;
  originalBalance: number;
  interestRate: number;
  payoffMonth: number;
  payoffDateLabel: string;
  totalInterest: number;
  totalPaid: number;
}

export interface CalculationResult {
  strategy: StrategyType;
  totalOriginalDebt: number;
  totalMonthlyMinimum: number;
  extraMonthlyPayment: number;
  totalMonthlyPayment: number;
  monthsToPayoff: number;
  payoffDateLabel: string;
  totalInterestPaid: number;
  totalAmountPaid: number;
  
  // Baseline comparison (minimum payments only or 0 extra)
  baselineMonths: number;
  baselineInterestPaid: number;
  baselinePayoffDateLabel: string;
  
  // Savings metrics
  monthsSaved: number;
  interestSaved: number;
  
  debtDetails: DebtPayoffDetail[];
  monthlyHistory: MonthlyHistory[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
