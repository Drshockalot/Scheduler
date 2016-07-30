import React from 'react';
import {Link} from 'react-router';
import ViewAttendanceStore from '../../stores/admin/ViewAttendanceStore';
import ViewAttendanceActions from '../../actions/admin/ViewAttendanceActions';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

import _ from 'underscore';
import { OverlayTrigger, Popover } from 'react-bootstrap';

class ViewAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = ViewAttendanceStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ViewAttendanceStore.listen(this.onChange);
    if(sessionStorage.viewAttendance)
      ViewAttendanceActions.restoreState(JSON.parse(sessionStorage.viewAttendance));
    ViewAttendanceActions.loadComponentData();
  }

  componentWillUnmount() {
    ViewAttendanceStore.unlisten(this.onChange);
    sessionStorage.viewAttendance = JSON.stringify(this.state);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    if(typeof(Storage) === 'undefined' || (sessionStorage.role != 'admin' || NavbarStore.getState().userRole != 'admin')) {
      return null;
    }

    var selectRaidOptions, selectRosterOptions, userAttendanceRows;

    if(this.state.raids.length > 0) {
      selectRaidOptions = this.state.raids.map(function(raid) {
        return (
          <option key={raid.id} value={raid.id}>{raid.name}</option>
        );
      });
    }

    if(this.state.rosters.length > 0) {
      selectRosterOptions = this.state.rosters.map(function(roster) {
        return (
          <option key={roster.id} value={roster.id}>{roster.name}</option>
        );
      });
    }

    if(this.state.attendanceRecords.length > 0 && this.state.attendanceCount.length > 0) {
      var selectedRaid = _.findWhere(this.state.raids, {id: Number(this.state.selectRaid)});
      var selectedRoster = _.findWhere(this.state.rosters, {id: Number(this.state.selectRoster)});
      var totalCount = _.where(this.state.attendanceCount, {raid_id: Number(this.state.selectRaid), roster_id: Number(this.state.selectRoster)}).length;

      var loggedUsers = [];
      for(var i = 0; i < selectedRoster.characters.length; ++i) {
        if(!_.findWhere(loggedUsers, {id: selectedRoster.characters[i].user.id})) {
          loggedUsers.push(selectedRoster.characters[i].user);
        }
      }

      userAttendanceRows = loggedUsers.map(function(user) {
        var userCharacters = user.characters;
        var userAttendanceCount = _.where(this.state.attendanceRecords, {user_id: Number(user.id), raid_id: Number(this.state.selectRaid), roster_id: Number(this.state.selectRoster)}).length;
        var attendancePercentage = (userAttendanceCount / totalCount) * 100;

        var characterRows = userCharacters.map(function(character) {
          return (
            <div className='clearfix hand-cursor'>{character.name}<strong></strong></div>
          );
        });

        var popover = (
          <Popover id={user.id} title='Characters'>
            {characterRows}
          </Popover>
        );

        var trigger = (
          <OverlayTrigger placement='right' trigger='click' rootClose overlay={popover}>
            <span className='hand-cursor'>{user.battletag}&nbsp;&nbsp;&nbsp;&nbsp;&#10095;</span>
          </OverlayTrigger>
        );

        return (
          <tr sortOrder={isNaN(attendancePercentage) ? 0 : attendancePercentage}>
            <td className='col-xs-3 text-center vert-align'>{selectedRaid.name}</td>
            <td className='col-xs-3 text-center vert-align'>{selectedRoster.name}</td>
            <td className='col-xs-3 text-center vert-align'>{trigger}</td>
            <td className='col-xs-3 text-center vert-align'>{isNaN(attendancePercentage) ? 0 : attendancePercentage.toFixed(2)}&nbsp;%</td>
          </tr>
        );
      }, this);
    }

    return (
      <div className='row'>
        <div className='row'>
          <div className='col-xs-12'>
            <h2>View Attendance</h2>
            <div className='form-horizontal'>
              <div className='form-group'>
                <label className='col-sm-1 control-label'>Raid:</label>
                <div className='col-sm-5'>
                  <select className='form-control' value={this.state.selectRaid} onChange={e => ViewAttendanceActions.updateSelectRaid(parseInt(e.target.value))}>
                    {selectRaidOptions}
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-1 control-label'>Roster:</label>
                <div className='col-sm-5'>
                  <select className='form-control' value={this.state.selectRoster} onChange={e => ViewAttendanceActions.updateSelectRoster(parseInt(e.target.value))}>
                    {selectRosterOptions}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-10'>
            <table className='table'>
              <tbody>
                <tr>
                  <td className='col-xs-3 text-center'><strong>Raid</strong></td>
                  <td className='col-xs-3 text-center'><strong>Roster</strong></td>
                  <td className='col-xs-3 text-center'><strong>User</strong></td>
                  <td className='col-xs-3 text-center'><strong>Attendance</strong></td>
                </tr>
                {_.sortBy(userAttendanceRows, function(row) {return row.props.sortOrder;}).reverse()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewAttendance;
