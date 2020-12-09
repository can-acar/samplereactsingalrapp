//@flow
import *as React from "react";
import {memo} from "react";

type IProps={

}


type IMessageContainerNode={

}


type IMessageListNodeNode={

}

const UserListNode=memo((props)=>{
    return <div></div>
})

const MessageListNode=memo((props:IMessageListNodeNode)=>{

    return <div></div>
})

const MessageContainerNode=memo((props:IMessageContainerNode)=>{

return <div></div>

})

const ChatContainerNode=(props:IProps):React.Node=>{

    return <div></div>
}

export const ChatContainer=memo(ChatContainerNode)
