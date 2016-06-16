import React from 'react';
import {Link} from 'react-router';
import ProfileRaidWeeksStore from '../stores/ProfileRaidWeeksStore';
import ProfileRaidWeeksActions from '../actions/ProfileRaidWeeksActions';
import NavbarStore from '../stores/NavbarStore';
import ProfileSideNav from './ProfileSidenav';
import moment from 'moment';
var _ = require('underscore');

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
        var user_availabilityRow;
        var user_availability = _.findWhere(this.state.user_availability, { raid_week_id: raidweek.id });
        if(user_availability) {
          user_availabilityRow = (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><input type='checkbox' checked={user_availability.wednesday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'wednesday')} /></td>
              <td><input type='checkbox' checked={user_availability.thursday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'thursday')} /></td>
              <td><input type='checkbox' checked={user_availability.friday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'friday')} /></td>
              <td><input type='checkbox' checked={user_availability.saturday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'saturday')} /></td>
              <td><input type='checkbox' checked={user_availability.sunday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'sunday')} /></td>
              <td><input type='checkbox' checked={user_availability.monday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'monday')} /></td>
              <td><input type='checkbox' checked={user_availability.tuesday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'tuesday')} /></td>
              <td>
                <button className='btn btn-primary' onClick={ProfileRaidWeeksActions.saveUserAvailability(_.findWhere(this.state.user_availability, { raid_week_id: raidweek.id }))}>Save</button>
              </td>
            </tr>
          );
        } else {
          user_availabilityRow = (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button className='btn btn-primary' onClick={ProfileRaidWeeksActions.createUserAvailability(raidweek)}>Create</button>
              </td>
            </tr>
          );
        }
        return (
          <div className='row'>
            <table className='table'>
              <tbody>
                <tr>
                  <td><strong>Start</strong></td>
                  <td><strong>End</strong></td>
                  <td><strong>Week No.</strong></td>
                  <td><strong>W</strong></td>
                  <td><strong>T</strong></td>
                  <td><strong>F</strong></td>
                  <td><strong>S</strong></td>
                  <td><strong>S</strong></td>
                  <td><strong>M</strong></td>
                  <td><strong>T</strong></td>
                </tr>
                <tr>
                  <td>{moment(raidweek.start).format('DD[/]MM[/]YYYY')}</td>
                  <td>{moment(raidweek.end).format('DD[/]MM[/]YYYY')}</td>
                  <td>{moment(raidweek.start).format('W')}</td>
                  <td><input type='checkbox' checked={raidweek.wednesday} disabled='disabled'/></td>
                  <td><input type='checkbox' checked={raidweek.thursday} disabled='disabled'/></td>
                  <td><input type='checkbox' checked={raidweek.friday} disabled='disabled'/></td>
                  <td><input type='checkbox' checked={raidweek.saturday} disabled='disabled'/></td>
                  <td><input type='checkbox' checked={raidweek.sunday} disabled='disabled'/></td>
                  <td><input type='checkbox' checked={raidweek.monday} disabled='disabled'/></td>
                  <td><input type='checkbox' checked={raidweek.tuesday} disabled='disabled'/></td>
                </tr>
                {user_availabilityRow}
              </tbody>
            </table>
          </div>
        );
      }, this);
    }

    return (
      <div id='wrapper'>
      <ProfileSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            {raidweeklist}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileRaidWeeks;
