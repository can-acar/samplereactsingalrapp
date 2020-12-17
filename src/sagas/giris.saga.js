//@flow
import {all, call, put, takeEvery, race, take, select} from "redux-saga/effects";
import {push} from "connected-react-router";

function store(payload){
    localStorage.clear();
    localStorage.setItem("chat", JSON.stringify(payload));
}

function* giris(payload){
    while(true){
        try{

            const data = {
                url: ["https://localhost:5001", "chat"].join("/"),
                channel: "chat",
                clientId: payload.clientId,
                access_token: "e0dc9205-e437-4512-99fc-f1b7a340adab"
            }


            yield all([
                put({type: "USER_LOGIN_REQUEST", payload}),

                put({type: "CONNECT", payload: data})
            ])

            const task = yield take(["CONNECTED"])


            yield all([
                call(store, {clientId: task.payload.clientId, username: payload.username, access_token: "e0dc9205-e437-4512-99fc-f1b7a340adab", isOnline: true}),
                put({
                        type: "USER_LOGIN_SUCCESS",
                        payload: {

                            username:payload.username,
                            userId: task.payload.clientId,
                            clientId:task.payload.clientId
                        }
                }),
                put({
                    type:"INVOKE",
                    payload:{
                        method:"join",
                        clientId:task.payload.clientId,
                        username:payload.username,
                    }
                })

            ])


            return true
        }catch(error){
            yield put({type: "USER_LOGIN_FAILED", payload: error})
            return false
        }
    }
}



function* girisFlow({payload}){
    try{


        const [success, failed] = yield race([
            call(giris, payload),
            take(["DISCONNECT", "USER_LOGIN_FAILED"])
        ])
        /// store clientId and name
        /// redirect to chat pannel


        if(success){

            yield put(push("chat"))

            console.log(success, failed)
        }
    }catch(error){
        console.dir(error)
    }
}


export default function* girisSaga(){
    yield all([
        takeEvery("GIRIS", girisFlow)
    ]);
}
