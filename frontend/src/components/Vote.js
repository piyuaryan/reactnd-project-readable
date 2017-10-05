import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import "../index.css";
import {vote} from "../actions";

class Vote extends Component {

    constructor(props) {
        super(props);
        this.handleVote = this.handleVote.bind(this)
    }

    static propTypes = {
        voteType: PropTypes.string.isRequired,
        objId: PropTypes.string.isRequired
    };

    handleVote(e) {
        const {voteType, objId, dispatch} = this.props;
        dispatch(vote(voteType, objId, parseInt(e.target.value, 10)))
    }

    render() {
        return (
            <div>
                <button onClick={ this.handleVote } value="1">Up Vote</button>
                <button onClick={ this.handleVote } value="-1">Down Vote</button>
            </div>
        )
    }

}

export default connect()(Vote)
