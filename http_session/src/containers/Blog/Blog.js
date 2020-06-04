import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios'
class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            selectedPostId: null,
            error: false
        }
    }
    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                const updatedPosts = response.data.slice(0, 4)
                const updatedPostsAuthor = updatedPosts.map(post => {
                    return {
                        ...post,
                        author: "Max"
                    }
                })
                this.setState({
                    posts: updatedPostsAuthor
                })
                console.log(updatedPosts)
            })
            .catch(err => {
                this.setState({
                    error: true
                })
                console.log(err)
            })
    }
    postSelectedhandler = (id) => {
        this.setState({
            selectedPostId: id
        })
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>
        if (!this.state.error) {

            posts = this.state.posts.map(post => {
                return <Post
                    clicked={() => this.postSelectedhandler(post.id)}
                    key={post.id}
                    title={post.title}
                    author={post.author}
                />
            })
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;