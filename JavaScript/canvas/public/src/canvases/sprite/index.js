import Canv from '../../CanvWriter.js'
import catData from './cat.js'

const sprite = async (c) => {
  const pathBomb = '/src/canvases/sprite/sprite.png'
  const pathCat = '/src/canvases/sprite/cat.png'
  const imgBomb = Canv.createImg(pathBomb)
  const imgCat = Canv.createImg(pathCat)
  await Canv.waitResolveImgs()

  let tickB = 0
  let tickC = 0
  //
  const sizeB = 12
  let frameB = 0
  let xB = 0
  //
  const sizeC = catData.frames["cat 0.aseprite"].spriteSourceSize.w
  let frameC = 0
  let xC = 0

  Canv.loop(() => {
    xB = frameB * sizeB
    const sourceB = [xB, 0, 13, 13]
    const displayAreaB = [0, 0, 13, 13]
    c.drawImage(imgBomb, ...sourceB, ...displayAreaB,)
    console.log(`sizeC: ${sizeC}`)
    xC = frameC * sizeC
    const sourceC = [xC, 0, sizeC, sizeC]
    const displayAreaC = [0, 40, sizeC, sizeC]
    c.drawImage(imgCat, ...sourceC, ...displayAreaC,)

    updateSprite()
    console.log(frameB)
  })
  const updateSprite = () => {
    tickB++
    if (tickB % 10 === 0) frameB++
    if (frameB >= 10) {
      tickB = 0
      frameB = 0
    }
    tickC++
    if (tickC % 20 === 0) frameC++
    if(frameC >= 3) {
      tickC = 0
      frameC = 0
    }
  }
}
export default sprite