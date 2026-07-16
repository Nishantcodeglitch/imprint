import { useEffect, useState } from 'react'

export default function Loader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem('imprint_splash_seen')) {
      setShow(false)
      return
    }

    const t1 = setTimeout(() => {
      sessionStorage.setItem('imprint_splash_seen', '1')
      setShow(false)
    }, 2000)

    return () => clearTimeout(t1)
  }, [])

  if (!show) return null

  return (
    <div
      id="loader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#030306',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999,
        transition: 'opacity 0.8s ease',
        opacity: show ? 1 : 0,
      }}
      aria-label="Loading IMPRINT"
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{
          width: 60,
          height: 60,
          border: '3px solid rgba(123,47,255,0.3)',
          borderTopColor: '#7b2fff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '2.5rem',
          letterSpacing: '0.15em',
          background: 'linear-gradient(135deg, #7b2fff, #c026d3, #00d4ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          IMPRINT
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.65rem',
          color: 'rgba(240,238,255,0.45)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}>
          DJ &amp; Creative Director
        </span>
      </div>
    </div>
  )
}
