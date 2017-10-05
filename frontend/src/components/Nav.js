import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "../index.css";

export default class Nav extends Component {

    static propTypes = {
        category: PropTypes.object
    };


    render() {
        const {category} = this.props;


        return (
            <div>
        <span className="nav-link">
          <Link to='/'>Home</Link>
        </span>
                { category && (
                    <span className="nav-link">
            <Link to={{pathname: `/${category.path}`}}>
              { category.name }
            </Link>
          </span>
                )}
            </div>
        )
    }

}

