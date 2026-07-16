export default function HeroVisualizer() {
  return (
    <div className="hero-visualizer" id="heroViz">
      {Array.from({ length: 60 }, (_, i) => (
        <div
          key={i}
          className="hv-bar"
          style={{
            animationDuration: `${(Math.random() * 0.6 + 0.3).toFixed(2)}s`,
            animationDelay: `${(Math.random() * 0.5).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  )
}
