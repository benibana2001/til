import Canv from '../../CanvWriter.js'

const sprite = async (c) => {
  const imgPath = '/src/canvases/sprite/sprite.png'
  const newImg = Canv.createImg(imgPath)
  await Canv.waitResolveImgs()
  // c.drawImage(
  //   img,
  //   65, 0, 13, 13,
  //   0, 0, 13, 13
  // )
  c.drawImage(newImg, 10, 10)
}
export default sprite