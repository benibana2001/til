import Mediator from './MediatorInterface'
import ColleagueCheckbox from './ColleagueCheckbox'
import ColleagueTextField from './ColleagueTextField'
import ColleagueButton from './ColleagueButton'
export default class LoginFrame implements Mediator {
    private checkGuest: ColleagueCheckbox
    private checkLogin: ColleagueCheckbox
    private textUser: ColleagueTextField
    private textPass: ColleagueTextField
    private buttonOk: ColleagueButton
    private buttonCancel: ColleagueButton

    constructor() {
        this.createColleagues()
        this.addColleagues()
    }

    public createColleagues(): void {
        this.checkGuest = new ColleagueCheckbox()
        this.checkLogin = new ColleagueCheckbox()
        this.textUser = new ColleagueTextField()
        this.textPass = new ColleagueTextField()
        this.buttonOk = new ColleagueButton()
        this.buttonCancel = new ColleagueButton()

        this.checkGuest.setMediator(this)
        this.checkLogin.setMediator(this)
        this.textUser.setMediator(this)
        this.textPass.setMediator(this)
        this.buttonOk.setMediator(this)
        this.buttonCancel.setMediator(this)

        this.checkGuest.setName('name')
        this.checkLogin.setName('name')
        this.buttonOk.setValue('OK')
        this.buttonCancel.setValue('Cancel')
    }

    public addColleagues(): void {
        let body: Element = document.getElementById('form')
        this.checkGuest.setParent(body)
        this.checkLogin.setParent(body)
        this.textUser.setParent(body)
        this.textPass.setParent(body)
        this.buttonOk.setParent(body)
        this.buttonCancel.setParent(body)

        this.checkGuest.appendElem()
        this.checkLogin.appendElem()
        this.textUser.appendElem()
        this.textPass.appendElem()
        this.buttonOk.appendElem()
        this.buttonCancel.appendElem()
    }

    public colleagueChanged(): void {
        if (this.checkGuest.getState()) {
            this.textUser.setColleagueEnabled(false)
            this.textPass.setColleagueEnabled(false)
            this.buttonOk.setColleagueEnabled(true)
        } else {
            this.textUser.setColleagueEnabled(true)
            // this.userpassChanged()
        }
    }
}