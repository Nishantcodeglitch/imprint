import { useState, useRef } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const eventTypes = [
  { icon: '🏖️', title: 'Beach Parties', desc: 'Sunset sessions and midnight beach sets across Goa\'s coastline. Organic house, afro grooves, deep electronic — tailored for the ocean air.' },
  { icon: '🎛️', title: 'Club Nights', desc: 'Residencies and guest sets at Goa\'s top nightclubs — peak hour energy, reading the crowd, building unforgettable nights from open to close.' },
  { icon: '🎪', title: 'Festivals', desc: 'Stage performances at music festivals and large-scale outdoor events. From intimate 500-person gatherings to 5,000+ crowd festival stages.' },
  { icon: '💍', title: 'Weddings', desc: 'Bespoke wedding sets blending Bollywood, EDM, Konkani and Western music — a seamless, memorable journey for your most special night.' },
  { icon: '🏢', title: 'Corporate Events', desc: 'Professional, polished sets for brand launches, product events, office parties and corporate galas. Goa, Mumbai, Bangalore and beyond.' },
  { icon: '🔒', title: 'Private Sessions', desc: 'Exclusive private parties, villa sessions, luxury resort events and intimate gatherings. Full production or DJ-only setups available.' },
]

const testimonials = [
  { text: 'IMPRINT\'s set at the Benaulim beach party was absolutely insane — the crowd never stopped moving. He reads the floor better than anyone I\'ve seen in Goa!', author: 'Rahul M.', role: 'Mumbai', avatar: 'R', grad: 'linear-gradient(135deg,#c026d3,#06b6d4)' },
  { text: 'Hired IMPRINT for our corporate event in Panjim. The professionalism, the energy — absolutely on point. Our guests were thrilled from start to finish.', author: 'Priya S.', role: 'Bangalore', avatar: 'P', grad: 'linear-gradient(135deg,#ec4899,#7c3aed)' },
  { text: 'Imprint reads a crowd like no one else. Every set is a full event in itself — he completely transforms the room and the energy.', author: 'Riya S.', role: 'Hilltop, Vagator', avatar: 'R', grad: 'linear-gradient(135deg,#7b2fff,#ff2d78)' },
  { text: 'One of the best wedding DJs I\'ve ever seen — mixed Bollywood, EDM and Konkani so seamlessly. The dance floor was never empty, not once!', author: 'Ananya & Dev', role: 'Goa Wedding', avatar: 'A', grad: 'linear-gradient(135deg,#06b6d4,#0284c7)' },
  { text: 'The energy Strobe brings to Goa is truly unmatched. Pure sonic design meets nightlife perfection. Booked twice — will book again.', author: 'Karan M.', role: 'Festival Curator', avatar: 'K', grad: 'linear-gradient(135deg,#00d4ff,#7b2fff)' },
  { text: 'Booked him for our brand launch — the floor didn\'t stop until 4 AM. Complete legend. Fastest booking response too via WhatsApp.', author: 'Aanya P.', role: 'Brand Director, Mumbai', avatar: 'A', grad: 'linear-gradient(135deg,#ff2d78,#7b2fff)' },
  { text: 'From the first beat to the last drop, DJ Imprint kept our festival crowd of 1,500 completely hooked for the full two-hour set.', author: 'Vikram T.', role: 'Event Organiser', avatar: 'V', grad: 'linear-gradient(135deg,#7c3aed,#06b6d4)' },
]

const faqs = [
  { q: 'How far in advance should I book?', a: 'For club nights and beach parties, we recommend booking at least 2–3 weeks in advance. For festivals, weddings, and corporate events, 4–8 weeks ahead is ideal to guarantee availability and allow for proper planning and production coordination.' },
  { q: 'What areas does IMPRINT cover?', a: 'IMPRINT is based in Goa and covers all of Goa — North, South, Panjim, Calangute, Anjuna, Vagator, Benaulim, Canacona and beyond. Travel bookings to Mumbai, Bangalore, Delhi and other Indian cities are available with applicable travel arrangements.' },
  { q: 'What equipment and setup do you need?', a: 'IMPRINT can perform with a standard DJ setup (CDJ-2000NXS or Technics turntables, DJM-900NXS mixer). For smaller or private events, he also performs with his own portable Traktor setup. Full production — sound, lighting, visuals — can be arranged through Strobe Nightlife.' },
  { q: 'What genres and event types are available?', a: 'IMPRINT specialises in Organic House, Afro House, Deep House, Melodic Techno and Electronic music for club and festival settings. For weddings and private events, he adapts to Bollywood, EDM, Konkani, Western pop and more — creating a fully bespoke set for your occasion.' },
  { q: 'What is the fastest way to confirm a booking?', a: 'The quickest way to confirm is via WhatsApp at +91 99235 80022. You can also email mail@strobenightlife.com or DM @imprintverse on Instagram. For urgent same-week bookings, WhatsApp is strongly recommended for fastest response.' },
  { q: 'Can IMPRINT do live Twitch/streaming sets?', a: 'Yes — IMPRINT streams live sets on Twitch at twitch.tv/imprintverse. Online/virtual event bookings for branded streams, online festivals and digital events are available. Reach out via WhatsApp or email for virtual event packages.' },
]

const waUrl = 'https://wa.me/919923580022?text=Hi%20Imprints%2C%20I%20would%20like%20to%20book%20you%20for%20an%20event.'

export default function Booking() {
  const [openFaq, setOpenFaq] = useState(null)
  const formRef = useRef(null)
  useScrollReveal()

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = formRef.current
    const name = form['f-name'].value
    const email = form['f-email'].value
    const phone = form['f-phone'].value
    const event = form['f-event'].value
    const date = form['f-date'].value
    const type = form['f-type'].value
    const location = form['f-location'].value
    const msg = form['f-msg'].value

    const text = `Hi IMPRINT! I would like to book you for an event.%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AEvent/Venue: ${encodeURIComponent(event)}%0ADate: ${encodeURIComponent(date)}%0AType: ${encodeURIComponent(type)}%0ALocation: ${encodeURIComponent(location)}%0AMessage: ${encodeURIComponent(msg)}`

    window.open(`https://wa.me/919923580022?text=${text}`, '_blank')
  }

  return (
    <>
      <section className="page-hero" id="top">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>

        <div className="hero-deco">
          <svg viewBox="0 0 380 560" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hbg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="hbg2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7b2fff" />
                <stop offset="50%" stopColor="#c026d3" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
              <filter id="hglow">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect x="40" y="330" width="300" height="130" rx="14" fill="rgba(10,10,30,0.97)" stroke="url(#hbg)" strokeWidth="1.5" />
            <rect x="58" y="348" width="264" height="92" rx="8" fill="rgba(7,4,20,0.9)" stroke="rgba(123,47,255,0.3)" strokeWidth="1" />
            <circle cx="120" cy="394" r="42" fill="rgba(18,5,45,0.97)" stroke="url(#hbg)" strokeWidth="1.5" />
            <circle cx="120" cy="394" r="32" fill="rgba(12,3,32,1)" stroke="rgba(0,212,255,0.2)" strokeWidth="1" />
            <circle cx="120" cy="394" r="20" fill="rgba(8,2,20,1)" stroke="rgba(123,47,255,0.4)" strokeWidth="1" />
            <circle cx="120" cy="394" r="6" fill="#00d4ff" filter="url(#hglow)" />
            <circle cx="120" cy="394" r="38" fill="none" stroke="rgba(123,47,255,0.1)" strokeWidth="0.6" strokeDasharray="4 2" />
            <circle cx="120" cy="394" r="26" fill="none" stroke="rgba(0,212,255,0.08)" strokeWidth="0.6" strokeDasharray="4 2" />
            <circle cx="260" cy="394" r="42" fill="rgba(18,5,45,0.97)" stroke="url(#hbg)" strokeWidth="1.5" />
            <circle cx="260" cy="394" r="32" fill="rgba(12,3,32,1)" stroke="rgba(0,212,255,0.2)" strokeWidth="1" />
            <circle cx="260" cy="394" r="20" fill="rgba(8,2,20,1)" stroke="rgba(123,47,255,0.4)" strokeWidth="1" />
            <circle cx="260" cy="394" r="6" fill="#ff2d78" filter="url(#hglow)" />
            <circle cx="260" cy="394" r="38" fill="none" stroke="rgba(255,45,120,0.1)" strokeWidth="0.6" strokeDasharray="4 2" />
            <rect x="168" y="352" width="44" height="72" rx="7" fill="rgba(22,6,55,0.97)" stroke="rgba(123,47,255,0.5)" strokeWidth="1" />
            <circle cx="180" cy="368" r="5" fill="rgba(255,45,120,0.85)" filter="url(#hglow)" />
            <circle cx="190" cy="368" r="5" fill="rgba(123,47,255,0.85)" filter="url(#hglow)" />
            <circle cx="200" cy="368" r="5" fill="rgba(0,212,255,0.85)" filter="url(#hglow)" />
            <rect x="185" y="380" width="10" height="30" rx="3" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.4)" strokeWidth="1" />
            <rect x="183" y="390" width="14" height="7" rx="2" fill="rgba(0,212,255,0.7)" />
            <rect x="68" y="354" width="72" height="32" rx="5" fill="rgba(0,0,0,0.85)" stroke="rgba(0,212,255,0.4)" strokeWidth="1" />
            <polyline points="72,370 78,364 84,372 90,362 96,369 102,364 108,370 114,365 118,369 122,363 126,368 130,364 134,370" stroke="rgba(255,255,255,0.75)" strokeWidth="1" fill="none" />
            <ellipse cx="190" cy="255" rx="50" ry="65" fill="rgba(14,5,38,0.88)" stroke="url(#hbg2)" strokeWidth="1.5" />
            <path d="M156 236 Q190 220 224 236" stroke="rgba(123,47,255,0.5)" strokeWidth="1" fill="none" />
            <rect x="180" y="242" width="20" height="32" rx="4" fill="rgba(123,47,255,0.18)" stroke="rgba(123,47,255,0.4)" strokeWidth="0.5" />
            <path d="M142 248 Q105 278 84 322" stroke="url(#hbg2)" strokeWidth="13" strokeLinecap="round" fill="none" />
            <path d="M238 248 Q275 278 296 322" stroke="url(#hbg2)" strokeWidth="13" strokeLinecap="round" fill="none" />
            <ellipse cx="84" cy="327" rx="15" ry="11" fill="rgba(123,47,255,0.6)" stroke="url(#hbg)" strokeWidth="1" />
            <ellipse cx="296" cy="327" rx="15" ry="11" fill="rgba(123,47,255,0.6)" stroke="url(#hbg)" strokeWidth="1" />
            <ellipse cx="190" cy="165" rx="46" ry="52" fill="rgba(14,5,38,0.93)" stroke="url(#hbg2)" strokeWidth="1.5" />
            <ellipse cx="174" cy="160" rx="7" ry="8" fill="rgba(0,212,255,0.75)" filter="url(#hglow)" />
            <ellipse cx="206" cy="160" rx="7" ry="8" fill="rgba(0,212,255,0.75)" filter="url(#hglow)" />
            <path d="M146 154 Q148 118 190 113 Q232 118 234 154" stroke="url(#hbg2)" strokeWidth="5" fill="none" strokeLinecap="round" />
            <rect x="137" y="147" width="15" height="24" rx="7" fill="rgba(123,47,255,0.95)" stroke="var(--blue)" strokeWidth="1" />
            <rect x="228" y="147" width="15" height="24" rx="7" fill="rgba(123,47,255,0.95)" stroke="var(--blue)" strokeWidth="1" />
            <rect x="175" y="213" width="30" height="26" rx="7" fill="rgba(14,5,38,0.88)" stroke="url(#hbg2)" strokeWidth="1" />
            <rect x="160" y="313" width="24" height="50" rx="11" fill="rgba(14,5,38,0.9)" stroke="url(#hbg2)" strokeWidth="1" />
            <rect x="196" y="313" width="24" height="50" rx="11" fill="rgba(14,5,38,0.9)" stroke="url(#hbg2)" strokeWidth="1" />
            <ellipse cx="172" cy="366" rx="20" ry="9" fill="rgba(10,3,24,0.97)" stroke="rgba(123,47,255,0.5)" strokeWidth="1" />
            <ellipse cx="208" cy="366" rx="20" ry="9" fill="rgba(10,3,24,0.97)" stroke="rgba(123,47,255,0.5)" strokeWidth="1" />
            <text x="310" y="180" fontSize="22" fill="rgba(0,212,255,0.45)" fontFamily="serif">♪</text>
            <text x="36" y="200" fontSize="17" fill="rgba(255,45,120,0.38)" fontFamily="serif">♫</text>
            <text x="325" y="260" fontSize="15" fill="rgba(123,47,255,0.48)" fontFamily="serif">♩</text>
            <ellipse cx="190" cy="468" rx="150" ry="18" fill="rgba(123,47,255,0.14)" filter="url(#hglow)" />
          </svg>
        </div>

        <div className="page-hero-content">
          <p className="page-kicker">// Let's Create Together</p>
          <h1 className="page-title">Book <span className="grad">IMPRINT</span></h1>
          <p className="hero-sub">Available for club nights, beach parties, festivals, weddings, corporate events and private sessions across Goa and India.</p>
          <div className="hero-pills">
            <a href={waUrl} target="_blank" className="hero-pill wa" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.859L.057 23.428a.5.5 0 0 0 .609.61l5.57-1.474A11.951 11.951 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.523-5.168-1.432l-.362-.216-3.743.99.998-3.742-.234-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WhatsApp Now
            </a>
            <a href="mailto:mail@strobenightlife.com" className="hero-pill">✉️ &nbsp;Booking Agency</a>
          </div>
        </div>
        <div className="scroll-cue">Scroll</div>
      </section>

      <div className="divider"></div>

      <section className="section" id="form">
        <div className="booking-grid">
          <div className="reveal-left">
            <h3 className="info-head">Exclusively Managed By <span className="grad">Strobe Nightlife</span></h3>
            <p className="info-desc">Available for club nights, beach events, festivals, brand activations, private parties and corporate events across Goa, India and internationally.</p>

            <div className="contact-links">
              <a href={waUrl} target="_blank" className="contact-link wa-link" rel="noopener noreferrer">
                <span className="cl-icon green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.859L.057 23.428a.5.5 0 0 0 .609.61l5.57-1.474A11.951 11.951 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.523-5.168-1.432l-.362-.216-3.743.99.998-3.742-.234-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                </span>
                <div>
                  <div className="cl-label">CONNECT VIA WHATSAPP</div>
                  <div className="cl-val">+91 99235 80022</div>
                </div>
              </a>
              <a href="mailto:mail@strobenightlife.com" className="contact-link">
                <span className="cl-icon purple">✉️</span>
                <div>
                  <div className="cl-label">Booking Agency</div>
                  <div className="cl-val">mail@strobenightlife.com</div>
                </div>
              </a>
              <a href="https://www.instagram.com/imprintverse/" target="_blank" className="contact-link" rel="noopener noreferrer">
                <span className="cl-icon blue">📸</span>
                <div>
                  <div className="cl-label">Instagram DM</div>
                  <div className="cl-val">@imprintverse</div>
                </div>
              </a>
            </div>

            <div className="socials-row">
              <a href="https://www.instagram.com/imprintverse/" target="_blank" className="social-pill" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
              <a href="https://soundcloud.com/imprintverse" target="_blank" className="social-pill" rel="noopener noreferrer">☁️ SoundCloud</a>
              <a href="https://www.mixcloud.com/imprintverse/" target="_blank" className="social-pill" rel="noopener noreferrer">🎧 Mixcloud</a>
              <a href="https://x.com/imprintverse" target="_blank" className="social-pill" rel="noopener noreferrer">𝕏 Twitter</a>
              <a href="https://youtube.com/@imprintverse" target="_blank" className="social-pill" rel="noopener noreferrer">▶️ YouTube</a>
              <a href="https://www.facebook.com/imprintverse" target="_blank" className="social-pill" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>

          <div className="reveal-right">
            <form className="book-form" id="bookForm" ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="form-title">Send a Booking Request</div>
              <div className="form-sub">We'll get back to you within 24 hours</div>

              <div className="form-row">
                <div className="field">
                  <input type="text" id="f-name" name="f-name" placeholder=" " required />
                  <label htmlFor="f-name">Your Name *</label>
                </div>
                <div className="field">
                  <input type="email" id="f-email" name="f-email" placeholder=" " required />
                  <label htmlFor="f-email">Email Address *</label>
                </div>
              </div>

              <div className="field">
                <input type="text" id="f-phone" name="f-phone" placeholder=" " />
                <label htmlFor="f-phone">Phone / WhatsApp Number</label>
              </div>

              <div className="field">
                <input type="text" id="f-event" name="f-event" placeholder=" " />
                <label htmlFor="f-event">Event / Venue Name</label>
              </div>

              <div className="form-row">
                <div className="field">
                  <input type="text" id="f-date" name="f-date" placeholder=" " onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }} />
                  <label htmlFor="f-date">Event Date</label>
                </div>
                <div className="field">
                  <select id="f-type" name="f-type" defaultValue="">
                    <option value="" disabled></option>
                    <option>Club Night</option>
                    <option>Beach Party</option>
                    <option>Festival</option>
                    <option>Wedding</option>
                    <option>Corporate Event</option>
                    <option>Private Party</option>
                    <option>Sunset Session</option>
                    <option>Other</option>
                  </select>
                  <label htmlFor="f-type">Event Type</label>
                </div>
              </div>

              <div className="field">
                <input type="text" id="f-location" name="f-location" placeholder=" " />
                <label htmlFor="f-location">Location / City</label>
              </div>

              <div className="field">
                <textarea id="f-msg" name="f-msg" rows="4" placeholder=" "></textarea>
                <label htmlFor="f-msg">Tell us about the night…</label>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Send Request ↗</button>
                <a href={waUrl} target="_blank" className="btn btn-wa-big" style={{ flex: 1 }} rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.859L.057 23.428a.5.5 0 0 0 .609.61l5.57-1.474A11.951 11.951 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.523-5.168-1.432l-.362-.216-3.743.99.998-3.742-.234-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section">
        <div className="section-head">
          <p className="page-kicker reveal">// What We Cover</p>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,6rem)', letterSpacing: '.05em' }}>
            Event <span className="grad">Types</span></h2>
        </div>
        <div className="event-types-grid">
          {eventTypes.map((et, i) => (
            <div key={i} className="et-card reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <span className="et-icon">{et.icon}</span>
              <div className="et-title">{et.title}</div>
              <p className="et-desc">{et.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"></div>

      <section className="section" style={{ paddingTop: 'clamp(40px,5vw,60px)' }}>
        <div className="section-head">
          <p className="page-kicker reveal">// What Clients Say</p>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '.05em' }}>
            Voices from <span className="grad-blue">the Floor</span></h2>
        </div>
        <div className="marquee-outer reveal" style={{ overflow: 'hidden' }}>
          <div className="marquee-inner" style={{ display: 'flex', gap: '24px', animation: 'marquee-scroll 30s linear infinite', width: 'max-content' }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div className="r-card" key={i} style={{ minWidth: '320px', flexShrink: 0 }}>
                <div style={{ color: '#f5c842', marginBottom: '10px' }}>{'★★★★★'}</div>
                <p>{t.text}</p>
                <div className="r-author">
                  <div className="r-avatar" style={{ background: t.grad }}>{t.avatar}</div>
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: '.9rem' }}>{t.author}</strong>
                    <small style={{ color: 'var(--muted)', fontSize: '.72rem' }}>{t.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section">
        <div className="section-head">
          <p className="page-kicker reveal">// Need to Know</p>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '.05em' }}>
            Booking <span className="grad">FAQ</span></h2>
        </div>
        <div className="faq-list reveal">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
              <div className="faq-q" onClick={() => toggleFaq(i)}>
                <h4>{faq.q}</h4>
                <span className="faq-arrow">⌄</span>
              </div>
              <div className="faq-a" style={{ display: openFaq === i ? 'block' : 'none' }}>
                <div className="faq-a-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
