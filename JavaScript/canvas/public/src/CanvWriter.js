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
    // Remove old canvas, function
    if (Canv.canvas) Canv.rootNode.removeChild(Canv.canvas)
    if (Canv.currentFuncID) {
      cancelAnimationFrame(Canv.currentFuncID)
      Canv.currentFuncID = 0
    }
    // Create canvas Html Element
    Canv.canvas = document.createElement('canvas')
    Canv.rootNode.appendChild(Canv.canvas)
    // Set canvas size
    Canv.setCanvSize()()
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

export default Canv