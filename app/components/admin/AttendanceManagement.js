import React from 'react';
import {Link} from 'react-router';
import AttendanceManagementStore from '../../stores/admin/AttendanceManagementStore';
import AttendanceManagementActions from '../../actions/admin/AttendanceManagementActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

import _ from 'underscore';
import {RadioGroup, Radio} from 'react-radio-group';
import moment from 'moment';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
var wowClasses = require('./../../../utility/WowClasses');

import AddAttendance from './AddAttendance';
import ViewAttendance from './ViewAttendance';
import DeleteAttendance from './DeleteAttendance';

class AttendanceManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = AttendanceManagementStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AttendanceManagementStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AttendanceManagementStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    if(typeof(Storage) === 'undefined' || (sessionStorage.role != 'admin' || NavbarStore.getState().userRole != 'admin'))
      return null;

    return (
      <div id='wrapper'>
      <AdminSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <button className={classNames('btn', { 'btn-default': this.state.viewMode != 1, 'btn-success': this.state.viewMode == 1})} onClick={() => AttendanceManagementActions.updateViewMode(1)}>Add Attendance</button>
              &nbsp;&nbsp;&nbsp;
              <button className={classNames('btn', { 'btn-default': this.state.viewMode != 2, 'btn-success': this.state.viewMode == 2})} onClick={() => AttendanceManagementActions.updateViewMode(1)}>View Attendance</button>
              &nbsp;&nbsp;&nbsp;
              <button className={classNames('btn', { 'btn-default': this.state.viewMode != 3, 'btn-success': this.state.viewMode == 3})} onClick={() => AttendanceManagementActions.updateViewMode(1)}>Delete Attendance</button>
            </div>
            {this.state.viewMode == 1 ? <AddAttendance /> : null}
            {this.state.viewMode == 2 ? <ViewAttendance /> : null}
            {this.state.viewMode == 3 ? <DeleteAttendance /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default AttendanceManagement;
