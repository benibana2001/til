import Canv from '../CanvWriter.js'
const cursor = () => {
  const p = Canv.moveParticle({ x: 100, y: 100 })(30)('white')
  const move = ((speed) => ({
    up: { x: 0, y: -speed },
    down: { x: 0, y: speed },
    right: { x: speed, y: 0 },
    left: { x: -speed, y: 0 },
    constant: { x: 0, y: 0 }
  }))(10)
  let direction = move.constant
  Canv.loop(() => {
    Canv.drawBG('black')
    Canv.drawArc(...p(direction))
  })
  window.addEventListener('keydown', e => {
    downHandler(e)
  })

  window.addEventListener('keyup', e => {
    direction = move.constant
  })

  const isArwKey = e => e.key.slice(0, 5) === 'Arrow'
  const downHandler = (e) => {
    if (isArwKey(e)) e.preventDefault()
    switch (e.key) {
      case 'ArrowUp':
        direction = move.up; break
      case 'ArrowDown':
        direction = move.down; break
      case 'ArrowRight':
        direction = move.right; break
      case 'ArrowLeft':
        direction = move.left; break
      // default: e.preventDefault()
    }
  }
}

export default cursor