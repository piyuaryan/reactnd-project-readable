import * as Api from "../utils/api.js";
import {
    COMMENT_CREATE,
    COMMENT_DELETE,
    COMMENT_EDIT,
    COMMENT_VOTE,
    FORM_RESET,
    FORM_UPDATE,
    GET_ALL_POSTS,
    GET_CATEGORIES,
    GET_COMMENTS,
    POST_CREATE,
    POST_DELETE,
    POST_EDIT,
    POST_SORT,
    POST_VOTE
} from "../utils/constants.js";

// 1. Categories
export const getCategories = (json) => ({
    type: GET_CATEGORIES,
    categories: json
});


export const getAllPosts = function (json) {
    return {
        type: GET_ALL_POSTS,
        posts: json
    }
};

export const fetchCategoriesAndPosts = () => dispatch => (
    Api
        .getCategories()
        .then(json => dispatch(getCategories(json)))
        .then(
            Api
                .getAllPosts()
                .then(json => dispatch(getAllPosts(json)))
        )
);

// 2. Posts
export const postCreate = (post) => ({
    type: POST_CREATE,
    post
});

export const createPost = (valueHash) => dispatch => (
    Api
        .createPost(valueHash)
        .then((json) => dispatch(postCreate(json)))
);

export const postEdit = (post) => ({
    type: POST_EDIT,
    post
});

export const editPost = (valueHash) => dispatch => (
    Api
        .editPost(valueHash)
        .then(json => dispatch(postEdit(json)))
);

export const postDeleted = (postId, category) => ({
    type: POST_DELETE,
    postId, category
});

export const deletePost = (post) => dispatch => (
    Api
        .deletePost(post.id)
        .then(dispatch(postDeleted(post.id, post.category)))
);

export const sortPosts = (sort = 'viewScore') => ({
    type: POST_SORT,
    sort
});

// 3. Comments
export const getComments = (postId, comments) => ({
    type: GET_COMMENTS,
    post: postId,
    comments
});


export const fetchCommentsForPost = (postId) => dispatch => (
    Api
        .getCommentsForPost(postId)
        .then(json => dispatch(getComments(postId, json)))
);

export const createComment = (params) => dispatch => (
    Api
        .createComment(params)
        .then(json => dispatch(
            {
                type: COMMENT_CREATE,
                comment: json
            }
        ))
);

export const editComment = (params) => dispatch => (
    Api
        .editComment(params)
        .then(json => dispatch({
            type: COMMENT_EDIT,
            comment: json
        }))
);

export const deleteComment = (comment) => dispatch => (
    Api
        .deleteComment(comment.id)
        .then(dispatch({
            type: COMMENT_DELETE,
            comment
        }))
);


// 4. Common
export const resetForm = () => ({
    type: FORM_RESET
});

export const updateForm = (name, newValue, currentValues) => ({
    type: FORM_UPDATE,
    name, newValue, currentValues
});

export const vote = (voteType, objId, voteValue) => dispatch => (
    Api
        .vote(voteType, objId, voteValue)
        .then(json => dispatch(
            {
                type: voteType === 'posts' ? POST_VOTE : COMMENT_VOTE,
                voteValue, json
            }
        ))
);
