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

  uploadFile(fileText, raidId, raidWeekId, weekday, rosterId) {
    var data = {names: fileText.split(','), raidId: raidId, raidWeekId: raidWeekId, weekday: weekday, rosterId: rosterId};
    console.log(data);
    $.ajax({
      method: 'POST',
      url: '/api/attendance/admin/file',
      data: data
    }).done((result) => {
      console.log(result);
      this.uploadFileSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.uploadFileFailure(jqXhr);
    });
  }

  uploadAttendanceFromRosterForm(attendanceModel, raidId, raidWeekId, weekday, rosterId) {
    var nameList = [];
    tankModel = _.uniq(attendanceModel['Tank']);
    healerModel = _.uniq(attendanceModel['Healer']);
    dpsModel = _.uniq(attendanceModel['DPS']);
    for(var i = 0; i < tankModel.length; ++i) {
      if(tankModel[i].state)
        nameList.push(tankModel[i].name);
    }
    for(var i = 0; i < healerModel.length; ++i) {
      if(healerModel.state)
        nameList.push(healerModel[i].name);
    }
    for(var i = 0; i < dpsModel.length; ++i) {
      if(dpsModel[i].state)
        nameList.push(dpsModel[i].name);
    }
    // Not currently used
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
      console.log(result);
      this.uploadAttendanceFromRosterFormSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.uploadAttendanceFromRosterFormFailure(jqXhr);
    });
  }

  uploadRawText(uploadText, raidId, raidWeekId, weekday, rosterId) {
    if(uploadText == '') {
      toastr.warning('You cannot upload an empty batch of text');
      return;
    }
    var names = uploadText.split(',');
    var data = {names: names, raidId: raidId, raidWeekId: raidWeekId, weekday: weekday, rosterId: rosterId};

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

export default alt.createActions(AddAttendanceActions);
