import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <div className="footer-brand">Imprint</div>
        <div className="footer-copy">
          Imprint &copy; 2026 <br />
          Artist Managed by Strobe Nightlife <br />
          Website Crafted by Cyber Creative |{' '}
          <Link to="/admin" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
            Admin
          </Link>
        </div>
      </div>
      <div className="footer-links">
        <a href="https://music.apple.com/us/new" target="_blank" rel="noopener noreferrer" aria-label="Apple Music">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 3v12.5a3.5 3.5 0 1 1-2-3.16V7.5l-6 1.5v8.5a3.5 3.5 0 1 1-2-3.16V6l10-3z" />
          </svg>
        </a>
        <a href="https://www.instagram.com/imprintverse/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href="https://www.facebook.com/imprintverse" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a href="https://soundcloud.com/imprintverse" target="_blank" rel="noopener noreferrer" aria-label="SoundCloud">
          <svg width="18" height="12" viewBox="0 0 40 20" fill="currentColor">
            <path d="M0 14.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6C3 7.67 2.33 7 1.5 7S0 7.67 0 8.5v6zm4-2c0 .83.67 1.5 1.5 1.5S7 13.33 7 12.5v-9C7 2.67 6.33 2 5.5 2S4 2.67 4 3.5v9zm4 1.5c0 .83.67 1.5 1.5 1.5S11 14.83 11 14v-8c0-.83-.67-1.5-1.5-1.5S8 5.17 8 6v8zm4 .5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V5.5C15 4.67 14.33 4 13.5 4S12 4.67 12 5.5v9zm5.5 1.5c4.14 0 7.5-3.36 7.5-7.5S21.64 1 17.5 1c-3.4 0-6.27 2.27-7.19 5.37C10.87 6.14 11.5 6.77 11.5 7.5v7c0 .6-.35 1.11-.86 1.35.89.42 1.86.65 2.86.65z" />
          </svg>
        </a>
        <a href="https://www.mixcloud.com/imprintverse/" target="_blank" rel="noopener noreferrer" aria-label="Mixcloud">
          <svg width="16" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.06 5.12A8 8 0 0 1 24 13a7.85 7.85 0 0 1-1.86 5.06A3 3 0 0 1 21 24H7a5 5 0 0 1-5-5A4.62 4.62 0 0 1 3.26 15 7 7 0 0 1 3 13 7 7 0 0 1 10 6a6.82 6.82 0 0 1 2.86.62 8.08 8.08 0 0 1 4.2-1.5z" />
          </svg>
        </a>
        <a href="https://www.twitch.tv/imprintverse" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
          </svg>
        </a>
        <a href="https://x.com/imprintverse" target="_blank" rel="noopener noreferrer" aria-label="X">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a href="https://youtube.com/@imprintverse" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
        <a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.301 1.02zm1.44-3.3c-.301.42-.84.539-1.262.239-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.221c-.6.18-1.2-.18-1.38-.781-.18-.6.18-1.2.78-1.38 4.2-1.26 11.28-1.02 15.781 1.62.54.3.72.96.42 1.5-.299.54-.959.72-1.681.42z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
