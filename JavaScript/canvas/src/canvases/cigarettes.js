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
  Canv.drawBG('black')
  Canv.drawImage(imgCigar, cigarSpritesFrames[0],
    { x: 0, y: 0, w: cigarFrameSize.w, h: cigarFrameSize.h }
  )
  // Event
  const TRIGGERKEY = ' '
  const spacekeyHandler = (e) => {
    if (e.key === TRIGGERKEY) {
      e.preventDefault()
      console.log('ignitte!')
    }
  }
  Canv.registerEvent('keydown', spacekeyHandler)
}
export default cigarettes