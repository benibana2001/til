import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.scss'

const parent: HTMLElement | null = document.getElementById('root')

class Apps extends React.Component {
    render() {
        return (
            <div>Hello world!</div>
        )
    }
}

ReactDOM.render(<Apps />, parent)