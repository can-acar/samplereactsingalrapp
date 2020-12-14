//@flow
import *as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {memo,useEffect} from "react";
import '../assets/chat.css';
import {useDispatch, useSelector} from "react-redux";
import {useState,useCallback} from "react";
import {useReducer} from "../commons/useReducer";
import {chat_redux} from "../store/chat.redux";
import {giris_redux} from "../store/giri.redux";
import {Footer} from "./footer.container";
import {Header} from "./header.container";
import {MessageList} from "./messagelist.container";
import {Search} from "./search.container";
import {UserList} from "./userlist.container";
import classnames from "classnames";

type IProps={

}






const ChatContainerNode=(props:IProps):React.Node=>{

    const[nav,changeNav]=useState({current:"users"});
    const chat=useReducer({key:'chat',reducer:chat_redux,isDelete:false})
    const dispatch=useDispatch()

    useEffect(()=>{
        console.log(chat)
    },[chat])

    const onChangeNav=useCallback((nav)=>{
        changeNav(nav)
    },[changeNav])

    const classname=(current)=>classnames()


    return <div className="container">
        <div className="row">
            <nav className="menu">
                <ul className="items">
                    <li className="item" onClick={()=>onChangeNav("main")}>
                        <FontAwesomeIcon icon={"home"} />
                    </li>
                    <li className="item item-active" onClick={()=>onChangeNav("users")} >
                        <FontAwesomeIcon icon={"user"} />
                    </li>
                    <li className="item" onClick={()=>onChangeNav("chat")}>
                        <FontAwesomeIcon  icon={"comments"} size={"2x"}/>
                    </li>
                </ul>
            </nav>
            <section className="discussions">
                <Search/>
                <UserList/>
            </section>
            <section className={"chat"}>
                 <Header/>
                 <MessageList/>
                 <Footer/>
            </section>
        </div>
    </div>
}

export const Chat=memo(ChatContainerNode)
