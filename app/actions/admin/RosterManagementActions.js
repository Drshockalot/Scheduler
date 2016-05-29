import alt from '../../alt';

class RosterManagementActions {
  constructor() {
    this.generateActions(
      'getAllRostersSuccess',
      'getAllRostersFailure'
    );
  }

  getAllRosters() {
    $.ajax({
      method: 'GET',
      url: '/api/roster/admin/'
    }).done((result) => {
      this.getAllRostersSuccess(result);
    }).fail((jqXhr) => {
      this.getAllRostersFailure(jqXhr);
    });
  }
}

export default alt.createActions(RosterManagementActions);
