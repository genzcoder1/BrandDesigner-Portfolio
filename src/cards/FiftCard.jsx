import React, { useState, useRef, useEffect } from 'react'
import { previewAssets } from "../utils"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FiftCard = () => {
  const [isPreviewLeft, setIsPreviewLeft] = useState(false)
  const [isPreviewRight, setIsPreviewRight] = useState(false)

  // Toggle refs
  const buttonRefLeft = useRef(null)
  const toggleCircleRefLeft = useRef(null)
  const buttonRefRight = useRef(null)
  const toggleCircleRefRight = useRef(null)

  // Foreground video & blur refs
  const videoRefLeft = useRef(null)
  const blurRefLeft = useRef(null)
  const videoRefRight = useRef(null)
  const blurRefRight = useRef(null)

  // Parallax + extra mouse move refs
  const extraRefs = useRef([])
  extraRefs.current = []

  const addExtraRef = (el) => {
    if (el && !extraRefs.current.includes(el)) extraRefs.current.push(el)
  }

  // Toggle handlers
  const handleToggleLeft = () => {
    const newState = !isPreviewLeft
    setIsPreviewLeft(newState)
    if (toggleCircleRefLeft.current && buttonRefLeft.current) {
      gsap.to(toggleCircleRefLeft.current, { x: newState ? 15 : 0, duration: 0.3, ease: "power2.out" })
      gsap.to(buttonRefLeft.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
    }
  }

  const handleToggleRight = () => {
    const newState = !isPreviewRight
    setIsPreviewRight(newState)
    if (toggleCircleRefRight.current && buttonRefRight.current) {
      gsap.to(toggleCircleRefRight.current, { x: newState ? 15 : 0, duration: 0.3, ease: "power2.out" })
      gsap.to(buttonRefRight.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
    }
  }

  // Video toggle animation
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

    animateVideo(videoRefLeft, blurRefLeft, isPreviewLeft)
    animateVideo(videoRefRight, blurRefRight, isPreviewRight)
  }, [isPreviewLeft, isPreviewRight])

  // Scroll parallax for images/videos
  useEffect(() => {
    const movementFactor = 0.8

    const fitMedia = (media) => {
      if (!media) return
      const parent = media.parentNode
      gsap.set(media, { width: parent.offsetWidth, height: parent.offsetHeight, x: 0, y: 0, position: 'absolute' })
    }

    extraRefs.current.forEach((media, i) => {
      if (!media) return
      const onLoaded = () => {
        fitMedia(media)
        gsap.fromTo(
          media,
          { y: i ? -movementFactor * media.parentNode.offsetHeight * 0.5 : 0, x: 0 },
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

    const onResize = () => extraRefs.current.forEach(fitMedia)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  // Mouse move parallax for extra images
  const containerRef = useRef(null)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      extraRefs.current.forEach((el, i) => {
        const factor = 0.01 + i * 0.01
        gsap.to(el, { x: x * factor, y: y * factor, duration: 0.6, ease: "power3.out" })
      })
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="w-full h-[130vh] flex justify-between" ref={containerRef}>
      {/* Left Card */}
      <div className="w-[40%] h-full relative">
        <div className="w-[400px] h-[450px] text-[#8A8A8A] absolute top-[12%] flex flex-col gap-2">
          <div className="w-full h-[5%] flex justify-between items-center text-sm One">
            <div>00-7</div>
            <div className="uppercase flex gap-2 items-center">
              <p>Preview</p>
              <button
                ref={buttonRefLeft}
                onClick={handleToggleLeft}
                className="w-[30px] h-[15px] border-[#8A8A8A] border-[1px] rounded-full flex items-center px-[2px] relative cursor-pointer"
              >
                <div ref={toggleCircleRefLeft} className="w-[8px] h-[8px] bg-[#8A8A8A] rounded-full" />
              </button>
            </div>
          </div>

          <div className="w-full h-[95%] relative overflow-hidden">
            <video ref={addExtraRef} src="https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5%2F6918b7da5fa2f397ca752f07_7_mp4.mp4" className="absolute inset-0 w-full h-full object-cover z-0" muted autoPlay loop />
            <div ref={blurRefLeft} className="absolute inset-0 z-20 backdrop-blur-3xl bg-black/40 opacity-0 w-full h-full" />
            <video ref={videoRefLeft} src="https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5%2F68b2155949475e229b6dc651_the%20anix%20animation-transcode.mp4"
              className="absolute inset-0 w-[70%] object-cover z-30 opacity-0 scale-95 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" muted autoPlay loop
            />
          </div>
        </div>
      </div>

      {/* Right Card */}
      <div className="w-[55%] h-full relative">
        <div className="w-full h-[5%] flex justify-between items-center text-sm One">
          <div>00-8</div>
          <div className="uppercase flex gap-2 items-center">
            <p>Preview</p>
            <button
              ref={buttonRefRight}
              onClick={handleToggleRight}
              className="w-[30px] h-[15px] border-[#8A8A8A] border-[1px] rounded-full flex items-center px-[2px] relative cursor-pointer"
            >
              <div ref={toggleCircleRefRight} className="w-[8px] h-[8px] bg-[#8A8A8A] rounded-full" />
            </button>
          </div>
        </div>

        <div className="w-full h-[95%] relative overflow-hidden">
          <img ref={addExtraRef} src={previewAssets.previewImg8} className="absolute inset-0 w-full h-full object-cover z-10" alt="" />
          <img ref={addExtraRef} src={previewAssets.previewImg10} className="absolute inset-0 w-full h-full object-cover z-0" alt="" />
          <img ref={addExtraRef} src={previewAssets.previewImg9} className="absolute inset-0 w-full h-full object-cover z-30 mix-blend-difference" alt="" />

          <div ref={blurRefRight} className="absolute inset-0 z-40 backdrop-blur-3xl bg-black/40 opacity-0 w-full h-full" />
          <video ref={videoRefRight} src="https://cdn.prod.website-files.com/680370eb38ccbea9790c27e5%2F68b2148705635e531d292c51_shadxw%20animation-transcode.mp4"
            className="absolute inset-0 w-[70%] object-cover z-50 opacity-0 scale-95 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" muted autoPlay loop
          />
        </div>
      </div>
    </div>
  )
}

export default FiftCard
