import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { CalculatorSection } from './components/CalculatorSection';
import { StrategySection } from './components/StrategySection';
import { EducationalSection } from './components/EducationalSection';
import { AboutSection } from './components/AboutSection';
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
      <Navbar onCalculateClick={handleCalculateClick} />

      <main id="top">
        <HeroSection onCalculateClick={handleCalculateClick} />
        <BenefitsSection onCardClick={handleCalculateClick} />
        <CalculatorSection />
        <StrategySection onCompareClick={handleCalculateClick} />
        <EducationalSection />

        {/* About Debt Be Less Section */}
        <AboutSection onCalculateClick={handleCalculateClick} />

        <FaqSection />
        <CtaSection onCalculateClick={handleCalculateClick} />
      </main>

      <FooterSection />
    </div>
  );
}
