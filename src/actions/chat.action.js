//@flow
export type ConnectPayload={userId:string,name:string};
export type DisconnectPayload={userId:string};
export type SendPayload={userId:string,targetId:string,message:string};
export type JoinPayload={userId:string,channel:string};

export type IConnect=(payload:ConnectPayload)=>({type:"CONNECT",payload:ConnectPayload})
export type IDisconnect=(payload:DisconnectPayload)=>({type:"DISCONNECT",payload:DisconnectPayload})
export type ISend=(payload:SendPayload)=>({type:"SEND",payload:SendPayload})
export type IJoin=(payload:JoinPayload)=>({type:"JOIN",payload:JoinPayload})

type Actions=
    |IConnect
    |IDisconnect
    |ISend
    |IJoin

export const Connect=(payload:ConnectPayload):IConnect=>({type:"CONNECT",payload:payload})
export const Disconnect=(payload:DisconnectPayload):IDisconnect=>({type:"DISCONNECT",payload:payload})
export const Send=(payload:SendPayload):ISend=>({type:"SEND",payload:payload})
export const Join=(payload:JoinPayload):IJoin=>({type:"JOIN",payload:payload})

