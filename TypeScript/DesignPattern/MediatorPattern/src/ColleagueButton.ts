import Colleague from "./ColleagueInterface";
import Mediator from "./MediatorInterface";
import DOMElement from "./DOMElement";

export default class ColleagueButton extends DOMElement implements Colleague {
    private mediator: Mediator
    constructor() {
        super('button')
    }
    public setMediator(mediator: Mediator): void {
        this.mediator = mediator
    }
    public setValue(value: string): void {
        this.elem.setAttribute("value", value)
        this.elem.textContent = value
    }
    public setColleagueEnabled(enabled: boolean): void {
        // DOM操作 ボタンを有効化する
        if (enabled) {
            this.elem.setAttribute("disabled", "")
        } else {
            this.elem.setAttribute("disabled", "disabled")
        }
    }
}