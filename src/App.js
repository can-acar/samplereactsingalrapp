//@flow

import * as React from "react";
import  { lazy, Suspense} from "react";
import {Provider, ReactReduxContext} from "react-redux";
import {configureStore} from "./configureStore";
import {ConnectedRouter} from "connected-react-router";
import {Redirect, Route, Switch} from "react-router-dom";
import {library} from "@fortawesome/fontawesome-svg-core";
import {history} from "./history/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {fas, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";

import {Giris} from "./containers/giris.container";
import {Chat} from "./containers/chat.container";

import "bootstrap/dist/css/bootstrap.css"



library.add(fab, fas, far)

window.initialReduxState = {};
const initialState = window.initialReduxState;
const store = configureStore(initialState);

const fallBack = () => <FontAwesomeIcon icon={faSpinner} spin={true}/> ;

function App() {
  return (<Provider store={store} context={ReactReduxContext}>
              <ConnectedRouter history={history} context={ReactReduxContext}>
                <Suspense fallback={fallBack()}>
                  <Switch>
                      <Route exact path="/" key="main" component={Giris}/>
                      <Route exact path="/" key="main" component={Chat}/>
                  </Switch>
                </Suspense>
              </ConnectedRouter>
          </Provider> );
}

export default App;
