import { useState, useEffect, useCallback } from 'react'

const WORDS = [
  '🎧 Curation is my craft.',
  '🌴 Goa is my heartbeat.',
  '🎛️ Every mix tells a story.',
  '🌅 Sunsets fuel the groove.',
  '🔊 Sound is my architecture.',
]

export default function useTypingEffect() {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const tick = useCallback(() => {
    const current = WORDS[wordIdx]
    if (!deleting) {
      setText(current.slice(0, charIdx + 1))
      setCharIdx((c) => c + 1)
      if (charIdx + 1 === current.length) {
        setTimeout(() => setDeleting(true), 2000)
        return
      }
    } else {
      setText(current.slice(0, charIdx - 1))
      setCharIdx((c) => c - 1)
      if (charIdx - 1 === 0) {
        setDeleting(false)
        setWordIdx((w) => (w + 1) % WORDS.length)
        return
      }
    }
  }, [wordIdx, charIdx, deleting])

  useEffect(() => {
    const speed = deleting ? 40 : 80
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, deleting, charIdx])

  return text
}
