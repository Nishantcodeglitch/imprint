import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import useCounters from '../hooks/useCounters'

export default function About() {
  useScrollReveal()
  useCounters()

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero" id="home">
        <div className="page-hero-bg" />
        <div className="page-hero-overlay" />

        <div className="hero-portrait-frame">
          <div className="orbit-ring" />
          <div className="orbit-ring2" />
          <img src="/assets/hero3.jpeg" alt="IMPRINT — Ankith Kedar" />
        </div>

        <div className="page-hero-content">
          <h1 className="page-title">
            <span style={{ display: 'block', fontSize: '0.45em', letterSpacing: '0.2em', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
              ARCHITECT OF
            </span>
            <span className="grad">GOA'S NIGHTLIFE</span>
          </h1>
          <p className="page-hero-sub">DJ · Producer · Nightlife Curator · Goa, India</p>
          <div />
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="https://wa.me/919923580022?text=Hi%20Imprints%2C%20I%20would%20like%20to%20book%20you%20for%20an%20event." target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book IMPRINT</a>
            <Link to="/music" className="btn btn-ghost">Hear the Music ↓</Link>
          </div>
        </div>
        <div className="scroll-cue">Scroll</div>
      </section>

      <div className="divider" />

      {/* MAIN ABOUT */}
      <section className="section" id="about">
        <div className="about-grid">
          <div className="about-img-wrap reveal-left">
            <img src="/assets/hero8.jpeg" alt="Imprints — Ankith Kedar" loading="lazy" />
            <div className="img-badge">
              <div className="img-badge-label">Since</div>
              <div className="img-badge-val">2013</div>
            </div>
          </div>
          <div className="reveal-right">
            <div className="about-text">
              <p className="page-kicker" style={{ marginBottom: 0 }}>// The Man Behind the Music</p>
              <h2>Sound is my <span className="grad">architecture.</span></h2>
              <p><strong>Ankith Kedar</strong> by name, performing as <strong>IMPRINT</strong> — the literal translation of his first name. A visionary DJ &amp; Producer with a unique ability to fuse sounds with hypnotic beats, creating a sonic journey that transports you to a realm of pure bliss.</p>
              <p>Founder of Goa's first professional artist agency <strong>Strobe Nightlife</strong> and Creative Director of <strong>Flashlab Creative</strong> one of Goa's leading creative agencies. He doesn't just play music, he curates experiences at various venues across Goa's coast side. From sunset sessions to high-energy peak-hours in the state's loudest rooms.</p>
              <p>Every tune is carefully selected. Every night is intentional. Architect for redefining Goa's Nightlife.</p>

              <div className="stats">
                <div className="stat">
                  <span className="stat-num" data-target="75">0</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>+</span>
                  <span className="stat-label">Events Played</span>
                </div>
                <div className="stat">
                  <span className="stat-num" data-target="20">0</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>+</span>
                  <span className="stat-label">Venues</span>
                </div>
                <div className="stat">
                  <span className="stat-num" data-target="12">0</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>+</span>
                  <span className="stat-label">Years Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* IDENTITY */}
      <section className="section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="page-kicker reveal">// Roles &amp; Identity</p>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,6rem)', letterSpacing: '0.05em' }}>
            What <span className="grad">IMPRINT</span> Does
          </h2>
        </div>
        <div className="identity-grid">
          <div className="identity-card reveal">
            <span className="identity-icon">🎛️</span>
            <div className="identity-title">DJ & Producer</div>
            <p className="identity-desc">Crafting immersive sonic journeys from sunset sets to peak-hour rooms. Specialising in Organic House, Afro House, Deep House, and Electronic music — every mix is a carefully curated story.</p>
          </div>
          <div className="identity-card reveal" style={{ transitionDelay: '0.1s' }}>
            <span className="identity-icon">🏢</span>
            <div className="identity-title">Strobe Nightlife</div>
            <p className="identity-desc">Founder of Goa's first professional artist management and booking agency. Strobe Nightlife connects world-class talent with Goa's most iconic venues and events, setting a new standard for nightlife in India.</p>
          </div>
          <div className="identity-card reveal" style={{ transitionDelay: '0.2s' }}>
            <span className="identity-icon">🎨</span>
            <div className="identity-title">Flashlab Creative</div>
            <p className="identity-desc">As Creative Director of Flashlab Creative — one of Goa's leading creative agencies — IMPRINT brings the same visionary aesthetic to brands, visuals, and event experiences that he brings to music.</p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* GENRES */}
      <section className="section">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="page-kicker reveal">// Sound Profile</p>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,6rem)', letterSpacing: '0.05em' }}>
            The <span className="grad-blue">Genres</span>
          </h2>
        </div>
        <div className="genre-cloud reveal" style={{ justifyContent: 'center' }}>
          <span className="genre-tag purple">Organic House</span>
          <span className="genre-tag blue">Deep House</span>
          <span className="genre-tag pink">Afro House</span>
          <span className="genre-tag gold">Electronic</span>
          <span className="genre-tag purple">Techno</span>
          <span className="genre-tag blue">Melodic House</span>
          <span className="genre-tag pink">DJ + Sitar Fusion</span>
          <span className="genre-tag gold">Sunset Sessions</span>
          <span className="genre-tag purple">Peak Hour</span>
          <span className="genre-tag blue">Bollywood Fusion</span>
          <span className="genre-tag pink">EDM</span>
          <span className="genre-tag gold">Konkani</span>
        </div>
      </section>

      <div className="divider" />

      {/* TIMELINE */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'start' }}>
          <div>
            <p className="page-kicker reveal">// The Journey</p>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,5rem)', letterSpacing: '0.05em', marginBottom: 48 }}>
              A Decade of <span className="grad">Sonic Stories</span>
            </h2>
            <div className="timeline reveal">
              <div className="timeline-item">
                <div className="timeline-year">2013</div>
                <div className="timeline-title">The Beginning</div>
                <p className="timeline-desc">Started crafting sonic journeys in Goa. First steps behind the decks, learning the craft and building a signature sound.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2016</div>
                <div className="timeline-title">Strobe Nightlife Founded</div>
                <p className="timeline-desc">Founded Goa's first professional artist management and booking agency, changing the landscape for DJs and event producers in the state.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2018</div>
                <div className="timeline-title">Flashlab Creative</div>
                <p className="timeline-desc">Took on the role of Creative Director at Flashlab Creative, merging music with brand storytelling and high-end visual production.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2023</div>
                <div className="timeline-title">"A Selection" Released</div>
                <p className="timeline-desc">Dropped the debut album "A Selection" — 9 tracks of curated sonic artistry released on SoundCloud, building a growing international audience.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2024–25</div>
                <div className="timeline-title">Hilltop, Mayan & Beyond</div>
                <p className="timeline-desc">Played Goa's most prestigious venues — Hilltop Vagator, Mayan Beach Club, Baja, Tikibab, Dynamo — and released two new compilations.</p>
              </div>
              <div className="timeline-item" style={{ marginBottom: 0 }}>
                <div className="timeline-year">2025 →</div>
                <div className="timeline-title">The Next Chapter</div>
                <p className="timeline-desc">Live on Mixcloud with recorded sets. Expanding bookings across India. The sound evolves. The journey continues.</p>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: 60, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="reveal-right" style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '4/5', position: 'relative' }}>
              <img src="/assets/hero6.jpeg" alt="IMPRINT Live" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(3,3,6,0.7),transparent 50%)' }} />
            </div>
            <div className="reveal-right" style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
              <img src="/assets/dj4.jpeg" alt="IMPRINT Behind the Decks" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(3,3,6,0.75),transparent 50%)' }} />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ASSOCIATIONS */}
      <section className="section" style={{ textAlign: 'center' }}>
        <p className="page-kicker reveal">// Associations &amp; Collabs</p>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '0.05em', marginBottom: 16 }}>
          Part of <span className="grad">Something Bigger</span>
        </h2>
        <p className="reveal" style={{ color: 'var(--muted)', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.8, fontSize: '0.95rem' }}>
          From agencies to artists — a growing network of creative collaborators shaping Goa's cultural scene.
        </p>
        <div className="brands-row reveal" style={{ justifyContent: 'center' }}>
          <span className="brand-pill">Strobe Nightlife</span>
          <span className="brand-pill">Flashlab Creative</span>
          <span className="brand-pill">Mayan Beach Club</span>
          <span className="brand-pill">Baja Beach Club</span>
          <span className="brand-pill">Hilltop Vagator</span>
          <span className="brand-pill">Tikibab</span>
          <span className="brand-pill">Dynamo</span>
          <span className="brand-pill">Aura Anjuna</span>
          <span className="brand-pill">Sopon Canacona</span>
          <span className="brand-pill">Mehandi Hasan</span>
        </div>
      </section>

      <div className="divider" />

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: 'clamp(80px,10vw,120px)' }}>
        <p className="page-kicker reveal">// Let's Create</p>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,6rem)', letterSpacing: '0.05em', marginBottom: 24 }}>
          Book <span className="grad">IMPRINT</span>
        </h2>
        <p className="reveal" style={{ color: 'var(--muted)', maxWidth: 440, margin: '0 auto 40px', lineHeight: 1.8 }}>
          Available for club nights, beach parties, festivals, weddings, corporate events and private sessions across Goa and India.
        </p>
        <div className="reveal" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://wa.me/919923580022?text=Hi%20Imprints%2C%20I%20would%20like%20to%20book%20you%20for%20an%20event." target="_blank" rel="noopener noreferrer" className="btn btn-wa">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.859L.057 23.428a.5.5 0 0 0 .609.61l5.57-1.474A11.951 11.951 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.523-5.168-1.432l-.362-.216-3.743.99.998-3.742-.234-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            WhatsApp Booking
          </a>
          <a href="mailto:mail@strobenightlife.com" className="btn btn-ghost">Email Agency ↗</a>
        </div>
      </section>
    </>
  )
}
