//@flow
import *as React from "react";
import {memo} from "react";
import {useSelectState} from "../commons/useSelectState";
import {chat_redux} from "../store/chat.redux";
type IIHeaderContainerNode={

}

const HeaderContainerNode=(props:IIHeaderContainerNode):React.Node=>{
    const chat=useSelectState({key:'chat',reducer:chat_redux})
    return <div className="header-chat">
        <i className="icon fa fa-user-o" aria-hidden="true"></i>
        <p className="name">{chat.username}</p>
        <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
    </div>

};

export const Header=memo(HeaderContainerNode)
