import { useState } from 'react';

import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './sections/Contact.jsx';
import Projects from './sections/Projects.jsx';
import WorkExperience from './sections/Experience.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import BootScreen from './components/BootScreen.jsx';
import GlobalScene from './components/GlobalScene.jsx';
import AIAgent from './components/AIAgent.jsx';
import LevelMeter from './components/LevelMeter.jsx';
import Konami from './components/Konami.jsx';

const App = () => {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      <CustomCursor />
      <div className="vignette" />
      <div className="crt-overlay" />

      {/* Persistent 3D scene behind all sections */}
      <GlobalScene />

      <LevelMeter />
      <Konami />

      <main className="relative">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <WorkExperience />
        <Contact />
        <Footer />
      </main>

      <AIAgent />
    </>
  );
};

export default App;
