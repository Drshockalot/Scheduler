import alt from './../../alt';
import ScheduleManagementActions from './../../actions/admin/ScheduleManagementActions';

class ScheduleManagementStore {
  constructor() {
    this.bindActions(ScheduleManagementActions);
    this.raidweeks = [];
    this.raids = [];
    this.characters = [];
    this.schedules = [];
    this.selectedRaidWeek = 0;
    this.selectedSchedule = '';
    this.formRaidWeek = {};
    this.formScheduleName = '';
    this.formScheduleDescription = '';
  }

  onUpdateFormRaidWeek(e) {
    this.formRaidWeek = e.target.value;
  }

  onUpdateFormScheduleName(e) {
    this.formScheduleName = e.target.value;
    this.formScheduleName = '';
  }

  onUpdateFormScheduleDescription(e) {
    this.formScheduleDescription = e.target.value;
    this.formScheduleDescription = '';
  }

  onUpdateSelectedRaidWeek(e) {
    this.selectedRaidWeek = e.target.value;
  }

  onUpdateSelectedSchedule(e) {
    this.selectedSchedule = e.target.value;
  }

  onLoadComponentDataSuccess(result) {
    this.raidweeks = result.data.raidweeks;
    this.characters = result.data.characters;
    this.schedules = result.data.schedules;
    this.raids = result.data.raids;
    this.selectedRaidWeek = raidweeks[0];
    this.formRaidWeek = raidweeks[0];
  }

  onLoadComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onCreateScheduleSuccess(result) {
    this.schedules = result.data.schedules;
  }

  onCreateScheduleFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ScheduleManagementStore);
