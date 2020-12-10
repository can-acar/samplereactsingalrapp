//@flow
import {applyMiddleware, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import {routerMiddleware} from "connected-react-router";
import {createRootReducer} from "./store/index";
import {createLogger} from "redux-logger";
import rootSaga from "./root.saga";
import {history} from "./history/index";




const defaultConfig = {
    level: "debug", // logging level
    verbose: true, // verbose mode
    color: "#03A9F4", // default color
    rootSagaStart: true, // show root saga start effect
    effectTrigger: true, // show triggered effects
    effectResolve: true, // show resolved effects
    effectReject: true, // show rejected effects
    effectCancel: true, // show cancelled effects
    actionDispatch: true // show dispatched actions
};

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware(options => {

    return options;
});

const bindMiddleware = (middleware = []) => {
    if (process.env.NODE_ENV === 'development') {
        return composeWithDevTools(applyMiddleware(...middleware.concat(loggerMiddleware)))
    }

    return compose(applyMiddleware(...middleware));

};


const configureStore = (initialState) => {

    const routeMiddleware = routerMiddleware(history);

    const store = createStore(createRootReducer(initialState), initialState, bindMiddleware([routeMiddleware, sagaMiddleware]));


    store.runSagaTask = () => {
        store.sagaTask = sagaMiddleware.run(rootSaga, store.getState);
    };

    store.asyncReducers = {};
    store.reducerCounters = {};

    store.injectReducer = (key, reducer) => {

        if (store.asyncReducers.hasOwnProperty(key) && store.asyncReducers[key] === reducer) {
            return;
        }

        store.asyncReducers[key] = reducer;

        store.reducerCounters[key] = (store.reducerCounters[key] || 0) + 1;

        store.replaceReducer(createRootReducer(store.asyncReducers));

        return store;

    };

    store.removeReducer = (key) => {


        if (key in store.reducerCounters) {

            if (--store.reducerCounters[key] === 0) {

                delete store.reducerCounters[key];
                delete store.asyncReducers[key];

                store.replaceReducer(createRootReducer(store.asyncReducers));
                console.log('%c %s cleared', 'background: #222; color: #bada55', key);
            }


        }


        return store;
    };

    store.runSagaTask();

    return store;
};


export {configureStore};
