import React, { useState, useEffect, useRef } from "react";
import heroVideo from "../assets/videos/cover_video-1 (1080p).mp4";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [yerevanTime, setYerevanTime] = useState("");
  const linksRef = useRef([]);
  const bgRefs = useRef([]);

  const mainRef = useRef(null);
  const overlayRef = useRef(null);

  const links = [
    { id: 1, href: "/instagram", name: "Instagram" },
    { id: 2, href: "/behance", name: "Behance" },
    { id: 3, href: "/linkedin", name: "LinkedIn" },
  ];

  /* -------------------- TIME -------------------- */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setYerevanTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Yerevan",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  /* -------------------- TEXT SCRAMBLE -------------------- */
  useEffect(() => {
    const letters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    linksRef.current.forEach((link) => {
      if (!link) return;

      const originalText = link.dataset.text;

      const onEnter = () => {
        let iteration = 0;

        const scramble = () => {
          link.innerText = originalText
            .split("")
            .map((_, index) =>
              index < iteration
                ? originalText[index]
                : letters[Math.floor(Math.random() * letters.length)],
            )
            .join("");

          iteration += 1 / 3;
          if (iteration < originalText.length) {
            requestAnimationFrame(scramble);
          }
        };

        scramble();
      };

      const onLeave = () => {
        link.innerText = originalText;
      };

      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);

      return () => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      };
    });
  }, []);

  /* -------------------- VIDEO PARALLAX -------------------- */
  useEffect(() => {
    const movementFactor = 0.8;

    const fitVideo = (video) => {
      if (!video.videoWidth) return;

      const parent = video.parentNode;
      const scale = Math.max(
        parent.offsetWidth / video.videoWidth,
        parent.offsetHeight / video.videoHeight,
      );

      gsap.set(video, {
        width: video.videoWidth * scale,
        height: video.videoHeight * scale,
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
      });
    };

    bgRefs.current.forEach((video, i) => {
      if (!video) return;

      const onLoaded = () => {
        fitVideo(video);

        gsap.fromTo(
          video,
          {
            y: i ? -movementFactor * video.parentNode.offsetHeight * 0.5 : 0,
          },
          {
            y: movementFactor * video.parentNode.offsetHeight * 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: video.parentNode,
              start: i ? "top bottom" : "top top",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      };

      if (video.readyState >= 2) {
        onLoaded();
      } else {
        video.addEventListener("loadedmetadata", onLoaded);
      }
    });

    const onResize = () => bgRefs.current.forEach((v) => v && fitVideo(v));
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* -------------------- OVERLAY EFFECT -------------------- */
  useEffect(() => {
    if (!mainRef.current || !overlayRef.current) return;

    gsap.set(overlayRef.current, {
      backgroundColor: "rgba(0,0,0,0)",
      pointerEvents: "none",
    });

    const tween = gsap.to(overlayRef.current, {
      backgroundColor: "#000",
      ease: "none",
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "top -=100",
        scrub: true,
        // markers: true
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  /* -------------------- REFS -------------------- */
  const addToRefs = (el) => {
    if (el && !bgRefs.current.includes(el)) {
      bgRefs.current.push(el);
    }
  };

  return (
    <section ref={mainRef} className="w-full h-screen relative overflow-hidden">
      {/* OVERLAY */}
      <div ref={overlayRef} className="absolute inset-0 z-10" />

      {/* TOP TEXT */}
      <div className="absolute z-20 left-1/2 top-8 -translate-x-1/2 text-[28px] leading-[28px] Three text-white mix-blend-difference text-center">
        A Creative Partner for companies and brands <br />
        that decide to move forward.
      </div>

      {/* VIDEO */}
      <div className="absolute inset-0 z-0">
        <video
          ref={addToRefs}
          src={heroVideo}
          muted
          autoPlay
          loop
          playsInline
        />
      </div>

      {/* NAME */}
      <div className="absolute z-20 left-1/2 bottom-[7%] -translate-x-1/2 text-[210px] leading-[200px] text-white mix-blend-difference text-center flex">
        <span>genZ</span>
        <span className="Three ml-6">coder </span>
      </div>

      {/* FOOTER */}
      <div className="absolute z-20 left-1/2 bottom-[3%] -translate-x-1/2 flex justify-between w-full px-4 text-white mix-blend-difference text-lg">
        <div>{`Yerevan ${yerevanTime}`}</div>

        <div className="flex gap-3">
          {links.map((link, i) => (
            <Link
              key={link.id}
              to={link.href}
              data-text={link.name}
              className="Two"
              ref={(el) => (linksRef.current[i] = el)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div />
      </div>
    </section>
  );
};

export default Hero;
