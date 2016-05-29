import alt from '../../alt';
import {assign} from 'underscore';

class AddRosterActions {
  constructor() {
    this.generateActions(
      'updateRosterName',
      'updateRosterDescription',
      'addRosterSuccess',
      'addRosterFailure'
    );
  }

  addRoster(roster) {
    $.ajax({
      method: 'POST',
      url: '/api/roster/admin',
      data: roster
    }).done((data) => {
      this.addRosterSuccess(data);
    }).fail(() => {
      this.addRosterFailure();
    });
  }
}

export default alt.createActions(AddRosterActions);
