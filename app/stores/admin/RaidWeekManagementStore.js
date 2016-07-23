import alt from './../../alt';
import RaidWeekManagementActions from './../../actions/admin/RaidWeekManagementActions';
import moment from 'moment';
import _ from 'underscore';

class RaidWeekManagementStore {
  constructor() {
    this.bindActions(RaidWeekManagementActions);
    this.selectedYear = moment().year();
    this.selectedDay = moment();
    this.raidweeks = [];
    this.formTanks = 0;
    this.formHealers = 0;
    this.formDPS = 0;
    this.panelState = [
      { name: 'January', expanded: false },
      { name: 'February', expanded: false },
      { name: 'March', expanded: false },
      { name: 'April', expanded: false },
      { name: 'May', expanded: false },
      { name: 'June', expanded: false },
      { name: 'July', expanded: false },
      { name: 'August', expanded: false },
      { name: 'September', expanded: false },
      { name: 'October', expanded: false },
      { name: 'November', expanded: false },
      { name: 'December', expanded: false },
    ];
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

  onToggleRaidWeekDay(value) {
    this.raidweeks[value[0]][value[1]] = !this.raidweeks[value[0]][value[1]];
  }

  onGetAllRaidWeeksSuccess(result) {
    this.raidweeks = result.data.raidweeks;
  }

  onGetAllRaidWeeksFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onCreateNewRaidWeekSuccess(result) {
    this.raidweeks = result.data.raidweeks;
    toastr.success('Raid Week created', 'Success');
  }

  onCreateNewRaidWeekFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateRaidWeekSuccess(result) {
    this.raidweeks = result.data.raidweeks;
    toastr.success('Raid Week updated', 'Success');
  }

  onUpdateRaidWeekFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onDeleteRaidWeekSuccess(result) {
    this.raidweeks = result.data.raidweeks;
    toastr.success('Raid Week deleted', 'Success');
  }

  onDeleteRaidWeekFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onTogglePanel(key) {
    var pState = _.findWhere(this.panelState, {name: key});
    pState.expanded = !pState.expanded;
  }

  onRestoreState(state) {
    for (var key in state) {
      this[key] = state[key];
    }
  }
}

export default alt.createStore(RaidWeekManagementStore);
