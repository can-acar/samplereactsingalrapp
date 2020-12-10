//@flow
import {all, call, put, takeEvery, race, take, select} from "redux-saga/effects";

function * giris(payload){
  while(true){
      try{

        const data={
            url:["https://localhost:5001","chat"].join("/"),
            channel:"chat",
            clientId:payload.clientId,
            access_token: "e0dc9205-e437-4512-99fc-f1b7a340adab"
          }


          yield all([
              put({type:"USER_LOGIN_REQUEST",payload}),

              put({type:"CONNECT",payload:data})
          ])


          const task=yield take(["CONNECTED"])

          console.log(task);

          yield put({type:"USER_LOGIN_SUCCESS",payload:{
                  userId:"7f55526f-c287-4cb7-82cc-6aaeda1002b7",
                  ...payload,
              }})

          return true
      }catch(error){
          yield put({type: "USER_LOGIN_FAILED", payload: error})
          return false
      }
  }
}

function *girisFlow({payload}){
    try{
        console.log(payload)

        const[success,failed]=yield race([
            call(giris,payload),
            take(["DISCONNECT","USER_LOGIN_FAILED"])
        ])
        /// store clientId and name
        /// redirect to chat pannel

        console.log(success,failed)

    }catch(error){
        console.dir(error)
    }
}


export default function* girisSaga() {
    yield all([
        takeEvery("GIRIS",girisFlow)
    ]);
}
