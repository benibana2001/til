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
  const frameCalc = (frameLength, speed, head, reverse) => (() => {
    const current = tick % (frameLength * speed)
    for (let i = 0; i < frameLength; i++) {
      const currentFrame = reverse ? head - i : head + i
      if (current < (i + 1) * speed) return frames[currentFrame]
    }
  })
  const status = {
    constantLeft: {
      image: imgPerson,
      velocity: { x: 0, y: 0 },
      frame: frameCalc(2, 20, 0)
    },
    constantRight: {
      image: imgPersonFlip,
      velocity: { x: 0, y: 0 },
      frame: frameCalc(2, 20, 9, true)
    },
    runRight: {
      image: imgPersonFlip,
      velocity: { x: 1, y: 0 },
      frame: frameCalc(8, 6, 7, true)
    },
    runLeft: {
      image: imgPerson,
      velocity: { x: -1, y: 0 },
      frame: frameCalc(8, 6, 2)
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
  loopAnimation(status.constantLeft)
  //
  Canv.registerEvent('keydown', Canv.keydownHandler({
    right: () => loopAnimation(status.runRight),
    left: () => loopAnimation(status.runLeft)
  }))
  Canv.registerEvent('keyup', Canv.keyupHandler((e) => {
    switch (e.key) {
      case 'ArrowRight':
        loopAnimation(status.constantRight); break
      case 'ArrowLeft':
        loopAnimation(status.constantLeft); break
    }
  }))
  const isSmartPhone = window.innerWidth < window.innerHeight
  const eventType = {
    start: isSmartPhone ? 'touchstart' : 'mousedown',
    end: isSmartPhone ? 'touchend' : 'mouseup'
  }
  const touchPosition = e => ({
    x: isSmartPhone ? e.changedTouches[0].pageX : e.pageX,
    y: isSmartPhone ? e.changedTouches[0].pageY : e.pageY
  })
  Canv.registerEvent(eventType.start, e => {
    loopAnimation(status.runRight)
  })
  Canv.registerEvent(eventType.end, () => loopAnimation(status.constantRight))
}
//
export default cursor_02