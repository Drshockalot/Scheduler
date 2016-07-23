import React from 'react';
import {Link} from 'react-router';
import ProfileStore from '../stores/ProfileStore';
import ProfileActions from '../actions/ProfileActions';
import NavbarStore from '../stores/NavbarStore';
import ProfileSideNav from './ProfileSidenav';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = ProfileStore.getState();
    this.onChange = this.onChange.bind(this);
    this.redirect = false;
  }

  componentWillMount() {
    if (NavbarStore.getState().userRole === '' || NavbarStore.getState().userRole === '') {
      if (typeof browserHistory != 'undefined') {
        browserHistory.push('/');
        toastr.error('Please log in to access this page', 'YOU SHALL NOT PASS!!');
      } else {
        this.redirect = true;
        toastr.warning('Please do not refresh the browser manually yet, the ability to do this will be added in the near future', 'Sad face');
      }
    }
  }

  componentDidMount() {
    browserHistory.push('/');
    ProfileStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
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

export default Profile;
