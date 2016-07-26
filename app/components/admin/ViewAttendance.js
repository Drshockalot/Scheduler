import React from 'react';
import {Link} from 'react-router';
import ViewAttendanceStore from '../../stores/admin/ViewAttendanceStore';
import ViewAttendanceActions from '../../actions/admin/ViewAttendanceActions';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

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
    if(typeof(Storage) === 'undefined' || (sessionStorage.role != 'admin' || NavbarStore.getState().userRole != 'admin'))
      return null;

    return (
      <div className='row'>

      </div>
    );
  }
}

export default ViewAttendance;
