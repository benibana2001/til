import { createStore, combineReducers, compose } from 'redux'
import { CardListActions } from './Actions/cardListActions'
// import  CardListReducer from './reducers/CardList'
import rootReducer from './reducers'

const initialState = {}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    composeEnhancers()
)

export default store

export type ActionTypes = CardListActions

export type AppState = ReturnType<typeof store.getState>