import React from 'react';
import { Provider } from 'react-redux'
import './App.css';

import store from './store'
import Posts from './components/Posts'

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Posts />
            </div>
        </Provider>
    );
}

export default App;
