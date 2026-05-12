import React, { useState, useRef, useEffect } from 'react'
import { previewAssets } from "../utils";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SecondCard = () => {
  const [isPreview, setIsPreview] = useState(false);

  const toggleCircleRef = useRef(null);
  const buttonRef = useRef(null);

  const videoRef = useRef(null);
  const blurRef = useRef(null);

  // Refs for parallax images
  const bgRefs = useRef([]);

  bgRefs.current = [];

  const addToRefs = (el) => {
    if (el && !bgRefs.current.includes(el)) {
      bgRefs.current.push(el);
    }
  };

  // Video & blur toggle animation
  useEffect(() => {
    if (!videoRef.current || !blurRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.5 } });

    if (isPreview) {
      tl.to(blurRef.current, { opacity: 1 }, 0)
        .to(videoRef.current, { opacity: 1, scale: 1, transformOrigin: "center center" }, 0);
    } else {
      tl.to(videoRef.current, { opacity: 0, scale: 0.95, transformOrigin: "center center" }, 0)
        .to(blurRef.current, { opacity: 0 }, 0);
    }

    return () => tl.kill();
  }, [isPreview]);

  const handleToggle = () => {
    const newState = !isPreview;
    setIsPreview(newState);

    if (toggleCircleRef.current && buttonRef.current) {
      gsap.to(toggleCircleRef.current, {
        x: newState ? '15px' : '0px',
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }
  };

  // Parallax effect for images
  useEffect(() => {
    const movementFactor = 0.8;

    const fitMedia = (media) => {
      if (!media) return;
      const parent = media.parentNode;
      gsap.set(media, {
        width: parent.offsetWidth,
        height: parent.offsetHeight,
        x: 0,
        y: 0,
        position: 'absolute',
      });
    };

    bgRefs.current.forEach((media, i) => {
      if (!media) return;

      const onLoaded = () => {
        fitMedia(media);

        gsap.fromTo(
          media,
          { y: i ? -movementFactor * media.parentNode.offsetHeight * 0.5 : 0 },
          {
            y: movementFactor * media.parentNode.offsetHeight * 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: media.parentNode,
              start: i ? 'top bottom' : 'top top',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      };

      if (media.complete || media.readyState >= 2) {
        onLoaded();
      } else {
        media.addEventListener('load', onLoaded);
      }
    });

    const onResize = () => bgRefs.current.forEach(fitMedia);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div className="w-[56%] h-[76%] absolute left-[12%] top-[50%] -translate-y-1/2">
        <div className="w-full h-full text-[#8A8A8A] flex flex-col gap-2 ">
          {/* Header */}
          <div className="w-full h-[5%] flex justify-between items-center text-sm One">
            <div>00-3</div>
            <div className="uppercase flex gap-2 items-center">
              <p>Preview</p>
              <button
                ref={buttonRef}
                onClick={handleToggle}
                className="w-[30px] h-[15px] border-[#8A8A8A] border-[1px] rounded-full flex items-center px-[2px] relative cursor-pointer"
              >
                <div
                  ref={toggleCircleRef}
                  className="w-[8px] h-[8px] bg-[#8A8A8A] rounded-full"
                />
              </button>
            </div>
          </div>

          {/* Media */}
          <div className="w-full h-[95%] relative overflow-hidden">
            {/* Parallax images */}
            <img
              ref={addToRefs}
              src={previewAssets.previewImg2}
              className="absolute inset-0 w-full h-full object-cover z-0"
              alt=""
            />
            <img
              ref={addToRefs}
              src={previewAssets.previewImg3}
              className="absolute inset-0 w-full h-full object-cover z-10 mix-blend-difference"
              alt=""
            />

            {/* Blur overlay */}
            <div
              ref={blurRef}
              className="absolute inset-0 z-30 backdrop-blur-3xl bg-black/40 opacity-0 w-full h-full"
            />

            {/* Foreground video */}
            <video
              ref={videoRef}
              src="https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5%2F68b81e210449165fce6c7a12_elkruff%20animation-transcode.mp4"
              className="absolute w-[85%] inset-0 top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2  object-cover z-40 opacity-0 scale-95"
              autoPlay
              muted
              loop
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondCard;
