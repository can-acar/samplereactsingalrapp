//@flow
import *as React from "react";
import {memo} from "react";
import {useSelector} from "react-redux";

type IIHeaderContainerNode={

}

const HeaderContainerNode=(props:IIHeaderContainerNode):React.Node=>{
    const chat=useSelector(select=>select.chat_redux)//useSelectState({key:'chat',reducer:chat_redux})
    return <div className="header-chat">
        <i className="icon fa fa-user-o" aria-hidden="true"></i>
        <p className="name">{chat.username}</p>
        <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
    </div>

};

export const Header=memo(HeaderContainerNode)
