import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import ReactDOM from 'react-dom';



import reportWebVitals from './reportWebVitals';
import {fab} from "@fortawesome/free-brands-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import  {library} from "@fortawesome/fontawesome-svg-core";
import App from './App';
import './assets/index.css';

library.add(fab, fas, far)



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
