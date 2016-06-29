import alt from '../../alt';
import AttendanceManagementActions from '../../actions/admin/AttendanceManagementActions';

class AttendanceManagementStore {
  constructor() {
    this.bindActions(AttendanceManagementActions);
  }
}

export default alt.createStore(AttendanceManagementStore);
