import alt from '../../alt';
import {assign} from 'underscore';
import ViewRostersStore from '../../stores/admin/ViewRostersStore';

class RosterViewActions {
  constructor() {
    this.generateActions(
      'populateRosterListSuccess',
      'populateRosterListFailure'
    );
  }

  populateRosterList(value) {
    $.ajax({
      method: 'POST',
      url: '/api/admin/roster/',
      data: { 'name' : value }
    }).done((data) => {
      this.populateRosterListSuccess(data);
    }).fail(() => {
      this.populateRosterListFailure();
    });
  }
}

export default alt.createActions(RosterViewActions);
