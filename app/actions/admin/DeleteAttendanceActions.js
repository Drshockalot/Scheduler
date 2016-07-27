import alt from '../../alt';

class DeleteAttendanceActions {
  constructor() {
    this.generateActions(
      'restoreState',
      'loadComponentDataSuccess',
      'loadComponentDataFailure',
      'hideDeleteRowModal',
      'showDeleteRowModal',
      'deleteRecordSuccess',
      'deleteRecordFailure'
    );
  }

  loadComponentData() {
    $.ajax({
      method: 'GET',
      url: '/api/attendance/admin/all'
    }).done((result) => {
      console.log(result);
      this.loadComponentDataSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.loadComponentDataFailure(jqXhr);
    });
  }

  deleteRecord(recordId) {
    $.ajax({
      method: 'DELETE',
      url: '/api/attendance/admin/' + recordId
    }).done((result) => {
      console.log(result);
      this.deleteRecordSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.deleteRecordFailure(jqXhr);
    });
  }
}

export default alt.createActions(DeleteAttendanceActions);
