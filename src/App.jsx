import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigationType } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PartnersPage from './pages/PartnersPage';
import BuyersPage from './pages/BuyersPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';

function NavigationProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'PUSH' || navigationType === 'POP') {
      setIsVisible(true);
      setProgress(0);
      
      const timer = setTimeout(() => setProgress(0.6), 100);
      const completeTimer = setTimeout(() => {
        setProgress(1);
        setTimeout(() => {
          setIsVisible(false);
          setProgress(0);
        }, 300);
      }, 400);

      return () => {
        clearTimeout(timer);
        clearTimeout(completeTimer);
      };
    }
  }, [location, navigationType]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-800 z-50">
      <div 
        className="h-full bg-brand-orange transition-all duration-300 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <NavigationProgress />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/buyers" element={<BuyersPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfUsePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
