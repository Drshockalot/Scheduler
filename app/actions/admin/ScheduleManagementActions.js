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
      'addScheduleRaidBossesFailure'
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
                 schedule: schedule };
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
      console.log(result);
      this.addCharacterToScheduleBossSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
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
      console.log(result);
      this.removeCharacterFromScheduleBossSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.removeCharacterFromScheduleBossFailure(jqXhr);
    });
    return 0;
  }

  invertScheduleBossPublishedState(scheduleBossId) {
    $.ajax({
      method: 'PUT',
      url: '/api/schedule/admin/publish/' + scheduleBossId
    }).done((result) => {
      console.log(result);
      this.invertScheduleBossPublishedStateSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.invertScheduleBossPublishedStateFailure(jqXhr);
    });
  }

  deleteScheduleBoss(scheduleBossId) {
    this.hideDeleteBossModal();
    $.ajax({
      method: 'DELETE',
      url: '/api/schedule/admin/boss/' + scheduleBossId
    }).done((result) => {
      console.log(result);
      this.deleteScheduleBossSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.deleteScheduleBossFailure(jqXhr);
    });
  }

  addScheduleRaidBosses(raidId, scheduleId) {
    $.ajax({
      method: 'PUT',
      url: '/api/schedule/admin/raid',
      data: {raidId: raidId, scheduleId: scheduleId}
    }).done((result) => {
      console.log(result);
      this.addScheduleRaidBossesSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.addScheduleRaidBossesFailure(jqXhr);
    });
  }

  generateAvailabilityPopover(availability, characterName) {
    var popover;
    if(availability) {
      var wed = availability.wednesday ? <div className='clearfix hand-cursor'><strong><span>Wednesday</span></strong></div> : null;
      var thurs = availability.thursday ? <div className='clearfix hand-cursor'><strong><span>Thursday</span></strong></div> : null;
      var fri = availability.friday ? <div className='clearfix hand-cursor'><strong><span>Friday</span></strong></div> : null;
      var sat = availability.saturday ? <div className='clearfix hand-cursor'><strong><span>Saturday</span></strong></div> : null;
      var sun = availability.sunday ? <div className='clearfix hand-cursor'><strong><span>Sunday</span></strong></div> : null;
      var mon = availability.monday ? <div className='clearfix hand-cursor'><strong><span>Monday</span></strong></div> : null;
      var tues = availability.tuesday ? <div className='clearfix hand-cursor'><strong><span>Tuesday</span></strong></div> : null;

      popover = (
        <Popover id={availability.id} title='Availability'>
          {wed}
          {thurs}
          {fri}
          {sat}
          {sun}
          {mon}
          {tues}
        </Popover>
      );
    } else {
      popover = (
        <Popover id={characterName} title='Availability'>
          <div className='clearfix hand-cursor'><strong><span>N/A</span></strong></div>
        </Popover>
      );
    }

    var trigger = (
      <OverlayTrigger placement='left' trigger='click' rootClose overlay={popover}>
        <strong className='hand-cursor'><u>&#10094;  {characterName}}</u></strong>
      </OverlayTrigger>
    );

    return trigger;
  }
}

export default alt.createActions(ScheduleManagementActions);
