import alt from '../../alt';
import ViewAttendanceActions from '../../actions/admin/ViewAttendanceActions';

class ViewAttendanceStore {
  constructor() {
    this.bindActions(ViewAttendanceActions);
  }
}

export default alt.createStore(ViewAttendanceStore);
