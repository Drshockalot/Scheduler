import alt from '../../alt';
import DeleteAttendanceActions from '../../actions/admin/DeleteAttendanceActions';

class DeleteAttendanceStore {
  constructor() {
    this.bindActions(DeleteAttendanceActions);
  }
}

export default alt.createStore(DeleteAttendanceStore);
