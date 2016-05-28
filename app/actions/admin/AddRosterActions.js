import alt from '../../alt';
import {assign} from 'underscore';
import ViewRostersActions from './ViewRostersActions';

class AddRosterActions {
  constructor() {
    this.generateActions(
      'updateRosterName',
      'updateRosterDescription',
      'addRosterSuccess',
      'addRosterFailure'
    );
  }

  addRoster(rosterName) {
    $.ajax({
      method: 'POST',
      url: '/api/roster/admin/' + rosterName,
    }).done((data) => {
      this.addRosterSuccess(data);
      ViewRostersActions.updateRosterList();
    }).fail(() => {
      this.addRosterFailure();
    });
  }
}

export default alt.createActions(AddRosterActions);
