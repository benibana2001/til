import { Reducer } from "redux"
import { IProductsState, ProductsActions, ProductsActionTypes, IProductsLoadingAction } from "./ProductsType"

const initialProductState: IProductsState = {
    products: [],
    productsLoading: false
}

export const productsReducer: Reducer<IProductsState, ProductsActions> = (
    state = initialProductState,
    action
) => {
    switch (action.type) {
        case ProductsActionTypes.LOADING: {
            return {
                ...state,
                productsLoading: true
            }
        }
        case ProductsActionTypes.GETALL: {
            return {
                ...state,
                products: action.products,
                productsLoading: false
            }
        }
        default:
            return state
    }
}