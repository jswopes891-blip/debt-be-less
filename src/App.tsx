import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { CalculatorSection } from './components/CalculatorSection';
import { StrategySection } from './components/StrategySection';
import { EducationalSection } from './components/EducationalSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const handleCalculateClick = () => {
    const calculatorEl = document.getElementById('calculator');
    if (calculatorEl) {
      calculatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-mesh font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white scroll-smooth">
      {/* Sticky Header */}
      <Navbar onCalculateClick={handleCalculateClick} />

      {/* Main Content Sections in Exact Required Order */}
      <main id="top">
        {/* 1. Hero Section */}
        <HeroSection onCalculateClick={handleCalculateClick} />

        {/* 2. Benefits Section */}
        <BenefitsSection onCardClick={handleCalculateClick} />

        {/* 3. Calculator Placeholder Card */}
        <CalculatorSection />

        {/* 4. Strategy Section */}
        <StrategySection onCompareClick={handleCalculateClick} />

        {/* 5. Educational Section */}
        <EducationalSection />

        {/* 6. Frequently Asked Questions */}
        <FaqSection />

        {/* 7. Final Call-to-Action */}
        <CtaSection onCalculateClick={handleCalculateClick} />
      </main>

      {/* 8. Footer */}
      <FooterSection />
    </div>
  );
}
