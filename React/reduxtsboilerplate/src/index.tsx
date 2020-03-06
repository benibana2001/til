import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import CardList from './containers/cardlist'
import InputArea from './containers/inputArea'

let parent: HTMLElement | null = document.getElementById('root')
const Apps: React.FunctionComponent = () => {
    return (
        <Provider store={store}>
            <div>
                <h1>hello my app!</h1>
                <InputArea />
                <CardList />
            </div>
        </Provider>
    )
}

ReactDOM.render(<Apps />, parent)