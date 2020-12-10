//@flow
import * as React from "react";
import {Component, useEffect} from "react";
import {ReactReduxContext, useSelector, useStore} from "react-redux";
import hoistNonReactStatic from "hoist-non-react-statics";

type select = {
    key: string,
    reducer: Function,
    isDelete?: boolean
};

export default ({key, reducer, isDelete = true}: select): Object => WrappedComponent => {

    class ReducerInjector extends Component<{}> {
        static WrappedComponent = WrappedComponent;
        static contextType = ReactReduxContext;

        constructor(props, context) {
            super(props, context);

            if (!context.store.asyncReducers.hasOwnProperty(key)) {
                context.store.injectReducer(key, reducer);
            }
        }

        componentWillUnmount() {
            const {context} = this;

            if (isDelete)
                context.store.removeReducer(key);

        }

        render() {

            return <WrappedComponent {...this.props}/>
        }
    }

    return hoistNonReactStatic(ReducerInjector, WrappedComponent);
};


export const useReducer = ({key, reducer, isDelete = true}: select) => {

    const store = useStore();

    if (!store.asyncReducers.hasOwnProperty(key)) {
        store.injectReducer(key, reducer);
    }

    useEffect(() => {

        if (!store.asyncReducers.hasOwnProperty(key)) {
            store.injectReducer(key, reducer);
        }

        return () => {
            if (isDelete)
                store.removeReducer(key);
        }
    }, [store, key, isDelete]);

    return useSelector((state) => state[key]);

}
