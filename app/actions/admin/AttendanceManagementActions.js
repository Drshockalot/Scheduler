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
    var tFile = new FormData();
    tFile.append('test', file);
    tFile.append('please', 'helpme');

    console.log(file);
    console.log(tFile);
    request.post('/api/attendance/admin').send(tFile).end(function(err, resp) {
      if(err) {
        console.log('err');
        console.log(err);
      } else {
        console.log(resp);
      }
    });
  }
}

export default alt.createActions(AttendaceManagementActions);
