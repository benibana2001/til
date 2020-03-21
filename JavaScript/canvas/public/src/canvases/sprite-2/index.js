import Canv from '../../CanvWriter.js'
import catData from './cat.js'

const sprite_2 = async (c) => {
  const pathCat = '/src/canvases/sprite/cat.png'
  const imgCat = Canv.createImg(pathCat)
  await Canv.waitResolveImgs()

  const frames = catData.frames
  const frametoary = (frameObj) => [frameObj.x, frameObj.y, frameObj.w, frameObj.h]
  const frame1 = frametoary(frames["cat 0.aseprite"].frame)
  const frame2 = frametoary(frames["cat 1.aseprite"].frame)
  const frame3 = frametoary(frames["cat 2.aseprite"].frame)
  const displayArea = [0, 0]
  const displaySize = [frame1[2], frame1[3]]

  let tick = 0
  Canv.loop(() => {
    draw()
    updateSprite()
  })

  const draw = () => {
    let f = tick % 100
    let source
    if (0 <= f && f < 20) source = frame1
    if (20 <= f && f < 40) source = frame2
    if (40 <= f && f < 100) source = frame3
    c.drawImage(imgCat, ...source, ...displayArea, ...displaySize)
  }
  const updateSprite = () => tick++
}
export default sprite_2