import alt from '../../alt';
//import RosterViewActions from './RosterViewActions';

class ViewRostersActions {
  constructor() {
    this.generateActions(
      'updateRosterListSuccess',
      'updateRosterListFailure',
      'updateCurrentRoster',
      'updateCurrentRosterRaw'
    );
  }

  updateRosterList() {
    $.ajax({
      url: '/api/admin/roster/',
    }).done((data) => {
      this.updateRosterListSuccess(data);
      this.updateCurrentRosterRaw(data[0].name);
    }).fail((jqXhr) => {
      this.updateRosterListFailure(jqXhr);
    });
  }
}

export default alt.createActions(ViewRostersActions);
