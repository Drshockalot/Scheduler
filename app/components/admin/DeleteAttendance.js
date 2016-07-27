import React from 'react';
import {Link} from 'react-router';
import DeleteAttendanceStore from '../../stores/admin/DeleteAttendanceStore';
import DeleteAttendanceActions from '../../actions/admin/DeleteAttendanceActions';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

import _ from 'underscore';
import moment from 'moment';
import { OverlayTrigger, Popover } from 'react-bootstrap';

class DeleteAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = DeleteAttendanceStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    DeleteAttendanceStore.listen(this.onChange);
    if(sessionStorage.deleteAttendance)
      DeleteAttendanceActions.restoreState(JSON.parse(sessionStorage.deleteAttendance));
    DeleteAttendanceActions.loadComponentData();
  }

  componentWillUnmount() {
    DeleteAttendanceStore.unlisten(this.onChange);
    sessionStorage.deleteAttendance = JSON.stringify(this.state);
  }

  onChange(state) {
    this.setState(state);
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    if(typeof(Storage) === 'undefined' || (sessionStorage.role != 'admin' || NavbarStore.getState().userRole != 'admin')) {
      return null;
    }

    var attendanceRecordTables = null;
    if(this.state.attendanceRecords.length > 0) {
      var groupedAttendanceRecords = _.groupBy(this.state.attendanceRecords, 'raid_id');
      var groupedAttendanceRecordsArray = [];
      for (var key in groupedAttendanceRecords) {
        groupedAttendanceRecordsArray.push(groupedAttendanceRecords[key]);
      }

      attendanceRecordTables = groupedAttendanceRecordsArray.map(function(raidRows) {
        var recordRows = raidRows.map(function(row) {
          var characterRows = row.user.characters.map(function(character) {
            return (
              <div className='clearfix hand-cursor'>{character.name}<strong></strong></div>
            );
          });

          var popover = (
            <Popover id={row.user.id} title='Characters'>
              {characterRows}
            </Popover>
          );

          var trigger = (
            <OverlayTrigger placement='right' trigger='click' rootClose overlay={popover}>
              <strong className='hand-cursor'>{row.user.battletag}    &#10095;</strong>
            </OverlayTrigger>
          );

          return (
            <tr>
              <td className='col-xs-2 vert-align text-center'>{moment(row.raid_week.start).format('W')}</td>
              <td className='col-xs-2 vert-align text-center'>{this.capitalize(row.week_day)}</td>
              <td className='col-xs-5 vert-align text-center'>{trigger}</td>
              <td className='col-xs-3 vert-align text-center'><button className='btn btn-danger'>Delete</button></td>
            </tr>
          );
        }, this);

        return (
          <div className='row'>
            <div className='col-xs-10'>
              <h3>{raidRows[0].raid.name}</h3>
              <table className='table'>
                <tbody>
                <tr>
                  <td className='col-xs-2 text-center'><strong>Raid Week</strong></td>
                  <td className='col-xs-2 text-center'><strong>Weekday</strong></td>
                  <td className='col-xs-5 text-center'><strong>User</strong></td>
                  <td className='col-xs-3 text-center'></td>
                </tr>
                  {recordRows}
                </tbody>
              </table>
            </div>
          </div>
        );
      }, this);
    }

    return (
      <div className='row'>
        <div className='row'>

        </div>
        {attendanceRecordTables}
      </div>
    );
  }
}

export default DeleteAttendance;
