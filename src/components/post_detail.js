import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostDetail extends Component{
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.fetchPosts();
    }
    render(){
        const post = this.props.post
        if(!post){
            return <div>Loading....</div>
        }
        return(
            <div>
                <Link to='/'>Back to Index</Link>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return { post: state.posts[ownProps.match.params.id]} /* ownProps === this.props */
}

export default connect(mapStateToProps, { fetchPosts })(PostDetail)