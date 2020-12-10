//@flow
import {all, call, put, takeEvery, race, take, select} from "redux-saga/effects";

function store(payload) {
    localStorage.setItem("chat", JSON.stringify(payload));
}

function *chatFlow({payload}){

    try{

    }catch(error){
        console.dir(error)
    }
}

export default function* chatSaga() {
    yield all([
        takeEvery("CONNECTED",chatFlow)
    ]);
}
