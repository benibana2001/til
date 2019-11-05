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
        // this.addColleagues()
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

    /*
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
    */

    public colleagueChanged = (): void => {
        if (this.checkGuest.getState()) {
            console.log("checked Guest")
            this.textUser.setColleagueEnabled(false)
            this.textPass.setColleagueEnabled(false)
            this.buttonOk.setColleagueEnabled(true)
        } else {
            console.log("checked Login")
            this.textUser.setColleagueEnabled(true)
            this.userpassChanged()
        }
    }

    private userpassChanged = (): void => {
        console.log(this.textUser.getText())
        // TODO: lengthが0になってしまう
        console.log(this.textUser.getText.length)
        if (this.textUser.getText.length > 0) {
            console.log("Pass > 0 です")
            this.textPass.setColleagueEnabled(true)
            if (this.textPass.getText().length > 0) {
                this.buttonOk.setColleagueEnabled(true)
            } else {
                this.buttonOk.setColleagueEnabled(false)
            }
        } else {
            this.textPass.setColleagueEnabled(false)
            this.buttonOk.setColleagueEnabled(false)
        }
    }
}