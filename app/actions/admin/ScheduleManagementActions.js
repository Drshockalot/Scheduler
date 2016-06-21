import alt from './../../alt';
import ScheduleManagementStore from './../../stores/admin/ScheduleManagementStore';
var _ = require('underscore');

class ScheduleManagementActions {
  constructor() {
    this.generateActions(
      'updateFormRaidWeek',
      'updateFormScheduleName',
      'updateFormScheduleDescription',
      'updateSelectedRaidWeekCompleted',
      'updateSelectedSchedule',
      'loadComponentDataSuccess',
      'loadComponentDataFailure',
      'createScheduleSuccess',
      'createScheduleFailure'
    );
  }

  updateSelectedRaidWeek(newRWId) {
    newRWId = parseInt(newRWId);
    console.log(newRWId);
    var state = ScheduleManagementStore.getState();
    var newScheduleList = [];
    for(var i = 0; i < state.schedules.length; i++) {
      console.log('in');
      console.log(state.schedules[i].raid_week_id);
      console.log(newRWId);
      if(state.schedules[i].raid_week_id == newRWId) {
        console.log('further in');
        newScheduleList.push(state.schedules[i]);
      }
    }
    var newSelectedSchedule = 0;
    if(newScheduleList.length > 0) {
      console.log('chaching');
      newSelectedSchedule = newScheduleList[0].id;
    }
    console.log(newSelectedSchedule);
    this.updateSelectedRaidWeekCompleted(newRWId, newSelectedSchedule);
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
  }
}

export default alt.createActions(ScheduleManagementActions);
