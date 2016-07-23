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
              <td className='col-xs-1'></td>
              <td className='col-xs-1'></td>
              <td className='col-xs-1'></td>
              <td className='col-xs-1'><input type='checkbox' disabled={raidweek.wednesday} checked={user_availability.wednesday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'wednesday')} /></td>
              <td className='col-xs-1'><input type='checkbox' disabled={raidweek.thursday} checked={user_availability.thursday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'thursday')} /></td>
              <td className='col-xs-1'><input type='checkbox' disabled={raidweek.friday} checked={user_availability.friday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'friday')} /></td>
              <td className='col-xs-1'><input type='checkbox' disabled={raidweek.saturday} checked={user_availability.saturday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'saturday')} /></td>
              <td className='col-xs-1'><input type='checkbox' disabled={raidweek.sunday} checked={user_availability.sunday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'sunday')} /></td>
              <td className='col-xs-1'><input type='checkbox' disabled={raidweek.monday} checked={user_availability.monday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'monday')} /></td>
              <td className='col-xs-1'><input type='checkbox' disabled={raidweek.tuesday} checked={user_availability.tuesday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'tuesday')} /></td>
              <td className='col-xs-2'>
                <button className='btn btn-primary' onClick={() => ProfileRaidWeeksActions.saveUserAvailability(_.findWhere(this.state.user_availability, { raid_week_id: raidweek.id }))}>Save</button>
              </td>
            </tr>
          );
        } else {
          user_availabilityRow = (
            <tr>
              <td className='col-xs-1'></td>
              <td className='col-xs-1'></td>
              <td className='col-xs-1'></td>
              <td className='col-xs-1'></td>
              <td className='col-xs-1'></td>
              <td className='col-xs-1'></td>
              <td className='col-xs-1'></td>
              <td className='col-xs-1'></td>
              <td className='col-xs-1'></td>
              <td className='col-xs-1'></td>
              <td className='col-xs-2'>
                <button className='btn btn-primary' onClick={() => ProfileRaidWeeksActions.createUserAvailability(raidweek)}>Create</button>
              </td>
            </tr>
          );
        }
        return (
          <div className='row'>
            <table className='table'>
              <tbody>
                <tr>
                  <td className='col-xs-1'><strong>Start</strong></td>
                  <td className='col-xs-1'><strong>End</strong></td>
                  <td className='col-xs-1'><strong>Week No.</strong></td>
                  <td className='col-xs-1'><strong>W</strong></td>
                  <td className='col-xs-1'><strong>T</strong></td>
                  <td className='col-xs-1'><strong>F</strong></td>
                  <td className='col-xs-1'><strong>S</strong></td>
                  <td className='col-xs-1'><strong>S</strong></td>
                  <td className='col-xs-1'><strong>M</strong></td>
                  <td className='col-xs-1'><strong>T</strong></td>
                </tr>
                <tr>
                  <td className='col-xs-1'>{moment(raidweek.start).format('DD[/]MM[/]YYYY')}</td>
                  <td className='col-xs-1'>{moment(raidweek.end).format('DD[/]MM[/]YYYY')}</td>
                  <td className='col-xs-1'>{moment(raidweek.start).format('W')}</td>
                  <td className='col-xs-1'><input type='checkbox' checked={raidweek.wednesday} disabled='disabled'/></td>
                  <td className='col-xs-1'><input type='checkbox' checked={raidweek.thursday} disabled='disabled'/></td>
                  <td className='col-xs-1'><input type='checkbox' checked={raidweek.friday} disabled='disabled'/></td>
                  <td className='col-xs-1'><input type='checkbox' checked={raidweek.saturday} disabled='disabled'/></td>
                  <td className='col-xs-1'><input type='checkbox' checked={raidweek.sunday} disabled='disabled'/></td>
                  <td className='col-xs-1'><input type='checkbox' checked={raidweek.monday} disabled='disabled'/></td>
                  <td className='col-xs-1'><input type='checkbox' checked={raidweek.tuesday} disabled='disabled'/></td>
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
            <h3>Raid Week Availability</h3>
            {raidweeklist}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileRaidWeeks;
