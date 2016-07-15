import alt from './../../alt';
import ScheduleManagementActions from './../../actions/admin/ScheduleManagementActions';
import moment from 'moment';
import _ from 'underscore';

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

    this.scheduleBossToDelete = 0;
    this.showDeleteBossModal = false;
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

  onUpdateFormBoss(value) {
    this.formBoss = value;
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

    toastr.success('Schedule created', 'Success');
  }

  onCreateScheduleFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
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

  onInvertScheduleBossPublishedStateSuccess(result) {
    var sb = _.findWhere(_.findWhere(this.schedules, {id: result.data.sb.schedule_id}).schedule_bosses, {id: result.data.sb.id});
    sb = result.data.sb;
  }

  onInvertScheduleBossPublishedStateFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onShowDeleteBossModal(id) {
    this.scheduleBossToDelete = id;
    this.showDeleteBossModal = true;
  }

  onHideDeleteBossModal() {
    this.showDeleteBossModal = false;
  }

  onDeleteScheduleBossSuccess(result) {
    this.schedules = result.data.schedules;
    toastr.success('Boss deleted', 'Success');
  }

  onDeleteScheduleBossFailure(jqXhr) {
    this.showDeleteBossModal = false;
    toastr.error(jqXhr.responseJSON.message);
  }

  onAddScheduleRaidBossesSuccess(result) {
    this.schedules = result.data.schedules;
    toastr.success('Bosses added', 'Success');
  }

  onAddScheduleRaidBossesFailure(jqXhr) {
    toastr.error(jqXhr.repsonseJSON.message);
  }
}

export default alt.createStore(ScheduleManagementStore);
