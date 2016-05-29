import alt from '../../alt'
import RosterManagementActions from '../../actions/admin/RosterManagementActions';

class RosterManagementStore {
  constructor() {
    this.bindActions(RosterManagementActions);
    this.rosterList = [];
    this.selectedRoster = '';
  }
}

export default alt.createStore(RosterManagementStore);
