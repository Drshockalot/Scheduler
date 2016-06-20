import alt from './../../alt';

class ScheduleManagementActions {
  constructor() {
    this.generateActions(
      'updateFormRaidWeek',
      'updateFormScheduleName',
      'updateFormScheduleDescription',
      'updateSelectedRaidWeek',
      'updateSelectedSchedule',
      'loadComponentDataSuccess',
      'loadComponentDataFailure',
      'createScheduleSuccess',
      'createScheduleFailure'
    );
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
    var data = { raidWeekId: raidWeekId,
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
