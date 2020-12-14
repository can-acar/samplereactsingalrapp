//@flow
import * as signalR from "@microsoft/signalr";
import {HubConnection} from "@microsoft/signalr";
import {END, eventChannel} from 'redux-saga'
import {all, call,cancel, put, fork,race, take, takeEvery} from "redux-saga/effects";
import withQuery from "with-query";


function socket(url: string, payload: { clientId: string, access_token: string, channel: string }) {

    return new Promise((resolve, reject) => {
        const hub = new signalR.HubConnectionBuilder();
        const connection = hub
            .withUrl(withQuery(url, {channel: payload.channel, access_token: payload.access_token, userId: payload.clientId}), {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
            })
            .withHubProtocol(new signalR.JsonHubProtocol())
            .withAutomaticReconnect()
            //.configureLogging(signalR.LogLevel.Debug)
            .build();

        connection.start()
                  .then(() => {
                      //connection.invoke('ValidateConnection', {userId: payload.clientId, access_token: payload.access_token}).then(r => r)
                      resolve(connection);
                  }).catch(err => {
            console.error('SignalR Connection Error: ', err)
            reject(err)
        });

    });


}

function createChannel(connection: HubConnection, channel: string) {

    return eventChannel(emit => {

        connection.on(channel, data => {

            if (data) {

                const {type, payload} = data;

                emit({type, payload})

            }
        });

        connection.onclose = () => {
            console.info("Connection Closed!.");

            emit({type: 'DISCONNECTED'});

            emit(END)
        };


        return () => {
            connection.off(channel, data => {

                console.info("Connection Closed!.");
                emit({type: 'DISCONNECTED'});
                emit(END)
            });
        }
    });


}


function* hubFlow({payload}: { channel: string, clientId: string, access_token: string, url: string }) {

    let connection = yield call(socket, payload.url, payload);
    let channel = yield call(createChannel, connection, payload.channel);

        while(true){



            const {hub,invoke, cancel} = yield race({
                hub: call(watchHub, channel),
                invoke:take(["INVOKE"]),
                task: take([ "LOGOUT", "USER_CONNECT_DETECTED", "SESSION_TIME_OUT"])
            })

            if(invoke){
                connection.invoke(invoke.payload.method, invoke.payload).then(r => r)
            }

            if(cancel){
                connection.stop();

            }
        }

}

function* watchHub(eventChannel) {


    while (true) {

        const action = yield take(eventChannel);

        yield put(action);

    }

}

export function* signalRsaga() {

    yield all([takeEvery('CONNECT', hubFlow)]);
}
