import Starfield from './components/Starfield';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Dsa from './components/Dsa';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Starfield />
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Experience />
        <Projects />
        {/* problem solving opens the skills block, so the Skills nav link lands on it */}
        <Dsa />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
