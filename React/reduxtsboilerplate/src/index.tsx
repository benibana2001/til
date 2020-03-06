import * as React from 'react'
import * as ReactDOM from 'react-dom'

let parent: HTMLElement | null = document.getElementById('root')
const Apps: React.FunctionComponent = () => {
    return (
        <div>
            <h1>hello my app!</h1>
        </div>
    )
}

ReactDOM.render(<Apps />, parent)