import { useEffect, useRef, useCallback } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Music() {
  const mcRef = useRef(null)
  const scRef = useRef(null)
  const mcDiscRef = useRef(null)
  const mcTitleRef = useRef(null)
  const mcSubRef = useRef(null)
  const mcFillRef = useRef(null)
  const mcTimeNowRef = useRef(null)
  const mcTimeDurRef = useRef(null)
  const mcVizRef = useRef(null)
  const mcPlayBtnRef = useRef(null)

  const scDiscRef = useRef(null)
  const scTitleRef = useRef(null)
  const scSubRef = useRef(null)
  const scFillRef = useRef(null)
  const scTimeNowRef = useRef(null)
  const scTimeDurRef = useRef(null)
  const scVizRef = useRef(null)
  const scPlayBtnRef = useRef(null)

  const mcWidgetRef = useRef(null)
  const scWidgetRef = useRef(null)
  const mcPlayingRef = useRef(false)
  const scPlayingRef = useRef(false)

  useScrollReveal()

  const formatTime = useCallback((t) => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${String(s).padStart(2, '0')}`
  }, [])

  const createVizBars = useCallback((container, count = 20) => {
    if (!container) return
    container.innerHTML = ''
    for (let i = 0; i < count; i++) {
      const bar = document.createElement('div')
      bar.className = 'mc-viz-bar'
      bar.style.setProperty('--i', i)
      container.appendChild(bar)
    }
  }, [])

  useEffect(() => {
    createVizBars(mcVizRef.current, 20)
    createVizBars(scVizRef.current, 20)
  }, [createVizBars])

  // Mixcloud Widget API
  useEffect(() => {
    const init = () => {
      mcWidgetRef.current = Mixcloud.PlayerWidget(mcRef.current)
      const w = mcWidgetRef.current

      w.ready.then(() => {
        w.events.play.on(() => {
          mcPlayingRef.current = true
          if (mcPlayBtnRef.current) mcPlayBtnRef.current.textContent = '⏸'
          if (mcDiscRef.current) mcDiscRef.current.style.animationPlayState = 'running'
          document.querySelectorAll('#mcViz .mc-viz-bar').forEach(b => {
            b.style.animationPlayState = 'running'
          })
        })
        w.events.pause.on(() => {
          mcPlayingRef.current = false
          if (mcPlayBtnRef.current) mcPlayBtnRef.current.textContent = '▶'
          if (mcDiscRef.current) mcDiscRef.current.style.animationPlayState = 'paused'
          document.querySelectorAll('#mcViz .mc-viz-bar').forEach(b => {
            b.style.animationPlayState = 'paused'
          })
        })
        w.events.progress.on((progress) => {
          if (mcFillRef.current) mcFillRef.current.style.width = `${progress * 100}%`
        })
        w.events.timeupdate.on((data) => {
          if (mcTimeNowRef.current) mcTimeNowRef.current.textContent = formatTime(data.current)
          if (mcTimeDurRef.current) {
            const dur = data.duration || 0
            mcTimeDurRef.current.textContent = dur > 0 ? formatTime(dur) : '--:--'
          }
        })
      })
    }

    if (window.Mixcloud) {
      init()
    } else {
      const s = document.createElement('script')
      s.src = 'https://widget.mixcloud.com/media/js/widgetApi.js'
      s.onload = init
      document.body.appendChild(s)
    }
  }, [formatTime])

  // SoundCloud Widget API
  useEffect(() => {
    let iframe = null
    const setup = () => {
      iframe = scRef.current
      if (!iframe) return
      scWidgetRef.current = SC.Widget(iframe)
      const w = scWidgetRef.current

      w.bind(SC.Widget.Events.PLAY, () => {
        scPlayingRef.current = true
        if (scPlayBtnRef.current) scPlayBtnRef.current.textContent = '⏸'
        if (scDiscRef.current) scDiscRef.current.style.animationPlayState = 'running'
        document.querySelectorAll('#scViz .mc-viz-bar').forEach(b => {
          b.style.animationPlayState = 'running'
        })
      })
      w.bind(SC.Widget.Events.PAUSE, () => {
        scPlayingRef.current = false
        if (scPlayBtnRef.current) scPlayBtnRef.current.textContent = '▶'
        if (scDiscRef.current) scDiscRef.current.style.animationPlayState = 'paused'
        document.querySelectorAll('#scViz .mc-viz-bar').forEach(b => {
          b.style.animationPlayState = 'paused'
        })
      })
      w.bind(SC.Widget.Events.PLAY_PROGRESS, (data) => {
        const p = (data.currentPosition / data.duration) * 100 || 0
        if (scFillRef.current) scFillRef.current.style.width = `${p}%`
        if (scTimeNowRef.current) scTimeNowRef.current.textContent = formatTime(data.currentPosition / 1000)
        if (scTimeDurRef.current) scTimeDurRef.current.textContent = formatTime(data.duration / 1000)
      })
    }

    if (window.SC) {
      setup()
    } else {
      const s = document.createElement('script')
      s.src = 'https://w.soundcloud.com/player/api.js'
      s.onload = setup
      document.body.appendChild(s)
    }
  }, [formatTime])

  const playMcTrack = (title, sub, cloudcastUrl, num) => {
    const w = mcWidgetRef.current
    if (!w) return
    w.load(cloudcastUrl, true)
    if (mcTitleRef.current) mcTitleRef.current.textContent = title
    if (mcSubRef.current) mcSubRef.current.textContent = sub
    document.querySelectorAll('.mc-track').forEach(t => t.classList.remove('active'))
    const el = document.getElementById(`mcT${num}`)
    if (el) el.classList.add('active')
  }

  const playScTrack = (title, sub, trackId, num) => {
    const w = scWidgetRef.current
    if (!w) return
    w.load(`https://api.soundcloud.com/tracks/${trackId}`, { auto_play: true })
    if (scTitleRef.current) scTitleRef.current.textContent = title
    if (scSubRef.current) scSubRef.current.textContent = sub
    document.querySelectorAll('#scTracks .mc-track').forEach(t => t.classList.remove('active'))
    const el = document.getElementById(`scT${num}`)
    if (el) el.classList.add('active')
  }

  const mcTogglePlay = () => {
    const w = mcWidgetRef.current
    if (!w) return
    if (mcPlayingRef.current) w.pause()
    else w.play()
  }

  const scTogglePlay = () => {
    const w = scWidgetRef.current
    if (!w) return
    if (scPlayingRef.current) w.pause()
    else w.play()
  }

  const mcSeek = (e) => {
    const w = mcWidgetRef.current
    if (!w) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    w.seek(pct)
  }

  const scSeek = (e) => {
    const w = scWidgetRef.current
    if (!w) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    w.getDuration((dur) => {
      w.seekTo(pct * dur)
    })
  }

  return (
    <>
      <section className="page-hero" id="top">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>

        <div className="hero-vinyl">
          <svg viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="vg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7b2fff" />
                <stop offset="50%" stopColor="#c026d3" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
              <radialGradient id="labelGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(123,47,255,0.8)" />
                <stop offset="100%" stopColor="rgba(7,7,26,0.9)" />
              </radialGradient>
              <filter id="vglow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <ellipse cx="220" cy="420" rx="160" ry="16" fill="rgba(123,47,255,0.2)" filter="url(#vglow)" />
            <circle cx="220" cy="210" r="200" fill="rgba(8,3,22,0.97)" stroke="url(#vg)" strokeWidth="2" />
            {[195, 185, 175, 165, 155, 145, 135, 125, 115, 105].map((r, i) => (
              <circle key={r} cx="220" cy="210" r={r} fill="none"
                stroke={i % 2 === 0 ? 'rgba(123,47,255,0.06)' : 'rgba(0,212,255,0.05)'}
                strokeWidth="0.8" />
            ))}
            <circle cx="220" cy="210" r="80" fill="url(#labelGrad)" stroke="url(#vg)" strokeWidth="1.5" />
            <text x="220" y="195" textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="22"
              fill="rgba(240,238,255,0.9)" letterSpacing="4">IMPRINT</text>
            <text x="220" y="216" textAnchor="middle" fontFamily="monospace" fontSize="7"
              fill="rgba(0,212,255,0.7)" letterSpacing="3">A SELECTION</text>
            <text x="220" y="232" textAnchor="middle" fontFamily="monospace" fontSize="6"
              fill="rgba(240,238,255,0.3)" letterSpacing="2">STROBE NIGHTLIFE</text>
            <circle cx="220" cy="210" r="10" fill="rgba(3,3,6,1)" stroke="url(#vg)" strokeWidth="1.5" />
            <circle cx="220" cy="210" r="5" fill="var(--blue)" filter="url(#vglow)" />
            <ellipse cx="170" cy="150" rx="25" ry="10" fill="rgba(255,255,255,0.04)" transform="rotate(-35,170,150)" />
            <text x="370" y="120" fontSize="24" fill="rgba(0,212,255,0.4)" fontFamily="serif">♪</text>
            <text x="40" y="160" fontSize="18" fill="rgba(255,45,120,0.35)" fontFamily="serif">♫</text>
            <text x="380" y="280" fontSize="16" fill="rgba(123,47,255,0.45)" fontFamily="serif">♩</text>
            <text x="30" y="290" fontSize="20" fill="rgba(0,212,255,0.3)" fontFamily="serif">♬</text>
          </svg>
        </div>

        <div className="page-hero-content">
          <h1 className="page-title">
            <span className="grad-blue">Sound</span><br />
            <span style={{ color: 'var(--white)' }}>Design</span>
          </h1>
          <p className="page-desc" style={{
            color: 'var(--muted)',
            fontSize: 'clamp(0.9rem,1.5vw,1.05rem)',
            maxWidth: 440,
            lineHeight: 1.8,
            marginBottom: 36
          }}>
            Cinematic Background Scores, Music Production, Instrument & Vocal Recording, Mixing & Mastering
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="https://soundcloud.com/imprintverse" target="_blank" rel="noopener noreferrer" className="btn btn-primary">SoundCloud ↗</a>
            <a href="https://www.mixcloud.com/imprintverse/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Mixcloud ↗</a>
          </div>
        </div>

        <div className="hero-viz" id="heroViz"></div>
        <div className="scroll-cue">Scroll</div>
      </section>

      <div className="divider"></div>

      <section className="section" id="platforms">
        <div className="section-head">
          <p className="page-kicker reveal">Find IMPRINT On</p>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem,6vw,5rem)',
            letterSpacing: '0.05em'
          }}>
            Streaming <span className="grad-blue">Platforms</span>
          </h2>
        </div>

        <div className="platforms-grid" style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <a href="https://open.spotify.com/user/imprintverse" target="_blank" rel="noopener noreferrer"
            className="platform-card featured-card reveal"
            style={{ padding: '2.5rem 2rem', borderColor: 'rgba(30, 215, 96, 0.3)' }}>
            <span className="platform-icon" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 48 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#1ed760">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.301 1.02zm1.44-3.3c-.301.42-.84.539-1.262.239-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.221c-.6.18-1.2-.18-1.38-.781-.18-.6.18-1.2.78-1.38 4.2-1.26 11.28-1.02 15.781 1.62.54.3.72.96.42 1.5-.299.54-.959.72-1.681.42z" />
              </svg>
            </span>
            <div className="platform-name" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Spotify</div>
            <div className="platform-handle" style={{ fontSize: '1rem', opacity: 0.7 }}>@imprintverse</div>
          </a>

          <a href="https://music.apple.com/profile/imprintverse" target="_blank" rel="noopener noreferrer"
            className="platform-card featured-card reveal"
            style={{ transitionDelay: '0.08s', padding: '2.5rem 2rem', borderColor: 'rgba(252, 60, 68, 0.3)' }}>
            <span className="platform-icon" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 48 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#fc3c44">
                <path d="M17 3v12.5a3.5 3.5 0 1 1-2-3.16V7.5l-6 1.5v8.5a3.5 3.5 0 1 1-2-3.16V6l10-3z" />
              </svg>
            </span>
            <div className="platform-name" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Apple Music</div>
            <div className="platform-handle" style={{ fontSize: '1rem', opacity: 0.7 }}>@imprintverse</div>
          </a>
        </div>

        <div className="platforms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          <a href="https://soundcloud.com/imprintverse" target="_blank" rel="noopener noreferrer"
            className="platform-card reveal" style={{ transitionDelay: '0.16s' }}>
            <span className="platform-icon" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 48 }}>
              <svg width="48" height="32" viewBox="0 0 40 20" fill="#ff5500">
                <path d="M0 14.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6C3 7.67 2.33 7 1.5 7S0 7.67 0 8.5v6zm4-2c0 .83.67 1.5 1.5 1.5S7 13.33 7 12.5v-9C7 2.67 6.33 2 5.5 2S4 2.67 4 3.5v9zm4 1.5c0 .83.67 1.5 1.5 1.5S11 14.83 11 14v-8c0-.83-.67-1.5-1.5-1.5S8 5.17 8 6v8zm4 .5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V5.5C15 4.67 14.33 4 13.5 4S12 4.67 12 5.5v9zm5.5 1.5c4.14 0 7.5-3.36 7.5-7.5S21.64 1 17.5 1c-3.4 0-6.27 2.27-7.19 5.37C10.87 6.14 11.5 6.77 11.5 7.5v7c0 .6-.35 1.11-.86 1.35.89.42 1.86.65 2.86.65z" />
              </svg>
            </span>
            <div className="platform-name">SoundCloud</div>
            <div className="platform-handle">@imprintverse</div>
          </a>
          <a href="https://www.mixcloud.com/imprintverse/" target="_blank" rel="noopener noreferrer"
            className="platform-card reveal" style={{ transitionDelay: '0.24s' }}>
            <span className="platform-icon" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 48 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#5000ff">
                <path d="M17.06 5.12A8 8 0 0 1 24 13a7.85 7.85 0 0 1-1.86 5.06A3 3 0 0 1 21 24H7a5 5 0 0 1-5-5A4.62 4.62 0 0 1 3.26 15 7 7 0 0 1 3 13 7 7 0 0 1 10 6a6.82 6.82 0 0 1 2.86.62 8.08 8.08 0 0 1 4.2-1.5z" />
              </svg>
            </span>
            <div className="platform-name">Mixcloud</div>
            <div className="platform-handle">@imprintverse</div>
          </a>
          <a href="https://www.twitch.tv/imprintverse" target="_blank" rel="noopener noreferrer"
            className="platform-card reveal" style={{ transitionDelay: '0.32s' }}>
            <span className="platform-icon" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 48 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#9146ff">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
              </svg>
            </span>
            <div className="platform-name">Twitch</div>
            <div className="platform-handle">@imprintverse</div>
          </a>
          <a href="https://youtube.com/@imprintverse" target="_blank" rel="noopener noreferrer"
            className="platform-card reveal" style={{ transitionDelay: '0.40s' }}>
            <span className="platform-icon" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 48 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#ff0000">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </span>
            <div className="platform-name">YouTube</div>
            <div className="platform-handle">@imprintverse</div>
          </a>
        </div>
      </section>

      <section className="section" id="albums">
        <div className="section-head">
          <p className="page-kicker reveal">Discography</p>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem,6vw,6rem)',
            letterSpacing: '0.05em'
          }}>
            Albums & <span className="grad-blue">Compilations</span>
          </h2>
        </div>

        <div className="albums-grid">
          <a href="https://soundcloud.com/imprintverse/sets/vibe" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div className="album-card reveal">
              <div className="album-thumb">
                <img src="/assets/alb1.jpeg" alt="A Selection" />
                <div className="album-thumb-overlay">
                  <div className="play-circle">▶</div>
                </div>
                <div className="album-vinyl">
                  <div className="album-vinyl-dot"></div>
                </div>
              </div>
              <div className="album-body">
                <div className="album-title">A Selection</div>
                <div className="album-meta">Album · 9 Tracks · Oct 2023</div>
                <span className="album-tag">SoundCloud</span>
              </div>
            </div>
          </a>
          <a href="https://soundcloud.com/imprintverse/sets/neutral-selection-compilation" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div className="album-card reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="album-thumb">
                <img src="/assets/alb2.jpeg" alt="Neutral Selection" />
                <div className="album-thumb-overlay">
                  <div className="play-circle">▶</div>
                </div>
                <div className="album-vinyl">
                  <div className="album-vinyl-dot"></div>
                </div>
              </div>
              <div className="album-body">
                <div className="album-title">Neutral Selection</div>
                <div className="album-meta">Compilation · 9 Tracks · Apr 2025</div>
                <span className="album-tag">SoundCloud</span>
              </div>
            </div>
          </a>
          <a href="https://soundcloud.com/imprintverse/sets/organic-selection" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div className="album-card reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="album-thumb">
                <img src="/assets/alb3.jpeg" alt="Organic Selection" />
                <div className="album-thumb-overlay">
                  <div className="play-circle">▶</div>
                </div>
                <div className="album-vinyl">
                  <div className="album-vinyl-dot"></div>
                </div>
              </div>
              <div className="album-body">
                <div className="album-title">Organic Selection</div>
                <div className="album-meta">Compilation · 22 Tracks · Jan 2025</div>
                <span className="album-tag">SoundCloud</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section" id="mixcloud">
        <div className="section-head">
          <p className="page-kicker reveal">Live Sets & Recordings</p>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem,6vw,6rem)',
            letterSpacing: '0.05em'
          }}>
            Mixes on <span className="grad">Mixcloud</span>
          </h2>
        </div>

        <div className="mc-player reveal">
          <div className="mc-top">
            <div className="mc-disc-wrap">
              <div className="mc-disc" ref={mcDiscRef}>
                <div className="mc-disc-grooves"></div>
                <div className="mc-disc-center"></div>
              </div>
              <div className="mc-disc-ring"></div>
            </div>
            <div className="mc-info">
              <div className="mc-info-label">Now Playing</div>
              <div className="mc-info-title" ref={mcTitleRef}>Select a Mix</div>
              <div className="mc-info-sub" ref={mcSubRef}>IMPRINTS · Mixcloud</div>
            </div>
          </div>

          <div className="mc-seek" onClick={mcSeek} id="mcSeekBar">
            <div className="mc-seek-fill" ref={mcFillRef}></div>
          </div>
          <div className="mc-times">
            <span ref={mcTimeNowRef}>0:00</span>
            <span ref={mcTimeDurRef}>--:--</span>
          </div>

          <div className="mc-viz" id="mcViz" ref={mcVizRef}></div>

          <div className="mc-controls">
            <button className="mc-btn" onClick={() => { const w = mcWidgetRef.current; if (w) w.seek(0) }}>⏮</button>
            <button className="mc-btn mc-play-btn" ref={mcPlayBtnRef} onClick={mcTogglePlay}>▶</button>
            <button className="mc-btn" onClick={() => { const w = mcWidgetRef.current; if (w) w.seek(9999) }}>⏭</button>
          </div>

          <div className="mc-embed-area" id="mcEmbedArea">
            <iframe ref={mcRef} title="Mixcloud Player" width="100%" height="120"
              src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fimprintverse%2F"
              frameBorder="0" style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none', overflow: 'hidden' }}></iframe>
          </div>

          <div className="mc-tracks">
            <div className="mc-track" id="mcT1"
              onClick={() => playMcTrack('Live Recording (DJ Only)', 'Mayan Beach Club · Goa', 'imprintverse/imprint-live-recording-dj-only-from-mayan-beach-club', 1)}>
              <span className="mc-track-num">01</span>
              <div className="mc-track-info">
                <div className="mc-track-name">Live Recording (DJ Only)</div>
                <div className="mc-track-sub">Mayan Beach Club · Goa</div>
              </div>
              <span className="mc-track-dur">50:46</span>
            </div>
            <div className="mc-track" id="mcT2"
              onClick={() => playMcTrack('Live Recording · Tikibab', 'Benaulim · Nov 30, 2025', 'imprintverse/live-recording-from-tikibab-benaulim-30-nov-2025', 2)}>
              <span className="mc-track-num">02</span>
              <div className="mc-track-info">
                <div className="mc-track-name">Live Recording · Tikibab</div>
                <div className="mc-track-sub">Benaulim · Nov 30, 2025</div>
              </div>
              <span className="mc-track-dur">60:00</span>
            </div>
            <div className="mc-track" id="mcT3"
              onClick={() => playMcTrack('Dynacode Radio 01', 'Debut Edition · Imprints', 'imprintverse/imprint-dynacode-radio-01-debut-edition', 3)}>
              <span className="mc-track-num">03</span>
              <div className="mc-track-info">
                <div className="mc-track-name">Dynacode Radio 01</div>
                <div className="mc-track-sub">Debut Edition · Imprints</div>
              </div>
              <span className="mc-track-dur">60:00</span>
            </div>
            <div className="mc-track" onClick={() => window.open('https://www.mixcloud.com/imprintverse/', '_blank')}>
              <span className="mc-track-num">↗</span>
              <div className="mc-track-info">
                <div className="mc-track-name">All Mixes</div>
                <div className="mc-track-sub">View full profile on Mixcloud</div>
              </div>
              <span className="mc-track-dur"></span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <a href="https://www.mixcloud.com/imprintverse/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Full Profile on Mixcloud ↗
          </a>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section" id="tracks">
        <div className="section-head">
          <p className="page-kicker reveal">Latest Drops</p>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem,6vw,6rem)',
            letterSpacing: '0.05em'
          }}>
            <span className="grad">SoundCloud</span>
          </h2>
          <div className="eq-bars reveal" style={{ justifyContent: 'center', marginTop: 20 }}>
            {[0.45, 0.7, 0.55, 0.4, 0.8, 0.5, 0.65, 0.75, 0.45, 0.6, 0.9, 0.5].map((dur, i) => (
              <div key={i} className="eq-bar" style={{ animationDuration: `${dur}s` }}></div>
            ))}
          </div>
        </div>

        <div className="mc-player reveal">
          <div className="mc-top">
            <div className="mc-disc-wrap">
              <div className="mc-disc" ref={scDiscRef}>
                <div className="mc-disc-grooves"></div>
                <div className="mc-disc-center"></div>
              </div>
              <div className="mc-disc-ring"></div>
            </div>
            <div className="mc-info">
              <div className="mc-info-label">Now Playing</div>
              <div className="mc-info-title" ref={scTitleRef}>Select a Track</div>
              <div className="mc-info-sub" ref={scSubRef}>IMPRINTS · SoundCloud</div>
            </div>
          </div>

          <div className="mc-seek" onClick={scSeek} id="scSeekBar">
            <div className="mc-seek-fill" ref={scFillRef}></div>
          </div>
          <div className="mc-times">
            <span ref={scTimeNowRef}>0:00</span>
            <span ref={scTimeDurRef}>--:--</span>
          </div>

          <div className="mc-viz" id="scViz" ref={scVizRef}></div>

          <div className="mc-controls">
            <button className="mc-btn" onClick={() => { const w = scWidgetRef.current; if (w) w.seekTo(0) }}>⏮</button>
            <button className="mc-btn mc-play-btn" ref={scPlayBtnRef} onClick={scTogglePlay}>▶</button>
            <button className="mc-btn" onClick={() => { const w = scWidgetRef.current; if (w) w.seekTo(9999999) }}>⏭</button>
          </div>

          <div className="mc-embed-area" style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <iframe ref={scRef} id="scIframe" title="SoundCloud Player" width="100%" height="166" scrolling="no"
              frameBorder="no" allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2284022180&color=%237b2fff&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false">
            </iframe>
          </div>

          <div className="mc-tracks" id="scTracks">
            <div className="mc-track" id="scT1"
              onClick={() => playScTrack('Marea (UCHA Remix x Claes Sommer Interpretation)', 'Fred again.., UCHA, Claes Sommer', '2284022180', 1)}>
              <span className="mc-track-num">01</span>
              <div className="mc-track-info">
                <div className="mc-track-name">Marea (UCHA Remix x Claes Sommer Interpretation)</div>
                <div className="mc-track-sub">Fred again.., UCHA, Claes Sommer</div>
              </div>
              <span className="mc-track-dur">4:59</span>
            </div>
            <div className="mc-track" id="scT2"
              onClick={() => playScTrack('Imprint - Lift Off (Galactica Mix)', 'Imprint', '1948465335', 2)}>
              <span className="mc-track-num">02</span>
              <div className="mc-track-info">
                <div className="mc-track-name">Imprint - Lift Off (Galactica Mix)</div>
                <div className="mc-track-sub">Imprint</div>
              </div>
              <span className="mc-track-dur">2:54</span>
            </div>
            <div className="mc-track" id="scT3"
              onClick={() => playScTrack('kchillmusik', 'Imprint', '1948451183', 3)}>
              <span className="mc-track-num">03</span>
              <div className="mc-track-info">
                <div className="mc-track-name">kchillmusik</div>
                <div className="mc-track-sub">Imprint</div>
              </div>
              <span className="mc-track-dur">1:00:13</span>
            </div>
            <div className="mc-track" onClick={() => window.open('https://soundcloud.com/imprintverse', '_blank')}>
              <span className="mc-track-num">↗</span>
              <div className="mc-track-info">
                <div className="mc-track-name">All Tracks</div>
                <div className="mc-track-sub">View full profile on SoundCloud</div>
              </div>
              <span className="mc-track-dur"></span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>
    </>
  )
}
