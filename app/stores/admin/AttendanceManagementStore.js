import alt from '../../alt';
import AttendanceManagementActions from '../../actions/admin/AttendanceManagementActions';
import _ from 'underscore';

class AttendanceManagementStore {
  constructor() {
    this.bindActions(AttendanceManagementActions);
    this.viewMode = 1;
  }

  onUpdateViewMode(value) {
    this.viewMode = value;
  }
}

export default alt.createStore(AttendanceManagementStore);
