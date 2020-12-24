//@flow
import *as React from "react";
import {memo, useCallback, useState, useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ChatContext} from "../commons/chatContext";
import {useSelectState} from "../commons/useSelectState";
import {users_redux} from "../store/users.redux";
import classnames from "classnames";

type IUserListNode = {}


const UserListNode = memo((props: IUserListNode) => {

    const {state, dispatch} = useContext(ChatContext);
    const users = useSelectState({key: "users", reducer: users_redux})
    const [selectedClientId, selectClient] = useState("");

    console.log(users)

    const messageActive = (clientId, value) => classnames({
        "discussion": true,
        "message-active": clientId === value
    })

    const onselectClient = useCallback((clientId) => {
        if(clientId === selectedClientId){
            selectClient("")
            dispatch({type: "SELECT_CLIENT", payload: {clientId: "", username: ""}})
        }else{
            selectClient(clientId)
            dispatch({type: "SELECT_CLIENT", payload: {clientId, username: ""}})
        }

    }, [selectClient, selectedClientId, dispatch])

    const discussion = (item) => <div key={item.clientId} className={messageActive(selectedClientId, item.clientId)} onClick={() => onselectClient(item.clientId)}>
        <div className="photo">
            <div className="online user-list"/>
            <FontAwesomeIcon
                icon={"user"}
                style={{
                    marginLeft: "12px",
                    marginTop: "0px",
                    display: "block",
                    width: "45px",
                    height: "45px"
                }}

            />

        </div>
        <div className="desc-contact">
            <p className="name">{item.username}</p>

        </div>
        {/*  <div className="timer"></div>*/}
    </div>


    return users.data.map(discussion)
})

export const UserList = memo(UserListNode)
