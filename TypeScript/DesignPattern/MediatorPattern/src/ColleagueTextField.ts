import Colleague from "./ColleagueInterface";
import Mediator from "./MediatorInterface";
import DOMElement from "./DOMElement";

export default class ColleagueTextField extends DOMElement implements Colleague {
    private mediator: Mediator
    constructor() {
        super('input')
        this.elem.setAttribute("type", "text")
    }
    public setMediator(mediator: Mediator): void {
        this.mediator = mediator
    }
    public setColleagueEnabled(enabled: boolean): void {
        // DOM操作 ボタンを有効化する
        if (enabled) {
            this.elem.setAttribute("disabled", "")
        } else {
            this.elem.setAttribute("disabled", "disabled")
        }
    }
    // 文字列が変化したらMediatorに通知
    public textValueChanged(): void {
        this.mediator.colleagueChanged()
    }
}