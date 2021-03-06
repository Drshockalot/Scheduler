import alt from '../../alt';

var request = require('superagent');

var _ = require('underscore');

class AddAttendanceActions {
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
      'restoreState',
      'confirmFileUpload',
      'confirmTextUpload',
      'confirmRosterUpload',
      'hideConfirmUploadModal',
      'disableConfirmUploadButton'
    );
  }

  loadComponentData() {
    $.ajax({
      method: 'GET',
      url: '/api/attendance/admin'
    }).done((result) => {
      this.loadComponentDataSuccess(result);
    }).fail((jqXhr) => {
      this.loadComponentDataFailure(jqXhr);
    });
    return 0;
  }

  uploadFile(fileText, raidId, raidWeekId, weekday, rosterId) {
    console.log('api');
    var names = fileText.split(',');
    for (var i = 0; i < names.length; ++i) {
      names[i] = names[i].trim();
    }
    var data = {names: names, raidId: raidId, raidWeekId: raidWeekId, weekday: weekday, rosterId: rosterId};
    console.log(data);
    $.ajax({
      method: 'POST',
      url: '/api/attendance/admin/file',
      data: data
    }).done((result) => {
      this.uploadFileSuccess(result);
    }).fail((jqXhr) => {
      this.uploadFileFailure(jqXhr);
    });
    return 0;
  }

  uploadAttendanceFromRosterForm(attendanceModel, raidId, raidWeekId, weekday, rosterId) {
    var nameList = [];
    for(var i = 0; i < attendanceModel['Tank'].length; ++i) {
      if(attendanceModel['Tank'][i].state)
        nameList.push(attendanceModel['Tank'][i].name);
    }
    for(var i = 0; i < attendanceModel['Healer'].length; ++i) {
      if(attendanceModel['Healer'][i].state)
        nameList.push(attendanceModel['Healer'][i].name);
    }
    for(var i = 0; i < attendanceModel['DPS'].length; ++i) {
      if(attendanceModel['DPS'][i].state)
        nameList.push(attendanceModel['DPS'][i].name);
    }
    // for(var i = 0; i < attendanceModel['Standby'].length; ++i) {
    //   if(attendanceModel['Standby'][i].state)
    //     nameList.push(attendanceModel['Standby'][i].name);
    // }
    var data = {names: nameList, raidId: raidId, raidWeekId: raidWeekId, weekday: weekday, rosterId: rosterId};
    console.log(data);
    $.ajax({
      method: 'POST',
      url: '/api/attendance/admin/roster',
      data: data
    }).done((result) => {
      this.uploadAttendanceFromRosterFormSuccess(result);
    }).fail((jqXhr) => {
      this.uploadAttendanceFromRosterFormFailure(jqXhr);
    });
    return 0;
  }

  uploadRawText(uploadText, raidId, raidWeekId, weekday, rosterId) {
    if(uploadText.trim() == '') {
      toastr.warning('You cannot upload an empty batch of text');
      return;
    }
    var names = uploadText.split(',');
    for (var i = 0; i < names.length; ++i) {
      names[i] = names[i].trim();
    }
    var data = {names: names, raidId: raidId, raidWeekId: raidWeekId, weekday: weekday, rosterId: rosterId};

    $.ajax({
      method: 'POST',
      url: '/api/attendance/admin/text',
      data: data
    }).done((result) => {
      this.uploadRawTextSuccess(result);
    }).fail((jqXhr) => {
      this.uploadRawTextFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(AddAttendanceActions);
