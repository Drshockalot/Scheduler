import alt from '../../alt';

var request = require('superagent');

var _ = require('underscore');

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
    var test = new FormData();
    test.append('test', file);
    console.log(test);
    console.log('test form data -', test.get('test'));

    $.ajax({
      method: 'POST',
      url: '/api/attendance/admin',
      contentType: 'multipart/form-data',
      data: test,
      success: function(result) {
        console.log('result - ' + result);
      }
    })
  }
}

export default alt.createActions(AttendaceManagementActions);
