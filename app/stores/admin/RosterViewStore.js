import alt from '../../alt'
import RosterViewActions from '../../actions/admin/RosterViewActions';

class RosterViewStore {
  constructor() {
    this.bindActions(RosterViewActions);
    this.roster = {};
  }

  onPopulateRosterListSuccess(data) {
    this.roster = data;
  }

  onPopulateRosterListFailure() {

  }
}

export default alt.createStore(RosterViewStore);
