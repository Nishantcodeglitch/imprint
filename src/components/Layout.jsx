import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BackgroundCanvas from './BackgroundCanvas'
import Navbar from './Navbar'
import Footer from './Footer'
import Loader from './Loader'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Layout({ children }) {
  const progressRef = useRef(null)
  const backToTopRef = useRef(null)

  useScrollReveal()

  useEffect(() => {
    const progress = progressRef.current
    const backToTop = backToTopRef.current

    const onScroll = () => {
      if (progress) {
        const pct =
          (window.scrollY /
            (document.body.scrollHeight - window.innerHeight)) *
          100
        progress.style.width = pct + '%'
      }
      if (backToTop) {
        backToTop.classList.toggle('visible', window.scrollY > 400)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Loader />
      <BackgroundCanvas aria-hidden="true" />
      <div
        className="scroll-progress"
        id="scrollProgress"
        ref={progressRef}
        role="progressbar"
        aria-valuenow={0}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
      <Link
        to="/"
        id="backToTop"
        ref={backToTopRef}
        aria-label="Back to top"
      >
        &uarr;
      </Link>
    </>
  )
}
