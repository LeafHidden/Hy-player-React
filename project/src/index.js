import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import http from './Network/core';
import store from 'store'
import PubSub from 'pubsub-js';
window.PubSub=PubSub
window.$http=http
window.store=store
ReactDOM.render(


        <BrowserRouter>
        <App/>
        </BrowserRouter>
,
document.getElementById('root')
);


