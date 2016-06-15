import React from 'react';
import {Link} from 'react-router';
import ProfileRaidWeeksStore from '../stores/ProfileRaidWeeksStore';
import ProfileRaidWeeksActions from '../actions/ProfileRaidWeeksActions';
import NavbarStore from '../stores/NavbarStore';
import ProfileSideNav from './ProfileSidenav';

class ProfileRaidWeeks extends React.Component {
  constructor(props) {
    super(props);
    this.state = ProfileRaidWeeksStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ProfileRaidWeeksStore.listen(this.onChange);
    ProfileRaidWeeksActions.getAllRaidWeekInfo();
  }

  componentWillUnmount() {
    ProfileRaidWeeksStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var raidweeklist;
    if(this.state.raidweeks.length > 0) {
      raidweeklist = this.state.raidweeks.map(function(raidweek, index) {

      }, this);
    }

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

export default ProfileRaidWeeks;
