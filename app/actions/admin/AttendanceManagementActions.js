import alt from '../../alt';

var request = require('superagent');

class AttendaceManagementActions {
  constructor() {
    this.generateActions(
      'loadComponentDataSuccess',
      'loadComponentDataFailure',
      'updateSelectRaidWeek',
      'updateSelectWeekday'
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
    var tFile = new FormData();
    tFile.append('test', file);

    $.ajax({
      method: 'POST',
      url: '/api/attendance/admin',
      data: tFile
    }).done((result) => {
      console.log(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
    });
  }
}

export default alt.createActions(AttendaceManagementActions);
