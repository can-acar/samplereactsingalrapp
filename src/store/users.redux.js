//@flow

import {Action} from "redux";

type IState={
    data:Array<{
        userId:string,
        name:string,
        isOnline:boolean
    }>,
    loading:boolean
}


const InitialState:IState={
    data:[],
    loading:false
}

const actions={
    ["USER_LOAD"]:(state,{payload})=>{

    },
    ["USER_LOAD_SUCESS"]:(state,{payload})=>{

    },
    ["USER_LOAD_FAILED"]:(state,{payload})=>{

    },

}


export const users_redux = (state = InitialState, action:Action<actions>) => {

    if (actions[action.type]) {
        return Object.assign({}, state,actions[action.type](state, action));
    }
    return state;

};
