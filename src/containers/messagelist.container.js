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
    return <div className="message" key={props.item.message}>
        {props.item.clientId === props.clientId ?

            <p className="text"> {props.item.message}</p>

            : <div className="response">
                <p className="text"> {props.item.message}</p>
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

    const lastMesssageSame = () => {
        console.log(messageList.data.slice(-1), client.clientId)
    }

    useEffect(scrollToBottom, [messageList])

    useEffect(() => {

        console.log(messageList, lastMesssageSame())

    }, [messageList, lastMesssageSame])


    return <div className="messages-chat">
        {
            messageList.data.map((p, i) => {
                return <Fragment key={i}>
                    <Message item={p} clientId={client.clientId}/>

                </Fragment>
            })

        }
        <div ref={messagesEndRef}/>
    </div>
})

export const MessageList = memo(MessageListNode)
