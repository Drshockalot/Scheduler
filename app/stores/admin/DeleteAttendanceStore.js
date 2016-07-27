import alt from '../../alt';
import DeleteAttendanceActions from '../../actions/admin/DeleteAttendanceActions';

class DeleteAttendanceStore {
  constructor() {
    this.bindActions(DeleteAttendanceActions);
    this.attendanceRecords = [];
    this.showDeleteRowModal = false;
    this.rowToDelete = 0;
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

  onShowDeleteRowModal(recordId) {
    this.rowToDelete = recordId;
    this.showDeleteRowModal = true;
  }

  onHideDeleteRowModal() {
    this.showDeleteRowModal = false;
  }
}

export default alt.createStore(DeleteAttendanceStore);
