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

  onUpdateSelectedRaidWeekCompleted(values) {
    this.selectedRaidWeek = values[0];
    this.selectedSchedule = values[1];
  }

  onUpdateSelectedSchedule(value) {
    this.selectedSchedule = value;
  }

  onLoadComponentDataSuccess(result) {
    this.raidweeks = result.data.raidweeks;
    this.characters = result.data.characters;
    this.schedules = result.data.schedules;
    this.raids = result.data.raids;
    this.selectedRaidWeek = this.raidweeks[0].id;
    this.formRaidWeek = this.raidweeks[0].id;
    this.selectedSchedule = 0;

    var newScheduleList = [];
    console.log('test');
    for(var i = 0; i < this.schedules.length; i++) {
      if(this.schedules[i].raid_week_id === this.selectedRaidWeek) {
        newScheduleList.push(this.schedules[i]);
      }
    }

    if(newScheduleList.length > 0) {
      this.selectedSchedule = newScheduleList[0].id;
    }
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
