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
    }

    public colleagueChanged(): void {
        
    }
}