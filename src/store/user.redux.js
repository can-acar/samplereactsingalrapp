//@flow

import {Action} from "redux";

type IState = {
    data: {
        userId: string,
        name: string,
        isOnline: boolean
    },
    loading: boolean
}


const InitialState: IState = {
    data: {},
    loading: false
}

const actions = {
    ["USER_LOAD"]: (state, {payload}) => ({
        ...payload

    }),
    ["USER_LOAD_SUCCESS"]: (state, {payload}) => ({
        ...state,
        ...payload
    }),

    ["USER_LOAD_FAILED"]: (state, {payload}) => ({

        ...payload
    })

};

export const users_redux = (state = InitialState, action: Action) => {

    if(actions[action.type]){
        return Object.assign({}, state, actions[action.type](state, action));
    }
    return state

};
