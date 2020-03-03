import {FETCH_POSTS} from './types'

const URL_POSTS = 'https://jsonplaceholder.typicode.com/posts'

export const fetchPosts = () => dispatch => {
    fetch(URL_POSTS).then(res => res.json()).then(posts => dispatch(
        {
            type: FETCH_POSTS,
            payload: posts
        }
    ))
}

// export const createPost = () => dispatch => {

// }