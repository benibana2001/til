import Colleague from "./ColleagueInterface";
import Mediator from "./MediatorInterface";

export default class ColleagueButton implements Colleague {
    private mediator: Mediator
    private elem: Element
    // public createButton(): void {
    // this.elem = document.createElement('button')
    // }
    constructor() {
        this.elem = document.createElement('button')
    }
    public setMediator(mediator: Mediator): void {
        this.mediator = mediator
    }
    public setColleagueEnable(enabled: boolean): void {
        // DOM操作 ボタンを有効化する
        this.elem.setAttribute("disabled", "disabled")
    }
}