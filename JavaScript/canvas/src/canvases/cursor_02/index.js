import Canv from '../../CanvWriter.js'
import personData from './2020-03-24.js'

const cursor_02 = async () => {
  const pathPerson = '/src/assets/2020-03-24.png'
  const imgPerson = Canv.createImg(pathPerson)
  await Canv.waitResolveImgs()
  const imgPersonFlip = Canv.flipImage(imgPerson)
  //
  const velocity = ((speed) => ({
    right: { x: speed, y: 0 },
    left: { x: -speed, y: 0 },
    constant: { x: 0, y: 0 }
  }))(3)
  // parse json data
  const frames = Canv.parseAsperiteJSON(personData)
  const size = {
    w: frames[0].w,
    h: frames[0].h
  }
  const defaultPosition = { x: 100, y: 100 }
  const output = Canv.moveObj({ ...defaultPosition, ...size })
  //
  const status = {
    constant: () => ({
      image: imgPerson,
      direction: velocity.constant,
      frame: () =>  tick % 40 < 20 ? frames[0] : frames[1]
    }),
    runRight: {
      image: imgPersonFlip,
      direction: velocity.right,
      frame: () => {
        const speed = 4
        const current = tick % (8 * speed)
        if(current < 1 * speed) return frames[0]
        if(current < 2 * speed) return frames[1]
        if(current < 3 * speed) return frames[2]
        if(current < 4 * speed) return frames[3]
        if(current < 5 * speed) return frames[4]
        if(current < 6 * speed) return frames[5]
        if(current < 7 * speed) return frames[6]
        if(current < 8 * speed) return frames[7]
      }
    },
    runLeft: {
      image: imgPerson,
      direction: velocity.left,
      frame: () => {
        const speed = 4
        const current = tick % (8 * speed)
        if(current < 1 * speed) return frames[2]
        if(current < 2 * speed) return frames[3]
        if(current < 3 * speed) return frames[4]
        if(current < 4 * speed) return frames[5]
        if(current < 5 * speed) return frames[6]
        if(current < 6 * speed) return frames[7]
        if(current < 7 * speed) return frames[8]
        if(current < 8 * speed) return frames[9]
      }
    }
  }
  let tick = 0
  const loopAnimation = state => {
    Canv.loop(() => {
      Canv.drawBG('black')
      Canv.drawImage(state.image, state.frame(), output(state.direction))
      tick++
    })
  }
  loopAnimation(status.constant())
  Canv.registerEvent('keydown', Canv.keydownHandler({
    right: () => loopAnimation(status.runRight),
    left: () => loopAnimation(status.runLeft)
  }))
  Canv.registerEvent('keyup', Canv.keyupHandler(
    () => loopAnimation(status.constant())
  ))
}
//
export default cursor_02