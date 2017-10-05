import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";
import "../index.css";
import {deletePost, resetForm} from "../actions";
import Comments from "./Comments.js";
import Nav from "./Nav.js";
import Vote from "./Vote.js";

class Post extends Component {
    constructor(props) {
        super(props);
        this.handleDeletePost = this.handleDeletePost.bind(this)
    }

    static propTypes = {
        post: PropTypes.object
    };

    componentWillMount() {
        this.props.dispatch(resetForm())
    }

    handleDeletePost(e) {
        const {post, dispatch} = this.props;
        e.preventDefault();
        dispatch(deletePost(post));
        window.history.back()
    }


    render() {
        const {post, category} = this.props;

        if (!post) {
            return null;
        }

        return (
            <div>
                <Nav category={category}/>
                <dl>
                    <dt>{ post.title }</dt>
                    <dd>author: { post.author }</dd>
                    <dd>body: { post.body }</dd>
                    <dd>vote score: { post.voteScore }</dd>
                    <dd>created at: { moment(post.timestamp).format("M/DD/YYYY HH:mm:ss")}</dd>
                    <dd><Link to={{pathname: `/categories/${post.category}/posts/${post.id}/edit`, post: post}}>Edit</Link> | <a href='javascript(void);' onClick={this.handleDeletePost}>Delete</a>
                    </dd>
                </dl>
                <Vote objId={post.id} voteType="posts"/>
                Comments: <Comments post={post}/>
                <Link to={{pathname: `/posts/${post.id}/comments/new`}}>
                    <button className='icon-btn'>New Comment</button>
                </Link>
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {

    const retVal = {};
    // Passed in prop
    if (ownProps.post) {
        retVal.post = ownProps.post
    }

    // Grabbed out of the store
    if (state.posts.length) {
        const postId = ownProps.match.params.postId;
        const post = state.posts.filter((post) => (post.id === postId))[0];

        if (post) {
            retVal.post = post
        }
    }

    if (retVal.post) {
        retVal.category = state.categories.filter(category => category.path === retVal.post.category)[0]
    }
    return retVal

}
export default connect(mapStateToProps)(Post)
