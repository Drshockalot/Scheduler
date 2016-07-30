import alt from '../../alt';
import ViewAttendanceActions from '../../actions/admin/ViewAttendanceActions';

class ViewAttendanceStore {
  constructor() {
    this.bindActions(ViewAttendanceActions);
    this.attendanceRecords = [];
    this.rosters = [];
    this.raids = [];
    this.attendanceCount = [];
    this.selectRoster = 0;
    this.selectRaid = 0;
  }

  onLoadComponentDataSuccess(result) {
    this.attendanceRecords = result.data.attendanceRecords;
    this.rosters = result.data.rosters;
    this.selectRoster = this.rosters[0].id;
    this.raids = result.data.raids;
    this.selectRaid = this.raids[0].id;
    this.attendanceCount = result.data.attendanceCount;
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

export default alt.createStore(ViewAttendanceStore);
