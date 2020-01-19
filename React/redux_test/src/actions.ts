/**
 * action types
 */
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/**
 * other constans
 */
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/**
 * action creators
 */
export const addTodo: Function = (text: string) => {
    return { type: ADD_TODO, text}
}

export const toggleTodo: Function = (index: number) => {
    return { type: TOGGLE_TODO, index }
}

export const setVisibilityFilter = (filter: string) => {
    return { type: SET_VISIBILITY_FILTER, filter }
}