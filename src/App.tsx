import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import YouTubeFallback from './components/YouTubeFallback';

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        <Hero />
        <Projects />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/fallback" element={<YouTubeFallback />} />
      </Routes>
    </BrowserRouter>
  );
}
