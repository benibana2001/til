import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Confirm from './Confirm'
import './index.scss'

const parent: HTMLElement | null = document.getElementById('root')
//
interface IState {
    confirmOpen: boolean
}
//
class Apps extends React.Component<{}, IState> {
    constructor(props: {}){
        super(props)
        this.state = {
            confirmOpen: true
        }
    }
    render() {
        return (
            <Confirm
                open={this.state.confirmOpen}
                title="猫山猫美"
                content="NO CAT NO LIFE! ﾆｬｰ"
                onOkClick={() => console.log("Ok clicked")}
                onCancelClick={() => console.log("Cancel clicked")} />
        )
    }
}

ReactDOM.render(<Apps />, parent)