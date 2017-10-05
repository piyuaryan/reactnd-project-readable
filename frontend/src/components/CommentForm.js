import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import serializeForm from "form-serialize";
import UUID from "uuidjs";
import "../index.css";

import {createComment, editComment, fetchCommentsForPost, updateForm} from "../actions";

class CommentForm extends Component {
    static propTypes = {
        post: PropTypes.object
    };

    componentDidMount() {
        const {dispatch, postId, comment} = this.props;
        if (!comment) {
            dispatch(fetchCommentsForPost(postId))
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {newComment, postId, comment, dispatch} = this.props;
        const values = serializeForm(e.target, {hash: true});
        values["timestamp"] = Date.now();

        if (newComment) {
            values["id"] = UUID.generate();
            values["parentId"] = postId;
            dispatch(createComment(values))
        } else {
            values["commentId"] = comment.id;
            dispatch(editComment(values))
        }

    };

    handleInputChange = (event) => {
        this.props.dispatch(updateForm(event.target.name, event.target.value, this.props.comment))
    };

    render() {
        const {postId, comment, newComment, commentEdited, commentCreated} = this.props;

        if (commentEdited || commentCreated) {
            return (
                <Redirect to={{pathname: `/posts/${postId}`}}/>
            )
        }

        if (!comment) {
            return null;
        }

        return (
            <div>
                <h2>{newComment ? ("New") : ("Edit")} Comment</h2>
                <form onSubmit={this.handleSubmit}>
                    {newComment &&
                    <div>
                        <label className="form-label">
                            Author
                        </label>
                        <div className="form-input">
                            <input type="text" name="author" value={comment.author || ''} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    }
                    <label className="form-label">
                        Comment:
                    </label>
                    <div className="form-input">
                        <textarea name="body" rows="3" value={comment.body || ''} onChange={this.handleInputChange}/>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {postId, commentId} = ownProps.match.params;
    const {pathname, post} = ownProps.location;

    const initialState = {
        post: post,
        postId: postId,
        newComment: pathname.endsWith('new'),
        commentEdited: state.formUpdate.commentEdited,
        commentCreated: state.formUpdate.commentCreated
    };

    if (state.formUpdate.values) {
        // Redux handled input changes
        initialState['comment'] = state.formUpdate.values

    } else if (state.formUpdate.commentCreated) {
        initialState['comment'] = state.formUpdate.comment

    } else if (initialState.newComment) {
        // New comment
        initialState['comment'] = {
            author: "",
            body: ""
        }

    } else if (commentId && state.comments.byPostId && state.comments.byPostId[postId]) {
        initialState.comment = state.comments.byPostId[postId].filter(comment => comment.id === commentId)[0]

    }

    return initialState
}

export default connect(mapStateToProps)(CommentForm)
