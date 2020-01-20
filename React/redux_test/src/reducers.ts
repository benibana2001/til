import { combineReducers } from 'redux'
import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
} from './actions'

const { SHOW_ALL } = VisibilityFilters

const visibilityFilter = (state = SHOW_ALL, action: { type: string, filter: string }) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

// type action = {
//     type: string,
//     index?: number,
//     text?: string
// }
type actionText = {
    type: string,
    text: string
}
type actionIndex = {
    type: string,
    index: number,
}
type action = actionText | actionIndex
type todo = {
    text: string,
    completed: boolean
}

const todos = (
    state: todo[] = [],
    action: action
) => {
    switch (action.type) {
        case ADD_TODO:
            if ('text' in action) {
                return [
                    ...state,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            }
        case TOGGLE_TODO:
            if ('index' in action) {
                return state.map((todo, index) => {
                    if (index === action.index) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo
                })
            }
        default:
            return state
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp
