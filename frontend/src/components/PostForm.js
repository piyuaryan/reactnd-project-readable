import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import serializeForm from "form-serialize";
import UUID from "uuidjs";
import "../index.css";
import {createPost, editPost, resetForm, updateForm} from "../actions";

class PostForm extends Component {
    static propTypes = {
        post: PropTypes.object
    };

    componentDidMount() {
        this.props.dispatch(resetForm())
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {newPost, category, post, dispatch} = this.props;
        const values = serializeForm(e.target, {hash: true});
        if (newPost) {
            values["timestamp"] = Date.now();
            values["id"] = UUID.generate();
            values["category"] = category;
            dispatch(createPost(values))
        } else {
            values["postId"] = post.id;
            dispatch(editPost(values))
        }

    };

    handleInputChange = (event) => {
        this.props.dispatch(updateForm(event.target.name, event.target.value, this.props.post))
    };

    render() {
        const {post, newPost, postEdited, postCreated} = this.props;
        if (postEdited || postCreated) {
            return (
                <Redirect to={{pathname: `/posts/${post.id}`}}/>
            )
        }

        if (!post) {
            return null;
        }

        return (
            <div>
                <h2>{newPost ? ("New") : ("Edit")} Post</h2>
                <form onSubmit={this.handleSubmit}>
                    {newPost &&
                    <div>
                        <label className="form-label">
                            Author
                        </label>
                        <div className="form-input">
                            <input type="text" name="author" value={post.author || ''} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    }
                    <label className="form-label">
                        Title
                    </label>
                    <div className="form-input">
                        <input type="text" name="title" value={post.title || ''} onChange={this.handleInputChange}/>
                    </div>
                    <label className="form-label">
                        Post
                    </label>
                    <div className="form-input">
                        <textarea name="body" rows="3" value={post.body || ''} onChange={this.handleInputChange}/>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {categoryPath} = ownProps.match.params;
    const {pathname, post} = ownProps.location;

    const reduxState = {
        category: categoryPath,
        post: post,
        newPost: pathname.endsWith('new'),
        postEdited: state.formUpdate.postEdited,
        postCreated: state.formUpdate.postCreated
    };

    if (state.formUpdate.postCreated) {
        reduxState['post'] = state.formUpdate.post

    } else if (state.formUpdate.values) {
        // Redux handled input changes
        reduxState['post'] = state.formUpdate.values


    } else if (reduxState.newPost) {
        // New post
        reduxState['post'] = {
            name: "",
            author: "",
            body: ""
        }

    } else if (state.posts.length) {
        const postId = ownProps.match.params.postId;
        reduxState.post = state.posts.filter((post) => (post.id === postId))[0]

    }

    return reduxState
}

export default connect(mapStateToProps)(PostForm)
