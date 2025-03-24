import React from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particle from './components/Particle';



const App = () => {
  return (
    <div className="app">
      <Particle />
      <Navbar />
      <Main />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;