import Colleague from "./ColleagueInterface";
import Mediator from "./MediatorInterface";
import DOMElement from "./DOMElement";

export default class ColleagueCheckbox extends DOMElement implements Colleague {
    private mediator: Mediator
    constructor() {
        super('input')
        this.elem.setAttribute("type", "radio")
    }
    public setMediator(mediator: Mediator): void {
        this.mediator = mediator
    }
    public setColleagueEnabled(enabled: boolean): void {
        // DOM操作 ボタンを有効化する
        this.elem.setAttribute("disabled", "")
    }
    // 状態が変化したらMediatorに通知
    public itemStateChanged(): void {
        this.mediator.colleagueChanged()
    }
}