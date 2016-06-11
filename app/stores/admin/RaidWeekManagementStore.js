import alt from './../../alt';
import RaidWeekManagementActions from './../../actions/admin/RaidWeekManagementActions';
import moment from 'moment';

class RaidWeekManagementStore {
  constructor() {
    this.bindActions(RaidWeekManagementActions);
    this.selectedYear = moment().year();
    this.selectedDay = moment();
    this.raidweeks = [];
  }

  onSelectedDayChanged(date) {
    this.selectedDay = date;
  }

  onNextYear() {
    this.selectedYear = this.selectedYear + 1;
  }

  onPrevYear() {
    this.selectedYear = this.selectedYear - 1;
  }

  onGoToToday() {
    var today = moment();

    this.selectedDay = today;
    this.selectedYear = today.year();
  }

  onCreateNewRaidWeekSuccess(result) {
    this.raidweeks = result;
  }

  onCreateNewRaidWeekFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(RaidWeekManagementStore);
