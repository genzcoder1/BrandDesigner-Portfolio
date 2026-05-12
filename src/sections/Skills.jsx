import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgImg from "../assets/images/687bdc7707919ce4d23c241e_services-bg.webp";
import defaultImg from "../assets/images/681cae988e873716c61bda9a_0707ba72243953a3e74fad0bd268a2f5_Group 2085662595 (1) (1).jpg";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const cardRef = useRef(null);
  const sectionRef = useRef(null);

  // State to swap images dynamically
  const [currentImg, setCurrentImg] = useState(defaultImg);

  // Images to swap for each text item
  const images = [
    "https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5/6890610cbd0ae55140145412_62908e22b1f2751886b28a44ef60d143_4.webp", // Capabilities
    "https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5/689060a8f4e94b953da0f8bf_32cbe03799c69127b3839410b3d8b3c6_2.webp", // Expertise
    "https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5/689060ba603e93d7e41aca1e_9b226cb222e3c3c1128f5bf283e6e821_3.webp", // My Inspiration
  ];

  useEffect(() => {
    const card = cardRef.current;
    const section = sectionRef.current;

    // Sticky card pin
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 20%",
        endTrigger: section,
        end: "bottom 80%",
        pin: true,
        scrub: true,
      },
    });

    // ScrollTriggers for each text item
    const triggers = [
      { selector: ".capabilities", img: images[0] },
      { selector: ".expertise", img: images[1] },
      { selector: ".inspiration", img: images[2] },
    ];

    triggers.forEach(({ selector, img }) => {
      gsap.fromTo(
        selector,
        {},
        {
          scrollTrigger: {
            trigger: selector,
            start: "top center",
            end: "bottom center",
            onEnter: () => setCurrentImg(img),
            onEnterBack: () => setCurrentImg(img),
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className='w-full h-[270vh] relative flex items-center justify-center'>
      {/* main content */}
      <div className=' w-[70%] h-[80%] space-y-10 relative z-30 '>
        {/* header */}
        <div className='w-full h-[30%] flex flex-col items-center text-center justify-center gap-10 text-[#D8ECEB] font-bold'>
          <span className='text-[16px] font-bold One'>(My areas of focus)</span>
          <div className='text-[150px] leading-[150px] uppercase One'>
            key Skills <br />
            & Interests
          </div>
        </div>

        <div className='w-full h-[70%] flex justify-center items-center relative'>
          {/* sticky card */}
          <div ref={cardRef} className='w-[360px] h-[450px] absolute -top-[10%] left-0'>
            <img src={currentImg} className='w-full h-full object-cover transition-all duration-500' alt="" />
          </div>

          <div className='w-[80%] h-full flex justify-between text-[#D8ECEB]'>
            {/* left list */}
            <div className='w-1/2 h-full flex flex-col pr-10 items-end justify-between leading-[36px] text-[36px] Three font-medium relative'>
              <span className='absolute top-0 capabilities'>Capabilities</span>
              <span className='absolute top-[35%] expertise'>Expertise</span>
              <span className='absolute top-[48%] inspiration'>My Inspiration</span>
            </div>

            {/* right list */}
            <div className="w-1/2 h-full flex flex-col gap-3 leading-[36px] text-[36px] One font-medium">
              <span>Web Design</span>
              <span>Animation & Interaction</span>
              <span>Webflow</span>
              <span>AI</span>
              <span>Graphic Design</span>
              <span>Branding</span>
              <span>Presentation</span>
              <span>Social Media Design</span>
              <span>Art Direction</span>
              <span>Design Consulting</span>
              <span>Mentoring</span>
              <span>Music</span>
              <span>Futurism & Retro Sci-Fi</span>
              <span>Cinema</span>
              <span>Animation</span>
              <span>Typography</span>
              <span>Posters</span>
              <span>Editorial Design</span>
              <span>Video Games</span>
              <span>Art</span>
              <span>Technology</span>
            </div>
          </div>
        </div>
      </div>

      {/* bg img */}
      <div className='w-full h-full absolute z-0 inset-0'>
        <img src={bgImg} className='w-full h-full object-cover' alt="" />
      </div>
    </section>
  );
};

export default Skills;
