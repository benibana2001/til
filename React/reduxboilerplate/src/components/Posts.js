import React, { Component } from 'react'
import { fetchPosts } from '../actionCreators/postActions'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

class Posts extends Component {
    componentWillMount(){
        this.props.fetchPosts()
    }
    render() {
        const postItems = this.props.posts.map(post => (
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
}

Posts.prototypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts })(Posts)