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
import { site } from './data/site';

// certifications show only when their nav entry is enabled in data/site.js
const showCertifications = site.navItems.some((item) => item.sectionId === 'certifications');

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
        <Skills />
        <Dsa />
        <Education />
        {showCertifications && <Certifications />}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
