import * as React from 'react'
import { PostState, PostsState } from '../types'

type PostsProps = PostsState & {
    fetchPosts: () => void
}

const Posts: React.FunctionComponent<PostsProps> = props => {
    React.useEffect(() => {
        props.fetchPosts()
    })
    const postItems = props.items && props.items.map((post: PostState) => (
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
    ))
    return (
        <div>
            <h1>Posts</h1>
            {postItems}
        </div>
    )
}

export default Posts
