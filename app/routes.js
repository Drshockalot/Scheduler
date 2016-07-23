import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';

import Admin from './components/admin/Admin';
import RosterManagement from './components/admin/RosterManagement';
import CharacterManagement from './components/admin/CharacterManagement';
import ScheduleManagement from './components/admin/ScheduleManagement';
import RaidWeekManagement from './components/admin/RaidWeekManagement';
import RaidManagement from './components/admin/RaidManagement';
import AttendanceManagement from './components/admin/AttendanceManagement';

import Profile from './components/Profile';
import ProfileCharacters from './components/ProfileCharacters';
import ProfileRaidWeeks from './components/ProfileRaidWeeks';
import ProfileRosters from './components/ProfileRosters';

import ScheduleView from './components/ScheduleView';

import NavbarStore from './stores/NavbarStore';
var auth = function(nextState, replace) {
  var role = NavbarStore.getState().userRole;
  if(role === '') {
    replace({
      pathname: '/?somesneakyguy=1',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

var adminAuth = function(nextState, replace) {
  var role = NavbarStore.getState().userRole;
  if(role != 'admin') {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
    toastr.error('You do not have authorization to access this page', 'YOU SHALL NOT PASS!!');
  }
};

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/profile' component={Profile} onEnter={auth}/>
    <Route path='/profile/character' component={ProfileCharacters} onEnter={auth}/>
    <Route path='/profile/raidweek' component={ProfileRaidWeeks} onEnter={auth}/>
    <Route path='/profile/roster' component={ProfileRosters} onEnter={auth}/>
    <Route path='/admin' component={Admin} onEnter={adminAuth} />
    <Route path='/admin/roster' component={RosterManagement} onEnter={adminAuth}/>
    <Route path='/admin/character' component={CharacterManagement} onEnter={adminAuth}/>
    <Route path='/admin/schedule' component={ScheduleManagement} onEnter={adminAuth}/>
    <Route path='/admin/raidweek' component={RaidWeekManagement} onEnter={adminAuth}/>
    <Route path='/admin/raid' component={RaidManagement} onEnter={adminAuth}/>
    <Route path='/admin/attendance' component={AttendanceManagement} onEnter={adminAuth}/>
    <Route path='/schedule' component={ScheduleView} onEnter={auth}/>
  </Route>
);
