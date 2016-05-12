import alt from '../../alt';
import {assign} from 'underscore';

class AddRosterActions {
  constructor() {
    this.generateActions(
      'updateRosterName',
      'addRosterSuccess',
      'addRosterFailure'
    );
  }

  addRoster(rosterName) {
    $.ajax({
      method: 'POST',
      url: '/api/admin/roster/add',
      data: { 'name' : rosterName }
    }).done((data) => {
      assign(rosterName, data);
      this.addRosterSuccess(rosterName);
    }).fail(() => {
      this.addRosterFailure();
    });
  }
}

export default alt.createActions(AddRosterActions);
