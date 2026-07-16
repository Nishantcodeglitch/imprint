import { useState, useRef, useCallback, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const carouselImages = [
  { src: '/assets/hero2.jpeg', alt: 'IMPRINT performing at a DJ booth with colorful stage lighting' },
  { src: '/assets/hero6.jpeg', alt: 'IMPRINT DJ set at a beach club in Goa' },
  { src: '/assets/hero3.jpeg', alt: 'IMPRINT portrait with neon lighting' },
  { src: '/assets/hero7.jpeg', alt: 'IMPRINT mixing live at an electronic music event' },
  { src: '/assets/hero8.jpeg', alt: 'IMPRINT crowd shot at a nightlife event' },
  { src: '/assets/hero9.jpeg', alt: 'IMPRINT performing under purple stage lights' },
  { src: '/assets/dj2.jpeg', alt: 'IMPRINT behind the decks at a club night' },
]

const stripImages = [
  { src: '/assets/hero2.jpeg', alt: 'IMPRINT DJ performance' },
  { src: '/assets/hero3.jpeg', alt: 'IMPRINT portrait' },
  { src: '/assets/hero6.jpeg', alt: 'IMPRINT beach club set' },
  { src: '/assets/hero7.jpeg', alt: 'IMPRINT live mixing' },
  { src: '/assets/hero8.jpeg', alt: 'IMPRINT crowd energy' },
  { src: '/assets/hero9.jpeg', alt: 'IMPRINT stage performance' },
  { src: '/assets/dj2.jpeg', alt: 'IMPRINT at the turntables' },
  { src: '/assets/dj3.jpeg', alt: 'IMPRINT close-up DJ shot' },
  { src: '/assets/dj4.jpeg', alt: 'IMPRINT wide angle stage view' },
]

const masonryImages = [
  { src: '/assets/dj2.jpeg', alt: 'IMPRINT club performance' },
  { src: '/assets/dj3.jpeg', alt: 'IMPRINT close-up mixing' },
  { src: '/assets/hero6.jpeg', alt: 'IMPRINT beach venue set' },
  { src: '/assets/hero9.jpeg', alt: 'IMPRINT purple light stage' },
  { src: '/assets/hero8.jpeg', alt: 'IMPRINT festival atmosphere' },
  { src: '/assets/hero7.jpeg', alt: 'IMPRINT electronic music set' },
  { src: '/assets/hero2.jpeg', alt: 'IMPRINT main stage performance' },
  { src: '/assets/dj4.jpeg', alt: 'IMPRINT wide venue shot' },
  { src: '/assets/hero3.jpeg', alt: 'IMPRINT artist portrait' },
]

export default function Showcase() {
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)
  const [lbImages, setLbImages] = useState([])
  const [carouselAngle, setCarouselAngle] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const carouselRef = useRef(null)
  const stripRef = useRef(null)
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, angle: 0 })
  const autoSpinRef = useRef(null)
  useScrollReveal()

  const openLightbox = useCallback((images, index) => {
    setLbImages(images)
    setLbIndex(index)
    setLbOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLbOpen(false)
  }, [])

  const prevImage = useCallback(() => {
    setLbIndex(i => (i - 1 + lbImages.length) % lbImages.length)
  }, [lbImages.length])

  const nextImage = useCallback(() => {
    setLbIndex(i => (i + 1) % lbImages.length)
  }, [lbImages.length])

  useEffect(() => {
    const handleKey = (e) => {
      if (!lbOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lbOpen, closeLightbox, prevImage, nextImage])

  useEffect(() => {
    if (!lbOpen) document.body.style.overflow = ''
    else document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [lbOpen])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const startSpin = () => {
      autoSpinRef.current = setInterval(() => {
        if (!isDragging.current) {
          setCarouselAngle(a => a + 0.4)
        }
      }, 30)
    }
    startSpin()
    return () => clearInterval(autoSpinRef.current)
  }, [])

  const handleCarouselMouseDown = useCallback((e) => {
    isDragging.current = true
    dragStart.current = { x: e.clientX || e.touches?.[0]?.clientX, angle: carouselAngle }
    clearInterval(autoSpinRef.current)
  }, [carouselAngle])

  const handleCarouselMouseMove = useCallback((e) => {
    if (!isDragging.current) return
    const x = e.clientX || e.touches?.[0]?.clientX
    const diff = x - dragStart.current.x
    setCarouselAngle(dragStart.current.angle + diff * 0.5)
  }, [])

  const handleCarouselMouseUp = useCallback(() => {
    isDragging.current = false
    autoSpinRef.current = setInterval(() => {
      setCarouselAngle(a => a + 0.4)
    }, 30)
  }, [])

  const stripDrag = useRef(false)
  const stripStart = useRef({ x: 0, scroll: 0 })

  const handleStripDown = useCallback((e) => {
    stripDrag.current = true
    stripStart.current = { x: e.clientX || e.touches?.[0]?.clientX, scroll: stripRef.current?.scrollLeft || 0 }
  }, [])

  const handleStripMove = useCallback((e) => {
    if (!stripDrag.current || !stripRef.current) return
    const x = e.clientX || e.touches?.[0]?.clientX
    stripRef.current.scrollLeft = stripStart.current.scroll - (x - stripStart.current.x) * 1.5
  }, [])

  const handleStripUp = useCallback(() => {
    stripDrag.current = false
  }, [])

  const radius = 280
  const cellAngle = 360 / carouselImages.length

  return (
    <>
      {lbOpen && (
        <div className="lightbox" id="lightbox" style={{ display: 'flex' }} onClick={closeLightbox}>
          <img id="lbImg" src={lbImages[lbIndex]} alt="Gallery" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', cursor: 'pointer' }} onClick={(e) => e.stopPropagation()} />
          <button className="lb-close" id="lbClose" onClick={closeLightbox}>✕</button>
          <button className="lb-nav" id="lbPrev" onClick={(e) => { e.stopPropagation(); prevImage() }}>‹</button>
          <button className="lb-nav" id="lbNext" onClick={(e) => { e.stopPropagation(); nextImage() }}>›</button>
          <div className="lb-counter" id="lbCounter">{lbIndex + 1} / {lbImages.length}</div>
        </div>
      )}

      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-dj-deco">
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="camGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff2d78" />
                <stop offset="50%" stopColor="#7b2fff" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
              <filter id="glowCam">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="lensGrad" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="rgba(0,212,255,0.6)" />
                <stop offset="40%" stopColor="rgba(123,47,255,0.3)" />
                <stop offset="100%" stopColor="rgba(5,2,18,0.9)" />
              </radialGradient>
            </defs>
            <rect x="40" y="80" width="220" height="160" rx="18" fill="rgba(10,5,30,0.95)" stroke="url(#camGrad)" strokeWidth="2" />
            <rect x="56" y="96" width="188" height="128" rx="10" fill="rgba(7,3,20,0.9)" stroke="rgba(123,47,255,0.3)" strokeWidth="1" />
            <rect x="95" y="58" width="80" height="30" rx="8" fill="rgba(10,5,30,0.9)" stroke="url(#camGrad)" strokeWidth="1.5" />
            <rect x="103" y="64" width="64" height="18" rx="5" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
            <circle cx="150" cy="160" r="55" fill="rgba(5,2,18,0.95)" stroke="url(#camGrad)" strokeWidth="2" />
            <circle cx="150" cy="160" r="45" fill="rgba(3,1,12,1)" stroke="rgba(0,212,255,0.2)" strokeWidth="1" />
            <circle cx="150" cy="160" r="35" fill="url(#lensGrad)" stroke="rgba(123,47,255,0.4)" strokeWidth="1" />
            <circle cx="150" cy="160" r="22" fill="rgba(3,1,20,0.9)" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />
            <circle cx="150" cy="160" r="12" fill="rgba(0,212,255,0.2)" filter="url(#glowCam)" />
            <ellipse cx="137" cy="148" rx="8" ry="5" fill="rgba(255,255,255,0.08)" transform="rotate(-30,137,148)" />
            <circle cx="218" cy="112" r="12" fill="rgba(255,45,120,0.7)" stroke="var(--pink)" strokeWidth="1" filter="url(#glowCam)" />
            <circle cx="218" cy="140" r="8" fill="rgba(123,47,255,0.7)" stroke="var(--purple)" strokeWidth="1" filter="url(#glowCam)" />
            <rect x="58" y="104" width="40" height="24" rx="5" fill="rgba(245,200,66,0.15)" stroke="rgba(245,200,66,0.4)" strokeWidth="1" />
            <rect x="64" y="110" width="28" height="12" rx="3" fill="rgba(245,200,66,0.4)" />
            <circle cx="280" cy="70" r="3" fill="rgba(0,212,255,0.6)" filter="url(#glowCam)" />
            <circle cx="20" cy="100" r="2" fill="rgba(255,45,120,0.6)" filter="url(#glowCam)" />
            <circle cx="270" cy="200" r="2.5" fill="rgba(123,47,255,0.6)" filter="url(#glowCam)" />
            <text x="70" y="210" fontFamily="monospace" fontSize="7" fill="rgba(0,212,255,0.4)" letterSpacing="2">IMPRINT · LIVE</text>
            <ellipse cx="150" cy="275" rx="110" ry="14" fill="rgba(255,45,120,0.1)" filter="url(#glowCam)" />
          </svg>
        </div>
        <div className="page-hero-content">
          <p className="page-kicker">// 04 — Showcase</p>
          <h1 className="page-title">From the <span className="grad">Booth</span></h1>
          <p className="page-desc">A visual journey through Goa's finest nights — photos, videos, and live moments captured from behind the decks.</p>
        </div>
      </div>

      <div className="divider"></div>

      <section className="carousel-section">
        <div className="section-head">
          <p className="page-kicker reveal">// Rotate & Explore</p>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '0.05em' }}>3D <span className="grad">Gallery</span></h2>
        </div>
        <p className="carousel-hint reveal">Drag to rotate · Hover to pause</p>
        <div className="showcase-wrap reveal">
          <div
            className="carousel-3d"
            id="carousel3d"
            ref={carouselRef}
            onMouseDown={handleCarouselMouseDown}
            onMouseMove={handleCarouselMouseMove}
            onMouseUp={handleCarouselMouseUp}
            onMouseLeave={handleCarouselMouseUp}
            onTouchStart={handleCarouselMouseDown}
            onTouchMove={handleCarouselMouseMove}
            onTouchEnd={handleCarouselMouseUp}
            style={{ transform: `rotateY(${carouselAngle}deg)` }}
          >
            {carouselImages.map((img, i) => {
              const theta = cellAngle * i
              return (
                <div
                  key={i}
                  className="carousel-item"
                  style={{ transform: `rotateY(${theta}deg) translateZ(${radius}px)` }}
                  onClick={() => openLightbox(carouselImages.map(c => c.src), i)}
                >
                  <img src={img.src} alt={img.alt} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section">
        <div className="section-head">
          <p className="page-kicker reveal">// Live Footage</p>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '0.05em' }}>Live <span className="grad-blue">Videos</span></h2>
        </div>
        <div className="video-grid reveal">
          <div className="video-card">
            <video muted loop playsInline preload="none" poster="/assets/hero7.jpeg">
              <source src="/assets/vid.mp4" type="video/mp4" />
            </video>
            <div className="video-card-label">Live Set · Goa</div>
          </div>
          <div className="video-card">
            <video muted loop playsInline preload="none" poster="/assets/hero9.jpeg">
              <source src="/assets/vid4.mp4" type="video/mp4" />
            </video>
            <div className="video-card-label">Behind the Booth</div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section" style={{ paddingBottom: '20px' }}>
        <div className="section-head">
          <p className="page-kicker reveal">// Photo Reel</p>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '0.05em' }}>The <span className="grad">Moments</span></h2>
        </div>
        <div
          className="photo-strip reveal"
          id="photoStrip"
          ref={stripRef}
          onMouseDown={handleStripDown}
          onMouseMove={handleStripMove}
          onMouseUp={handleStripUp}
          onMouseLeave={handleStripUp}
          onTouchStart={handleStripDown}
          onTouchMove={handleStripMove}
          onTouchEnd={handleStripUp}
          style={{ cursor: 'grab', overflowX: 'auto', whiteSpace: 'nowrap', scrollBehavior: 'auto', userSelect: 'none' }}
        >
          {stripImages.map((img, i) => (
            <div className="strip-item" key={i} style={{ display: 'inline-block' }}>
              <img src={img.src} alt={img.alt} draggable="false" />
            </div>
          ))}
        </div>
      </section>

      <div className="divider"></div>

      <section className="section">
        <div className="section-head">
          <p className="page-kicker reveal">// Full Gallery</p>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '0.05em' }}>All <span className="grad">Shots</span></h2>
        </div>

        <div className="masonry" id="masonry">
          {masonryImages.map((img, i) => (
            <div
              key={i}
              className="m-item reveal"
              data-src={img.src}
              style={{ transitionDelay: `${i * 0.05}s` }}
              onClick={() => openLightbox(masonryImages.map(m => m.src), i)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }} className="reveal">
          <a href="https://www.instagram.com/imprintverse/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">More on Instagram ↗</a>
        </div>
      </section>
    </>
  )
}
