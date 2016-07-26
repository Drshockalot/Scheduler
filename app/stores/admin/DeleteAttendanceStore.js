import alt from '../../alt';
import DeleteAttendanceActions from '../../actions/admin/DeleteAttendanceActions';

class DeleteAttendanceStore {
  constructor() {
    this.bindActions(DeleteAttendanceActions);
    this.attendanceRecords = [];
  }

  onLoadComponentDataSuccess(result) {
    this.attendanceRecords = result.data.attendanceRecords;
  }

  onLoadComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onRestoreState(state) {
    for (var key in state) {
      this[key] = state[key];
    }
  }
}

export default alt.createStore(DeleteAttendanceStore);
