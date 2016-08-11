import alt from '../../alt';

class ViewAttendanceActions {
  constructor() {
    this.generateActions(
      'restoreState',
      'loadComponentDataSuccess',
      'loadComponentDataFailure',
      'updateSelectRaid',
      'updateSelectRoster'
    );
  }

  loadComponentData() {
    $.ajax({
      method: 'GET',
      url: '/api/attendance/admin/view'
    }).done((result) => {
      this.loadComponentDataSuccess(result);
    }).fail((jqXhr) => {
      this.loadComponentDataFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(ViewAttendanceActions);
