import alt from './../../alt';
import RaidWeekManagementActions from './../../actions/admin/RaidWeekManagementActions';
import moment from 'moment';

class RaidWeekManagementStore {
  constructor() {
    this.bindActions(RaidWeekManagementActions);
    this.selectedYear = moment().year();
    this.selectedDay = moment();
    this.raidweeks = [];
    this.formTanks = 0;
    this.formHealers = 0;
    this.formDPS = 0;
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
}

export default alt.createStore(RaidWeekManagementStore);
