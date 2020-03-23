import Canv from '../CanvWriter.js'
const gridParticle = (c) => {
  const bgcolor = Canv.randomRGBA(0.3)
  const particles = () => {
    const o = { x: 0, y: 0 }
    const s = 10
    const col = Canv.randomRGBA(0.4)
    const baseV = Canv.canvas.width / 500
    const vx = 10
    return[o.x, o.y, s, col]
  }
  Canv.loop(() => {
    Canv.drawBG(bgcolor)
    Canv.drawArc(...particles())
  })
}

const moveParticle = O => size => col => V => {
  O.x += V.x
  O.y += V.y
  return [O.x, O.y, size, col]
}
export default gridParticle