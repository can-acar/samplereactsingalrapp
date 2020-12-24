//@flow
import *as React from "react";
import {memo, useContext, useEffect, useCallback, useState, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {ChatContext} from "../commons/chatContext";

type IFooterContainerNode = {}

const FooterContainerNode = (props: IFooterContainerNode): React.Node => {

    const {state, dispatch} = useContext(ChatContext);



    const client = useSelector(select => select.chat_redux)

    const [message, setMessage] = useState("");

    const action = useDispatch();

    const onSendMessage = useCallback(() => {

        if(state.clientId !== ""){

            action({type: "SEND_MESSAGE", payload: {clientId: state.clientId, fromId: client.clientId, message}})

            setMessage("")
        }else{
            alert("Kullanıcı Seç")
        }

    }, [action, state, message])

    const typing = useCallback((event) => {
        event.preventDefault()

        const {name, value} = event.target;

        setMessage(value)

    }, [setMessage, message])




    return <div className="footer-chat">
        <div style={{
            backgroundColor: "#f6f6f6",
            border: "12px",
            display: "block",
            position: "relative",
            width: "100%",
            marginLeft: "10px",
            padding: 0

        }}>

            <input type="text" className="write-message" value={message} placeholder="Type your message here" onChange={typing}/>
        </div>
        <div className={"icon send fa fa-paper-plane-o clickable"} onClick={onSendMessage}>
            <FontAwesomeIcon icon={"paper-plane"} style={{fontSize: "23px"}} size={"2x"}/>
        </div>

    </div>

};

export const Footer = memo(FooterContainerNode)
