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
}

export default alt.createActions(ScheduleManagementActions);
