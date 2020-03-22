import Canv from '../CanvWriter.js'

const dotPattern = (c) => {
  const cw = Canv.canvas.width
  const ch = Canv.canvas.height
  const particle = () => {
    return [
      Math.random() * cw,
      Math.random() * ch,
      ch > cw ?  Math.random() * cw / 5 : Math.random() * ch / 5,
      randomColor(Math.random() * 1.0)
    ]
  }

  const particles = () => {
    let ary = []
    for (let i = 0; i < 30; i++) {
      ary.push(particle())
    }
    return ary
  }

  const drawParticles = () => {
    for (let i = 0, ps = particles(); i < ps.length; i++) {
      drawArc(c, ...ps[i])
    }
  }

  drawBg(c, cw, ch, randomColor(0.1))
  drawParticles()
}
const drawBg = (ctx, w, h, color) => {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, w, h)
}
const drawArc = function (ctx, x, y, r, color) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
}
const color = () => Math.random() * 255
const randomColor = (opacity) => `rgba(${color()},${color()},${color()}, ${opacity})`

export default dotPattern