import { Action } from 'redux'
import { FETCH_POSTS } from './types'
import { PostsState } from '../types'

export type PostAction = FetchPostAction

interface FetchPostAction extends Action {
    type: typeof FETCH_POSTS
    payload: PostsState
}

const URL_POSTS = 'https://jsonplaceholder.typicode.com/posts'

export const fetchPosts = async (): Promise<FetchPostAction> => {
    let res: FetchPostAction
    await fetch(URL_POSTS).then(res => res.json()).then(posts => {
        res = {
            type: FETCH_POSTS,
            payload: posts
        }
    })
    return res
}