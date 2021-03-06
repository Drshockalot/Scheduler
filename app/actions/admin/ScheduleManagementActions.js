import alt from './../../alt';
import ScheduleManagementStore from './../../stores/admin/ScheduleManagementStore';
var _ = require('underscore');

import { OverlayTrigger, Popover } from 'react-bootstrap';

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
      'loadComponentDataSuccess',
      'loadComponentDataFailure',
      'createScheduleSuccess',
      'createScheduleFailure',
      'addScheduleBossSuccess',
      'addScheduleBossFailure',
      'addCharacterToScheduleBossSuccess',
      'addCharacterToScheduleBossFailure',
      'removeCharacterFromScheduleBossSuccess',
      'removeCharacterFromScheduleBossFailure',
      'invertScheduleBossPublishedStateSuccess',
      'invertScheduleBossPublishedStateFailure',
      'showDeleteBossModal',
      'hideDeleteBossModal',
      'deleteScheduleBossSuccess',
      'deleteScheduleBossFailure',
      'addScheduleRaidBossesSuccess',
      'addScheduleRaidBossesFailure',
      'restoreState'
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
      this.loadComponentDataSuccess(result);
    }).fail((jqXhr) => {
      this.loadComponentDataFailure(jqXhr);
    });
    return 0;
  }

  createSchedule(raidWeekId, scheduleName, scheduleDescription, rosterId) {
    var data = { rwId: raidWeekId,
                 name: scheduleName,
                 description: scheduleDescription,
                 rosterId: rosterId};
    $.ajax({
      method: 'POST',
      url: '/api/schedule/admin',
      data: data
    }).done((result) => {
      this.createScheduleSuccess(result);
    }).fail((jqXhr) => {
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
                 schedule: schedule };
    $.ajax({
      method: 'POST',
      url: '/api/schedule/admin/boss',
      data: data
    }).done((result) => {
      this.addScheduleBossSuccess(result);
    }).fail((jqXhr) => {
      this.addScheduleBossFailure(jqXhr);
    });
    return 0;
  }

  addCharacterToScheduleBoss(scheduleBossId, characterId) {
    var data = { scheduleBossId: scheduleBossId,
                 characterId: characterId};
    $.ajax({
      method: 'POST',
      url: '/api/schedule/admin/character',
      data: data
    }).done((result) => {
      this.addCharacterToScheduleBossSuccess(result);
    }).fail((jqXhr) => {
      this.addCharacterToScheduleBossFailure(jqXhr);
    });
    return 0;
  }

  removeCharacterFromScheduleBoss(scheduleBossId, characterId) {
    var data = { scheduleBossId: scheduleBossId,
                 characterId: characterId};
    $.ajax({
      method: 'DELETE',
      url: '/api/schedule/admin/character',
      data: data
    }).done((result) => {
      this.removeCharacterFromScheduleBossSuccess(result);
    }).fail((jqXhr) => {
      this.removeCharacterFromScheduleBossFailure(jqXhr);
    });
    return 0;
  }

  invertScheduleBossPublishedState(scheduleBossId) {
    $.ajax({
      method: 'PUT',
      url: '/api/schedule/admin/publish/' + scheduleBossId
    }).done((result) => {
      this.invertScheduleBossPublishedStateSuccess(result);
    }).fail((jqXhr) => {
      this.invertScheduleBossPublishedStateFailure(jqXhr);
    });
  }

  deleteScheduleBoss(scheduleBossId) {
    this.hideDeleteBossModal();
    $.ajax({
      method: 'DELETE',
      url: '/api/schedule/admin/boss/' + scheduleBossId
    }).done((result) => {
      this.deleteScheduleBossSuccess(result);
    }).fail((jqXhr) => {
      this.deleteScheduleBossFailure(jqXhr);
    });
    return 0;
  }

  addScheduleRaidBosses(raidId, scheduleId) {
    $.ajax({
      method: 'PUT',
      url: '/api/schedule/admin/raid',
      data: {raidId: raidId, scheduleId: scheduleId}
    }).done((result) => {
      this.addScheduleRaidBossesSuccess(result);
    }).fail((jqXhr) => {
      this.addScheduleRaidBossesFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(ScheduleManagementActions);
