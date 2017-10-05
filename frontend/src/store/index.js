import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return next(action);
};

const store = () => createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;