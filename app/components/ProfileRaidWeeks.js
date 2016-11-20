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
    // if(sessionStorage.profileRaidweeks)
    //   ProfileRaidWeeksActions.restoreState(JSON.parse(sessionStorage.profileRaidweeks));
    // if($.ajax({method: 'GET', url: '/auth/role'}).then((data) => {
    //   if(data.role && data.role != '') {
        ProfileRaidWeeksActions.getAllRaidWeekInfo();
    //   }
    // }));
  }

  componentWillUnmount() {
    ProfileRaidWeeksStore.unlisten(this.onChange);
    // sessionStorage.profileRaidweeks = JSON.stringify(this.state);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var raidweeklist;
    if(this.state.raidweeks.length > 0) {
      raidweeklist = _.sortBy(this.state.raidweeks, 'start').map(function(raidweek, index) {
        var user_availabilityRow;
        var user_availability = _.findWhere(this.state.user_availability, { raid_week_id: raidweek.id });
        if(moment(raidweek.end).isBefore(moment()))
          return null;
        var noteHeader;
        if(user_availability) {
          noteHeader = <td className='col-xs-3'><strong>Note ({user_availability.user_note.length}/500)</strong></td>;
          user_availabilityRow = (
            <tr key={raidweek.id}>
              <td className='col-xs-2'>Your availability:</td>
              <td><input type='checkbox' disabled={!raidweek.wednesday} checked={user_availability.wednesday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'wednesday')} /></td>
              <td><input type='checkbox' disabled={!raidweek.thursday} checked={user_availability.thursday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'thursday')} /></td>
              <td><input type='checkbox' disabled={!raidweek.friday} checked={user_availability.friday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'friday')} /></td>
              <td><input type='checkbox' disabled={!raidweek.saturday} checked={user_availability.saturday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'saturday')} /></td>
              <td><input type='checkbox' disabled={!raidweek.sunday} checked={user_availability.sunday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'sunday')} /></td>
              <td><input type='checkbox' disabled={!raidweek.monday} checked={user_availability.monday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'monday')} /></td>
              <td><input type='checkbox' disabled={!raidweek.tuesday} checked={user_availability.tuesday} onChange={() => ProfileRaidWeeksActions.toggleUserAvailabilityDay(user_availability.id, 'tuesday')} /></td>
              <td className='col-xs-3'><textarea maxLength="500" style={{'minHeight': 200 + 'px'}} value={user_availability.user_note} onChange={e => ProfileRaidWeeksActions.updateUserAvailabilityNote(user_availability.id, e.target.value)} /></td>
              <td className='col-xs-1'>
                <button className='btn btn-success' onClick={() => ProfileRaidWeeksActions.saveUserAvailability(_.findWhere(this.state.user_availability, { raid_week_id: raidweek.id }))}>Save</button>
              </td>
            </tr>
          );
        } else {
          noteHeader = noteHeader = <td className='col-xs-3'><strong>Note</strong></td>;
          user_availabilityRow = (
            <tr key={raidweek.id}>
              <td className='col-xs-2'>Your availability:</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className='col-xs-3'></td>
              <td className='col-xs-1'>
                <button className='btn btn-primary' onClick={() => ProfileRaidWeeksActions.createUserAvailability(raidweek)}>Create</button>
              </td>
            </tr>
          );
        }
        return (
          <div key={raidweek.id} className='row'>
            <div className='col-xs-12'>
              <h3>{moment(raidweek.start).format('DD[/]MM[/]YYYY')} - {moment(raidweek.end).format('DD[/]MM[/]YYYY')} ({moment(raidweek.start).format('W')})</h3>
              <table className='table'>
                <tbody>
                  <tr>
                    <td className='col-xs-2'></td>
                    <td><strong>W</strong></td>
                    <td><strong>T</strong></td>
                    <td><strong>F</strong></td>
                    <td><strong>S</strong></td>
                    <td><strong>S</strong></td>
                    <td><strong>M</strong></td>
                    <td><strong>T</strong></td>
                    {noteHeader}
                    <td className='col-xs-1'></td>
                  </tr>
                  <tr>
                    <td className='col-xs-2'>Raiding Days:</td>
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
