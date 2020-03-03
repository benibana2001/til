import React from 'react';
import Posts from './components/Posts'
import Postform from './components/Postform'
import './App.css';
import { Provider } from 'react-redux'
import store from './store'

// const store = createStore(() => [], {}, applyMiddleware())

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Postform />
                <hr />
                <Posts />
            </div>
        </Provider>
    );
}

export default App;