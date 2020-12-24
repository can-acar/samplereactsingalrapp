//@flow
import * as React from "react";
import {createContext, useReducer} from "react";

type InitialState = {
    clientId: string,
    username: string,

}

const initialState: InitialState = {
    clientId: "",
    username: "",
}

const Actions = {
    ["SELECT_CLIENT"]: (state, {payload}) => {

        return {
            ...payload
        }
    },
}

function reducer(state, action){
    if(Actions[action.type]){
        return Object.assign({}, initialState, Actions[action.type](state, action));
    }
    return state;
}

export const ChatContext = createContext(null);

const ChatProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (<ChatContext.Provider value={{state, dispatch}}>
        {children}
    </ChatContext.Provider>)
};
export default ChatProvider;



