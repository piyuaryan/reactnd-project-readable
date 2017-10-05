const api = "http://127.0.0.1:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
};

export const getAllPosts = () =>
    fetch(`${api}/posts`, {headers})
        .then(res => res.json())
        .then(data => data);

export const getCategories = () =>
    fetch(`${api}/categories`, {headers})
        .then(res => res.json())
        .then(data => data.categories);

export const createPost = (valueHash) =>
    fetch(`${api}/posts`, {headers, method: "POST", body: JSON.stringify(valueHash)})
        .then(res => res.json());

export const editPost = (valueHash) =>
    fetch(`${api}/posts/${valueHash.postId}`, {headers, method: "PUT", body: JSON.stringify(valueHash)})
        .then(res => res.json());

export const getPost = (postId) =>
    fetch(`${api}/posts/${postId}`, {headers})
        .then(res => res.json());

export const getCommentsForPost = (postId) =>
    fetch(`${api}/posts/${postId}/comments`, {headers})
        .then(res => res.json());

export const deletePost = (postId) =>
    fetch(`${api}/posts/${postId}`, {headers, method: "DELETE"});

export const editComment = (params) =>
    fetch(`${api}/comments/${params.commentId}`, {headers, method: "PUT", body: JSON.stringify(params)})
        .then(res => res.json());

export const createComment = (params) =>
    fetch(`${api}/comments`, {headers, method: "POST", body: JSON.stringify(params)})
        .then(res => res.json());

export const deleteComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {headers, method: "DELETE"});

export function vote(voteType, objId, value) {
    const body = {option: value > 0 ? "upVote" : "downVote"};
    return fetch(`${api}/${voteType}/${objId}`, {headers, method: "POST", body: JSON.stringify(body)})
        .then(res => res.json())
}


