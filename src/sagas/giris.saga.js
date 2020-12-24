//@flow
import {all, call, put, takeEvery, race, take, select, takeLatest} from "redux-saga/effects";



function* girisFlow({payload}){

    const data = {
        url: ["https://localhost:5001", "chat"].join("/"),
        channel: "chat",
        clientId: payload.clientId,
        access_token: payload.clientId
    }

    yield all([
        put({type: "LOGIN_REQUEST", payload: {...data, ...payload}}),
        put({type: "CONNECT", payload: {...data, ...payload}}),

    ])

}


function* watchConnection(){
    while(true){

        const task = yield take(["CONNECTED"])

        const chat = yield select(select => select.chat_redux)

        yield all([
            put({type: "LOGIN_SUCCESS", payload: chat}),

            put({type: "USER_CONNECT", payload: chat}),
            /*    put({
             type: "INVOKE",
             payload: {
             method: "hello",
             ...chat

             }
             })*/

        ])
    }
}


export default function* girisSaga(){
    yield all([
        takeEvery("GIRIS", girisFlow),
        watchConnection()
    ]);
}
