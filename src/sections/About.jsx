import React, { useEffect, useRef } from "react";
import AboutImg from "../assets/images/681cae988e873716c61bda9a_0707ba72243953a3e74fad0bd268a2f5_Group 2085662595 (1) (1).jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const mainTextRef = useRef(null);
  const subTextRef = useRef(null);
  const mainContainer = useRef(null);

  const infoRef = useRef();
  const descriptRef = useRef();
  const aboutRef = useRef();

  useEffect(() => {
    const allThings = [infoRef.current, descriptRef.current, aboutRef.current];

    gsap.set(allThings, {
      y: 40,
      filter: "blur(10px)",
    });

    gsap.to(allThings, {
      y: 0,
      filter: "blur(0px)",
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: mainContainer.current,
        start: "top 50%",
        end: "bottom 60%",
        scrub: 1,
        // markers: true,
      },
    });

    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitMain = new SplitText(mainTextRef.current, { type: "chars" });
      const splitSub = new SplitText(subTextRef.current, { type: "chars" });

      const chars = [...splitMain.chars, ...splitSub.chars];

      // 🔑 Initial hidden + blurred state
      gsap.set(chars, {
        y: 40,
        autoAlpha: 0,
        filter: "blur(18px)",
      });

      gsap.to(chars, {
        y: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        ease: "power3.inOut",
        stagger: 0.03,
        duration: 4,
        scrollTrigger: {
          trigger: mainContainer.current,
          start: "top 50%",
          end: "bottom 80%",
          scrub: 1,
          // markers: true,
        },
      });

      // 🔑 FORCE recalculation AFTER SplitText
      ScrollTrigger.refresh();

      return () => {
        splitMain.revert();
        splitSub.revert();
      };
    }, mainContainer);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={mainContainer}
      className="w-full h-[140vh] flex justify-end relative flex-col"
    >
      {/* HEADER */}
      <div className="absolute top-[10%] inset-0 z-30 text-[76.2px] leading-[80px] Two p-4">
        <div ref={mainTextRef}>
          As a digital designer, I help brands and companies connect with their
          audience,
        </div>

        <span
          ref={subTextRef}
          className="absolute right-[4%] top-[20%] w-[60%] text-left"
        >
          achieve their business goals, and leave a mark in a fast-moving world.
        </span>
      </div>

      {/* CONTENT */}
      <div className="w-full h-screen relative">
        {/* IMAGE */}
        <div className="w-[620px] h-full overflow-hidden">
          <img
            src={AboutImg}
            alt="About"
            className="w-full h-full object-cover scale-[165%]"
          />
        </div>

        {/* DESCRIPTION */}
        <div
          ref={descriptRef}
          className="absolute bottom-[25%] right-[20%] w-[450px] h-[200px] text-[17px] leading-[25px] One z-30 flex p-4"
        >
          My name is genZcoder. I’m a passionate creative who works closely with
          companies to help them unlock their full potential and solve specific
          business problems with effective and memorable design solutions.
        </div>

        {/* INFO */}
        <div
          ref={infoRef}
          className="absolute bottom-[45%] left-[35%] text-[20px] leading-[25px] One z-30 font-[500] flex p-4"
        >
          ( Info )
        </div>

        {/* LINK */}
        <div
          ref={aboutRef}
          className="absolute bottom-[23%] right-[43%] text-[16px] leading-[25px] One z-30 flex p-4 underline"
        >
          About Me
        </div>
      </div>
    </section>
  );
};

export default About;
