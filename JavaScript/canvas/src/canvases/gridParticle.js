import Canv from '../CanvWriter.js'
const gridParticle = (c) => {
  const createParticle = (p) => Canv.drawArc(...p)
  const Ps = (() => {
    let ps = []
    const row = 20
    const sz = Canv.canvas.height / (row * 2)
    const col = Canv.canvas.width / sz
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        const o = { x: (sz * 2 * j), y: (sz * i * 2) + (sz) }
        const color = Canv.randomRGBA(0.4)
        const p = Canv.moveParticle(o)(sz)(color)
        ps.push(p)
      }
    }
    return ps
  })()
  const vx = () => Math.random() > 0.5 ? 1 : -1
  const vy = () => Math.random() > 0.5 ? 1 : -1
  //
  const bgcolor = Canv.randomRGBA(0.3)
  Canv.loop(() => {
    Canv.drawBG(bgcolor)
    Ps.forEach((p) => {
      createParticle(p({ x: vx(), y: vy() }))
    })
  })
}

export default gridParticle