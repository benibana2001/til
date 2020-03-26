import Canv from '../CanvWriter.js'

const looftop = async () => {
  const looftopImgPath = '/src/assets/looftop.png'
  const birdsImgPath = '/src/assets/birds.png'
  const imgLooftop = Canv.createImg(looftopImgPath)
  const imgBirds = Canv.createImg(birdsImgPath)
  await Canv.waitResolveImgs()
  //
  const sourceLooftop = { x: 0, y: 0, w: imgLooftop.width, h: imgLooftop.height }
  const sourceBirds = { x: 0, y: 0, w: imgBirds.width, h: imgBirds.height }
  let birdsObject = Canv.moveObj()
  let birdsVelocity = {}
  const birdsStartPosition = () => ({
    x: -(imgBirds.width + 30),
    y: (() => 40 * Math.random())()
  })
  const endPosition = sourceLooftop.w
  const initialBirdsObj = () => {
    return Canv.moveObj(Object.assign({}, {
      ...sourceBirds,
      ...birdsStartPosition()
    }))
  }
  const initialBirdsVelocity = () => ({
    x: 0.4 + 0.6 * Math.random(),
    y: -0.06 + 0.09 * Math.random()
  })
  birdsObject = initialBirdsObj()
  birdsVelocity = initialBirdsVelocity()
  Canv.drawBG('black')
  Canv.ctx.scale(3, 3)
  //
  Canv.loop(() => {
    Canv.drawImage(imgLooftop, sourceLooftop)
    const birdsOutput = birdsObject(birdsVelocity)
    if (birdsOutput.x > endPosition) {
      birdsObject = initialBirdsObj()
      birdsVelocity = initialBirdsVelocity()
    }
    Canv.drawImage(
      imgBirds,
      sourceBirds,
      birdsOutput
    )
  })
}

export default looftop