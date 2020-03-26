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
      frame: () => {
        const frameLength = 2
        const speed = 20
        const current = tick % (frameLength * speed)
        for (let i = 1; i <= frameLength; i++) {
          if (current < i * speed) return frames[i - 1]
        }
      }
    }),
    runRight: {
      image: imgPersonFlip,
      direction: velocity.right,
      frame: () => {
        const speed = 4
        const frameLength = 8
        const current = tick % (frameLength * speed)
        for (let i = 1; i <= frameLength; i++) {
          if (current < i * speed) return frames[i - 1]
        }
      }
    },
    runLeft: {
      image: imgPerson,
      direction: velocity.left,
      frame: () => {
        const speed = 4
        const frameLength = 8
        const current = tick % (frameLength * speed)
        for (let i = 1; i <= frameLength; i++) {
          if (current < i * speed) return frames[i + 1]
        }
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