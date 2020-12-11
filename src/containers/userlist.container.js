//@flow
import *as React from "react";
import {memo} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type IUserListNode={

}


const UserListNode=memo((props:IUserListNode)=>{



    return <div className="discussion message-active">
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
            <p className="name">Megan Leib</p>
            <p className="message">9 pm at the bar if possible 😳</p>
        </div>
        <div className="timer">12 sec</div>
    </div>
})

export const UserList=memo(UserListNode)
