import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroVisualizer from '../components/HeroVisualizer'
import useTypingEffect from '../hooks/useTypingEffect'
import useCounters from '../hooks/useCounters'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Home() {
  const typedText = useTypingEffect()
  useCounters()
  useScrollReveal()

  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('heroOverlay')?.classList.add('visible')
      document.getElementById('heroContent')?.classList.add('visible')
      document.getElementById('unmuteBtn')?.classList.add('visible')
      document.getElementById('scrollCue')?.classList.add('visible')
      document.getElementById('heroViz')?.classList.add('visible')
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const [muted, setMuted] = useState(true)
  const videoRef = useRef(null)

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  return (
    <>
      <section className="hero" id="home" aria-label="Hero section">
        <video
          ref={videoRef}
          className="hero-video-bg"
          id="heroBgVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hero2.jpeg"
        >
          <source src="/assets/vid5.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" id="heroOverlay" aria-hidden="true" />

        <div className="hero-content" id="heroContent">
          <p className="kicker">Goa, India</p>
          <h1 className="hero-title">
            <span className="line-main">IMPRINT</span>
          </h1>
          <p className="hero-role">DJ &nbsp;·&nbsp; Producer &nbsp;·&nbsp; Nightlife Curator</p>
          <p className="hero-typed" id="typed" aria-live="polite">
            {typedText}<span className="cursor" aria-hidden="true">|</span>
          </p>
          <div className="hero-cta">
            <a
              href="https://wa.me/919923580022?text=Hi%20Imprints%2C%20I%20would%20like%20to%20book%20you%20for%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Bookings
            </a>
            <a href="#music" className="btn btn-ghost">Listen ↓</a>
          </div>
          <div className="hero-socials">
            <a href="https://music.apple.com/us/new" target="_blank" rel="noopener noreferrer" aria-label="Apple Music">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17 3v12.5a3.5 3.5 0 1 1-2-3.16V7.5l-6 1.5v8.5a3.5 3.5 0 1 1-2-3.16V6l10-3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/imprintverse/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.facebook.com/imprintverse" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://soundcloud.com/imprintverse" target="_blank" rel="noopener noreferrer" aria-label="SoundCloud">
              <svg width="20" height="14" viewBox="0 0 40 20" fill="currentColor" aria-hidden="true">
                <path d="M0 14.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6C3 7.67 2.33 7 1.5 7S0 7.67 0 8.5v6zm4-2c0 .83.67 1.5 1.5 1.5S7 13.33 7 12.5v-9C7 2.67 6.33 2 5.5 2S4 2.67 4 3.5v9zm4 1.5c0 .83.67 1.5 1.5 1.5S11 14.83 11 14v-8c0-.83-.67-1.5-1.5-1.5S8 5.17 8 6v8zm4 .5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V5.5C15 4.67 14.33 4 13.5 4S12 4.67 12 5.5v9zm5.5 1.5c4.14 0 7.5-3.36 7.5-7.5S21.64 1 17.5 1c-3.4 0-6.27 2.27-7.19 5.37C10.87 6.14 11.5 6.77 11.5 7.5v7c0 .6-.35 1.11-.86 1.35.89.42 1.86.65 2.86.65z" />
              </svg>
            </a>
            <a href="https://www.mixcloud.com/imprintverse/" target="_blank" rel="noopener noreferrer" aria-label="Mixcloud">
              <svg width="20" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.06 5.12A8 8 0 0 1 24 13a7.85 7.85 0 0 1-1.86 5.06A3 3 0 0 1 21 24H7a5 5 0 0 1-5-5A4.62 4.62 0 0 1 3.26 15 7 7 0 0 1 3 13 7 7 0 0 1 10 6a6.82 6.82 0 0 1 2.86.62 8.08 8.08 0 0 1 4.2-1.5z" />
              </svg>
            </a>
            <a href="https://www.twitch.tv/imprintverse" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
              </svg>
            </a>
            <a href="https://x.com/imprintverse" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://youtube.com/@imprintverse" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.301 1.02zm1.44-3.3c-.301.42-.84.539-1.262.239-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.221c-.6.18-1.2-.18-1.38-.781-.18-.6.18-1.2.78-1.38 4.2-1.26 11.28-1.02 15.781 1.62.54.3.72.96.42 1.5-.299.54-.959.72-1.681.42z" />
              </svg>
            </a>
          </div>
        </div>

        <button className={`unmute-btn ${muted ? 'muted' : ''}`} id="unmuteBtn" onClick={toggleMute} aria-label={muted ? 'Unmute video' : 'Mute video'}>
          <svg className="icon-mute" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
          <svg className="icon-sound" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          TAP FOR SOUND
        </button>

        <HeroVisualizer />
        <div className="scroll-cue" id="scrollCue">Scroll</div>
      </section>

      <div className="divider" />

      <section className="section" id="about" aria-labelledby="about-heading">
        <div className="section-head">
          <p className="kicker reveal">// 01 — Origin</p>
          <h2 id="about-heading" className="reveal">Architect of <span className="grad">Goa's Nightlife</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-img-wrap reveal-left">
            <img src="/assets/hero8.jpeg" alt="IMPRINT — Ankith Kedar, DJ and producer" loading="lazy" />
          </div>
          <div className="reveal-right">
            <div className="about-text">
              <h2>"Sound is my <span className="grad">architecture."</span></h2>
              <p><strong>Ankith Kedar</strong> by Name, performing as <strong>IMPRINT</strong> the literal translation of his first name. A visionary DJ &amp; Producer with a unique ability to fuse sounds with hypnotic beats, creating a sonic journey that transports you to a realm of pure bliss. Founder of Goa's first professional artist agency <strong>Strobe Nightlife</strong> and Creative Director of <strong>Flashlab Creative</strong> one of Goa's leading creative agency, he doesn't just play music, he curates experiences at various venues across Goa's coast side. From sunset sessions to high-energy peak-hours in the states loudest rooms. Every tune is carefully selected. Every night is intentional. Architect for redefining Goa's Nightlife.</p>
              <div className="stats">
                <div className="stat">
                  <div className="stat-value">
                    <span className="stat-num" data-target="75">0</span>
                    <span className="stat-plus">+</span>
                  </div>
                  <span className="stat-label">Events Played</span>
                </div>
                <div className="stat">
                  <div className="stat-value">
                    <span className="stat-num" data-target="20">0</span>
                    <span className="stat-plus">+</span>
                  </div>
                  <span className="stat-label">Venues</span>
                </div>
                <div className="stat">
                  <div className="stat-value">
                    <span className="stat-num" data-target="12">0</span>
                    <span className="stat-plus">+</span>
                  </div>
                  <span className="stat-label">Years Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="strip" aria-label="Quick links">
        <div className="strip-inner">
          <Link to="/about" className="strip-card">
            <div className="strip-icon" aria-hidden="true">🎧</div>
            <div className="strip-label">01 — Origin</div>
            <div className="strip-title">Bio</div>
            <div className="strip-desc">The architect behind Goa's nightlife. Ankith Kedar. Founder of Strobe Nightlife.</div>
            <div className="strip-arrow">Explore ↗</div>
          </Link>
          <Link to="/music" className="strip-card">
            <div className="strip-icon" aria-hidden="true">🎵</div>
            <div className="strip-label">02 — Sound</div>
            <div className="strip-title">Music</div>
            <div className="strip-desc">Original EPs, albums, original sets, live recordings, SoundCloud & MixCloud Streams.</div>
            <div className="strip-arrow">Listen ↗</div>
          </Link>
          <Link to="/gigs" className="strip-card">
            <div className="strip-icon" aria-hidden="true">📅</div>
            <div className="strip-label">03 — Events</div>
            <div className="strip-title">Gigs & Tour</div>
            <div className="strip-desc">Upcoming shows, past highlights & the stages that shaped the sound.</div>
            <div className="strip-arrow">View ↗</div>
          </Link>
          <Link to="/showcase" className="strip-card">
            <div className="strip-icon" aria-hidden="true">📸</div>
            <div className="strip-label">04 — Gallery</div>
            <div className="strip-title">Showcase</div>
            <div className="strip-desc">Behind the booth. The nights, the rooms, the energy — captured.</div>
            <div className="strip-arrow">Browse ↗</div>
          </Link>
        </div>
      </section>

      <section className="section music-section" id="music" aria-labelledby="music-heading">
        <div className="section-head">
          <p className="kicker reveal">// 02 — Sound</p>
          <h2 id="music-heading" className="reveal">Latest <span className="grad-blue">Music</span></h2>
        </div>
        <div className="eq-bars reveal" style={{ marginBottom: 24 }} aria-hidden="true">
          {[0.5, 0.8, 0.6, 0.45, 0.7, 0.55, 0.9, 0.5].map((d, i) => (
            <div key={i} className="eq-bar" style={{ animationDuration: `${d}s` }} />
          ))}
        </div>
        <div className="sc-embeds reveal">
          <div className="sc-embed-wrap">
            <iframe width="100%" height="80" scrolling="no" frameBorder="no" allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2284022180&color=%237b2fff&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true"
              title="Marea (UCHA Remix x Claes Sommer Interpretation)"
            />
          </div>
          <div className="sc-embed-wrap">
            <iframe width="100%" height="80" scrolling="no" frameBorder="no" allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1948465335&color=%237b2fff&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true"
              title="Imprint - Lift Off (Galactica Mix)"
            />
          </div>
          <div className="sc-embed-wrap">
            <iframe width="100%" height="80" scrolling="no" frameBorder="no" allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1948451183&color=%237b2fff&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true"
              title="kchillmusik by Imprint"
            />
          </div>
          <div className="sc-embed-wrap">
            <iframe width="100%" height="80" scrolling="no" frameBorder="no" allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1876560543&color=%237b2fff&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true"
              title="Imprint - Another Track"
            />
          </div>
        </div>
        <div className="mix-grid" style={{ marginTop: 24 }}>
          <a href="https://soundcloud.com/imprintverse/sets/vibe" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <article className="mix-card reveal">
              <img src="/assets/alb1.jpeg" alt="A Selection album cover" loading="lazy" />
              <div className="mix-info">
                <h4>A Selection</h4>
                <p>Album · 9 Tracks · Oct 2023</p>
              </div>
            </article>
          </a>
          <a href="https://soundcloud.com/imprintverse/sets/neutral-selection-compilation" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <article className="mix-card reveal" style={{ transitionDelay: '0.1s' }}>
              <img src="/assets/alb2.jpeg" alt="Neutral Selection compilation cover" loading="lazy" />
              <div className="mix-info">
                <h4>Neutral Selection</h4>
                <p>Compilation · 9 Tracks · Apr 2025</p>
              </div>
            </article>
          </a>
          <a href="https://soundcloud.com/imprintverse/sets/organic-selection" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <article className="mix-card reveal" style={{ transitionDelay: '0.2s' }}>
              <img src="/assets/alb3.jpeg" alt="Organic Selection compilation cover" loading="lazy" />
              <div className="mix-info">
                <h4>Organic Selection</h4>
                <p>Compilation · 22 Tracks · Jan 2025</p>
              </div>
            </article>
          </a>
          <article className="mix-card reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="mix-info" style={{ aspectRatio: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h4 style={{ color: 'var(--muted)' }}>hello</h4>
            </div>
          </article>
          <article className="mix-card reveal" style={{ transitionDelay: '0.4s' }}>
            <div className="mix-info" style={{ aspectRatio: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h4 style={{ color: 'var(--muted)' }}>hello</h4>
            </div>
          </article>
          <article className="mix-card reveal" style={{ transitionDelay: '0.5s' }}>
            <div className="mix-info" style={{ aspectRatio: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h4 style={{ color: 'var(--muted)' }}>hello</h4>
            </div>
          </article>
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="https://soundcloud.com/imprintverse" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">All Tracks on SoundCloud ↗</a>
        </div>

        <div className="mc-section reveal">
          <h3>Live on <span className="grad-blue">Mixcloud</span></h3>
          <p>@IMPRINTVERSE — Stream live recordings &amp; DJ sets</p>
          <div className="mc-layout">
            <div className="mc-player-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: 12, background: 'linear-gradient(135deg,#52003F,#7B52FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="28" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M17.06 5.12A8 8 0 0 1 24 13a7.85 7.85 0 0 1-1.86 5.06A3 3 0 0 1 21 24H7a5 5 0 0 1-5-5A4.62 4.62 0 0 1 3.26 15 7 7 0 0 1 3 13 7 7 0 0 1 10 6a6.82 6.82 0 0 1 2.86.62 8.08 8.08 0 0 1 4.2-1.5z" />
                  </svg>
                </div>
                <div>
                  <div id="mcPlayerTitle" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>Select a mix</div>
                  <div id="mcPlayerSub" style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.7rem', color: 'rgba(240,238,255,0.45)', letterSpacing: '0.1em' }}>IMPRINTS · Mixcloud</div>
                </div>
              </div>
              <div id="mcPlayer" style={{ borderRadius: 12, overflow: 'hidden', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(240,238,255,0.3)', fontFamily: "'DM Mono',monospace", fontSize: '0.75rem', letterSpacing: '0.15em', border: '1px dashed rgba(255,255,255,0.08)' }}>
                ← Click a mix to play
              </div>
            </div>
            <div className="mc-track-list">
              <div className="track-item" onClick={() => window.open('https://www.mixcloud.com/imprintverse/imprint-live-recording-dj-only-from-mayan-beach-club', '_blank')} style={{ cursor: 'pointer' }} role="button" tabIndex="0" onKeyDown={(e) => { if (e.key === 'Enter') window.open('https://www.mixcloud.com/imprintverse/imprint-live-recording-dj-only-from-mayan-beach-club', '_blank') }}>
                <span className="track-num">01</span>
                <div className="track-info">
                  <h4>Live Recording (DJ Only)</h4>
                  <p>Mayan Beach Club · Goa</p>
                </div>
                <div className="track-play">▶</div>
              </div>
              <div className="track-item" onClick={() => window.open('https://www.mixcloud.com/imprintverse/live-recording-from-tikibab-benaulim-30-nov-2025', '_blank')} style={{ cursor: 'pointer' }} role="button" tabIndex="0" onKeyDown={(e) => { if (e.key === 'Enter') window.open('https://www.mixcloud.com/imprintverse/live-recording-from-tikibab-benaulim-30-nov-2025', '_blank') }}>
                <span className="track-num">02</span>
                <div className="track-info">
                  <h4>Live Recording · Tikibab</h4>
                  <p>Benaulim · Nov 30, 2025</p>
                </div>
                <div className="track-play">▶</div>
              </div>
              <div className="track-item" onClick={() => window.open('https://www.mixcloud.com/imprintverse/imprint-dynacode-radio-01-debut-edition', '_blank')} style={{ cursor: 'pointer' }} role="button" tabIndex="0" onKeyDown={(e) => { if (e.key === 'Enter') window.open('https://www.mixcloud.com/imprintverse/imprint-dynacode-radio-01-debut-edition', '_blank') }}>
                <span className="track-num">03</span>
                <div className="track-info">
                  <h4>Dynacode Radio 01</h4>
                  <p>Debut Edition · Imprints</p>
                </div>
                <div className="track-play">▶</div>
              </div>
              <div className="track-item" onClick={() => window.open('https://www.mixcloud.com/imprintverse/', '_blank')} style={{ cursor: 'pointer' }} role="button" tabIndex="0" onKeyDown={(e) => { if (e.key === 'Enter') window.open('https://www.mixcloud.com/imprintverse/', '_blank') }}>
                <span className="track-num">↗</span>
                <div className="track-info">
                  <h4>All Mixes</h4>
                  <p>View full profile on Mixcloud</p>
                </div>
                <div className="track-play">↗</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <a href="https://www.mixcloud.com/imprintverse/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">All Mixes on Mixcloud ↗</a>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section" id="gigs" aria-labelledby="gigs-heading">
        <div className="section-head">
          <p className="kicker reveal">// 03 — Tour</p>
          <h2 id="gigs-heading" className="reveal">Upcoming <span className="grad">Gigs</span></h2>
        </div>
        <div className="events-grid">
          <div className="event-card reveal">
            <div className="event-date-block">
              <div className="event-day">12</div>
              <div className="event-month">May '26</div>
            </div>
            <div className="event-info">
              <h3>Strobe Presents: Neon Tide</h3>
              <p>Anjuna Beach Club · Goa · 10:00 PM</p>
            </div>
            <a href="https://wa.me/919923580022?text=Hi%2C%20RSVP%20for%20Neon%20Tide%20May%2012." target="_blank" rel="noopener noreferrer" className="event-tag">RSVP</a>
          </div>
          <div className="event-card reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="event-date-block">
              <div className="event-day">24</div>
              <div className="event-month">May '26</div>
            </div>
            <div className="event-info">
              <h3>Flashlab Live</h3>
              <p>Hilltop · Vagator, Goa · 9:00 PM</p>
            </div>
            <a href="https://wa.me/919923580022?text=Hi%2C%20RSVP%20for%20Flashlab%20Live%20May%2024." target="_blank" rel="noopener noreferrer" className="event-tag">RSVP</a>
          </div>
          <div className="event-card reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="event-date-block">
              <div className="event-day">07</div>
              <div className="event-month">Jun '26</div>
            </div>
            <div className="event-info">
              <h3>Sunset Sessions Vol. 10</h3>
              <p>Sinq Beach Club · Candolim, Goa · 6:00 PM</p>
            </div>
            <a href="https://wa.me/919923580022?text=Hi%2C%20RSVP%20for%20Sunset%20Sessions%20Vol%2010." target="_blank" rel="noopener noreferrer" className="event-tag">RSVP</a>
          </div>
          <div className="event-card reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="event-date-block">
              <div className="event-day">21</div>
              <div className="event-month">Jun '26</div>
            </div>
            <div className="event-info">
              <h3>Imprint × Bombay Underground</h3>
              <p>Antisocial · Mumbai · 11:00 PM</p>
            </div>
            <a href="https://wa.me/919923580022?text=Hi%2C%20RSVP%20for%20Imprints%20x%20Bombay%20Underground." target="_blank" rel="noopener noreferrer" className="event-tag">RSVP</a>
          </div>
          <div className="event-card reveal" style={{ transitionDelay: '0.4s', opacity: 0.5 }}>
            <div className="event-date-block" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'var(--border)' }}>
              <div className="event-day" style={{ background: 'none', WebkitTextFillColor: 'var(--muted)' }}>03</div>
              <div className="event-month">Nov '24</div>
            </div>
            <div className="event-info">
              <h3>Afters at Aura Beach Cafe</h3>
              <p>Aura Beach Cafe · Anjuna, Goa</p>
            </div>
            <span className="event-tag past">Played</span>
          </div>
          <div className="event-card reveal" style={{ transitionDelay: '0.5s', opacity: 0.5 }}>
            <div className="event-date-block" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'var(--border)' }}>
              <div className="event-day" style={{ background: 'none', WebkitTextFillColor: 'var(--muted)' }}>03</div>
              <div className="event-month">Nov '24</div>
            </div>
            <div className="event-info">
              <h3>Sunset Stories · Baja, Benaulim</h3>
              <p>Baja Beach Club · Benaulim, Goa</p>
            </div>
            <span className="event-tag past">Played</span>
          </div>
        </div>
        <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <a href="https://wa.me/919923580022?text=Hi%20Imprints%2C%20I%20would%20like%20to%20enquire%20about%20upcoming%20gigs." target="_blank" rel="noopener noreferrer" className="btn btn-wa">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }} aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.859L.057 23.428a.5.5 0 0 0 .609.61l5.57-1.474A11.951 11.951 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.523-5.168-1.432l-.362-.216-3.743.99.998-3.742-.234-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            &nbsp;Enquire via WhatsApp
          </a>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'rgba(240,238,255,0.45)', letterSpacing: '0.1em' }}>
            Fastest response via WhatsApp &nbsp;·&nbsp; Also available for Twitch live stream bookings
          </p>
        </div>
      </section>

      <section className="section" id="booking" aria-labelledby="booking-heading">
        <div className="section-head">
          <p className="kicker reveal">// 05 — Bookings</p>
          <h2 id="booking-heading" className="reveal">Book <span className="grad">Imprint</span></h2>
        </div>

        <div className="booking-grid">
          <div className="reveal-left">
            <div className="booking-info">
              <h4>Exclusively managed by <span className="grad">Strobe Nightlife.</span></h4>
              <p style={{ marginBottom: 24 }}>Available for club nights, beach events, festivals, brand activations, private parties, and corporate events across Goa, India, and internationally.</p>

              <div style={{ marginBottom: 32 }}>
                <a href="https://wa.me/919923580022?text=Hi%20Imprints%2C%20I%20would%20like%20to%20book%20you%20for%20an%20event." target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0, marginRight: 8 }} aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.859L.057 23.428a.5.5 0 0 0 .609.61l5.57-1.474A11.951 11.951 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.523-5.168-1.432l-.362-.216-3.743.99.998-3.742-.234-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Book via WhatsApp
                </a>
              </div>

              <div className="contact-links">
                <a href="https://wa.me/919923580022?text=Hi%20Imprints%2C%20I%20would%20like%20to%20book%20you%20for%20an%20event." target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="contact-link-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.859L.057 23.428a.5.5 0 0 0 .609.61l5.57-1.474A11.951 11.951 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.523-5.168-1.432l-.362-.216-3.743.99.998-3.742-.234-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                  </span>
                  <div className="contact-link-info">
                    <div className="contact-link-label">Connect via WhatsApp</div>
                    <div className="contact-link-val">+91 99235 80022</div>
                  </div>
                </a>
                <a href="mailto:mail@strobenightlife.com" className="contact-link">
                  <span className="contact-link-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M2 4C0.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H2z" fill="#f2f2f2" />
                      <path d="M2 4l10 8.5L22 4" fill="none" stroke="#EA4335" strokeWidth="2.5" />
                      <path d="M0 6l10 8.5L20 6" fill="#EA4335" />
                      <path d="M0 6v12h4V9.5L0 6z" fill="#C5221F" />
                      <path d="M24 6v12h-4V9.5L24 6z" fill="#C5221F" />
                      <path d="M4 9.5V20h16V9.5L12 18 4 9.5z" fill="#f2f2f2" />
                    </svg>
                  </span>
                  <div className="contact-link-info">
                    <div className="contact-link-label">Booking agency</div>
                    <div className="contact-link-val">mail@strobenightlife.com</div>
                  </div>
                </a>
                <a href="https://www.instagram.com/imprintverse/" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="contact-link-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#igGrad)" strokeWidth="1.8" aria-hidden="true">
                      <defs>
                        <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f09433" />
                          <stop offset="25%" stopColor="#e6683c" />
                          <stop offset="50%" stopColor="#dc2743" />
                          <stop offset="75%" stopColor="#cc2366" />
                          <stop offset="100%" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="url(#igGrad)" stroke="none" />
                    </svg>
                  </span>
                  <div className="contact-link-info">
                    <div className="contact-link-label">Instagram DM</div>
                    <div className="contact-link-val">@imprintverse</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <form className="book-form glass" id="bookForm" noValidate>
              <div className="form-row">
                <div className="field">
                  <input type="text" id="f-name" placeholder=" " required />
                  <label htmlFor="f-name">Your Name</label>
                </div>
                <div className="field">
                  <input type="email" id="f-email" placeholder=" " required />
                  <label htmlFor="f-email">Email</label>
                </div>
              </div>
              <div className="field">
                <input type="text" id="f-event" placeholder=" " />
                <label htmlFor="f-event">Event / Venue Name</label>
              </div>
              <div className="form-row">
                <div className="field">
                  <input type="text" id="f-date" placeholder=" " onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }} />
                  <label htmlFor="f-date">Event Date</label>
                </div>
                <div className="field">
                  <input type="text" id="f-phone" placeholder=" " />
                  <label htmlFor="f-phone">Phone / WhatsApp</label>
                </div>
              </div>
              <div className="field">
                <textarea id="f-msg" rows="4" placeholder=" " />
                <label htmlFor="f-msg">Tell us about the night…</label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Request</button>
              <p id="formMsg" style={{ textAlign: 'center', marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--blue)' }} />
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
