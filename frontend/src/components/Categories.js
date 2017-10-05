import React, {Component} from "react";
import PropTypes from "prop-types";
import Category from "./Category.js";

export default class Categories extends Component {
    static propTypes = {
        categories: PropTypes.array.isRequired
    };

    render() {
        const {categories} = this.props;

        return (
            <div>
                { categories && categories.map((category) => (
                    category && <Category key={category.name} category={category}/>
                ))}
            </div>
        )
    }
}