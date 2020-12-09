//@flow

import {Action} from "redux";

type IState={
    data:Array<{
        userId:string,
        fromId:string,
        message:string,
        isRead:boolean
    }>,
    loading:boolean
}


const InitialState:IState={
    data:[],
    loading:false
}

const actions={
    ["MESSAGE_LOAD"]:(state,{payload})=>{

    },
    ["MESSAGE_LOAD_SUCCESS"]:(state,{payload})=>{

    },
    ["MESSAGE_LOAD_FAILED"]:(state,{payload})=>{

    },

}


export const message_redux = (state = InitialState, action:Action<actions>) => {

    if (actions[action.type]) {
        return Object.assign({}, state,actions[action.type](state, action));
    }
    return state;

};


