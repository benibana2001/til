import Canv from '../../CanvWriter.js'
import personData from './2020-03-24.js'

const cursor_02 = async () => {
  const pathPerson = '/src/assets/2020-03-24.png'
  const imgPerson = Canv.createImg(pathPerson)
  await Canv.waitResolveImgs()
  const imgPersonFlip = Canv.flipImage(imgPerson)
  // parse json data
  const frames = Canv.parseAsperiteJSON(personData)
  const size = {
    w: frames[0].w,
    h: frames[0].h
  }
  const defaultPosition = { x: 50, y: 50 }
  const output = Canv.moveObj({ ...defaultPosition, ...size })
  //
  const status = {
    constant: {
      image: imgPerson,
      velocity: { x: 0, y: 0 },
      frame: () => {
        const frameLength = 2
        const speed = 20
        const current = tick % (frameLength * speed)
        for (let i = 1; i <= frameLength; i++) {
          if (current < i * speed) return frames[i - 1]
        }
      }
    },
    runRight: {
      image: imgPersonFlip,
      velocity: {x: 1, y: 0},
      frame: () => {
        const speed = 6
        const frameLength = 8
        const current = tick % (frameLength * speed)
        for (let i = 1; i <= frameLength; i++) {
          if (current < i * speed) return frames[i - 1]
        }
      }
    },
    runLeft: {
      image: imgPerson,
      velocity: {x: -1, y: 0},
      frame: () => {
        const speed = 6
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
      Canv.drawImage(state.image, state.frame(), output(state.velocity))
      tick++
    })
  }
  //
  Canv.ctx.scale(3, 3)
  loopAnimation(status.constant)
  //
  Canv.registerEvent('keydown', Canv.keydownHandler({
    right: () => loopAnimation(status.runRight),
    left: () => loopAnimation(status.runLeft)
  }))
  Canv.registerEvent('keyup', Canv.keyupHandler(
    () => loopAnimation(status.constant)
  ))
}
//
export default cursor_02