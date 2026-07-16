import { useState, useEffect, useCallback } from 'react'
import useCountdown from '../hooks/useCountdown'
import useScrollReveal from '../hooks/useScrollReveal'

const hoverColors = ['var(--purple)', 'var(--blue)', 'var(--pink)', 'var(--gold)']

function GigCard({ gig, index, isFirst }) {
  const color = hoverColors[index % hoverColors.length]
  const isPast = gig.status !== 'upcoming'
  const isFirstUpcoming = isFirst && !isPast

  return (
    <div
      className={`past-gig-card reveal visible${gig.imageUrl ? '' : ' no-image'}${isFirstUpcoming ? ' has-timer' : ''}`}
      style={{ '--hover-color': color }}
    >
      {gig.imageUrl && (
        <img
          src={gig.imageUrl}
          alt={gig.title}
          onError={(e) => {
            e.currentTarget.parentElement.classList.add('no-image')
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      <div className="past-gig-content">
        <div>
          <div className="past-gig-date-pill">{gig.datePill || gig.date}</div>
          <h3 className="past-gig-title">{gig.title}</h3>
          <div className="past-gig-meta">
            <span>📅 {gig.datePill || gig.date}</span>
            {gig.time && <span>🕓 {gig.time}</span>}
            {gig.location && <span>📍 {gig.location}</span>}
            <span>🎵 {gig.category}</span>
          </div>
          <p className="past-gig-desc">{gig.description}</p>
        </div>
        {isPast ? (
          <div className="past-gig-badge"><span>✓</span><span>Played</span></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', marginTop: 16 }}>
            <div className="past-gig-badge" style={{ background: 'rgba(0,230,118,0.1)', borderColor: 'rgba(0,230,118,0.25)', marginTop: 0 }}>
              <span style={{ color: '#00e676' }}>●</span>
              <span style={{ color: '#00e676' }}>Upcoming</span>
            </div>
            <a
              href={`https://wa.me/919923580022?text=Hi%2C%20I%20would%20like%20to%20book%20tickets%20for%20${encodeURIComponent(gig.title)}%20on%20${encodeURIComponent(gig.datePill || gig.date)}.`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', padding: '8px 24px',
                background: 'linear-gradient(135deg, var(--purple), var(--pink))', color: '#fff',
                borderRadius: 20, fontSize: '0.75rem', fontFamily: "'DM Mono', monospace",
                fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none'
              }}
            >Book Now ↗</a>
          </div>
        )}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  const items = [
    { delay: '0s', opacity: 0.4 },
    { delay: '0.3s', opacity: 0.3 },
    { delay: '0.6s', opacity: 0.2 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {items.map((item, i) => (
        <div key={i} className="past-gig-card reveal"
          style={{ minHeight: 180, opacity: item.opacity, animation: `gigShimmer 1.5s infinite ${item.delay}` }}>
          <div style={{ width: '100%', height: 180, background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}></div>
          <div className="past-gig-content" style={{ padding: 20 }}>
            <div style={{ width: '60%', height: 14, background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginBottom: 12 }}></div>
            <div style={{ width: '80%', height: 18, background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginBottom: 10 }}></div>
            <div style={{ width: '90%', height: 12, background: 'rgba(255,255,255,0.04)', borderRadius: 4, marginBottom: 8 }}></div>
            <div style={{ width: '70%', height: 12, background: 'rgba(255,255,255,0.04)', borderRadius: 4 }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Gigs() {
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('upcoming')

  useScrollReveal()

  const now = new Date()
  const upcomingGigs = gigs
    .filter(g => g.status === 'upcoming' && new Date(g.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
  const pastGigs = gigs
    .filter(g => g.status === 'past' || new Date(g.date) < now)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const nextGigDate = upcomingGigs.length > 0 ? upcomingGigs[0].date : null
  const countdown = useCountdown(nextGigDate)

  const fetchGigs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const base = window.location.origin || ''
      const res = await fetch(base + '/api/gigs')
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const json = await res.json()
      if (!json.success) throw new Error(json.error || 'Unknown error')
      setGigs(json.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGigs()
  }, [fetchGigs])

  useEffect(() => {
    if (!loading) {
      const els = document.querySelectorAll('.past-gig-card.reveal:not(.visible)')
      if (els.length > 0) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
        }, { threshold: 0.1 })
        els.forEach(el => observer.observe(el))
        return () => observer.disconnect()
      }
    }
  }, [loading, activeTab])

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-dj-deco">
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7b2fff" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect x="20" y="160" width="260" height="120" rx="12" fill="rgba(10,10,30,0.95)" stroke="url(#tg)" strokeWidth="1.5" />
            <circle cx="110" cy="200" r="70" fill="rgba(15,5,40,0.9)" stroke="url(#tg)" strokeWidth="1.5" />
            <circle cx="110" cy="200" r="55" fill="rgba(10,3,30,1)" stroke="rgba(0,212,255,0.2)" strokeWidth="1" />
            <circle cx="110" cy="200" r="35" fill="rgba(8,2,25,1)" stroke="rgba(123,47,255,0.4)" strokeWidth="1" />
            <circle cx="110" cy="200" r="8" fill="#00d4ff" filter="url(#glow)" />
            <circle cx="110" cy="200" r="65" fill="none" stroke="rgba(123,47,255,0.1)" strokeWidth="0.5" strokeDasharray="4 3" />
            <circle cx="110" cy="200" r="45" fill="none" stroke="rgba(0,212,255,0.08)" strokeWidth="0.5" strokeDasharray="4 3" />
            <line x1="170" y1="168" x2="140" y2="198" stroke="url(#tg)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="170" cy="162" r="8" fill="rgba(25,10,60,1)" stroke="url(#tg)" strokeWidth="1.5" />
            <circle cx="137" cy="201" r="5" fill="#ff2d78" filter="url(#glow)" />
            <rect x="200" y="170" width="60" height="80" rx="6" fill="rgba(15,5,40,0.9)" stroke="rgba(123,47,255,0.4)" strokeWidth="1" />
            <circle cx="215" cy="185" r="6" fill="rgba(255,45,120,0.8)" filter="url(#glow)" />
            <circle cx="230" cy="185" r="6" fill="rgba(123,47,255,0.8)" filter="url(#glow)" />
            <circle cx="245" cy="185" r="6" fill="rgba(0,212,255,0.8)" filter="url(#glow)" />
            <rect x="225" y="198" width="10" height="35" rx="3" fill="rgba(0,212,255,0.15)" stroke="rgba(0,212,255,0.4)" strokeWidth="1" />
            <rect x="223" y="212" width="14" height="7" rx="2" fill="rgba(0,212,255,0.7)" />
            <text x="240" y="140" fontSize="18" fill="rgba(0,212,255,0.5)" fontFamily="serif">♪</text>
            <text x="30" y="150" fontSize="14" fill="rgba(255,45,120,0.4)" fontFamily="serif">♫</text>
            <text x="260" y="170" fontSize="12" fill="rgba(123,47,255,0.5)" fontFamily="serif">♩</text>
            <ellipse cx="150" cy="285" rx="120" ry="12" fill="rgba(123,47,255,0.12)" filter="url(#glow)" />
          </svg>
        </div>
        <div className="page-hero-content">
          <p className="page-kicker">// 03 — Tour</p>
          <h1 className="page-title">Our <span className="grad">Gigs</span></h1>
          <p className="page-desc">
            From intimate beach sessions to high-energy nightclub residencies — every night is a sonic journey crafted just for you.
          </p>
        </div>
      </div>

      <div className="divider"></div>

      <section className="section">
        <div className="tab-row">
          <button
            className={`tab-btn${activeTab === 'upcoming' ? ' active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >Upcoming Gigs</button>
          <button
            className={`tab-btn${activeTab === 'past' ? ' active' : ''}`}
            onClick={() => setActiveTab('past')}
          >Past Gigs</button>
        </div>

        {activeTab === 'upcoming' && (
          <div id="upcomingTab">
            {upcomingGigs.length > 0 && (
              <div className="countdown-wrap reveal">
                <p className="countdown-label">Next Event Countdown</p>
                <div className="countdown-boxes">
                  <div className="cd-box">
                    <div className="cd-num">{countdown.days}</div>
                    <div className="cd-unit">DAYS</div>
                  </div>
                  <div className="cd-sep">:</div>
                  <div className="cd-box">
                    <div className="cd-num">{countdown.hours}</div>
                    <div className="cd-unit">HOURS</div>
                  </div>
                  <div className="cd-sep">:</div>
                  <div className="cd-box">
                    <div className="cd-num">{countdown.minutes}</div>
                    <div className="cd-unit">MINS</div>
                  </div>
                  <div className="cd-sep">:</div>
                  <div className="cd-box">
                    <div className="cd-num">{countdown.seconds}</div>
                    <div className="cd-unit">SECS</div>
                  </div>
                </div>
              </div>
            )}
            {upcomingGigs.length === 0 && !loading && (
              <>
                <div className="countdown-wrap reveal">
                  <div className="countdown-boxes">
                    <p style={{
                      textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                      color: 'var(--muted)', letterSpacing: '0.15em'
                    }}>
                      Stay tuned for upcoming announcements
                    </p>
                  </div>
                </div>
              </>
            )}
            {upcomingGigs.map((gig, i) => (
              <GigCard key={gig._id || gig.id || i} gig={gig} index={i} isFirst={i === 0} />
            ))}
            <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <a href="https://wa.me/919923580022?text=Hi%20Imprints%2C%20I%20would%20like%20to%20enquire%20about%20upcoming%20gigs."
                target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.859L.057 23.428a.5.5 0 0 0 .609.61l5.57-1.474A11.951 11.951 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.523-5.168-1.432l-.362-.216-3.743.99.998-3.742-.234-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                &nbsp;Enquire via WhatsApp
              </a>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
                Fastest response via WhatsApp · Also available for Twitch live stream bookings
              </p>
            </div>
          </div>
        )}

        {activeTab === 'past' && (
          <div id="pastTab">
            {loading && <LoadingSkeleton />}

            {error && !loading && (
              <div id="gigsError" style={{
                textAlign: 'center', padding: '60px 24px'
              }}>
                <p style={{ fontSize: '2rem', marginBottom: 8, opacity: 0.3 }}>⚠️</p>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', marginBottom: 20
                }}>
                  Could not load gigs — server may be offline
                </p>
                <button onClick={fetchGigs} style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '0.8rem',
                  letterSpacing: '0.06em', padding: '10px 24px', borderRadius: 8,
                  border: '1px solid rgba(123,47,255,0.4)', background: 'rgba(123,47,255,0.1)',
                  color: '#7b2fff', cursor: 'pointer', transition: 'all 0.25s'
                }}
                  onMouseEnter={(e) => { e.target.style.background = 'rgba(123,47,255,0.2)'; e.target.style.borderColor = 'rgba(123,47,255,0.6)' }}
                  onMouseLeave={(e) => { e.target.style.background = 'rgba(123,47,255,0.1)'; e.target.style.borderColor = 'rgba(123,47,255,0.4)' }}
                >↻ Retry</button>
              </div>
            )}

            {!loading && !error && pastGigs.length === 0 && (
              <div id="gigsEmpty" style={{ textAlign: 'center', padding: '60px 24px' }}>
                <p style={{ fontSize: '2rem', marginBottom: 8, opacity: 0.3 }}>🎵</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>
                  No past gigs to display yet
                </p>
              </div>
            )}

            {!loading && !error && pastGigs.length > 0 && (
              <div id="gigsContainer">
                {pastGigs.map((gig, i) => (
                  <GigCard key={gig._id || gig.id || i} gig={gig} index={i} isFirst={false} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <style>{`
        @keyframes gigShimmer { 0%,100%{opacity:0.3;} 50%{opacity:0.6;} }
        .past-gig-card.no-image { grid-template-columns: 1fr; }
        .past-gig-card.has-timer { grid-template-columns: 180px 1fr auto; }
        .past-gig-card.no-image.has-timer { grid-template-columns: 1fr auto; }
        .past-gig-card .past-gig-content { padding-left: 40px; }
        .past-gig-card:hover { border-color: var(--hover-color, var(--purple)); }
        @media (max-width: 1000px) { 
          .past-gig-card.has-timer, .past-gig-card.no-image.has-timer { grid-template-columns: 1fr; } 
          .past-gig-card .past-gig-content { padding-left: 18px; }
        }
      `}</style>
    </>
  )
}
