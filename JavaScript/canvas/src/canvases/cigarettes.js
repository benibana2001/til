import Canv from '../CanvWriter.js'
import cigarFrameData from '../assets/cigar.js'
import personFrameData from '../assets/person.js'
const cigarettes = async () => {
  const imgPerson = Canv.createImg('/src/assets/person.png')
  const imgCigar = Canv.createImg('/src/assets/cigar.png')
  await Canv.waitResolveImgs()
  const imgCigarFlip = Canv.flipImage(imgCigar)
  const imgPersonFlip = Canv.flipImage(imgPerson)
  // parse
  const cigarSpritesFrames = Canv.parseAsperiteJSON(cigarFrameData)
  const personSpritesFrames = Canv.parseAsperiteJSON(personFrameData)
  const cigarFrameSize = { w: cigarSpritesFrames[0].w, h: cigarSpritesFrames[0].h }
  const personFrameSize = { w: personSpritesFrames[0].w, h: personSpritesFrames[0].h }
  // Draw, Loop
  const frameCalc = statusObj => tick => {
    const so = statusObj
    const current = tick % (so.frameLength * so.frameSpeed)
    for (let i = 0; i < so.frameLength; i++) {
      const currentFrame = so.reverse ? so.head - i : so.head + i
      if (current < (i + 1) * so.frameSpeed) return so.sprites[currentFrame]
    }
  }
  // Status
  const status = {
    cigar: {
      image: imgCigar,
      velocity: { x: 0, y: 0 },
      sprites: cigarSpritesFrames,
      frameLength: 5,
      frameSpeed: 80,
      head: 0,
      reverse: false,
      frameSize: cigarFrameSize
    },
    constantLeft: {
      image: imgPerson,
      velocity: { x: 0, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 2,
      frameSpeed: 20,
      head: 0,
      frameSize: personFrameSize
    },
    constantRight: {
      image: imgPersonFlip,
      velocity: { x: 0, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 2,
      frameSpeed: 20,
      head: 9,
      reverse: true,
      frameSize: personFrameSize,
    },
    runRight: {
      image: imgPersonFlip,
      velocity: { x: 1, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 8,
      frameSpeed: 6,
      head: 7,
      reverse: true,
      frameSize: personFrameSize,
    },
    runLeft: {
      image: imgPerson,
      velocity: { x: -1, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 8,
      frameSpeed: 6,
      head: 2,
      frameSize: personFrameSize,
    }
  }
  //
  let tick = 0
  const resetTick = () => tick = 0
  const initialPosition = { x: 0, y: 0 }
  const outputCigar = Canv.moveObj(initialPosition)
  const scale = Canv.fitBackgroundScale(200, 3)
  // Animation, EventHandler
  let currentOutput = {} //  For Read
  const loopAnimation = (state, nextLoop = null) => {
    Canv.loop(() => {
      Canv.drawBG('black')
      currentOutput = outputCigar(state.frameSize)(state.velocity)
      Canv.drawImage(state.image, frameCalc(state)(tick), currentOutput)
      tick++
      if (nextLoop) {
        if (nextLoop.trigger()) loopAnimation(nextLoop.state)
      }
    })
  }
  loopAnimation(status.constantLeft)
  const cigarLoop = () => {
    resetTick()
    const endTime = status.cigar.frameLength * status.cigar.frameSpeed
    loopAnimation(status.cigar, {
      state: status.constantLeft,
      trigger: () => tick === endTime
    })
  }
  const spacekeyHandler = e => {
    if (e.key === ' ') {
      e.preventDefault()
      cigarLoop()
    }
  }
  // Attach Event
  Canv.registerEvent('keydown', spacekeyHandler)
  Canv.registerEvent('keydown', Canv.keydownHandler({
    right: () => loopAnimation(status.runRight),
    left: () => loopAnimation(status.runLeft)
  }))
  Canv.registerEvent('keyup', Canv.arrowKeyUpHandler({
    right: () => loopAnimation(status.constantRight),
    left: () => loopAnimation(status.constantLeft)
  }))
  const currentCharaX = () => (currentOutput.x + personFrameSize.w / 2) * scale[0]
  Canv.canvas.addEventListener(Canv.deviceTrigger().start, e => {
    e.preventDefault()
    if (Canv.getTouchPosition(e).x > currentCharaX()) loopAnimation(status.runRight)
    if (Canv.getTouchPosition(e).x < currentCharaX()) loopAnimation(status.runLeft)
  }, { passive: false })
  Canv.canvas.addEventListener(Canv.deviceTrigger().end, e => {
    if (Canv.getTouchPosition(e).x > currentCharaX()) loopAnimation(status.constantRight)
    if (Canv.getTouchPosition(e).x < currentCharaX()) loopAnimation(status.constantLeft)
  })
}
export default cigarettes