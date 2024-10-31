class Blocker{
  constructor(dom) {
    this.elem = document.querySelector(dom)
  }
  hide() {
    this.elem.style.display = 'none'
  }
  show(){
    this.elem.style.display = 'block'
  }
}

export {Blocker}