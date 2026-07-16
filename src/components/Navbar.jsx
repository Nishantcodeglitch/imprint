import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/music', label: 'Music' },
    { to: '/gigs', label: 'Gigs & Tour' },
    { to: '/venues', label: 'Venues' },
    { to: '/showcase', label: 'Showcase' },
  ]

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav" role="banner">
      <Link to="/" className="brand" aria-label="IMPRINT Home">
        IMPRINT<span className="brand-dot">.</span>
      </Link>
      <nav className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks" aria-label="Main navigation">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={pathname === l.to ? 'active' : ''}
            aria-current={pathname === l.to ? 'page' : undefined}
          >
            {l.label}
          </Link>
        ))}
        <Link
          to="/booking"
          className={`nav-cta${pathname === '/booking' ? ' active' : ''}`}
        >
          Bookings
        </Link>
      </nav>
      <button
        className={`hamburger${menuOpen ? ' open' : ''}`}
        id="hamburger"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
