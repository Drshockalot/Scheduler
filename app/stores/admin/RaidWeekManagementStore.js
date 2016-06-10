import alt from './../../alt';
import RaidWeekManagementActions from './../../actions/admin/RaidWeekManagementActions';
import moment from 'moment';

class RaidWeekManagementStore {
  constructor() {
    this.bindActions(RaidWeekManagementActions);
    this.selectedYear = null;
    this.selectedDay = null;
  }

  onSelectedDayChanged(date) {
    this.selectedDay = date;
  }

  onNextYear() {
    this.selectedYear++;
  }

  onPrevYear() {
    this.selectedYear--;
  }

  onGoToToday() {
    var today = moment();

    this.selectedDay = today;
    this.selectedYear = today.year();
  }
}

export default alt.createStore(RaidWeekManagementStore);
