import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import sortBy from "sort-by";
import {Link, withRouter} from "react-router-dom";
import "../index.css";
import PostSummary from "./PostSummary.js";
import Nav from "./Nav.js";

class Category extends Component {
    static propTypes = {
        category: PropTypes.object
    };

    render() {
        const {category, posts, sort, location} = this.props;

        if (!category) {
            return null
        }

        return (
            <div>
                { location.pathname !== '/' && <Nav /> }
                <div className="container">
                    <div>
                        <span className="nav-link">
                            <Link className="nav-link"
                                  to={{pathname: `/${category.path}`, category: category}}>
                                {category.name}
                            </Link>
                        </span>
                        <Link to={{pathname: `/categories/${category.path}/posts/new`}}>
                            <button>New Post</button>
                        </Link>
                        { posts && (
                            posts
                                .sort(sortBy(sort))
                                .map((post) => (
                                        <PostSummary post={post} key={ post.id }/>
                                    )
                                ))}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let cat = ownProps.category;
    if (!cat && state.categories.length) {
        cat = state.categories.filter((category) => (category.path === ownProps.match.params.categoryPath))[0]
    }

    let posts = ownProps.posts;
    if (cat && state.posts.length) {
        posts = state.posts.filter((post) => (post.category === cat.path))
    }
    return {
        posts: posts,
        sort: state.currentSort,
        category: cat
    }
}
export default withRouter(connect(mapStateToProps)(Category))
