import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Confirm from './Confirm'
import './index.scss'

const parent: HTMLElement | null = document.getElementById('root')
//
interface IState {
    confirmOpen: boolean
    confirmMessage: string
    confirmVisible: boolean,
    countDown: number
}
//
class Apps extends React.Component<{}, IState> {
    private timer: number = 0
    //
    constructor(props: {}) {
        super(props)
        this.state = {
            confirmOpen: false,
            confirmMessage: "Please hit the confirm button",
            confirmVisible: true,
            countDown: 1000
        }
    }
    //
    public componentDidMount() {
        this.timer = window.setInterval(() => { this.handleTimerTick() })
    }
    //
    private handleTimerTick() {
        this.setState(
            {
                confirmMessage:
                    `Please hit the confirm button ${this.state.countDown} sect to go`,
                countDown: this.state.countDown - 1
            },
            () => {
                if (this.state.countDown <= 0) {
                    clearInterval(this.timer)
                    this.setState({
                        confirmMessage: "Too late to confirm!",
                        confirmVisible: false
                    })
                }
            }
        )
    }
    //
    render() {
        return (
            <div>
                <p>{this.state.confirmMessage}</p>
                {
                    this.state.confirmVisible && (
                        <button onClick={() => {
                            this.setState({ confirmOpen: true })
                            clearInterval(this.timer)
                        }}>
                            Confirm
                </button>
                    )
                }

                <Confirm
                    open={this.state.confirmOpen}
                    title="猫山猫美"
                    content="NO CAT NO LIFE! ﾆｬｰ"
                    onOkClick={
                        () => {
                            this.setState({
                                confirmOpen: false,
                                confirmMessage: "Cool, carry on readint!"
                            })
                            clearInterval(this.timer)
                        }
                    }
                    onCancelClick={() => {
                        this.setState({
                            confirmOpen: false,
                            confirmMessage: "Take a break, I'm sure you will later"
                        })
                        clearInterval(this.timer)
                    }
                    } />
            </div>
        )
    }
}

ReactDOM.render(<Apps />, parent)