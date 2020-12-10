//@flow
import {Reducer} from "redux";
import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import staticReducers from "../root.store";
import {history} from "../history/index";

export const createRootReducer = (asyncReducers:Reducer) => combineReducers({
    router: connectRouter(history),
    ...asyncReducers,
    ...staticReducers,

});
