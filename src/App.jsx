import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Music from './pages/Music'
import Gigs from './pages/Gigs'
import Venues from './pages/Venues'
import Showcase from './pages/Showcase'
import Booking from './pages/Booking'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/music" element={<Music />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  )
}
