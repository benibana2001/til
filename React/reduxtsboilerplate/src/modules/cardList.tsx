import { Action } from 'redux'
import { CardState, CardListState } from '../types'

// Action names
export const ADD = 'ADD' as const
export const REMOVE = 'REMOVE' as const

// Action creators
interface AddAction extends Action {
    type: typeof ADD
    payload: CardState
}

export const add = (text: string): AddAction => (
    {
        type: ADD,
        payload: {
            id: new Date().getTime(),
            text
        }
    }
)

interface RemoveAction extends Action {
    type: typeof REMOVE
}

export const remove = (): RemoveAction => (
    { type: REMOVE }
)

export type CardListActions = AddAction | RemoveAction

// Reducer
const initialState: CardListState = {
    cards: [
        {
            id: 0,
            text: 'hoge'
        }
    ]
}

export default function reducer(
    state: CardListState = initialState,
    action: CardListActions
) {
    switch(action.type) {
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