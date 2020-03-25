import Canv from '../CanvWriter.js'

const looftop = async () => {
  const looftopImgPath = '/src/assets/looftop.png'
  const birdsImgPath = '/src/assets/birds.png'
  const imgLooftop = Canv.createImg(looftopImgPath)
  const imgBirds = Canv.createImg(birdsImgPath)
  await Canv.waitResolveImgs()
  const frameLooftop = [0, 0, imgLooftop.width, imgLooftop.height]
  const outputLooftop = {x: frameLooftop[0], y: frameLooftop[1], w: frameLooftop[2], h: frameLooftop[3]}
  // Canv.loop(() => {
    Canv.drawBG('black')
    Canv.ctx.scale(3, 3)
    Canv.drawImage(imgLooftop, frameLooftop, outputLooftop)
    console.log(`imgLooftop: ${imgLooftop}`)
    console.log(`imgLooftop.width: ${imgLooftop.width}`)
    console.log(`imgLooftop.height: ${imgLooftop.height}`)
  // })
}

export default looftop