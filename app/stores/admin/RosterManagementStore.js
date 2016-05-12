import alt from '../../alt'
import RosterManagementActions from '../../actions/admin/RosterManagementActions';

class RosterManagementStore {
  constructor() {
    this.bindActions(RosterManagementActions);
  }
}

export default alt.createStore(RosterManagementStore);
