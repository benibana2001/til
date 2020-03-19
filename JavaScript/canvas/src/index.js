const root = document.getElementById('root')

class Canv {
  static canvas
  static ctx
  static createCanv = (func, w = 800, h = 600, elem = document.getElementById('root')) => {
    // Generate Canvas
    Canv.canvas = document.createElement('canvas')
    Canv.canvas.width = w; Canv.canvas.height = h
    // Instanciate Context 
    Canv.ctx = Canv.canvas.getContext('2d')
    // attach canvas to element
    elem.appendChild(Canv.canvas)
    // execute func()
    func(Canv.ctx)
  }
}

Canv.createCanv((c) => {
  const bgSize = { x: 400, y: 300 }
  const data = [16, 68, 20, 30, 54]
  const offset = 30
  const span = 24
  const barW = (bgSize.x - offset * 2 - span * (data.length - 1)) / data.length
  c.fillStyle = 'gray'
  c.fillRect(0, 0, bgSize.x, bgSize.y)
  c.fillStyle = 'blue'
  for (let i = 0; i < data.length; i++) {
    c.fillRect(offset + i * (barW + span), offset, barW, data[i] * 3)
  }
}, 800, 400)

Canv.createCanv((c) => {
  let x = 0
  let toggle = 1
  const drawIt = () => {
    window.requestAnimationFrame(drawIt)
    c.clearRect(0, 0, Canv.canvas.width, Canv.canvas.height)
    c.fillRect(x, 100, 200, 100)
    if (toggle === 1) x += 5
    if (toggle === 0) x -= 5
    if (x === 300) toggle = 0
    if (x === 0) toggle = 1
  }
  window.requestAnimationFrame(drawIt)
}, 800, 400)
