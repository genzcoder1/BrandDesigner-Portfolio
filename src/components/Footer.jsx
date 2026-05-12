import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import video from "../assets/videos/680370eb38ccbea9790c27e5_68b1ee2f51fb04d42c782d75_denderty animation-transcode.mp4";
import svg from "../assets/images/svgviewer-png-output.png";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const videoEl = videoRef.current;
    const imageEl = imageRef.current;

    // Timeline for overlay animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=150%", // scroll distance
        scrub: true,
        pin: videoEl, // pin the video
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    tl.to(imageEl, {
      y: "-100%",
      ease: "none",
    });

    // Clean up ScrollTrigger for this component only
    return () => {
      ScrollTrigger.getById(tl.scrollTrigger?.id)?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-red-700">
      {/* PINNED VIDEO */}
      <div ref={videoRef} className="relative w-full h-screen overflow-hidden">
        {/* VIDEO */}
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />

        {/* BOTTOM CENTER TEXT */}
        <div className="absolute bottom-30 right-1/2 translate-x-1/2 One text-[200px] leading-[200px] w-full text-white mix-blend-difference text-center z-20">
          genZ <span className="Three">coder</span>
        </div>

        {/* BOTTOM INFO */}
        <div className="absolute bottom-4 px-3 flex justify-between items-center py-3 text-lg w-full text-white mix-blend-difference text-center z-20">
          <div>genZcoder 09:19 PM</div>
          <div>Creative Digital Designer / Working Worldwide</div>
          <div>Back to top</div>
        </div>

        {/* IMAGE OVERLAY */}
        <div ref={imageRef} className="absolute inset-0 z-20 w-full h-[75vh]">
          <img
            src={svg}
            alt="overlay"
            className="w-full h-full object-cover absolute inset-0"
          />

          <div className="absolute inset-0 z-30 text-white font-sans">
            {/* RIGHT CONTENT */}
            <div className="absolute top-24 right-24 flex gap-24">
              {/* LABELS */}
              <div className="text-[30px] font-serif Three text-gray-300">
                <p>Email</p>
                <p>Tg</p>
                <p className="mt-14">Social</p>
              </div>

              {/* VALUES */}
              <div className="text-3xl">
                <div className="flex flex-col gap-4">
                  <p>genzcoder@gmail.com</p>
                  <p>@genzcoder</p>
                </div>

                <div className="mt-16 space-y-3 text-3xl font-semibold">
                  <p>Awwwards</p>
                  <p>Behance</p>
                  <p>Instagram</p>
                  <p>Linkedin</p>
                </div>
              </div>
            </div>

            {/* BOTTOM LEFT */}
            <div className="absolute bottom-16 right-[30%] space-y-2 text-lg underline">
              <p>Workflow</p>
              <p>FAQ</p>
            </div>

            {/* BOTTOM RIGHT */}
            <div className="absolute bottom-16 right-24 text-lg text-gray-300">
              ©2026 All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
