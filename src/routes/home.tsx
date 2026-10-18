import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProofStrip from '../components/ProofStrip';
import Projects from '../components/Projects';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-clip w-full max-w-[100vw]">
      <Navbar />
      <main className="flex-grow w-full max-w-full overflow-x-clip">
        <Hero />
        <ProofStrip />
        <Projects />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
