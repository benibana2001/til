import Canv from '../../CanvWriter.js'
import personData from './2020-03-24.js'
const cursor_02 = async() => {
  const pathPerson = '/src/canvases/cursor_02/2020-03-24.png'
  const imgPerson = Canv.createImg(pathPerson)
  await Canv.waitResolveImgs()

  const move = ((speed) => ({
    right: {x: speed, y: 0},
    left: {x: -speed, y: 0},
    constant: {x: 0, y: 0}
  }))(3)
  const keydownHandler = e => {
    const isArrowKey = e => e.key.slice(0, 5) === 'Arrow'
    if (isArrowKey(e)) e.preventDefault()
    switch (e.key) {
      case 'ArrowRight':
        console.log(e.key)
        direction = move.right; break
      case 'ArrowLeft':
        console.log(e.key)
        direction = move.left; break
    }
  }
  const keyupHandler = () => {
    direction = move.constant
  }
  let direction = move.constant
  const p = Canv.moveParticle({ x: 100, y: 100 })(30)('white')
  Canv.registerEvent('keydown', keydownHandler)
  Canv.registerEvent('keyup', keyupHandler)
  Canv.loop(() => {
    Canv.drawBG('black')
    Canv.drawArc(...p(direction))
  })
}

export default cursor_02