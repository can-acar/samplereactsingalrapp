//@flow
import *as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {memo,useEffect} from "react";
import '../assets/chat.css';
import {useDispatch, useSelector} from "react-redux";
import {useReducer} from "../commons/useReducer";
import {chat_redux} from "../store/chat.redux";
import {giris_redux} from "../store/giri.redux";
import {Search} from "./search.container";
import {UserList} from "./userlist.container";


type IProps={

}






const ChatContainerNode=(props:IProps):React.Node=>{
    const chat=useReducer({key:'chat',reducer:chat_redux})
    const dispatch=useDispatch()

    useEffect(()=>{
        console.log(chat)
    },[chat])

    return <div className="container">
        <div className="row">
            <nav className="menu">
                <ul className="items">
                    <li className="item">
                        <FontAwesomeIcon icon={ "home"} />
                    </li>
                    <li className="item">
                        <FontAwesomeIcon icon={ "user"} />
                    </li>
                    <li className="item item-active">
                        <FontAwesomeIcon  icon={"comments"} size={"2x"}/>
                    </li>
                </ul>
            </nav>
            <section className="discussions">
                <Search/>
                <UserList/>
            </section>
            <section className={"chat"}>
                <div className="header-chat">
                    <i className="icon fa fa-user-o" aria-hidden="true"></i>
                    <p className="name">{chat.username}</p>
                    <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
                </div>
            </section>
        </div>
    </div>
}

export const Chat=memo(ChatContainerNode)
