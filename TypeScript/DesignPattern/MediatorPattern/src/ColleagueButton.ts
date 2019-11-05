import Colleague from "./ColleagueInterface";
import Mediator from "./MediatorInterface";
import DOMElement from "./DOMElement";

export default class ColleagueButton extends DOMElement implements Colleague {
    private mediator: Mediator
    constructor() {
        super('button')
    }
    public getState(): boolean {
        return this.elem.getAttribute("checked") === "checked" ? true : false
    }
    public setMediator(mediator: Mediator): void {
        this.mediator = mediator
    }
    public setColleagueEnabled(enabled: boolean): void {
        // DOM操作 ボタンを有効化する
        this.elem.setAttribute("disabled", "")
    }
}