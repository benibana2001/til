import Canv from '../../CanvWriter.js'

const sprite = async (c) => {
  const imgPath = '/src/canvases/sprite/sprite.png'
  const img = Canv.createImg(imgPath)
  await Canv.waitResolveImgs()

  let tick = 0

  let frame = 0

  Canv.loop(() => {
    if (tick % 10 === 0) frame++
    let x = frame * 12
    // let frame = tick % 10
    
    c.drawImage(
      img,
      x, 0, 13, 13,
      0, 0, 13, 13,
    )

    tick++
    if(x >= 120) {
      tick = 0
      frame = 0
    }
    console.log(x)
  })
  // c.drawImage(newImg, 10, 10)
}
export default sprite