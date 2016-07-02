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
    this.selectRaidWeek = this.raidweeks[0].id;
  }

  onLoadComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateSelectRaidWeek(value) {
    this.selectRaidWeek = value;
    this.selectWeekday = '';
  }

  onUpdateSelectWeekday(value) {
    this.selectWeekday = value;
  }
}

export default alt.createStore(AttendanceManagementStore);
