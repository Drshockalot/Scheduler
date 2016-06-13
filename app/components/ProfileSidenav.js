import React from 'react';
import {Link} from 'react-router';

class ProfileSidenav extends React.Component {
  render() {
    return (
      <div id='sidebar-wrapper'>
        <ul className='sidebar-nav'>
          <li><Link to='/profile'><strong>Profile</strong></Link></li>
          <li><Link to='/profile/character'>Characters</Link></li>
          <li><Link to='/profile/schedule'>Schedules</Link></li>
          <li><Link to='/profile/roster'>Rosters</Link></li>
          <li><Link to='/profile/raidweek'>Raid Weeks</Link></li>
        </ul>
      </div>
    );
  }
}

export default ProfileSidenav;
