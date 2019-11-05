import Colleague from "./ColleagueInterface";
import Mediator from "./MediatorInterface";
import DOMElement from "./DOMElement";

export default class ColleagueTextField extends DOMElement implements Colleague {
    private mediator: Mediator
    constructor(id: string) {
        super(id)
        this.elem.setAttribute("type", "text")
    }
    public setMediator = (mediator: Mediator): void => {
        this.mediator = mediator
        // 状態が変化したらMediatorに通知
        this.elem.addEventListener('input', this.mediator.colleagueChanged)
    }
    public getText = (): string => {
        return (this.elem as HTMLInputElement).value
    }
    public setColleagueEnabled = (enabled: boolean): void => {
        // DOM操作 ボタンを有効化する
        if (enabled) {
            // this.elem.setAttribute("disabled", "");
            this.elem.removeAttribute("disabled");
            (this.elem as HTMLInputElement).style.backgroundColor = "white"
        } else {
            this.elem.setAttribute("disabled", "disabled");
            (this.elem as HTMLInputElement).style.backgroundColor = "#bbbbbb"
        }
    }
}