import React, { useState, useRef, useEffect } from 'react'
import { previewAssets } from "../utils"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ThirdCard = () => {
    const [isPreview1, setIsPreview1] = useState(false) // left video toggle
    const [isPreview2, setIsPreview2] = useState(false) // right video toggle

    // Toggle refs
    const buttonRef1 = useRef(null)
    const toggleCircleRef1 = useRef(null)
    const buttonRef2 = useRef(null)
    const toggleCircleRef2 = useRef(null)

    // Foreground video & blur refs
    const videoRef1 = useRef(null)
    const blurRef1 = useRef(null)
    const videoRef2 = useRef(null)
    const blurRef2 = useRef(null)

    // Parallax refs
    const bgRefs = useRef([])
    bgRefs.current = []

    const addToRefs = (el) => {
        if (el && !bgRefs.current.includes(el)) {
            bgRefs.current.push(el)
        }
    }

    // Toggle animations
    const handleToggle1 = () => {
        const newState = !isPreview1
        setIsPreview1(newState)
        if (toggleCircleRef1.current && buttonRef1.current) {
            gsap.to(toggleCircleRef1.current, { x: newState ? 15 : 0, duration: 0.3, ease: "power2.out" })
            gsap.to(buttonRef1.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
        }
    }

    const handleToggle2 = () => {
        const newState = !isPreview2
        setIsPreview2(newState)
        if (toggleCircleRef2.current && buttonRef2.current) {
            gsap.to(toggleCircleRef2.current, { x: newState ? 15 : 0, duration: 0.3, ease: "power2.out" })
            gsap.to(buttonRef2.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
        }
    }

    // Foreground video toggle effect
    useEffect(() => {
        const animateVideo = (videoRef, blurRef, state) => {
            if (!videoRef.current || !blurRef.current) return
            const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.5 } })
            if (state) {
                tl.to(blurRef.current, { opacity: 1 }, 0)
                    .to(videoRef.current, { opacity: 1, scale: 1, transformOrigin: "center center" }, 0)
            } else {
                tl.to(videoRef.current, { opacity: 0, scale: 0.95, transformOrigin: "center center" }, 0)
                    .to(blurRef.current, { opacity: 0 }, 0)
            }
            return () => tl.kill()
        }

        animateVideo(videoRef1, blurRef1, isPreview1)
        animateVideo(videoRef2, blurRef2, isPreview2)
    }, [isPreview1, isPreview2])

    // Parallax effect
    useEffect(() => {
        const movementFactor = 0.8

        const fitMedia = (media) => {
            if (!media) return
            const parent = media.parentNode
            gsap.set(media, { width: parent.offsetWidth, height: parent.offsetHeight, x: 0, y: 0, position: 'absolute' })
        }

        bgRefs.current.forEach((media, i) => {
            if (!media) return
            const onLoaded = () => {
                fitMedia(media)
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
                )
            }
            if (media.complete || media.readyState >= 2) {
                onLoaded()
            } else {
                media.addEventListener('load', onLoaded)
            }
        })

        const onResize = () => bgRefs.current.forEach(fitMedia)
        window.addEventListener('resize', onResize)

        return () => {
            window.removeEventListener('resize', onResize)
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [])

    return (
        <div className="w-full h-[130vh] flex justify-between">
            {/* Left card */}
            <div className="w-[55%] h-full text-[#8A8A8A] relative">
                <div className="w-full h-[5%] flex justify-between items-center text-sm One">
                    <div>00-5</div>
                    <div className="uppercase flex gap-2 items-center">
                        <p>Preview</p>
                        <button
                            ref={buttonRef1}
                            onClick={handleToggle1}
                            className="w-[30px] h-[15px] border-[#8A8A8A] border-[1px] rounded-full flex items-center px-[2px] relative cursor-pointer"
                        >
                            <div ref={toggleCircleRef1} className="w-[8px] h-[8px] bg-[#8A8A8A] rounded-full" />
                        </button>
                    </div>
                </div>

                <div className="w-full h-[95%] relative overflow-hidden">
                    <img ref={addToRefs} src={previewAssets.previewImg5} className="absolute inset-0 w-full h-full object-cover z-0" />
                    <div ref={blurRef1} className="absolute inset-0 z-20 backdrop-blur-3xl bg-black/40 opacity-0 w-full h-full" />
                    <video ref={videoRef1} src="https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5%2F68b2089c440d2248d18d9d42_white%20stone%20animation-transcode.mp4"
                        className="absolute inset-0 w-[70%] object-cover z-40 opacity-0 scale-95 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" muted autoPlay loop
                    />
                </div>
            </div>

            {/* Right card */}
            <div className="w-[40%] h-full relative">
                <div className="w-[400px] h-[450px] text-[#8A8A8A] absolute top-[12%] right-[2%] flex flex-col gap-2">
                    <div className="w-full h-[5%] flex justify-between items-center text-sm One">
                        <div>00-5</div>
                        <div className="uppercase flex gap-2 items-center">
                            <p>Preview</p>
                            <button
                                ref={buttonRef2}
                                onClick={handleToggle2}
                                className="w-[30px] h-[15px] border-[#8A8A8A] border-[1px] rounded-full flex items-center px-[2px] relative cursor-pointer"
                            >
                                <div ref={toggleCircleRef2} className="w-[8px] h-[8px] bg-[#8A8A8A] rounded-full" />
                            </button>
                        </div>
                    </div>

                    <div className="w-full h-[95%] relative overflow-hidden">
                        <video ref={addToRefs} src="https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5%2F6918b7fa7ff56c689125c1ce_5_mp4.mp4" className="absolute inset-0 w-full h-full object-cover z-0" muted autoPlay loop />

                        <div ref={blurRef2} className="absolute inset-0 z-20 backdrop-blur-3xl bg-black/40 opacity-0 w-full h-full" />
                        <video ref={videoRef2} src="https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5%2F68b84c6953b8d4d16b24f12c_orto-m%20%281%29%20%281%29%20%281%29-transcode.mp4"
                            className="absolute inset-0 w-[70%] object-cover z-30 opacity-0 scale-95 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" muted autoPlay loop
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThirdCard
