//@flow
import *as React from "react";
import {memo} from "react";
import '../assets/chat.css';


type IProps={

}






const ChatContainerNode=(props:IProps):React.Node=>{

    return <div className="container">
        <div className="row">
            <nav className="menu">
                <ul className="items">
                    <li className="item">
                        <i className="fa fa-home" aria-hidden="true"></i>
                    </li>
                    <li className="item">
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </li>
                    <li className="item item-active">
                        <i className="fa fa-commenting" aria-hidden="true"></i>
                    </li>
                </ul>
            </nav>

        </div>
    </div>
}

export const Chat=memo(ChatContainerNode)
