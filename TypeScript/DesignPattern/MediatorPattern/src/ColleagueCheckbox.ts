import Colleague from "./ColleagueInterface";
import Mediator from "./MediatorInterface";
import DOMElement from "./DOMElement";

export default class ColleagueCheckbox extends DOMElement implements Colleague {
    private mediator: Mediator
    constructor(id: string) {
        super(id)
        this.elem.setAttribute("type", "radio")
    }
    public getState = (): boolean => {
        return (this.elem as HTMLInputElement).checked
    }
    public setName = (name: string): void => {
        this.elem.setAttribute("name", name)
    }
    public setMediator = (mediator: Mediator): void => {
        this.mediator = mediator
        // 状態が変化したらMediatorに通知
        this.elem.addEventListener('click', this.mediator.colleagueChanged)
    }
    public setColleagueEnabled = (enabled: boolean): void => {
        // DOM操作 ボタンを有効化する
        if (enabled) {
            this.elem.setAttribute("disabled", "")
        } else {
            this.elem.setAttribute("disabled", "disabled")
        }
    }
}