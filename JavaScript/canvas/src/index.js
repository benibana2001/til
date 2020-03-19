const root = document.getElementById('root')

class Canv {
  static rootNode
  static canvas
  static ctx
  static funcs = {}
  // funcs: {func, name=func.name}
  static addFunc = (funcs, root = document.getElementById('root')) => {
    // Apply root
    Canv.rootNode = root
    // Add function
    for (const func of funcs) {
      const name = func.name
      Canv.funcs[name] = func
      // Create button
      const btn = document.createElement('button')
      btn.innerText = name
      btn.addEventListener('click', () => {
        Canv.exeFunc(name)
      })
      Canv.rootNode.appendChild(btn)
    }
    Canv.defaultFunc(funcs[funcs.length - 1].name)
  }
  static defaultFunc = (name) => Canv.exeFunc(name)
  static exeFunc = (name) => {
    // Remove Canvas
    if (Canv.canvas) {
      Canv.rootNode.removeChild(Canv.canvas)
    }
    // Create canvas Html Element
    Canv.canvas = document.createElement('canvas')
    Canv.rootNode.appendChild(Canv.canvas)
    Canv.canvas.width = 800; Canv.canvas.height = 600
    // Instanciate Context 
    Canv.ctx = Canv.canvas.getContext('2d')
    // Exec function
    Canv.funcs[name](Canv.ctx)
  }
}

const chart = (c) => {
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
}

const moveBox = (c) => {
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
}

Canv.addFunc([chart, moveBox])