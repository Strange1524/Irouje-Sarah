/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { SiteProvider } from './context/SiteContext';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <SiteProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="bg-white relative">
              <Hero />
              <About />
              <Services />
              <Portfolio />
              <Contact />
              <Footer />
              <WhatsAppButton />
            </div>
          } />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </SiteProvider>
  );
}

