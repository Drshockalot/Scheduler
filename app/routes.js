import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Admin from './components/admin/Admin';
import RosterManagement from './components/admin/RosterManagement';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/admin' component={Admin} />
    <Route path='/admin/roster' component={RosterManagement} />
  </Route>
);
