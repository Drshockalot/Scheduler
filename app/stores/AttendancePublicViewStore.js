import alt from '../alt';
import AttendancePublicViewActions from '../actions/AttendancePublicViewActions';

class AttendancePublicViewStore {
  constructor() {
    this.bindActions(AttendancePublicViewActions);
    this.attendanceRecords = [];
    this.raids = [];
    this.attendanceCount = [];
    this.users = [];
    this.selectRaid = 0;
  }

  onLoadComponentDataSuccess(result) {
    this.attendanceRecords = result.data.attendanceRecords;
    this.raids = result.data.raids;
    this.selectRaid = this.raids[0].id;
    this.attendanceCount = result.data.attendanceCount;
    this.users = result.data.users;
  }

  onLoadComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onRestoreState(state) {
    for (var key in state) {
      this[key] = state[key];
    }
  }

  onUpdateSelectRoster(value) {
    this.selectRoster = value;
  }

  onUpdateSelectRaid(value) {
    this.selectRaid = value;
  }
}

export default alt.createStore(AttendancePublicViewStore);
