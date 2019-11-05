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
        this.colleagueChanged()
    }

    public createColleagues = (): void => {
        this.checkGuest = new ColleagueCheckbox('checkGuest')
        this.checkLogin = new ColleagueCheckbox('checkLogin')
        this.textUser = new ColleagueTextField('textUser')
        this.textPass = new ColleagueTextField('textPass')
        this.buttonOk = new ColleagueButton('buttonOK')
        this.buttonCancel = new ColleagueButton('buttonCancel')

        this.checkGuest.setMediator(this)
        this.checkLogin.setMediator(this)
        this.textUser.setMediator(this)
        this.textPass.setMediator(this)
        this.buttonOk.setMediator(this)
        this.buttonCancel.setMediator(this)
    }

    public colleagueChanged = (): void => {
        if (this.isGuest()) {
            this.textUser.setColleagueEnabled(false)
            this.textPass.setColleagueEnabled(false)
            this.buttonOk.setColleagueEnabled(true)
        } 

        if (this.isLogin()) {
            this.textUser.setColleagueEnabled(true)
            this.userpassChanged()
        }
    }

    private userpassChanged = (): void => {
        if (this.isFilledTextUser()) {
            this.textPass.setColleagueEnabled(true)
            if (this.isFilledTextPass()) {
                this.buttonOk.setColleagueEnabled(true)
            } else {
                this.buttonOk.setColleagueEnabled(false)
            }
        } else {
            this.textPass.setColleagueEnabled(false)
            this.buttonOk.setColleagueEnabled(false)
        }
    }

    private isGuest = (): boolean => {
        return this.checkGuest.getState()
    }

    private isLogin = (): boolean => {
        return this.checkLogin.getState()
    }

    private isFilledTextUser = (): boolean => {
        return this.textUser.getText().length > 0
    }

    private isFilledTextPass = (): boolean => {
        return this.textPass.getText().length > 0
    }
}