import React from 'react';
import {Link} from 'react-router';
import ProfileStore from '../stores/ProfileStore';
import ProfileActions from '../actions/ProfileActions';
import NavbarStore from '../stores/NavbarStore';
import ProfileSideNav from './ProfileSidenav';

class Profile extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = ProfileStore.getState();
    this.onChange = this.onChange.bind(this);
    this.redirect = false;
  }

  componentWillMount() {
    if(localStorage.role == '') {

    }
  }

  componentDidMount() {
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
