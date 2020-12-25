//@flow
import *as React from "react";
import {Fragment, memo, useContext, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {ChatContext} from "../commons/chatContext";
import {useSelectState} from "../commons/useSelectState";
import {message_redux} from "../store/message.redux";
import classnames from "classnames";

type IMessageListNodeNode = {}

const Message = memo((props) => {

    return <div className="message">
        {
            props.messageId === props.clientId && <p className="text"> {props.message}</p>
        }
        {
            props.messageId === props.fromId && <div className="response">
                <p className="text"> {props.message}</p>
            </div>
        }

    </div>
})

const timer = (left) => classnames({"response-time time": !left, "timer": left})

const Splitter = (props) => <p className={timer(props.left)}/>


const MessageListNode = memo((props: IMessageListNodeNode) => {

    const {state, dispatch} = useContext(ChatContext);
    const client = useSelector(select => select.chat_redux)
    const messageList = useSelectState({key: "messages", reducer: message_redux})
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }

    useEffect(scrollToBottom, [messageList])

    return <div className="messages-chat">
        {
            messageList.data.map((p, i) => <Message key={i}
                                                    message={p.message}
                                                    messageId={p.clientId}
                                                    fromId={state.clientId}
                                                    clientId={client.clientId}/>)

        }
        <div ref={messagesEndRef}/>
    </div>
})

export const MessageList = memo(MessageListNode)
