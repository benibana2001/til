import Canv from '../../CanvWriter.js'

const sprite = async (c) => {
  const imgPath = '/src/canvases/sprite/sprite.png'
  const img = Canv.createImg(imgPath)
  await Canv.waitResolveImgs()

  const size = 12
  let tick = 0
  let frame = 0
  let x = 0

  Canv.loop(() => {
    x = frame * size
    const source = [x, 0, 13, 13]
    const displayArea = [0, 0, 13, 13]
    c.drawImage(
      img,
      ...source,
      ...displayArea,
    )
    updateSprite()
    console.log(frame)
  })
  const updateSprite = () => {
    tick++
    if (tick % 10 === 0) frame++
    if (frame >= 10) {
      tick = 0
      frame = 0
    }
  }
}
export default sprite