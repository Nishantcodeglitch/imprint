import useParticles from '../hooks/useParticles'

export default function BackgroundCanvas() {
  const canvasRef = useParticles()

  return <canvas id="bgCanvas" ref={canvasRef} />
}
