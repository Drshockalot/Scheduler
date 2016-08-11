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
      this.loadComponentDataSuccess(result);
    }).fail((jqXhr) => {
      this.loadComponentDataFailure(jqXhr);
    });
    return 0;
  }

  deleteRecord(recordId) {
    $.ajax({
      method: 'DELETE',
      url: '/api/attendance/admin/' + recordId
    }).done((result) => {
      this.deleteRecordSuccess(result);
    }).fail((jqXhr) => {
      this.deleteRecordFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(DeleteAttendanceActions);
