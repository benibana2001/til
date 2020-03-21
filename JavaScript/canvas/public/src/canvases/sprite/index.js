import Canv from '../../CanvWriter.js'
import catData from './cat.js'

const sprite = async (c) => {
  const pathCat = '/src/canvases/sprite/cat.png'
  const imgCat = Canv.createImg(pathCat)
  await Canv.waitResolveImgs()

  const frames = catData.frames
  const frametoary = (frameObj) => [frameObj.x, frameObj.y, frameObj.w, frameObj.h]
  const frame1 = frametoary(frames["cat 0.aseprite"])
  const frame2 = frametoary(frames["cat 1.aseprite"])
  const frame3 = frametoary(frames["cat 2.aseprite"])

  let tickC = 0
  //
  const sizeC = catData.frames["cat 0.aseprite"].spriteSourceSize.w
  let frameC = 0
  let xC = 0

  Canv.loop(() => {
    xC = frameC * sizeC
    const sourceC = [xC, 0, sizeC, sizeC]
    const displayAreaC = [0, 40, sizeC, sizeC]
    c.drawImage(imgCat, ...sourceC, ...displayAreaC,)

    updateSprite()
  })
  const updateSprite = () => {
    tickC++
    if (tickC % 20 === 0) frameC++
    if(frameC >= 3) {
      tickC = 0
      frameC = 0
    }
  }
}
export default sprite