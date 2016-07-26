import React from 'react';
import {Link} from 'react-router';
import DeleteAttendanceStore from '../../stores/admin/DeleteAttendanceStore';
import DeleteAttendanceActions from '../../actions/admin/DeleteAttendanceActions';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

import _ from 'underscore';
import moment from 'moment';

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
          return (
            <tr>
              <td className='col-xs-2 vert-align text-center'>{moment(row.raid_week.start).format('W')}</td>
              <td className='col-xs-2 vert-align text-center'>{this.capitalize(row.week_day)}</td>
              <td className='col-xs-2 vert-align text-center'>{row.user.battletag}</td>
            </tr>
          );
        });

        return (
          <div className='row'>
            <div className='row'>
              <h3>{raidRows[0].name}</h3>
            </div>
            <div className='row'>
              <table className='table'>
                <tbody>
                <tr>
                  <td className='col-xs-2'><strong>Raid Week</strong></td>
                  <td className='col-xs-2'><strong>Weekday</strong></td>
                  <td className='col-xs-2'><strong>User</strong></td>
                </tr>
                  {recordRows}
                </tbody>
              </table>
            </div>
          </div>
        );
      });
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
