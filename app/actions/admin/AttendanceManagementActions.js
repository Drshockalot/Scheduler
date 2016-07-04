import alt from '../../alt';

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

  drop(files) {
    $.ajax({
      method: 'POST',
      url: '/api/attendance/admin',
      data: files
    }).done((result) => {
      console.log(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
    });
  }
}

export default alt.createActions(AttendaceManagementActions);
