import alt from '../../alt';
import ViewAttendanceActions from '../../actions/admin/ViewAttendanceActions';

class ViewAttendanceStore {
  constructor() {
    this.bindActions(ViewAttendanceActions);
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

export default alt.createStore(ViewAttendanceStore);
