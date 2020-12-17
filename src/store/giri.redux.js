//@flow

import {Action} from "redux";

type IState = {
    userId: string,
    name: string,
    loading: boolean
}


const InitialState: IState = {
    userId: undefined,
    name: undefined,
    loading: false
}

const actions = {
    ["GIRIS"]: (state, {payload}) => ({...state, ...payload, loading: true}),
    ["GIRIS_SUCCESS"]: (state, {payload}) => ({...state, ...payload, loading: false}),
    ["GIRIS_FAILED"]: (state, {payload}) => ({...state, ...payload, loading: false}),
}


export const giris_redux = (state = InitialState, action: Action<actions>) => {

    if(actions[action.type]){
        return Object.assign({}, state, actions[action.type](state, action));
    }
    return state;

};
