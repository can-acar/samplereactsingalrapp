//@flow
import {all, fork, put, takeEvery, call, take, delay, select} from "redux-saga/effects";
import {push} from "connected-react-router";

function store(payload){
    localStorage.clear()
    localStorage.setItem("chat", JSON.stringify(payload));
}

function* connectionFlow(){

    const chat = yield select(select => select.chat_redux)
    yield all([
        call(store, chat),
        put(push("chat"))
    ])

}

function* watchUserConnection(){

    while(true){
        const task = yield take(["USER_CONNECT", "USER_CONNECTED", "USER_DISCONNECTED"])

        if(task.type === "USER_CONNECT"){
            yield  put({
                type: "INVOKE",
                payload: {
                    method: "hello",
                    clientId: task.payload.clientId,
                    username: task.payload.username
                }
            })
        }

        if(task.type === "USER_CONNECTED" || task.type === "USER_DISCONNECTED"){

            const chat = yield select(select => select.chat_redux)

            yield put({
                type: "INVOKE",
                payload: {
                    method: "getUserList",
                    clientId: chat.clientId,

                }
            })
        }


    }
}


function* watchChat(){
    while(true){
        const task = yield take(["SEND_MESSAGE", "RECIEVE_MESSAGE","NEW_MESSAGE"])

        if(task.type === "SEND_MESSAGE"){
            yield put({type: "MESSAGE", payload: task.payload})

            yield put({type: "INVOKE", payload: {method: "sendMessage", ...task.payload}})
        }

        if(task.type === "RECIEVE_MESSAGE"){
            yield put({type: "NOTIFY", payload: task.payload})
        }

        if(task.type === "NEW_MESSAGE"){
            yield put({type: "NOTIFY", payload: task.payload})
        }

    }
}

function* logout({payload}){
    console.log(payload)
    localStorage.clear();
}

export default function* chatSaga(){
    yield all([

        takeEvery("LOGOUT", logout),
        watchUserConnection(),
        takeEvery("USER_CONNECTED", connectionFlow),
        watchChat()
    ]);
}
