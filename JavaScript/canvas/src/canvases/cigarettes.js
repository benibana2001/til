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
  // Status
  const status = {
    cigar: {
      image: imgCigar,
      velocity: { x: 0, y: 0 },
      frame: tick => Canv.frameCalc(cigarSpritesFrames, 5, 80, 0)(tick),
      frameSize: cigarFrameSize
    },
    constant: {
      image: imgPerson,
      velocity: { x: 0, y: 0 },
      frame: tick => Canv.frameCalc(personSpritesFrames, 2, 20, 0)(tick),
      frameSize: personFrameSize
    }
  }
  //
  let tick = 0
  const initialPosition = { x: 0, y: 0 }
  const outputCigar = Canv.moveObj({ ...initialPosition })
  const loopAnimation = state => {
    Canv.loop(() => {
      Canv.drawBG('black')
      Canv.drawImage(state.image, state.frame(tick), outputCigar(state.frameSize)(state.velocity))
      tick++
    })
  }
  loopAnimation(status.constant)
  // Event
  const TRIGGERKEY = ' '
  const spacekeyHandler = (e) => {
    if (e.key === TRIGGERKEY) {
      e.preventDefault()
      tick = 0
      loopAnimation(status.cigar)
      console.log('ignitte!')
    }
  }
  Canv.registerEvent('keydown', spacekeyHandler)
}
export default cigarettes