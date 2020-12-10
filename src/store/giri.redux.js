//@flow

import {Action} from "redux";

type IState={
    data:{
        userId:string,
        connectionId:string,
        name:string,
        isOnline:boolean
    },
    loading:boolean
}


const InitialState:IState={
    data:{},
    loading:false
}

const actions={
    ["USER_LOGIN_REQUEST"]:(state,{payload})=>{

    },
    ["USER_LOGIN_SUCCESS"]:(state,{payload})=>{

    },
    ["USER_LOGIN_FAILED"]:(state,{payload})=>{

    },

}


export const giris_redux = (state = InitialState, action:Action<actions>) => {

    if (actions[action.type]) {
        return Object.assign({}, state,actions[action.type](state, action));
    }
    return state;

};
