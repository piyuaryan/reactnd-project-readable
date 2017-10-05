import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import moment from "moment";
import "../index.css";
import {deleteComment} from "../actions";
import Vote from "./Vote.js";

class Comment extends Component {

    constructor(props) {
        super(props);
        this.handleDeleteComment = this.handleDeleteComment.bind(this)
    }

    static propTypes = {
        comment: PropTypes.object.isRequired,
        post: PropTypes.object.isRequired
    };

    handleDeleteComment(e) {
        const {comment, dispatch} = this.props;
        e.preventDefault();
        dispatch(deleteComment(comment));
        window.history.back()
    }

    render() {
        const {post, comment} = this.props;

        return (
            <div>
                <dl>
                    <dd>Author: { comment.author }</dd>
                    <dd>Body: { comment.body }</dd>
                    <dd>vote score: { comment.voteScore }</dd>
                    <dd>created at: { moment(comment.timestamp).format("M/DD/YYYY HH:mm:ss")}</dd>
                    <dd><Link to={{pathname: `/posts/${post.id}/comments/${comment.id}/edit`, comment: comment}}>Edit</Link> | <a href='javascript(void);' onClick={this.handleDeleteComment}>Delete</a>
                    </dd>
                </dl>
                <Vote objId={comment.id} voteType="comments"/>
            </div>
        )
    }

}

export default connect()(Comment)
