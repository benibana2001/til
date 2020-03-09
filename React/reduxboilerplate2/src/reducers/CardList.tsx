// import { Action } from 'redux'
import { CardListState } from '../types'
import { CardListActions } from '../Actions/cardListActions'
import { ADD, REMOVE } from '../Actions/types'

const initialState: CardListState = {
    cards: [{
        id: 0,
        text: 'hoge'
    }]
}

const cardListReducer = (
    state: CardListState = initialState,
    action: CardListActions
) => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                cards: [...state.cards, action.payload]
            }
        case REMOVE:
            return {
                ...state,
                cards: state.cards.filter(
                    (card, index) => index !== state.cards.length - 1
                )
            }
        default:
            const _: never = action
            return state
    }
}

export default cardListReducer