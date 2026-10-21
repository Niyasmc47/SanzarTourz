import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { WhatsAppFloatButton } from './components/WhatsAppFloatButton';
import { Home } from './pages/Home';
import { InternationalTours } from './pages/InternationalTours';
import { IndiaTours } from './pages/IndiaTours';
import { CustomisedHolidays } from './pages/CustomisedHolidays';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-navy-950 font-sans selection:bg-teal-600 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/international-tours" element={<InternationalTours />} />
            <Route path="/india-tours" element={<IndiaTours />} />
            <Route path="/customised-holidays" element={<CustomisedHolidays />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloatButton />
      </div>
    </Router>
  );
};

export default App;

