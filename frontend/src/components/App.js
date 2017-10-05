import React, {Component} from "react";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import "../index.css";
import Categories from "./Categories.js";
import Category from "./Category.js";
import Post from "./Post.js";
import PostForm from "./PostForm.js";
import CommentForm from "./CommentForm.js";
import {fetchCategoriesAndPosts, sortPosts} from "../actions";

class App extends Component {

    componentDidMount() {
        const {dispatch, categories} = this.props;
        if (!categories || categories.length === 0) {
            dispatch(fetchCategoriesAndPosts())
        }
    }

    handleChangeSort = (event) => {
        this.props.dispatch(sortPosts(event.target.value))
    };

    render() {
        const {categories, sort, isLoading} = this.props;

        if (isLoading) {
            return null;
        }

        return (
            <div className="App">
                <div>
                    Sort Posts by:
                    <select value={sort} onChange={this.handleChangeSort}>
                        <option value="voteScore">Vote Score</option>
                        <option value="timestamp">Timestamp</option>
                        <option value="title">Title</option>
                    </select>
                </div>
                <Route exact path="/" render={() => (
                    <Categories categories={categories}/>
                )}/>
                <Route exact path="/:categoryPath" component={Category}/>
                <Route exact path="/:categoryPath/:postId" component={Post}/>
                <Route path="/posts/:postId/comments/:commentId/edit" component={CommentForm}/>
                <Route path="/posts/:postId/comments/new" component={CommentForm}/>
                <Route path="/categories/:categoryPath/posts/new" component={PostForm}/>
                <Route path="/categories/:categoryPath/posts/:postId/edit" component={PostForm}/>
            </div>
        );
    }
}

function mapStateToProps({categories, currentSort}) {
    return {
        sort: currentSort,
        categories: categories
    }
}

export default connect(mapStateToProps)(App)

