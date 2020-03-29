import { Dispatch } from 'react'
import Posts from '../components/Posts'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { fetchPosts } from '../Actions/postActions'
import { ActionTypes } from '../store'

const mapStateToProps = (state: AppState) => ({
    posts: state.posts.items
})

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
    fetchPosts: async () => dispatch(await fetchPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)