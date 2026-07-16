import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const venues = [
  { name: 'Aura Beach Cafe', emoji: '🏖️', location: 'Anjuna · Goa', type: 'Beach Club', filter: 'beach', img: '/assets/ven1.jpeg' },
  { name: 'Baja Beach Club', emoji: '🌅', location: 'Benaulim · Goa', type: 'Beach Club', filter: 'beach', img: '/assets/ven2.jpeg', delay: '0.05s' },
  { name: 'Mayan Beach Club', emoji: '🎪', location: 'Goa', type: 'Beach Club', filter: 'beach', img: '/assets/ven3.jpeg', delay: '0.1s' },
  { name: 'Tikibab', emoji: '🌴', location: 'Benaulim · Goa', type: 'Nightclub', filter: 'club', img: '/assets/ven4.jpeg', delay: '0.05s' },
  { name: 'Hilltop', emoji: '⛰️', location: 'Vagator · Goa', type: 'Festival', filter: 'festival', img: '/assets/ven5.jpeg', delay: '0.1s' },
  { name: 'Sopon', emoji: '🎵', location: 'Canacona · Goa', type: 'Nightclub', filter: 'club', img: '/assets/ven6.jpeg', delay: '0.15s' },
  { name: 'Dynamo', emoji: '⚡', location: 'Vagator · Goa', type: 'Nightclub', filter: 'club', img: '/assets/ven7.jpeg' },
  { name: 'Avtar Bar & Kitchen', emoji: '🍸', location: 'Chapora · Goa', type: 'Nightclub', filter: 'club', img: '/assets/ven8.jpeg', delay: '0.05s' },
  { name: 'Private & Corporate', emoji: '🌊', location: 'Pan-Goa · India', type: 'Private Events', filter: 'beach', img: '/assets/hero6.jpeg', delay: '0.1s' },
]

const filters = [
  { label: 'All Venues', value: 'all' },
  { label: 'Beach Clubs', value: 'beach' },
  { label: 'Nightclubs', value: 'club' },
  { label: 'Festivals', value: 'festival' },
]

export default function Venues() {
  const [activeFilter, setActiveFilter] = useState('all')
  useScrollReveal()

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-dj-deco">
          <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="discGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7b2fff" />
                <stop offset="50%" stopColor="#c026d3" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
              <filter id="glow2">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle cx="140" cy="140" r="130" fill="none" stroke="url(#discGrad)" strokeWidth="2" opacity="0.4" />
            <circle cx="140" cy="140" r="120" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="1" strokeDasharray="8 4" />
            <circle cx="140" cy="140" r="110" fill="rgba(10,5,30,0.95)" stroke="url(#discGrad)" strokeWidth="1.5" />
            <circle cx="140" cy="140" r="85" fill="rgba(8,3,22,1)" stroke="rgba(123,47,255,0.3)" strokeWidth="1" />
            <circle cx="140" cy="140" r="60" fill="rgba(5,2,18,1)" stroke="rgba(0,212,255,0.2)" strokeWidth="1" />
            <circle cx="140" cy="140" r="35" fill="rgba(3,1,12,1)" stroke="rgba(123,47,255,0.4)" strokeWidth="1" />
            <circle cx="140" cy="140" r="100" fill="none" stroke="rgba(123,47,255,0.08)" strokeWidth="0.8" strokeDasharray="3 2" />
            <circle cx="140" cy="140" r="92" fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="0.8" strokeDasharray="3 2" />
            <circle cx="140" cy="140" r="76" fill="none" stroke="rgba(123,47,255,0.08)" strokeWidth="0.8" strokeDasharray="3 2" />
            <circle cx="140" cy="140" r="68" fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="0.8" strokeDasharray="3 2" />
            <circle cx="140" cy="140" r="50" fill="none" stroke="rgba(123,47,255,0.08)" strokeWidth="0.8" strokeDasharray="3 2" />
            <circle cx="140" cy="140" r="32" fill="rgba(123,47,255,0.2)" stroke="url(#discGrad)" strokeWidth="1.5" />
            <circle cx="140" cy="140" r="8" fill="#00d4ff" filter="url(#glow2)" />
            <ellipse cx="100" cy="100" rx="15" ry="8" fill="rgba(255,255,255,0.04)" transform="rotate(-30,100,100)" />
            <ellipse cx="178" cy="175" rx="10" ry="5" fill="rgba(0,212,255,0.06)" transform="rotate(20,178,175)" />
            <ellipse cx="140" cy="265" rx="100" ry="12" fill="rgba(123,47,255,0.18)" filter="url(#glow2)" />
          </svg>
        </div>
        <div className="page-hero-content">
          <p className="page-kicker">// Venues Performed</p>
          <h1 className="page-title"> Our <span className="grad-blue">Clients</span></h1>
          <p className="page-desc">From Goa's most iconic beachside stages to underground nightclubs — IMPRINT has graced them all. Here's where the journey has taken us.</p>
        </div>
      </div>

      <div className="divider"></div>

      <section className="section">
        <div className="filter-row reveal">
          {filters.map(f => (
            <button
              key={f.value}
              className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="venues-grid">
          {venues.map((v, i) => (
            <div
              key={i}
              className="venue-card reveal"
              data-type={v.filter}
              style={{ display: activeFilter === 'all' || activeFilter === v.filter ? '' : 'none', transitionDelay: v.delay || '0s' }}
            >
              <div className="venue-card-img">
                <img src={v.img} alt={v.name} />
                <div className="venue-card-glow"></div>
              </div>
              <div className="venue-card-body">
                <span className="venue-emoji">{v.emoji}</span>
                <div className="venue-name">{v.name}</div>
                <div className="venue-location">{v.location}</div>
                <span className="venue-type">{v.type}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"></div>

      <section className="map-section">
        <div className="section-head">
          <p className="page-kicker reveal">// Goa Coverage</p>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '0.05em' }}>Playing <span className="grad">Across Goa</span></h2>
        </div>
        <div className="map-container reveal">
          <div style={{ position: 'relative', width: '100%', height: '380px', borderRadius: '16px', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d245698.36866655!2d73.9862!3d15.2993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&style=feature:all|element:geometry|color:0x0d0d1a&style=feature:water|element:geometry|color:0x0a0a2a&style=feature:road|element:geometry|color:0x1a0a3a"
              width="100%" height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(1.5) brightness(0.85)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {[
                { top: '22%', left: '35%', color: 'var(--blue)', label: 'Vagator · Hilltop', delay: '0s' },
                { top: '30%', left: '28%', color: 'var(--pink)', label: 'Anjuna · Aura Beach', delay: '0.3s' },
                { top: '42%', left: '48%', color: 'var(--purple)', label: 'Panjim · HQ', delay: '0.5s' },
                { top: '50%', left: '44%', color: 'var(--pink)', label: 'Goa · Mayan Beach Club', delay: '0.2s' },
                { top: '38%', left: '40%', color: 'var(--pink)', label: 'Chapora · Avtar Bar', delay: '0.4s' },
                { top: '62%', left: '52%', color: 'var(--blue)', label: 'Benaulim · Baja / Tikibab', delay: '0.6s' },
                { top: '76%', left: '56%', color: 'var(--pink)', label: 'Canacona · Sopon', delay: '0.8s' },
              ].map((pin, i) => (
                <div key={i} style={{ position: 'absolute', top: pin.top, left: pin.left, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: pin.color, boxShadow: `0 0 12px ${pin.color}`, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${pin.color === 'var(--blue)' ? 'rgba(0,212,255,0.4)' : pin.color === 'var(--purple)' ? 'rgba(123,47,255,0.4)' : 'rgba(255,45,120,0.4)'}`, animation: `pin-pulse 2s ease-in-out infinite`, animationDelay: pin.delay }}></div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.1em', color: 'var(--white)', background: 'rgba(3,3,6,0.85)', padding: '2px 7px', borderRadius: '4px', marginTop: '5px', whiteSpace: 'nowrap', border: '1px solid var(--border)' }}>
                    {pin.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--pink)', boxShadow: '0 0 8px var(--pink)' }}></div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>Regular Venues</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 8px var(--blue)' }}></div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>Featured Spots</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--purple)', boxShadow: '0 0 8px var(--purple)' }}></div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>Key Locations</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section" style={{ textAlign: 'center', paddingBottom: 'clamp(60px,10vw,100px)' }}>
        <p className="page-kicker reveal">// Book a Venue Night</p>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '0.05em', marginBottom: '24px' }}>
          Want IMPRINT at <span className="grad">Your Venue?</span></h2>
        <p className="reveal" style={{ color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.8 }}>Contact us now to book a residency, one-night set, or a full event production with Strobe Nightlife.</p>
        <div className="reveal" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/booking" className="btn btn-primary">Book NOW</a>
          <a href="https://wa.me/919923580022" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">WhatsApp ↗</a>
        </div>
      </section>
    </>
  )
}
