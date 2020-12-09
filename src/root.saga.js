//@flow
import {all, fork} from "redux-saga/effects";
import {signalRsaga} from "./signalr.saga";

export default function* rootSaga(getState){
    yield all([
        signalRsaga
    ]);
}
