import { useEffect, useRef } from 'react'

export default function useCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches

    if (isTouchDevice) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      return
    }

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my

    dot.style.transition = 'width 0.2s, height 0.2s, background-color 0.2s'
    ring.style.transition = 'width 0.3s, height 0.3s, border-color 0.3s'

    const onMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }
    document.addEventListener('mousemove', onMouseMove)

    let animId
    const animate = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return { dotRef, ringRef }
}
