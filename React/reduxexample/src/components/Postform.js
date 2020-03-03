import React, { Component } from 'react'
import { createPost } from '../actions/postActions'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

class Postform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: '',
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const post = {
            title: this.state.title,
            body: this.state.body
        }
        console.log(`post: ${post}`)
        this.props.createPost(post)
    }

    render() {
        return (
            <div>
                <h1>Add Post</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Title: </label><br />
                        <input type="text" name="title" value={this.state.title} onChange={this.onChange} />
                    </div>
                    <div>
                        <label>Body: </label><br />
                        <textarea name="body" value={this.state.body} onChange={this.onChange} />
                    </div>
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}

Postform.propTypes = {
    createPost: PropTypes.func.isRequired
}

export default connect(null, { createPost })(Postform)