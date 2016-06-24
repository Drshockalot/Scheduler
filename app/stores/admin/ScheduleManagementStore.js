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
    this.rosters = [];

    this.selectedRaidWeek = 0;
    this.selectedSchedule = 0;

    this.formRaidWeek = 0;
    this.formRoster = 0;
    this.formScheduleName = '';
    this.formScheduleDescription = '';

    this.formRaid = 0;
    this.formBoss = 0;
    this.formTanks = 0;
    this.formHealers = 0;
    this.formDPS = 0;
  }

  onUpdateFormRaidWeek(value) {
    this.formRaidWeek = value;
  }

  onUpdateFormRoster(value) {
    this.formRoster = value;
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

  onUpdateFormRaidName(value) {
    this.formRaidName = value;
  }

  onUpdateFormBossName(value) {
    this.formBossName = value;
  }

  onUpdateFormTanks(value) {
    this.formTanks = value;
  }

  onUpdateFormHealers(value) {
    this.formHealers = value;
  }

  onUpdateFormDPS(value) {
    this.formDPS = value;
  }

  onLoadComponentDataSuccess(result) {
    this.raidweeks = result.data.raidweeks;
    this.characters = result.data.characters;
    this.schedules = result.data.schedules;
    this.raids = result.data.raids;
    this.rosters = result.data.rosters;
    this.selectedRaidWeek = this.raidweeks[0].id;
    this.formRaidWeek = this.raidweeks[0].id;
    this.selectedSchedule = 0;

    var newScheduleList = [];
    for(var i = 0; i < this.schedules.length; i++) {
      if(this.schedules[i].raid_week_id === this.selectedRaidWeek) {
        newScheduleList.push(this.schedules[i]);
      }
    }

    if(newScheduleList.length > 0) {
      this.selectedSchedule = newScheduleList[0].id;
    }

    this.formRaid = this.raids[0].id;
    if(this.raids[0].bosses.length > 0) {
      this.formBoss = this.raids[0].bosses[0].id;
    }

    this.formRoster = this.rosters[0].id;
  }

  onLoadComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onCreateScheduleSuccess(result) {
    this.schedules = result.data.schedules;
    this.formScheduleName = '';
    this.formScheduleDescription = '';

    var newScheduleList = [];
    for(var i = 0; i < this.schedules.length; i++) {
      if(this.schedules[i].raid_week_id === this.selectedRaidWeek) {
        newScheduleList.push(this.schedules[i]);
      }
    }

    if(newScheduleList.length > 0) {
      this.selectedSchedule = newScheduleList[0].id;
    }
  }

  onCreateScheduleFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onSetFormTanks(value) {
    this.formTanks = value;
  }

  onSetFormHealers(value) {
    this.formHealers = value;
  }

  onSetFormDPS(value) {
    this.formDPS = value;
  }

  onAddScheduleBossSuccess(result) {
    this.schedules = result.data.schedules;
    toastr.success('Boss added', 'Success');
  }

  onAddScheduleBossFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onAddCharacterToScheduleBossSuccess(result) {
    this.schedules = result.data.schedules;
  }

  onAddCharacterToScheduleBossFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onRemoveCharacterFromScheduleBossSuccess(result) {
    this.schedules = result.data.schedules;
  }

  onRemoveCharacterFromScheduleBossFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onInvertSchedulePublishedStateSuccess(result) {
    this.schedules = result.data.schedules;
  }

  onInvertSchedulePublishedStateFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ScheduleManagementStore);
