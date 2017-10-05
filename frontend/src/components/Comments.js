import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import "../index.css";
import {fetchCommentsForPost} from "../actions";
import Comment from "./Comment.js";

class Comments extends Component {

    static propTypes = {
        post: PropTypes.object
    };

    componentWillMount() {
        const {post, comments, dispatch} = this.props;
        if (!comments) {
            dispatch(fetchCommentsForPost(post.id));
        }
    }

    render() {
        const {comments, post} = this.props;

        return (
            <div>
                { comments && comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} post={post}/>
                ))
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {

    if (state.comments.byPostId) {
        return {
            post: ownProps.post,
            comments: state.comments.byPostId[ownProps.post.id]
        }
    } else {
        return {}
    }

}

export default connect(mapStateToProps)(Comments)
