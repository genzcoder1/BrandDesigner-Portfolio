import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { previewAssets } from "../utils";
import FirstCard from "../cards/FirstCard";
import SecondCard from "../cards/SecondCard";
import ThirdCard from "../cards/ThirdCard";
import FourthCard from "../cards/FourthCard";
import FiftCard from "../cards/FiftCard";





const Preview = () => {
    // Reusable digit slot component that animates its own flip
    const DigitSlot = ({ char = '0', incomingFrom = 'bottom', delay = 0 }) => {
        const slotRef = useRef(null);

        useEffect(() => {
            if (!slotRef.current) return;
            const q = gsap.utils.selector(slotRef);
            gsap.set(slotRef.current, { perspective: 800 });

            if (incomingFrom === 'bottom') {
                gsap.set(q('.digit-next'), { yPercent: 100, rotationX: -90, transformOrigin: 'center bottom' });
                gsap.set(q('.digit-current'), { yPercent: 0, rotationX: 0, transformOrigin: 'center top' });

                const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, delay });
                tl.to(q('.digit-current'), { yPercent: -100, rotationX: 90, duration: 0.6, ease: 'power2.inOut' }, 0)
                  .to(q('.digit-next'), { yPercent: 0, rotationX: 0, duration: 0.6, ease: 'power2.out' }, 0.05);
                return () => tl.kill();
            }

            // incomingFrom === 'top'
            gsap.set(q('.digit-next'), { yPercent: -100, rotationX: 90, transformOrigin: 'center top' });
            gsap.set(q('.digit-current'), { yPercent: 0, rotationX: 0, transformOrigin: 'center bottom' });

            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, delay });
            tl.to(q('.digit-current'), { yPercent: 100, rotationX: -90, duration: 0.6, ease: 'power2.inOut' }, 0)
              .to(q('.digit-next'), { yPercent: 0, rotationX: 0, duration: 0.6, ease: 'power2.out' }, 0.05);
            return () => tl.kill();
        }, [incomingFrom, delay, char]);

        return (
            <span ref={slotRef} className="inline-block digit-slot relative w-[0.6em] h-[1em] overflow-hidden align-middle" style={{ perspective: '800px' }}>
                <span className="digit-current block absolute inset-0">{char}</span>
                <span className="digit-next block absolute inset-0">{char}</span>
            </span>
        );
    };

    return (
        <section className="w-full">
            {/* header */}
            <div className="w-full h-[46vh] flex justify-between items-center px-4 py-4">
                {/* header with rotating digit slot */}
                <div className="flex gap-2 items-center">

                    <div className="text-[320px] leading-[320px] One ">
                        <DigitSlot char="1" incomingFrom="top" delay={1} />
                        <DigitSlot char="9" incomingFrom="bottom" delay={2} />
                    </div>
                    <div className="w-[110px] bg-white h-[30px]" />
                    <div className="text-[320px] leading-[320px] One ">
                        <DigitSlot char="2" incomingFrom="top" delay={3} />
                        <DigitSlot char="6" incomingFrom="bottom" delay={4} />
                    </div>
                </div>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 222 222"
                        fill="none"
                        className="title-copyright_svg w-[250px] h-[250px]"
                    >
                        <g style={{ mixBlendMode: 'difference' }}>
                            <path
                                d="M0.777384 111.505C0.777384 45.425 50.0424 0.28999 111.402 0.28999C172.467 0.28999 221.732 45.425 221.732 111.505C221.732 176.995 172.467 221.835 111.402 221.835C50.0424 221.835 0.777384 176.995 0.777384 111.505ZM23.4924 111.505C23.4924 164.9 61.8424 201.48 111.402 201.48C161.847 201.48 199.312 164.9 199.312 111.505C199.312 57.225 161.847 20.94 111.402 20.94C61.8424 20.94 23.4924 57.225 23.4924 111.505ZM111.107 149.56C124.382 149.56 136.182 143.955 140.607 127.435L165.387 133.63C159.192 153.69 140.312 170.505 111.107 170.505C74.5274 170.505 54.4674 146.905 54.4674 109.145C54.4674 71.68 76.5924 48.67 111.992 48.67C140.312 48.67 158.897 65.485 164.502 87.905L140.017 94.69C136.477 78.465 125.562 69.615 111.107 69.615C93.7024 69.615 81.0174 82.3 81.0174 109.145C81.0174 136.285 93.4074 149.56 111.107 149.56Z"
                                fill="currentColor"
                            />
                        </g>
                    </svg>
                </div>
            </div>



            <FirstCard/>
        
            {/* second cards */}
            <SecondCard/>


            {/* thired cards */}
           <ThirdCard/>



             {/* fourth cards */}
           <FourthCard/>



            {/* fift cards */}
            <FiftCard/>


            {/* footer */}
            <div className="w-full h-[46vh] flex justify-between items-end px-4 py-4 ">
                <div className="flex gap-4 items-center">

                    <div className="text-[80px] leading-[80px] One ">
                        All <span className="Three">(15)</span>
                    </div>
                </div>
                <div className="text-lg text-[#727272] font-medium leading-tight">
The result of uncompromising dedication <br /> and a strong focus on outcomes.
                </div>

                <div>
                    
                </div>
            </div>

        </section>
    );
};

export default Preview;
