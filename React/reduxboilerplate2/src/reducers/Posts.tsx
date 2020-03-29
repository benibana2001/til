import { PostsState, PostState } from '../types'
import { PostAction } from '../Actions/postActions'
import { FETCH_POSTS } from '../Actions/types'

const initialState: PostsState = {
    items: [
        {
            id: 1,
            title: 'hoge',
            body: 'fuga'
        }
    ]
}

const postReducer = (
    state: PostsState = initialState, 
    action: PostAction
) => {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            }
    }
}

export default postReducer