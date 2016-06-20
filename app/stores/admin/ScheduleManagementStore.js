import alt from './../../alt';
import ScheduleManagementActions from './../../actions/admin/ScheduleManagementActions';
import moment from 'moment';

class ScheduleManagementStore {
  constructor() {
    this.bindActions(ScheduleManagementActions);
    this.raidweeks = [];
    this.raids = [];
    this.characters = [];
    this.schedules = [];
    this.selectedRaidWeek = 0;
    this.selectedSchedule = '';
    this.formRaidWeek = 0;
    this.formScheduleName = '';
    this.formScheduleDescription = '';
  }

  onUpdateFormRaidWeek(value) {
    this.formRaidWeek = value;
  }

  onUpdateFormScheduleName(value) {
    this.formScheduleName = value;
  }

  onUpdateFormScheduleDescription(value) {
    this.formScheduleDescription = value;
  }

  onUpdateSelectedRaidWeek(value) {
    this.selectedRaidWeek = value;
  }

  onUpdateSelectedSchedule(value) {
    this.selectedSchedule = value;
  }

  onLoadComponentDataSuccess(result) {
    this.raidweeks = result.data.raidweeks;
    this.characters = result.data.characters;
    this.schedules = result.data.schedules;
    this.raids = result.data.raids;
    this.selectedRaidWeek = moment(this.raidweeks[0].start).format('W');
    this.formRaidWeek = moment(this.raidweeks[0].start).format('W');
  }

  onLoadComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onCreateScheduleSuccess(result) {
    this.schedules = result.data.schedules;
    this.formScheduleName = '';
    this.formScheduleDescription = '';
  }

  onCreateScheduleFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ScheduleManagementStore);
