import React from 'react';
import {Link} from 'react-router';
import ProfileSchedulesStore from '../stores/ProfileSchedulesStore';
import ProfileSchedulesActions from '../actions/ProfileSchedulesActions';
import NavbarStore from '../stores/NavbarStore';
import ProfileSideNav from './ProfileSidenav';

class ProfileSchedules extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = ProfileSchedulesStore.getState();
    this.onChange = this.onChange.bind(this);
    this.redirect = false;
  }

  componentDidMount() {
    ProfileSchedulesStore.listen(this.onChange);
    if(sessionStorage.profileSchedules)
      ProfileSchedulesActions.restoreState(JSON.parse(sessionStorage.profileSchedules));
    ProfileSchedulesActions.loadComponentData();
  }

  componentWillUnmount() {
    ProfileSchedulesStore.unlisten(this.onChange);
    sessionStorage.profileSchedules = JSON.stringify(this.state);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    if(typeof(Storage) === 'undefined' || (sessionStorage.role === '' || NavbarStore.getState().userRole === ''))
      return null;

    return (
      <div id='wrapper'>
      <ProfileSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileSchedules;
