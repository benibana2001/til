import { ActionCreator, AnyAction, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { getProducts as getProductsFromAPI } from './ProductsData'
import { IProductsLoadingAction, ProductsActionTypes, IProductsGetAllAction, IProductsState } from './ProductsType'

// An action creator does what it says on the tin: it's a function that creates and returns an action.
const loading: ActionCreator<IProductsLoadingAction> = () => (
    { type: ProductsActionTypes.LOADING }
)

//  getProducts is going to be eventually called from the ProductsPage component.
export const getProducts: ActionCreator<ThunkAction<Promise<AnyAction>, IProductsState, null, IProductsGetAllAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loading())
        const products = await getProductsFromAPI()
        return dispatch({
            products,
            type: ProductsActionTypes.GETALL
        })
    }
}