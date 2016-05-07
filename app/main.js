import React from 'react';
//var Router = require('react-router').Router
import { Router, browserHistory } from 'react-router'
import ReactDOM from 'react-dom';
//import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

//let history = createBrowserHistory();

ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app'));
