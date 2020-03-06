import { createStore, combineReducers, compose } from 'redux'
import CardList, { CardListActions } from './modules/cardList'

const initialState = {}

interface ExtendedWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare var window: ExtendedWindow;

const store = createStore(
    combineReducers({
        CardList,
    }),
    // initialState,
    // compose(
    //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    // )
)

export default store

export type ActionTypes = CardListActions

export type AppState = ReturnType<typeof store.getState>