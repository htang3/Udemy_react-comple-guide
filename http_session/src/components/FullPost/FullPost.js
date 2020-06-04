import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    componentDidUpdate() {
        if (this.props.id) {
            //make sure the newly loaded post is different from selectedPostid
            //or either the loadedPost is not null
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get("http://jsonplaceholder.typicode.com/posts/" + this.props.id)
                    .then(response => {
                        //when we call setState in componentDidUpdate, it creates an infinite loop.
                        //therefore we want it only update when we load a new post, then how do we did that?
                        this.setState({
                            loadedPost: response.data
                        })
                        //console.log(response)
                    })
            }
        }
    }

    deletePostHandler = () => {
        axios.delete("http://jsonplaceholder.typicode.com/posts/" + this.props.id)
            .then(response => {
                console.log(response)
            })
    }
    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        //need to check whether it got the id or not
        if (this.props.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }
        //check if axios completes getting the post or not
        //as soon as we get post, state become true
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button
                            onClick={this.deletePostHandler}
                            className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;