import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Admin from './components/admin/Admin';
import RosterManagement from './components/admin/RosterManagement';
import Profile from './components/Profile';
import CharacterManagement from './components/admin/CharacterManagement';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/profile' component={Profile} />
    <Route path='/admin' component={Admin} />
    <Route path='/admin/roster' component={RosterManagement} />
    <Route path='/admin/character' component={CharacterManagement} />
  </Route>
);
