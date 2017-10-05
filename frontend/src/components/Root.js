import React, {Component} from "react";
import {Provider} from "react-redux";
import "../index.css";
import App from "../components/App";
import configureStore from "../store";
import {BrowserRouter, Route} from "react-router-dom";


const store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store={ store }>
                <BrowserRouter>
                    <Route component={App}/>
                </BrowserRouter>
            </Provider>
        )
    }
}