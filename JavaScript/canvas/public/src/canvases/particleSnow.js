import Canv from '../CanvWriter.js'

const particleSnow = (c) => {
  let particles = []
  let tick = 0
  Canv.loop(() => {
    createParticles()
    updateParticles()
    killParticles()
    drawParticles()
  })
  const createParticles = () => {
    if (tick % 40 === 0) {
      if (particles.length < 70) {
        particles.push(
          {
            x: Math.random() * Canv.canvas.width,
            y: 0,
            speed: 2 + Math.random() * 3, //  2 ~ 5
            radius: 5 + Math.random() * 8,
            color: `rgba(255, 255, 255, ${0.3 + Math.random() * 0.5})`
          }
        )
      }
    }
  }
  const updateParticles = () => {
    for (let i in particles) {
      let part = particles[i]
      part.y += part.speed
    }
    tick++
  }
  const killParticles = () => {
    for (let i in particles) {
      let part = particles[i]
      if (part.y > Canv.canvas.height) part.y = 0
    }
  }
  const drawParticles = () => {
    c.fillStyle = 'black'
    c.fillRect(0, 0, Canv.canvas.width, Canv.canvas.height)
    for (let i in particles) {
      let part = particles[i]
      c.beginPath()
      c.arc(part.x, part.y, part.radius, 0, Math.PI * 2)
      c.closePath()
      c.fillStyle = part.color
      c.fill()
    }
  }
}

export default particleSnow