//@flow
import {all, call, put, takeEvery, race, take, select, cancelled} from "redux-saga/effects";

function store(payload){
    localStorage.setItem("chat", JSON.stringify(payload));
}

function* chatFlow({payload}){

    try{

    }catch(error){
        console.dir(error)
    }
}


function* watchUserConnection(){
    while(true){


        try{
            const task = yield take(["USER_CONNECTED", "USER_DISCONNECTED"])

            const clientId = yield select(select => select.chat.clientId)

            if(task.type === "USER_CONNECTED"){

                console.log("USER_CONNECTED");

                yield put({
                    type: "INVOKE",
                    payload: {
                        method: "getUserList",
                        clientId: clientId,
                    }
                })
            }

            if(task.type === "USER_DISCONNECTED"){
                console.log("USER_DISCONNECTED");
            }


        }catch(error){
            yield put({type: "ERROR", payload: error})
        }finally{

        }
    }
}

function* logout({payload}){
    console.log(payload)
    localStorage.clear();
}

export default function* chatSaga(){
    yield all([
        takeEvery("CONNECTED", chatFlow),
        takeEvery("LOGOUT", logout),
        watchUserConnection()
    ]);
}
