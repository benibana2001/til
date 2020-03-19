const root = document.getElementById('root')

class Canv {
  static rootNode
  static btnListNode
  static canvas
  static ctx
  static funcs = new Map()
  static currentFuncID
  static addFunc = (funcs, root = document.getElementById('root')) => {
    // Apply root
    Canv.rootNode = root
    Canv.btnListNode = document.createElement('div')
    Canv.rootNode.appendChild(Canv.btnListNode)
    for (const func of funcs) {
      // Add function
      const name = func.name
      Canv.funcs.set(name, func)
      // Create button
      const btn = document.createElement('button')
      btn.innerText = name
      btn.addEventListener('click', () => Canv.exeFunc(name))
      Canv.btnListNode.appendChild(btn)
    }
    // Run some function
    Canv.defaultFunc(funcs[funcs.length - 1].name)
  }
  static defaultFunc = (name) => Canv.exeFunc(name)
  static defaultCanvSize = { x: window.innerWidth, y: 600 }
  static exeFunc = (name, size = Canv.defaultCanvSize) => {
    // Remove old canvas, function
    if (Canv.canvas) Canv.rootNode.removeChild(Canv.canvas)
    if (Canv.currentFuncID) {
      cancelAnimationFrame(Canv.currentFuncID)
      Canv.currentFuncID = 0
    }
    // Create canvas Html Element
    Canv.canvas = document.createElement('canvas')
    Canv.rootNode.appendChild(Canv.canvas)
    Canv.canvas.width = size.x; Canv.canvas.height = size.y
    // Instanciate Context 
    Canv.ctx = Canv.canvas.getContext('2d')
    // Exec function
    Canv.funcs.get(name)(Canv.ctx)
  }
  // Wrapper func for loop animation
  static loop = (f) => {
    const repeat = () => {
      f()
      Canv.currentFuncID = window.requestAnimationFrame(repeat)
    }
    Canv.currentFuncID = window.requestAnimationFrame(repeat)
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
  const cw = Canv.canvas.width
  const ch = Canv.canvas.height
  let ox = 0
  let toggle = 1
  const box = { w: 200, h: 100, spd: cw / 100 }
  Canv.loop(() => {
    console.log('moveBox')
    c.clearRect(0, 0, cw, ch)
    c.fillRect(ox, 100, box.w, box.h)
    if (toggle === 1) ox += box.spd
    if (toggle === 0) ox -= box.spd
    if (ox >= (cw - box.w)) toggle = 0
    if (ox <= 0) toggle = 1
  })
}

const aroundBox = (c) => {
  const cw = Canv.canvas.width
  const ch = Canv.canvas.height
  let ox = 0
  let oy = 0
  let toggle = 1
  const box = { w: 200, h: 100, spd: cw / 100 }

  c.fillStyle = 'blue'
  Canv.loop(() => {
    console.log('yeah')
    c.clearRect(0, 0, cw, ch)
    c.fillRect(ox, oy, box.w, box.h)
    if (toggle === 1) {
      ox += box.spd
      if (ox >= (cw - box.w)) toggle = 2
    }
    if (toggle === 2) {
      oy += box.spd
      if (oy >= (ch - box.h)) toggle = 3
    }
    if (toggle === 3) {
      ox -= box.spd
      if (ox <= 0) toggle = 4
    }
    if (toggle === 4) {
      oy -= box.spd
      if (oy <= 0) toggle = 1
    }
  })
}

Canv.addFunc([chart, moveBox, aroundBox])