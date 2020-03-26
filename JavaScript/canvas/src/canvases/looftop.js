import Canv from '../CanvWriter.js'

const looftop = async () => {
  const looftopImgPath = '/src/assets/looftop.png'
  const birdsImgPath = '/src/assets/birds.png'
  const imgLooftop = Canv.createImg(looftopImgPath)
  const imgBirds = Canv.createImg(birdsImgPath)
  await Canv.waitResolveImgs()
  const frameLooftop = { x: 0, y: 0, w: imgLooftop.width, h: imgLooftop.height }
  const outputLooftop = frameLooftop
  Canv.drawBG('black')
  Canv.ctx.scale(3, 3)
  Canv.drawImage(imgLooftop, frameLooftop, outputLooftop)
}

export default looftop