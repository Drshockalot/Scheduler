import alt from './../../alt';
import ScheduleManagementActions from './../../actions/admin/ScheduleManagementActions';

class ScheduleManagementStore {
  constructor() {
    this.bindActions(ScheduleManagementActions);
    this.raidweeks = [];
    this.raids = [];
    this.characters = [];
    this.schedules = [];
    this.selectedRaidWeek = {};
    this.selectedSchedule = {};
    this.formRaidWeek = {};
    this.formScheduleName = '';
    this.formScheduleDescription = '';
  }

  onUpdateFormRaidWeek(e) {
    this.formRaidWeek = e.target.value;
  }

  onUpdateFormScheduleName(e) {
    this.formScheduleName = e.target.value;
  }

  onUpdateFormScheduleDescription(e) {
    this.formScheduleDescription = e.target.value;
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
