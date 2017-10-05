import {combineReducers} from "redux";
import {
    COMMENT_CREATE,
    COMMENT_DELETE,
    COMMENT_EDIT,
    COMMENT_VOTE,
    FORM_UPDATE,
    POST_CREATE,
    POST_DELETE,
    POST_EDIT,
    POST_VOTE,
    GET_ALL_POSTS,
    GET_CATEGORIES,
    GET_COMMENTS,
    POST_SORT
} from "../utils/constants.js";

const initialState = {
    categories: [],
    posts: [],
    comments: []
};

function posts(state = initialState.posts, action) {
    switch (action.type) {
        case GET_ALL_POSTS:
            return action.posts.filter(post => !post.deleted);

        case POST_DELETE:
            return state.filter((post) => post.id !== action.postId);

        case POST_CREATE:
            return [...state, action.post];

        case POST_EDIT:
            return state.map(post => post.id === action.post.id ? action.post : post);

        case POST_VOTE:
            return state.map((post) => {
                if (post.id === action.json.id) {
                    const newVal = post.voteScore += action.voteValue;
                    return {...post, voteScore: newVal}
                } else {
                    return post
                }
            });

        default:
            return state;
    }
}

function categories(state = initialState.categories, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
}

function comments(state = initialState.comments, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                byPostId: {
                    ...state.byPostId,
                    [action.post]: action.comments
                }
            };
        case COMMENT_CREATE:
            return {
                ...state,
                byPostId: {
                    ...state.byPostId,
                    [action.comment.parentId]: null // Just refetch all comments from server...
                }

            };
        case COMMENT_EDIT:
            return {
                ...state,
                byPostId: {
                    ...state.byPostId,
                    [action.comment.parentId]: state.byPostId[action.comment.parentId].map(comment => comment.id === action.comment.id ? action.comment : comment)
                }
            };
        case COMMENT_DELETE:
            return {
                ...state,
                byPostId: {
                    ...state.byPostId,
                    [action.comment.parentId]: state.byPostId[action.comment.parentId].filter(comment => comment.id !== action.comment.id)
                }
            };
        case COMMENT_VOTE:
            return {
                ...state,
                byPostId: {
                    ...state.byPostId,
                    [action.json.parentId]: state.byPostId[action.json.parentId].map((comment) => {
                        if (comment.id === action.json.id) {
                            const newVal = comment.voteScore += action.voteValue;
                            return {...comment, voteScore: newVal}
                        } else {
                            return comment
                        }
                    })
                }
            };
        default:
            return state
    }
}

function currentSort(state = {}, action) {
    switch (action.type) {
        case POST_SORT:
            return action.sort;
        default:
            return state || 'voteScore'
    }
}

function formUpdate(state = {}, action) {
    switch (action.type) {
        case FORM_UPDATE:
            return {
                ...state,
                values: {
                    ...action.currentValues,
                    [action.name]: action.newValue
                },
                postEdited: false
            };
        case POST_EDIT:
            return {
                ...state,
                post: action.post,
                postEdited: true
            };
        case POST_CREATE:
            return {
                ...state,
                post: action.post,
                postCreated: true
            };
        case COMMENT_CREATE:
            return {
                ...state,
                comment: action.comment,
                commentCreated: true
            };
        case COMMENT_EDIT:
            return {
                ...state,
                commentCreated: true
            };
        default:
            return {
                ...state,
                postEdited: false,
                postCreated: false,
                commentEdited: false,
                commentCreated: false,
                values: null
            }
    }
}

const rootReducer = combineReducers({posts, categories, comments, currentSort, formUpdate});
export default rootReducer;
