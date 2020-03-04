//
// createStore:
//   createStore is a function we'll eventually use to create our store.
// applyMiddleware:
//   We need the applyMiddleware function because we need to use the Redux Thunk middleware to manage our asynchronous actions
// combineReducers:
//   The combineReducers function is a function we can use to merge our reducers together
// Store:
//   Store is a TypeScript type we can use for the store
import { applyMiddleware, combineReducers, createStore, Store } from "redux"
import thunk from "redux-thunk"
//
import { productsReducer } from "./ProductsReducer"
import { IProductsState } from "./ProductsType"

export interface IApplicationState {
    products: IProductsState
}

const rootReducer = combineReducers<IApplicationState>({
    products: productsReducer
})

const configureStore = (): Store<IApplicationState> => {
    const store = createStore(rootReducer, undefined, applyMiddleware(thunk))
    return store
}

export default configureStore