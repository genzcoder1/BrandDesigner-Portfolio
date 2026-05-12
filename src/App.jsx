import React from 'react'
import Hero from './sections/Hero'
import Lenis from 'lenis'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About from './sections/About';
import Version from './sections/Version';
import Preview from './sections/Preview';
import Skills from './sections/Skills';
import Footer from './components/Footer';

const App = () => {

  const lenis = new Lenis();
  gsap.registerPlugin(ScrollTrigger);

  gsap.ticker.add((time) => {
    lenis.raf(time * 300)
  });

  gsap.ticker.lagSmoothing(0)


  return (
    <>




      <main className='w-full h-full '>


        <div className='w-full h-full'>
          <Hero />
        </div>

        <div className='w-full h-full'>
          <About />
        </div>

        <div className='w-full h-full'>
          <Version />
        </div>

        <div className='w-full h-full px-3'>
          <Preview />
        </div>

        <div className='w-full h-full'>
          <Skills />
        </div>


        <div className='w-full h-full '>
          <Footer />
        </div>



      </main>




    </>
  )
}

export default App
