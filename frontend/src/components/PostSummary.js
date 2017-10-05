import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";
import "../index.css";
import {deletePost} from "../actions";
import CommentCount from "./CommentCount.js";
import Vote from "./Vote.js";


class PostSummary extends Component {
    constructor(props) {
        super(props);
        this.handleDeletePost = this.handleDeletePost.bind(this)
    }

    static propTypes = {
        post: PropTypes.object
    };

    handleDeletePost(e) {
        const {post, dispatch} = this.props;
        e.preventDefault();
        dispatch(deletePost(post));
        window.location.href = '/'
    }

    render() {
        const {post} = this.props;

        if (!post) {
            return null;
        }

        return (
            <div>
                <dl>
                    <dt>
                        <Link to={{pathname: `/${post.category}/${post.id}`}}>
                            { post.title }
                        </Link>
                    </dt>
                    <dd>author: { post.author }</dd>
                    <dd>vote score: { post.voteScore }</dd>
                    <dd>created at: { moment(post.timestamp).format("M/DD/YYYY HH:mm:ss")}</dd>
                    <dd><Link to={{pathname: `/categories/${post.category}/posts/${post.id}/edit`, post: post}}>Edit</Link> | <a href='javascript:void(0);' onClick={this.handleDeletePost}>Delete</a>
                    </dd>
                    <dd>number of comments: <CommentCount post={post}/></dd>
                    <Vote objId={post.id} voteType="posts"/>

                </dl>
            </div>
        )
    }

}


export default connect()(PostSummary)
