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

  drop(file) {
    var dFile = {
      modified: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type
    }

    $.ajax({
      method: 'POST',
      url: '/api/attendance/admin',
      data: {name: file.name, file: dFile}
    }).done((result) => {
      console.log(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
    });
  }
}

export default alt.createActions(AttendaceManagementActions);
