//@flow
import {all, fork} from "redux-saga/effects";
import chatSaga from "./sagas/chat.saga";
import girisSaga from "./sagas/giris.saga";
import {signalRsaga} from "./signalr.saga";

export default function* rootSaga(getState){
    yield all([
        signalRsaga(),
        chatSaga(),
        girisSaga()
    ]);
}
