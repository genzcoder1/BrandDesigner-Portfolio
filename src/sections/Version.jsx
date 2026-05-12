import React, { useRef, useEffect } from "react";
import bgimg from "../assets/images/6873803c630a6b5552991bf8_2ce194c3b181a4c8600ef637d3fa3fbc_6782aff201019e74c2193da5_Rectangle 4585 (1)-p-1600.jpg";
import manImg from "../assets/images/68bbfdae09572fe84d909b68_ae3c1f4430f49afa2f1e810e08523d63_denderty-man-p-1600.webp";
import extra1 from "../assets/images/68bbfe808bba67e99e58d9f9_e74bf45b74a3c603069b92f0856c4fa9_DenDNRTY_02.webp";
import extra2 from "../assets/images/68bbfe23eeb3cfcdc1c7bf90_0554b3357b614a264e83cd9955391d9e_DenDNRTY_01-p-1600.png";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import movingVideo from "../assets/videos/680370eb38ccbea9790c27e5_68b1ee2f51fb04d42c782d75_denderty animation-transcode.mp4"


gsap.registerPlugin(ScrollTrigger);

const Version = () => {
    const containerRef = useRef(null);
    const manRef = useRef(null);
    const extra1Ref = useRef(null);
    const extra2Ref = useRef(null);
    const mainContainerRef = useRef(null);

    // Footer refs
    const footerRefs = useRef([]);

    // Add each element to refs array
    const addToFooterRefs = (el) => {
        if (el && !footerRefs.current.includes(el)) {
            footerRefs.current.push(el);
        }
    };

    const moveCardRef = useRef();

    useEffect(() => {
        const moveCard = moveCardRef.current;

        // Set initial position
        gsap.set(moveCard, { xPercent: -50, yPercent: -50 });

        // Use gsap.quickTo with smoothing and delay
        let xTo = gsap.quickTo(moveCard, "x", {
            duration: 0.8,  // Increased duration for smoother movement
            ease: "power3.out"  // Using .out for smoother deceleration
        });

        let yTo = gsap.quickTo(moveCard, "y", {
            duration: 0.8,  // Increased duration for smoother movement
            ease: "power3.out"  // Using .out for smoother deceleration
        });

        // Add throttle/delay for smoother performance
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;
        let animationId = null;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!animationId) {
                animationId = requestAnimationFrame(updatePosition);
            }
        };

        const updatePosition = () => {
            // Add some easing/smoothing
            targetX += (mouseX - targetX) * 0.1;  // Adjust the factor (0.1) for more/less smoothing
            targetY += (mouseY - targetY) * 0.1;

            xTo(targetX);
            yTo(targetY);

            // Continue the animation loop
            if (Math.abs(mouseX - targetX) > 0.5 || Math.abs(mouseY - targetY) > 0.5) {
                animationId = requestAnimationFrame(updatePosition);
            } else {
                animationId = null;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const mainContainer = mainContainerRef.current;

        // INITIAL: Centered small card
        gsap.set(container, {
            width: 700,
            height: 500,
            xPercent: -50,
            yPercent: -50,
            top: "50%",
            left: "50%",
            position: "fixed",
            transformOrigin: "center center",
        });

        // Timeline for card expansion + footer fade in
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainContainer,
                start: "top top",
                end: "bottom top",
                pin: true,
                scrub: 1,
                // markers: true,
            },
        });

        // 1️⃣ Expand card
        tl.to(container, {
            width: "100%",
            height: "100vh",
            xPercent: 0,
            yPercent: 0,
            top: 0,
            left: 0,
            ease: "power2.inOut",
        });

        // 2️⃣ Reveal footer texts AFTER card expansion
        tl.to(
            footerRefs.current,
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out",
            },
            "+=0.2" // small delay after card expansion
        );

        // Mouse parallax for images
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(manRef.current, { x: x * 0.02, y: y * 0.02, duration: 0.6, ease: "power3.out" });
            gsap.to(extra1Ref.current, { x: x * 0.009, y: y * 0.009, duration: 0.6, ease: "power3.out" });
            gsap.to(extra2Ref.current, { x: x * 0.04, y: y * 0.04, duration: 0.6, ease: "power3.out" });
        };

        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <section className="w-full h-auto relative">
            {/* TOP HEADER (unchanged) */}
            <div className="w-full h-[50vh] flex flex-col justify-end items-end p-3">
                <div className="text-[#606060d8] font-medium text-lg">(А®Folio)</div>
                <div className="text-[300px] leading-[300px] font-[600]">V1.0</div>
            </div>

            {/* MAIN CONTAINER */}
            <div ref={mainContainerRef} className="w-full h-[120vh] relative">
                <div ref={containerRef} className="absolute z-40 overflow-hidden">
                    <img src={bgimg} className="absolute w-full h-full object-cover z-10" alt="" />
                    <img ref={extra1Ref} src={extra1} className="absolute w-full h-full object-cover z-20" alt="" />
                    <img ref={manRef} src={manImg} className="absolute w-full h-full object-cover z-30" alt="" />
                    <img ref={extra2Ref} src={extra2} className="absolute w-full h-full object-cover z-40" alt="" />

                    <div ref={moveCardRef} className="w-[400px] h-[270px] bg-red-50 absolute z-50 top-0  mix-blend-difference">
                        <video src={movingVideo} className="w-full h-full object-cover" muted autoPlay loop></video>
                        <div className="w-full py-2 text-center  flex items-center justify-center">
                            <Link className="text-white bg-black px-3 py-1 One text-sm ">Check case</Link>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="absolute bottom-0 z-[60] w-full h-[20vh] flex items-end justify-between px-4 py-2">
                        <div
                            ref={addToFooterRefs}
                            className="flex flex-col gap-4 w-[300px] One opacity-0 translate-y-10"
                        >
                            <p className="mix-blend-difference">© DenDerty</p>
                            <span className="mix-blend-difference text-[20px]">
                                Website design for a musician, songwriter, and sound producer.
                            </span>
                        </div>

                        <div
                            ref={addToFooterRefs}
                            className="flex flex-col gap-4 w-[300px] One opacity-0 translate-y-10"
                        >
                            <p className="mix-blend-difference text-[20px]">Web Design <br /> Creative Direction</p>
                            <div className="mix-blend-difference flex justify-between">
                                <p>MOTION</p>
                                <Link className="flex gap-2 items-center">
                                    <ArrowRight size={15} /> Visit Site
                                </Link>
                            </div>
                        </div>

                        <div
                            ref={addToFooterRefs}
                            className="flex flex-col gap-4 w-[300px] One opacity-0 translate-y-10"
                        >
                            <div className="mix-blend-difference text-sm flex gap-4">
                                <p>Awards (5)</p>
                                <p className="text-[15px]">Website Of The Day (CSS Design Awards)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Version;
