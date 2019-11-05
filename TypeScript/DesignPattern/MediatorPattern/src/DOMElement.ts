export default abstract class DOMElement {
    protected elem: Element
    protected parent: Element
    constructor(tag: string){
        this.elem = document.createElement(tag)
    }
    public setParent(parent: Element): void {
        this.parent = parent
    }
    public appendElem(): void {
        this.parent.appendChild(this.elem)
    }
}