import Canv from '../CanvWriter.js'
import cigarFrameData from '../assets/cigar.js'
import personFrameData from '../assets/person.js'
const cigarettes = async () => {
  const imgPerson = Canv.createImg('/src/assets/person.png')
  const imgCigar = Canv.createImg('/src/assets/cigar.png')
  await Canv.waitResolveImgs()
  const imgCigarFlip = Canv.flipImage(imgCigar)
  const imgPersonFlip = Canv.flipImage(imgCigar)
  // parse
  const cigarSpritesFrames = Canv.parseAsperiteJSON(cigarFrameData)
  const personSpritesFrames = Canv.parseAsperiteJSON(personFrameData)
  const cigarFrameSize = { w: cigarSpritesFrames[0].w, h: cigarSpritesFrames[0].h }
  const personFrameSize = { w: personSpritesFrames[0].w, h: personSpritesFrames[0].h }
  // Draw, Loop
  Canv.ctx.scale(3, 3)
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
    constant: {
      image: imgPerson,
      velocity: { x: 0, y: 0 },
      sprites: personSpritesFrames,
      frameLength: 2,
      frameSpeed: 20,
      head: 0,
      frameSize: personFrameSize
    }
  }
  //
  let tick = 0
  const initialPosition = { x: 0, y: 0 }
  const outputCigar = Canv.moveObj(initialPosition)

  const loopAnimation = (state, nextState = null, nextTrigger = null) => {
    Canv.loop(() => {
      Canv.drawBG('black')
      Canv.drawImage(state.image, frameCalc(state)(tick), outputCigar(state.frameSize)(state.velocity))
      tick++
      if (nextTrigger && nextState) {
        if (nextTrigger()) loopAnimation(nextState)
      }
    })
  }
  loopAnimation(status.constant)
  // Event
  const TRIGGERKEY = ' '
  const spacekeyHandler = e => {
    if (e.key === TRIGGERKEY) {
      e.preventDefault()
      tick = 0
      const endTime = status.cigar.frameLength * status.cigar.frameSpeed
      loopAnimation(status.cigar, status.constant, () => tick === endTime)
      console.log('ignitte!')
    }
  }
  Canv.registerEvent('keydown', spacekeyHandler)
}
export default cigarettes