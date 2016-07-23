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
      'uploadAttendanceFromRosterFormFailure',
      'updateUploadText',
      'uploadRawTextSuccess',
      'uploadRawTextFailure',
      'uploadFileSuccess',
      'uploadFileFailure',
      'restoreState'
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

  uploadFile(file, raidId, raidWeekId, weekday) {
    var fileData = new FormData();
    fileData.append('attendance', file);
    var data = {files: fileData, raidId: raidId, raidWeekId: raidWeekId, weekday: weekday};
    request.post('/api/attendance/admin/file').send(fileData).end(function(jqXhr, result) {
      if(!jqXhr) {
        console.log(result);
        this.uploadFileSuccess(result);
      } else {
        console.log(jqXhr);
        this.uploadFileFailure(jqXhr);
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

    $.ajax({
      method: 'POST',
      url: '/api/attendance/admin/roster',
      data: data
    }).done((result) => {
      console.log(result);
      this.uploadAttendanceFromRosterFormSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.uploadAttendanceFromRosterFormFailure(jqXhr);
    });
  }

  uploadRawText(uploadText, raidId, raidWeekId, weekday) {
    if(uploadText == '') {
      toastr.warning('You cannot upload an empty batch of text');
      return;
    }
    var names = uploadText.split(',');
    var data = {names: names, raidId: raidId, raidWeekId: raidWeekId, weekday: weekday};

    $.ajax({
      method: 'POST',
      url: '/api/attendance/admin/text',
      data: data
    }).done((result) => {
      console.log(result);
      this.uploadRawTextSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.uploadRawTextFailure(jqXhr);
    });
  }
}

export default alt.createActions(AttendaceManagementActions);
