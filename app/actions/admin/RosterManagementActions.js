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
      url: '/api/roster/admin'
    }).done((result) => {
      //this.getAllRostersSuccess(result);
      console.log(result);
    }).fail((jqXhr) => {
      //this.getAllRostersFailure(jqXhr);
      console.log(jqXhr);
    });
  }
}

export default alt.createActions(RosterManagementActions);
