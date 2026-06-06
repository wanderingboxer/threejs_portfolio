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

const App = () => {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      <CustomCursor />
      <div className="vignette" />
      <div className="crt-overlay" />

      <main className="relative">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <WorkExperience />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default App;
