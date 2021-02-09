//@flow

import {Action} from "redux";

let store = JSON.parse(localStorage.getItem("chat"));

type IState = {

    clientId: string,
    connectionId: string,
    access_token: string,
    time: string,
    connected: boolean,
    loading: boolean,

}


const InitialState: IState = {

    clientId: null,
    connectionId: null,
    access_token: null,
    time: null,
    connected: false,
    loading: false,
    ...store
};

const actions = {

    "CONNECT": (state, {payload}) => ({
        ...state,
        ...store,
        ...payload,
        connected: false,
        loading: true,

    }),
    "CONNECTED": (state, {payload}) => ({
        ...state,
        ...payload,
        connected: true,
        loading: false
    }),

    "DISCONNECT": (state, {payload}) => ({

        userId: null,
        clientId: null,
        access_token: null,
        time: null,
        connected: false,
        loading: false
    }),
    "ERROR": (state, {error}) => ({}),
    "SEND": (state, {payload}) => {
        return {...state, payload};
    },
    "LOGOUT": (state, {payload}) => {
        return {...state, payload};
    },
    "USER_CONNECT_DETECTED": (state, {payload}) => {
        return {...state, payload};
    },
    "SESSION_TIME_OUT": (state, {payload}) => {
        return {...state, payload};
    }
};


export const chat_redux = (state = InitialState, action: Action) => {

    if(actions[action.type]){
        return Object.assign({}, state, actions[action.type](state, action));
    }
    return state;

};
