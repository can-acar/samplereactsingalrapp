//@flow

import {Action} from "redux";

type IState = {
    data: Array<{
        userId: string,
        fromId: string,
        message: string,
        isRead: boolean
    }>,
    loading: boolean
}


const InitialState: IState = {
    data: [],
    loading: false
}

const actions = {
    ["MESSAGE"]: (state, {payload}) => {
        return {
            data: state.data.concat(payload)
        }
    },

    ["NOTIFY"]: (state, {payload}) => {
        return {
            data: state.data.concat(payload)
        }
    }
}


export const message_redux = (state = InitialState, action: Action<actions>) => {

    if(actions[action.type]){
        return Object.assign({}, state, actions[action.type](state, action));
    }
    return state;

};


