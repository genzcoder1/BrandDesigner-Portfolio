import React, { useState, useRef, useEffect } from 'react'
import { previewAssets } from "../utils";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FirstCard = () => {
    const [fistOne, setFistOne] = useState(false);
    const [fistTwo, setFistTwo] = useState(false); // second card toggle

    const toggleCircleRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleCircleRef2 = useRef(null); // second card circle
    const buttonRef2 = useRef(null);

    const popup1Ref = useRef(null);
    const popupbg1Ref = useRef(null);

    const popup2Ref = useRef(null); // second card video
    const popupbg2Ref = useRef(null); // second card blur
    const container2Ref = useRef(null);

    const fistCardRef = useRef(null);
    const mainConRef = useRef(null)

    gsap.registerPlugin(ScrollTrigger);


    useEffect(()=>{
        gsap.to(fistCardRef.current,{
            y:"-60",
            ease:"power1.in",
            duration:3,
            scrollTrigger:{
                trigger:mainConRef.current,
                start:"top top ",
                end:"top center",
                scrub:1,
                // markers:true
            },
        })
    })

    // First card animation
    useEffect(() => {
        if (!popup1Ref.current || !popupbg1Ref.current) return;

        const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.5 } });

        if (fistOne) {
            tl.to(popupbg1Ref.current, { opacity: 1 }, 0)
                .to(popup1Ref.current, { opacity: 1, scale: 1, transformOrigin: "center center" }, 0);
        } else {
            tl.to(popup1Ref.current, { opacity: 0, scale: 0.95, transformOrigin: "center center" }, 0)
                .to(popupbg1Ref.current, { opacity: 0 }, 0);
        }

        return () => tl.kill();
    }, [fistOne]);

    // Second card animation
    useEffect(() => {
        if (!popup2Ref.current || !popupbg2Ref.current) return;

        const bg = popupbg2Ref.current;
        const fg = popup2Ref.current;

        // ensure the bg has the right compositing/will-change to avoid needing scroll repaint
        gsap.set(bg, { willChange: 'backdrop-filter, opacity', force3D: true });
        // ensure initial backdrop-filter cleared
        bg.style.backdropFilter = bg.style.WebkitBackdropFilter = 'none';

        const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.5 } });

        if (fistTwo) {
            // when showing: apply backdrop-filter (force paint) and fade in
            tl.add(() => {
                // apply both vendor and standard properties
                bg.style.WebkitBackdropFilter = 'blur(10px) saturate(0.9)';
                bg.style.backdropFilter = 'blur(10px) saturate(0.9)';
                // small 3D transform to ensure GPU compositing
                bg.style.transform = 'translateZ(0)';
            }, 0)
                .to(bg, { opacity: 1 }, 0)
                .to(fg, { opacity: 1, scale: 1, transformOrigin: "center center" }, 0);
        } else {
            // when hiding: fade out then remove backdrop-filter to avoid lingering
            tl.to(fg, { opacity: 0, scale: 0.95, transformOrigin: "center center" }, 0)
                .to(bg, {
                    opacity: 0, onComplete: () => {
                        bg.style.backdropFilter = bg.style.WebkitBackdropFilter = 'none';
                        bg.style.transform = '';
                    }
                }, 0);
        }

        return () => tl.kill();
    }, [fistTwo]);


    useEffect(() => {
        const container = container2Ref.current;
        const fg = popup2Ref.current;
        if (!container || !fg) return;

        const handleMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(fg, { x: x * 0.2, y: y * 0.2, duration: 0.45, ease: "power3.out" });
        };

        const handleLeave = () => {
            gsap.to(fg, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
        };

        container.addEventListener('mousemove', handleMove);
        container.addEventListener('mouseleave', handleLeave);

        return () => {
            container.removeEventListener('mousemove', handleMove);
            container.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    const handleFirstButton = () => {
        const newState = !fistOne;
        setFistOne(newState);

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

    const handleSecondButton = () => {
        const newState = !fistTwo;
        setFistTwo(newState);

        if (toggleCircleRef2.current && buttonRef2.current) {
            gsap.to(toggleCircleRef2.current, {
                x: newState ? '15px' : '0px',
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(buttonRef2.current, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        }
    };

    return (
        <>
            <div className="w-full h-[130vh] flex justify-between"
            ref={mainConRef}
            >
                {/* First card */}
                <div className="w-[40%] h-full relative"
                ref={fistCardRef}
                >
                    <div className="w-[400px] h-[450px] text-[#8A8A8A] absolute top-[12%] flex flex-col gap-2 ">
                        <div className="w-full h-[5%] flex justify-between items-center text-sm One">
                            <div>00-1</div>
                            <div className="uppercase flex gap-2 items-center">
                                <p>Preview</p>
                                <button
                                    ref={buttonRef}
                                    onClick={handleFirstButton}
                                    className="w-[30px] h-[15px] border-[#8A8A8A] border-[1px] rounded-full flex items-center px-[2px] relative cursor-pointer"
                                >
                                    <div
                                        ref={toggleCircleRef}
                                        className="w-[8px] h-[8px] bg-[#8A8A8A] rounded-full"
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="w-full h-[95%] relative overflow-hidden">
                            <video
                                ref={popup1Ref}
                                src="https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5%2F68b1f3bfe6dd6cefe765e40a_maxima%20animation-transcode.mp4"
                                className="absolute z-20 object-cover top-1/2 -translate-y-1/2"
                                autoPlay
                                muted
                                loop
                            />
                            <div
                                ref={popupbg1Ref}
                                className="absolute inset-0 z-10 backdrop-blur-3xl bg-black/20"
                            />
                            <video
                                src="https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5%2F6918b81db59aea89ebbaa6a7_1_mp4.mp4"
                                className="w-full h-full object-cover relative z-0"
                                autoPlay
                                muted
                                loop
                            />
                        </div>
                    </div>
                </div>

                {/* Second card */}
                <div className="w-[55%] h-full text-[#8A8A8A]">
                    <div className="w-full h-[5%] flex justify-between items-center text-sm One">
                        <div>00-2</div>
                        <div className="uppercase flex gap-2 items-center">
                            <p>Preview</p>
                            <button
                                ref={buttonRef2}
                                onClick={handleSecondButton}
                                className="w-[30px] h-[15px] border-[#8A8A8A] border-[1px] rounded-full flex items-center px-[2px]"
                            >
                                <div
                                    ref={toggleCircleRef2}
                                    className="w-[8px] h-[8px] bg-[#8A8A8A] rounded-full"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="w-full h-[95%] relative overflow-hidden"
                    ref={container2Ref}
                    >
                        

                        

                        {/* Second card foreground video */}
                        <video
                            ref={popup2Ref}
                            src="https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5%2F68b829a361fa085a9fd94a66_ava%20digital%20animation%20%281%29%20%281%29%20%281%29-transcode.mp4"
                            className="absolute z-20 object-cover top-1/2  -translate-y-1/2 w-[70%] left-1/2 -translate-x-1/2"
                            autoPlay
                            muted
                            loop
                        />
                        {/* Second card blur background */}
                        <div
                            ref={popupbg2Ref}
                            className="absolute inset-0 z-10 backdrop-blur-3xl bg-black/20"
                        />
                        {/* Base image */}
                        <img
                            src={previewAssets.previewImg1}
                            className="w-full h-full object-cover relative z-0"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default FirstCard;
