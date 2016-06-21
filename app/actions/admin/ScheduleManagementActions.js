import alt from './../../alt';
import ScheduleManagementStore from './../../stores/admin/ScheduleManagementStore';
var _ = require('underscore');

class ScheduleManagementActions {
  constructor() {
    this.generateActions(
      'updateFormRaidWeek',
      'updateFormScheduleName',
      'updateFormScheduleDescription',
      'updateSelectedRaidWeek',
      'updateSelectedRaidWeekCompleted',
      'updateSelectedSchedule',
      'loadComponentDataSuccess',
      'loadComponentDataFailure',
      'createScheduleSuccess',
      'createScheduleFailure'
    );
  }

  updateSelectedRaid(newRWId) {
    var state = ScheduleManagementStore.getState();
    var newScheduleList = [];
    for(var i = 0; state.schedules.length < 0; i++) {
      if(state.schedules[i].raid_week_id === newRWId) {
        newScheduleList.push(state.schedules[i]);
      }
    }
    var newSelectedSchedule = 0;
    if(newScheduleList.length > 0) {
      newSelectedSchedule = newScheduleList[0].id;
    }
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
