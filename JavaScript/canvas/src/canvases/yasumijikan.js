import Canv from '../CanvWriter.js'
import cigarFrameData from '../assets/cigar.js'
import personFrameData from '../assets/person.js'
const yasumijikan = async () => {
  // prepare images
  const imgPerson = Canv.createImg('/src/assets/person.png')
  const imgCigar = Canv.createImg('/src/assets/cigar.png')
  const imgLooftop = Canv.createImg('/src/assets/looftop.png') //  w:200, h: 180
  const imgBirds = Canv.createImg('/src/assets/birds.png')
  await Canv.waitResolveImgs()
  const imgPersonFlip = Canv.flipImage(imgPerson)
  // parse Aseprite frame data
  const cigarSpritesFrames = Canv.parseAsperiteJSON(cigarFrameData)
  const personSpritesFrames = Canv.parseAsperiteJSON(personFrameData)
  const sourceLooftop = { x: 0, y: 0, w: imgLooftop.width, h: imgLooftop.height }
  const sourceBirds = { x: 0, y: 0, w: imgBirds.width, h: imgBirds.height }
  // Person size calculate
  const cigarFrameSize = { w: cigarSpritesFrames[0].w, h: cigarSpritesFrames[0].h }
  const personFrameSize = { w: personSpritesFrames[0].w, h: personSpritesFrames[0].h }
  //
  // birds object
  let birdsObject = Canv.moveObj()()
  let birdsVelocity = {}
  const birdsStartPosition = () => ({
    x: -(imgBirds.width + 30),
    y: (() => 40 * Math.random())()
  })
  const endPosition = sourceLooftop.w
  const initialBirdsObj = () => Canv.moveObj(birdsStartPosition())({ w: sourceBirds.w, h: sourceBirds.h })
  const initialBirdsVelocity = () => ({
    x: 0.4 + 0.6 * Math.random(),
    y: -0.06 + 0.09 * Math.random()
  })
  birdsObject = initialBirdsObj()
  birdsVelocity = initialBirdsVelocity()
  // Set context scale
  const scale = Canv.fitBackgroundScale(200, 3)
  // draw bird and background
  Canv.drawBG('black')
  const backgroundLoop = () => {
    Canv.drawImage(imgLooftop, sourceLooftop)
    const birdsOutput = birdsObject(birdsVelocity)
    if (birdsOutput.x > endPosition) {
      birdsObject = initialBirdsObj()
      birdsVelocity = initialBirdsVelocity()
    }
    Canv.drawImage(
      imgBirds,
      sourceBirds,
      birdsOutput
    )
  }
  // Person frame
  const frameCalc = statusObj => tick => {
    const so = statusObj
    const current = tick % (so.frameLength * so.frameSpeed)
    for (let i = 0; i < so.frameLength; i++) {
      const currentFrame = so.reverse ? so.head - i : so.head + i
      if (current < (i + 1) * so.frameSpeed) return so.sprites[currentFrame]
    }
  }
  // Person status Actions
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
  // Person state
  let tick = 0
  const resetTick = () => tick = 0
  let cigaring = false
  let cigarState = {
    doCigar: () => {
      resetTick()
      cigaring = true
      Canv.canvas.removeEventListener(Canv.deviceTrigger().start, deviceStartHandler)
      Canv.canvas.removeEventListener(Canv.deviceTrigger().end, deviceEndHandler)
    },
    afterCigar: () => {
      cigaring = true
      Canv.canvas.addEventListener(Canv.deviceTrigger().start, deviceStartHandler)
      Canv.canvas.addEventListener(Canv.deviceTrigger().end, deviceEndHandler)
    },
    endTick: status.cigar.frameLength * status.cigar.frameSpeed,
  }
  const initialPosition = { x: 0, y: 100 }
  const outputCigar = Canv.moveObj(initialPosition)
  // Loop function
  let currentOutput = {} //  For Read
  const loopAnimation = (state, nextLoop = null) => {
    Canv.loop(() => {
      backgroundLoop()
      currentOutput = outputCigar(state.frameSize)(state.velocity)
      Canv.drawImage(state.image, frameCalc(state)(tick), currentOutput)
      tick++
      if (nextLoop) {
        if (nextLoop.trigger()) {
          nextLoop.payload()
          loopAnimation(nextLoop.state)
        }
      }
    })
  }
  const cigarLoop = () => {
    cigarState.doCigar()
    loopAnimation(status.cigar, {
      state: status.constantLeft,
      payload: () => cigarState.afterCigar(),
      trigger: () => tick === cigarState.endTick
    })
  }
  // Event handler
  const charaWidth = personFrameSize.w * scale[0]
  const currentCharaX = () => currentOutput.x * scale[0]
  const deviceStartHandler = e => {
    e.preventDefault()
    const touchedX = Canv.getTouchPosition(e).x
    if (touchedX < currentCharaX()) loopAnimation(status.runLeft)
    if (currentCharaX() < touchedX && touchedX < currentCharaX() + charaWidth) cigarLoop()
    if (currentCharaX() + charaWidth < touchedX) loopAnimation(status.runRight)
  }
  const deviceEndHandler = e => {
    const removedX = Canv.getTouchPosition(e).x
    if (removedX < currentCharaX()) loopAnimation(status.constantLeft)
    if (removedX > currentCharaX()) loopAnimation(status.constantRight)
  }
  // Attach Event handler
  Canv.canvas.addEventListener(Canv.deviceTrigger().start, deviceStartHandler, { passive: false })
  Canv.canvas.addEventListener(Canv.deviceTrigger().end, deviceEndHandler)
  // Execute loop
  loopAnimation(status.constantLeft)
}
export default yasumijikan