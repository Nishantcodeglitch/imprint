import { useState, useEffect, useCallback, useRef } from 'react'

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(0,0,0,0.5)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: '#fff',
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
  color: 'var(--muted)',
  marginBottom: '8px',
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(false)
  const [gigsLoading, setGigsLoading] = useState(true)
  const [status, setStatus] = useState({ text: '', type: '' })
  const formRef = useRef(null)
  const statusTimeout = useRef(null)

  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    bookingUrl: '',
  })

  const showStatus = useCallback((text, type) => {
    if (statusTimeout.current) clearTimeout(statusTimeout.current)
    setStatus({ text, type })
    if (type === 'success') {
      statusTimeout.current = setTimeout(() => setStatus({ text: '', type: '' }), 3000)
    }
  }, [])

  useEffect(() => {
    fetch('/api/auth/check', { credentials: 'include' })
      .then(r => r.json())
      .then(json => {
        if (json.authenticated) setLoggedIn(true)
      })
      .catch(() => {})
      .finally(() => setChecking(false))
  }, [])

  const fetchGigs = useCallback(async () => {
    try {
      setGigsLoading(true)
      const res = await fetch('/api/gigs')
      const json = await res.json()
      if (json.success) {
        setGigs(json.data)
      }
    } catch (err) {
      console.error('Failed to load gigs:', err)
    } finally {
      setGigsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (loggedIn) fetchGigs()
  }, [loggedIn, fetchGigs])

  const handleLogin = useCallback(async () => {
    setLoginError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      })
      const json = await res.json()
      if (json.success) {
        setLoggedIn(true)
        setPassword('')
        setUsername('')
      } else {
        setLoginError(json.error || 'Invalid credentials')
      }
    } catch (err) {
      setLoginError('Login failed. Please try again.')
    }
  }, [username, password])

  const handleLogout = useCallback(async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
    setLoggedIn(false)
    setPassword('')
    setUsername('')
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleLogin()
  }, [handleLogin])

  const handleFormChange = useCallback((e) => {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const fileInput = document.getElementById('gImage')
    const file = fileInput?.files?.[0]

    setLoading(true)
    showStatus('Uploading image...', 'loading')

    try {
      let imageUrl = ''
      if (file) {
        const reader = new FileReader()
        const base64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            data: base64,
            mimeType: file.type,
          }),
          credentials: 'include',
        })
        const uploadJson = await uploadRes.json()
        if (!uploadJson.success) throw new Error(uploadJson.error || 'Upload failed')
        imageUrl = uploadJson.url
      }

      showStatus('Saving gig...', 'loading')

      const gigData = {
        title: form.title,
        date: form.date,
        time: form.time,
        location: form.venue,
        imageUrl,
        category: 'Nightclub',
        description: `${form.title} at ${form.venue}`,
        status: 'upcoming',
      }

      const res = await fetch('/api/gigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gigData),
        credentials: 'include',
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.errors?.[0] || json.error || 'Failed to save gig')

      showStatus('Gig added successfully!', 'success')
      formRef.current?.reset()
      setForm({ title: '', date: '', time: '', venue: '', bookingUrl: '' })
      fetchGigs()
    } catch (err) {
      showStatus('Error: ' + err.message, 'error')
    } finally {
      setLoading(false)
    }
  }, [form, showStatus, fetchGigs])

  const handleDelete = useCallback(async (id) => {
    if (!confirm('Delete this gig?')) return
    try {
      const res = await fetch(`/api/gigs/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const json = await res.json()
      if (json.success) {
        setGigs(prev => prev.filter(g => g.id !== id))
        showStatus('Gig deleted', 'success')
      } else {
        showStatus('Error deleting gig', 'error')
      }
    } catch (err) {
      showStatus('Error: ' + err.message, 'error')
    }
  }, [showStatus])

  const getStatusClass = (type) => {
    switch (type) {
      case 'error': return 'status-error'
      case 'success': return 'status-success'
      case 'loading': return 'status-loading'
      default: return ''
    }
  }

  if (checking) {
    return (
      <div style={{
        background: '#030306', color: '#fff', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>Checking session...</p>
      </div>
    )
  }

  if (!loggedIn) {
    return (
      <div style={{
        background: '#030306', color: '#fff', display: 'flex', flexDirection: 'column',
        alignItems: 'center', padding: '40px 20px', minHeight: '100vh',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '400px',
          textAlign: 'center', marginTop: '100px',
        }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '30px' }}>Admin Login</h1>
          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              id="adminUser"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="username"
              style={{
                width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border)', borderRadius: '8px', color: '#fff',
                fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none',
                boxSizing: 'border-box', marginBottom: '12px',
              }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <input
              type="password"
              id="adminPwd"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
              style={{
                width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border)', borderRadius: '8px', color: '#fff',
                fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            onClick={handleLogin}
            style={{
              width: '100%', padding: '16px', background: 'var(--purple)', color: '#fff',
              border: 'none', borderRadius: '8px', fontFamily: 'var(--font-mono)',
              fontSize: '1rem', cursor: 'pointer', transition: '0.3s',
            }}
          >
            LOGIN
          </button>
          {loginError && <p style={{ marginTop: '10px', color: '#ff2d78', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{loginError}</p>}
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: '#030306', color: '#fff', display: 'flex', flexDirection: 'column',
      alignItems: 'center', padding: '40px 20px', minHeight: '100vh',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '600px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem' }}>Add New Gig</h1>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(255,45,120,0.2)', color: '#ff2d78',
              border: '1px solid #ff2d78', padding: '8px 16px',
              borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
            }}
          >
            Logout
          </button>
        </div>
        <form ref={formRef} id="gigForm" onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Event Title *</label>
            <input type="text" id="title" value={form.title} onChange={handleFormChange} required placeholder="e.g. Neon Tide" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Date *</label>
              <input type="date" id="date" value={form.date} onChange={handleFormChange} required style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Time</label>
              <input type="text" id="time" value={form.time} onChange={handleFormChange} placeholder="e.g. 08:30 PM" style={inputStyle} />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Venue *</label>
            <input type="text" id="venue" value={form.venue} onChange={handleFormChange} required placeholder="e.g. Anjuna Beach Club, Goa" style={inputStyle} />
          </div>
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Booking URL</label>
            <input type="url" id="bookingUrl" value={form.bookingUrl} onChange={handleFormChange} placeholder="https://wa.me/..." style={inputStyle} />
          </div>
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Event Poster Image * (Max 5MB, JPG/PNG/GIF/WebP only)</label>
            <input type="file" id="gImage" accept="image/jpeg,image/png,image/gif,image/webp" style={{
              width: '100%', padding: '12px 0', color: '#fff',
              fontFamily: 'var(--font-body)', fontSize: '1rem',
            }} />
          </div>
          <button
            type="submit"
            id="submitBtn"
            disabled={loading}
            style={{
              width: '100%', padding: '16px', background: loading ? 'var(--muted)' : 'var(--purple)', color: '#fff',
              border: 'none', borderRadius: '8px', fontFamily: 'var(--font-mono)',
              fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', transition: '0.3s',
            }}
          >
            {loading ? 'SAVING...' : 'SAVE GIG'}
          </button>
        </form>

        <div id="status" className={getStatusClass(status.type)} style={{
          marginTop: '20px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
          color: status.type === 'error' ? '#ff2d78' : status.type === 'success' ? '#00d4ff' : status.type === 'loading' ? '#7b2fff' : 'transparent',
        }}>
          {status.text}
        </div>

        <div className="gigs-list" style={{
          marginTop: '40px', borderTop: '1px solid var(--border)', paddingTop: '20px',
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '16px' }}>Manage Gigs</h3>
          <div id="gigsListContainer">
            {gigsLoading ? (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)' }}>Loading...</p>
            ) : gigs.length === 0 ? (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)' }}>No gigs found.</p>
            ) : (
              gigs.map(gig => (
                <div key={gig.id} className="gig-row" id={`row-${gig.id}`} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div>
                    <div className="gig-row-title" style={{ fontFamily: 'var(--font-body)' }}>{gig.title}</div>
                    <div className="gig-row-date" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)' }}>{gig.date}</div>
                  </div>
                  <button
                    className="btn-del"
                    onClick={() => handleDelete(gig.id)}
                    style={{
                      background: 'rgba(255,45,120,0.2)', color: '#ff2d78',
                      border: '1px solid #ff2d78', padding: '4px 12px',
                      borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
