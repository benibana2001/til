export default abstract class DOMElement {
    protected elem: Element
    protected parent: Element
    constructor(id: string){
        // this.elem = document.createElement(tag)
        this.elem = document.getElementById(id)
    }
    public setParent = (parent: Element): void => {
        this.parent = parent
    }
    public appendElem = (): void => {
        this.parent.appendChild(this.elem)
    }
}