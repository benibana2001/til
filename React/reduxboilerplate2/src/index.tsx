import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import CardList from './containers/CardList'
import InputArea from './containers/InputArea'
import Posts from './containers/Posts'

const parent: HTMLElement | null = document.getElementById('root')
const Apps: React.FunctionComponent = () => {
    return (
        <Provider store={store}>
        <div>
            <h1>hello my app!</h1>
            <InputArea />
            <CardList />
            <Posts />
        </div>
        </Provider>
    )
}

ReactDOM.render(<Apps />, parent)