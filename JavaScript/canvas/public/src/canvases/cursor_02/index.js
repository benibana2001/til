import Canv from '../../CanvWriter.js'
import personData from './2020-03-24.js'

const cursor_02 = async () => {
  const pathPerson = '/src/canvases/cursor_02/2020-03-24.png'
  const imgPerson = Canv.createImg(pathPerson)
  await Canv.waitResolveImgs()
  // parse json data
  const frames = Canv.parse(personData)
  const displayArea = [0, 0]
  const displaySize = [frames[0][2], frames[0][3]]
  //
  const velocity = ((speed) => ({
    right: { x: speed, y: 0 },
    left: { x: -speed, y: 0 },
    constant: { x: 0, y: 0 }
  }))(3)
  //
  let direction = velocity.constant
  const p = Canv.moveParticle({ x: 100, y: 100 })(30)('white')
  Canv.registerEvent('keydown', Canv.keydownHandler({
    right: () => direction = velocity.right,
    left: () => direction = velocity.left
  }))
  Canv.registerEvent('keyup', Canv.keyupHandler(
    () => direction = velocity.constant
  ))
  Canv.loop(() => {
    Canv.drawBG('black')
    Canv.drawArc(...p(direction))
    Canv.ctx.drawImage(imgPerson, ...frames[0], ...displayArea, ...displaySize)
  })
}

export default cursor_02