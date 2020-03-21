import Canv from '../CanvWriter.js'

const particleSnow = (c) => {
  let particles = []
  let tick = 0
  Canv.loop(() => {
    createParticles(
      particles.length < 70 &&
      tick % 40 === 0
    )
    updateParticles()
    killParticles()
    drawBG()
    drawParticles()
  })

  const createParticles = (condition) => {
    if (condition) particles.push(particle())
  }
  const particle = () => ({
    x: Math.random() * Canv.canvas.width,
    y: 0,
    speed: 2 + Math.random() * 3, //  2 ~ 5
    radius: 5 + Math.random() * 8,
    color: `rgba(255, 255, 255, ${0.3 + Math.random() * 0.5})`
  })
  const updateParticles = () => {
    for (let part of particles) {
      part.y += part.speed
    }
    tick++
  }
  const killParticles = () => {
    for (let part of particles) {
      if (part.y > Canv.canvas.height) part.y = 0
    }
  }
  const drawParticles = () => {
    for (let part of particles) {
      drawArc(part.x, part.y, part.radius, part.color)
    }
  }
  const drawBG = () => {
    c.fillStyle = 'black'
    c.fillRect(0, 0, Canv.canvas.width, Canv.canvas.height)
  }
  const drawArc = (x, y, r, color) => {
    c.beginPath()
    c.arc(x, y, r, 0, Math.PI * 2)
    c.closePath()
    c.fillStyle = color
    c.fill()
  }
}

export default particleSnow