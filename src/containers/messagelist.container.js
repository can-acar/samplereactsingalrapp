//@flow
import *as React from "react";
import {memo} from "react";


type IMessageListNodeNode={

}
const MessageListNode=memo((props:IMessageListNodeNode)=>{

    return <div className="messages-chat">
        <div className="message">
            <div className="photo">
                <div className="online"></div>
            </div>
            <p className="text"> Hi, how are you ? </p>
        </div>
        <div className="message text-only">
            <p className="text"> What are you doing tonight ? Want to go take a drink ?</p>
        </div>
        <p className="time"> 14h58</p>
        <div className="message text-only">
            <div className="response">
                <p className="text"> Hey Megan ! It's been a while 😃</p>
            </div>
        </div>
        <div className="message text-only">
            <div className="response">
                <p className="text"> When can we meet ?</p>
            </div>
        </div>
        <p className="response-time time"> 15h04</p>
        <div className="message">
            <div className="photo" >
                <div className="online"></div>
            </div>
            <p className="text"> 9 pm at the bar if possible 😳</p>
        </div>
        <p className="time"> 15h09</p>
    </div>
})

export const MessageList=memo(MessageListNode)
