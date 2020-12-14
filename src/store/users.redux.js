//@flow

import {Action} from "redux";

type IState={
    data:Array<{
        clientId:string,
        username:string,

    }>,
    loading:boolean
}


const InitialState:IState={
    data:[],
    loading:false
}

const actions={
    ["USER_LOAD"]:(state,{payload})=>{
        return {
            data:[],
            loading: true
        }
    },
    ["USER_LOAD_SUCCESS"]:(state,{payload})=>{
        return {
            data:payload,
            loading: false
        }
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
