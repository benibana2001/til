import Canv from '../CanvWriter.js'

const looftop = async () => {
  const looftopImgPath = '/src/assets/looftop.png'
  const birdsImgPath = '/src/assets/birds.png'
  const imgLooftop = Canv.createImg(looftopImgPath)
  const imgBirds = Canv.createImg(birdsImgPath)
  await Canv.waitResolveImgs()
  //
  const frameLooftop = { x: 0, y: 0, w: imgLooftop.width, h: imgLooftop.height }
  const frameBirds = { x: 0, y: 0, w: imgBirds.width, h: imgBirds.height }
  let birds = Canv.moveObj(Object.assign({}, frameBirds))
  let birdsVelocity = { x: 4, y: -0.03 }
  const birdsStartPosition = () => ({
    x: -(imgBirds.width + 30),
    y: (() => 40 * Math.random())()
  })
  const birdsResetPosition = frameLooftop.w
  const resetBird = () => {
    birds = Canv.moveObj(Object.assign({}, {
      ...frameBirds,
      ...birdsStartPosition()
    }))
    birdsVelocity = {
      x: 0.4 + 0.6 * Math.random(),
      y: -0.06 + 0.09 * Math.random()
    }
  }
  Canv.drawBG('black')
  Canv.ctx.scale(3, 3)
  //
  Canv.loop(() => {
    Canv.drawImage(imgLooftop, frameLooftop)
    const birdsOutput = birds(birdsVelocity)
    if (birdsOutput.x > birdsResetPosition) resetBird()
    Canv.drawImage(
      imgBirds,
      frameBirds,
      birdsOutput
    )
  }
  )
}

export default looftop