class Canv {
  static rootNode
  static btnListNode
  static canvas
  static ctx
  static funcs = new Map()
  static currentFuncID
  static setNode = (root) => {
    Canv.rootNode = root
    Canv.btnListNode = document.createElement('div')
    Canv.rootNode.appendChild(Canv.btnListNode)
  }
  static createBtn = (node, name, func) => {
    const btn = document.createElement('button')
    btn.innerText = name
    btn.addEventListener('click', func)
    node.appendChild(btn)
  }
  static addFunc = (funcs, root = document.getElementById('root')) => {
    Canv.setNode(root)
    for (const func of funcs) {
      const name = func.name
      Canv.funcs.set(name, func)
      Canv.createBtn(Canv.btnListNode, name, () => Canv.exeFunc(name))
    }
    Canv.defaultFunc(funcs[funcs.length - 1].name)
  }
  static defaultFunc = name => {
    name = location.search ? location.search.slice(1) : name
    Canv.exeFunc(name)
  }
  static setCanvSize = (x = window.innerWidth) => (y = 600) => {
    Canv.canvas.width = x; Canv.canvas.height = y;
  }
  static imgLoaded = []
  static waitResolveImgs = async () => await Promise.all(Canv.imgLoaded)
  static createImg = (path) => {
    const img = new Image()
    const promise = new Promise((resolve) => {
      img.src = path
      img.onload = () => resolve(true); console.log(`resolved: ${path}`);
    })
    Canv.imgLoaded.push(promise)
    return img
  }

  static exeFunc = (name) => {
    // Remove old canvas, function, imgPromises
    if (Canv.canvas) Canv.rootNode.removeChild(Canv.canvas)
    if (Canv.currentFuncID) {
      cancelAnimationFrame(Canv.currentFuncID)
      Canv.currentFuncID = 0
    }
    if (Canv.imgLoaded) Canv.imgLoaded = [];
    // Create canvas Html Element
    Canv.canvas = document.createElement('canvas')
    Canv.rootNode.appendChild(Canv.canvas)
    Canv.setCanvSize()()
    // Instanciate Context 
    Canv.ctx = Canv.canvas.getContext('2d')
    // Exec function
    Canv.funcs.get(name)(Canv.ctx)
  }
  // Wrapper func for loop animation
  static loop = (f) => {
    const requestAnimFrame = (() =>
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      // window.mozRequestAnimationFrame ||
      // window.msRequestAnimationFrame ||
      (callback => window.setTimeout(callback, 1000 / 60))
    )()
    const repeat = () => {
      f()
      Canv.currentFuncID = requestAnimFrame(repeat)
    }
    Canv.currentFuncID = requestAnimFrame(repeat)
  }
  static drawBG = (color, clear = true) => {
    const clearBG = () => Canv.ctx.clearRect(0, 0, Canv.canvas.width, Canv.canvas.height)
    if (clear) clearBG()
    Canv.ctx.fillStyle = color
    Canv.ctx.fillRect(0, 0, Canv.canvas.width, Canv.canvas.height)
  }
  static drawArc = (x, y, r, color) => {
    Canv.ctx.beginPath()
    Canv.ctx.arc(x, y, r, 0, Math.PI * 2)
    Canv.ctx.closePath()
    Canv.ctx.fillStyle = color
    Canv.ctx.fill()
  }
  static randomRGBA = opacity => `rgba(${randomColor()},${randomColor()},${randomColor()}, ${opacity})`
  //
  static particle = O => size => col => [O.x, O.y, size, col]
  static moveParticle = O => size => col => V => {
    O.x += V.x
    O.y += V.y
    return [O.x, O.y, size, col]
  }
}

const randomColor = () => Math.random() * 255
export default Canv