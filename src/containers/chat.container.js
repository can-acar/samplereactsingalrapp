//@flow
import *as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {memo, useContext, useEffect} from "react";
import '../assets/chat.css';
import {useDispatch, useSelector, useStore} from "react-redux";
import {useState, useCallback} from "react";
import {Logout} from "../actions/chat.action";
import ChatProvider, {ChatContext} from "../commons/chatContext";
import {useSelectState} from "../commons/useSelectState";
import {chat_redux} from "../store/chat.redux";

import {Footer} from "./footer.container";
import {Header} from "./header.container";
import {MessageList} from "./messagelist.container";
import {Search} from "./search.container";
import {UserList} from "./userlist.container";
import classnames from "classnames";

type IProps = {}


const ChatContainerNode = (props: IProps): React.Node => {


    const [nav, changeNav] = useState({current: "users"});
    const chat = useSelector(select => select.chat_redux)
    const test = useSelectState({key: 'test', reducer: chat_redux})

    const action = useDispatch()

    useEffect(() => {
        console.log(chat, test, )
    }, [chat, test, ])

    const onChangeNav = useCallback((nav) => {
        changeNav(nav)
    }, [changeNav])

    const classname = (current) => classnames()

    console.log(chat, test)

    useEffect(() => {

        return () => {
            action(Logout({userId: chat.clientId}))
        }
    }, [action, Logout, chat])


    return <ChatProvider>
        <div className="container">
            <div className="row">
                <nav className="menu">
                    <ul className="items">
                        <li className="item" onClick={() => onChangeNav("main")}>
                            <FontAwesomeIcon icon={"home"}/>
                        </li>
                        <li className="item item-active" onClick={() => onChangeNav("users")}>
                            <FontAwesomeIcon icon={"user"}/>
                        </li>
                        <li className="item" onClick={() => onChangeNav("chat")}>
                            <FontAwesomeIcon icon={"comments"} size={"2x"}/>
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
    </ChatProvider>
}

export const Chat = memo(ChatContainerNode)
