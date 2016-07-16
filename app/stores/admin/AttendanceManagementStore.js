import alt from '../../alt';
import AttendanceManagementActions from '../../actions/admin/AttendanceManagementActions';

class AttendanceManagementStore {
  constructor() {
    this.bindActions(AttendanceManagementActions);
    this.raidweeks = [];
    this.raids = [];
    this.rosters = [];
    this.selectRaidWeek = 0;
    this.selectRaid = 0;
    this.selectRoster = 0;
    this.selectWeekday = '';
  }

  onLoadComponentDataSuccess(result) {
    this.raidweeks = result.data.raidweeks;
    this.selectRaidWeek = this.raidweeks[0].id;
    this.raids = result.data.raids;
    this.selectRaid = this.raids[0].id;
    this.rosters = result.data.rosters;
    this.selectRoster = this.rosters[0].id;
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

  onUpdateSelectRaid(value) {
    this.selectRaid = value;
  }

  onUpdateSelectRoster(value) {
    this.selectRoster = value;
  }
}

export default alt.createStore(AttendanceManagementStore);
