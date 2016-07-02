import alt from '../../alt';
import AttendanceManagementActions from '../../actions/admin/AttendanceManagementActions';

class AttendanceManagementStore {
  constructor() {
    this.bindActions(AttendanceManagementActions);
    this.raidweeks = [];
    this.selectRaidWeek = 0;
    this.selectWeekday = '';
  }

  onLoadComponentDataSuccess(result) {
    this.raidweeks = result.data.raidweeks;
  }

  onLoadComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateSelectRaidWeek(value) {
    this.selectRaidWeek = value;
  }

  onUpdateSelectSchedule(value) {
    this.selectWeekday = value;
  }
}

export default alt.createStore(AttendanceManagementStore);
