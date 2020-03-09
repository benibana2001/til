import { Action } from 'redux'
import { ADD, REMOVE } from './types'
import { CardState } from '../types'

// Action
export type CardListActions = AddAction | RemoveAction

interface AddAction extends Action {
    type: typeof ADD
    payload: CardState
}

interface RemoveAction extends Action {
    type: typeof REMOVE
}

// Action
export const add = (text: string): AddAction => (
    {
        type: ADD,
        payload: {
            id: new Date().getTime(),
            text
        }
    }
)

export const remove = (): RemoveAction => (
    { type: REMOVE }
)