import alt from './../../alt';
import ScheduleManagementStore from './../../stores/admin/ScheduleManagementStore';
var _ = require('underscore');

class ScheduleManagementActions {
  constructor() {
    this.generateActions(
      'updateFormRaidWeek',
      'updateFormRoster',
      'updateFormScheduleName',
      'updateFormScheduleDescription',
      'updateSelectedRaidWeekCompleted',
      'updateSelectedSchedule',
      'updateFormRaid',
      'updateFormBoss',
      'updateFormTanks',
      'updateFormHealers',
      'updateFormDPS',
      'loadComponentDataSuccess',
      'loadComponentDataFailure',
      'createScheduleSuccess',
      'createScheduleFailure',
      'setFormTanks',
      'setFormHealers',
      'setFormDPS',
      'addScheduleBossSuccess',
      'addScheduleBossFailure'
    );
  }

  updateSelectedRaidWeek(newRWId) {
    newRWId = parseInt(newRWId);
    var state = ScheduleManagementStore.getState();
    var newScheduleList = [];
    for(var i = 0; i < state.schedules.length; i++) {
      if(state.schedules[i].raid_week_id == newRWId) {
        newScheduleList.push(state.schedules[i]);
      }
    }
    var newSelectedSchedule = 0;
    if(newScheduleList.length > 0) {
      newSelectedSchedule = newScheduleList[0].id;
    }
    this.updateSelectedRaidWeekCompleted(newRWId, newSelectedSchedule);
    return 0;
  }

  loadComponentData() {
    $.ajax({
      method: 'GET',
      url: '/api/schedule'
    }).done((result) => {
      console.log(result);
      this.loadComponentDataSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.loadComponentDataFailure(jqXhr);
    });
    return 0;
  }

  createSchedule(raidWeekId, scheduleName, scheduleDescription) {
    var data = { rwId: raidWeekId,
                 name: scheduleName,
                 description: scheduleDescription};
    $.ajax({
      method: 'POST',
      url: '/api/schedule/admin',
      data: data
    }).done((result) => {
      console.log(result);
      this.createScheduleSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.createScheduleFailure(jqXhr);
    });
    return 0;
  }

  addScheduleBoss(raid, boss, tanks, healers, dps, schedule) {
    var data = { raid: raid,
                 boss: boss,
                 tanks: tanks,
                 healers: healers,
                 dps: dps,
                 schedule: schedule}
    $.ajax({
      method: 'POST',
      url: '/api/schedule/admin/boss',
      data: data
    }).done((result) => {
      console.log(result);
      this.addScheduleBossSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.addScheduleBossFailure(jqXhr);
    });
  }

  addCharacterToScheduleBoss(scheduleBossId, characterId) {
    var data = { scheduleBossId: scheduleBossId,
                 characterId: characterId};
    $.ajax({
      method: 'POST',
      url: '/api/schedule/admin/character',
      data: data
    }).done((result) => {
      console.log(result);
      this.addCharacterToScheduleBossSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.addCharacterToScheduleBossFailure(jqXhr);
    });
  }

  removeCharacterFromScheduleBoss(scheduleBossId, characterId) {
    var data = { scheduleBossId: scheduleBossId,
                 characterId: characterId};
    $.ajax({
      method: 'DELETE',
      url: '/api/schedule/admin/character',
      data: data
    }).done((result) => {
      console.log(result);
      this.removeCharacterFromScheduleBossSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.removeCharacterFromScheduleBossFailure(jqXhr);
    });
  }
}

export default alt.createActions(ScheduleManagementActions);
