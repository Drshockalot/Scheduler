import alt from '../../alt';

var request = require('superagent');

var _ = require('underscore');

class AttendaceManagementActions {
  constructor() {
    this.generateActions(
      'loadComponentDataSuccess',
      'loadComponentDataFailure',
      'updateSelectRaidWeek',
      'updateSelectWeekday',
      'updateSelectRaid',
      'updateSelectRoster',
      'toggleCharacterState',
      'uploadAttendanceFromRosterFormSuccess',
      'uploadAttendanceFromRosterFormFailure'
    );
  }

  loadComponentData() {
    $.ajax({
      method: 'GET',
      url: '/api/attendance/admin'
    }).done((result) => {
      console.log(result);
      this.loadComponentDataSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.loadComponentDataFailure(jqXhr);
    });
  }

  drop(file) {
    var test = new FormData();
    test.append('test', file);

    request.post('/api/attendance/admin').send(test).end(function(err, res) {
      if(err) {
        console.log('err -', err);
      } else {
        console.log('res', res);
      }
    });
  }

  uploadAttendanceFromRosterForm(attendanceModel, raidId, raidWeekId, weekday) {
    var nameList = [];
    for(var i = 0; i < attendanceModel['Tank'].length; ++i) {
      nameList.push(attendanceModel['Tank'][i].name);
    }
    for(var i = 0; i < attendanceModel['Healer'].length; ++i) {
      nameList.push(attendanceModel['Healer'][i].name);
    }
    for(var i = 0; i < attendanceModel['DPS'].length; ++i) {
      nameList.push(attendanceModel['DPS'][i].name);
    }
    for(var i = 0; i < attendanceModel['Standby'].length; ++i) {
      nameList.push(attendanceModel['Standby'][i].name);
    }
    var data = {names: nameList, raidId: raidId, raidWeekId: raidWeekId, weekday: weekday};
    console.log(data);
    $.ajax({
      method: 'POST',
      url: '/api/attendance/admin/roster',
      data: data
    }).done((result) => {
      console.log(result);
      this.uploadAttendanceFromRosterFormSuccess(reuslt);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.uploadAttendanceFromRosterFormFailure(jqXhr);
    });
  }
}

export default alt.createActions(AttendaceManagementActions);
