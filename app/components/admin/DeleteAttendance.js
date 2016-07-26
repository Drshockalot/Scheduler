import React from 'react';
import {Link} from 'react-router';
import DeleteAttendanceStore from '../../stores/admin/DeleteAttendanceStore';
import DeleteAttendanceActions from '../../actions/admin/DeleteAttendanceActions';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

import _ from 'underscore';

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

  render() {
    if(typeof(Storage) === 'undefined' || (sessionStorage.role != 'admin' || NavbarStore.getState().userRole != 'admin')) {
      return null;
    }

    var attendanceRecordRows;
    var groupedAttendanceRecords = _.groupBy(this.state.attendanceRecords, 'raid.name');
    // if(this.state.attendanceRecords.length > 0) {
    //   attendanceRecordRows = this.state.attendanceRecords
    // }

    return (
      <div className='row'>

      </div>
    );
  }
}

export default DeleteAttendance;
