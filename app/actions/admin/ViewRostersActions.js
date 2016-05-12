import alt from '../../alt';

class ViewRostersActions {
  constructor() {
    this.generateActions(
      'updateRosterListSuccess',
      'updateRosterListFailure'
    );
  }

  updateRosterList() {
    $.ajax({
      url: '/api/admin/roster/',
    }).done((data) => {
      this.updateRosterListSuccess(data);
    }).fail((jqXhr) => {
      this.updateRosterListFailure(jqXhr);
    });
  }
}

export default alt.createActions(ViewRostersActions);
