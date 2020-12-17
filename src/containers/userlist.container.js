//@flow
import *as React from "react";
import {memo} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelectState} from "../commons/useSelectState";
import {users_redux} from "../store/users.redux";

type IUserListNode={

}


const UserListNode=memo((props:IUserListNode)=>{

    const users=useSelectState({key:"users",reducer:users_redux})

    console.log(users)

    const discussion =(item)=> <div key={item.clientId} className="discussion message-active">
        <div className="photo">
            <div className="online user-list"/>
            <FontAwesomeIcon
                icon={"user"}
                style={{
                    marginLeft:"12px",
                    marginTop:"0px",
                    display:"block",
                    width:"45px",
                    height:"45px"
                }}

            />

        </div>
        <div className="desc-contact">
            <p className="name">{item.username}</p>

        </div>
        <div className="timer">12 sec</div>
    </div>


    return users.data.map(discussion)
})

export const UserList=memo(UserListNode)
