import alt from '../../alt'
import ViewRostersActions from '../../actions/admin/ViewRostersActions';
import RosterViewActions from '../../actions/admin/RosterViewActions';

class ViewRostersStore {
  constructor() {
    this.bindActions(ViewRostersActions);
    this.rosterList = {};
    this.currentRoster = '';
  }

  onUpdateCurrentRoster(e) {
    this.currentRoster = e;
  }

  onUpdateCurrentRosterRaw(name) {
    this.currentRoster = name;
  }

  onUpdateRosterListSuccess(data) {
    this.rosterList = data;
  }

  onUpdateRosterListFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ViewRostersStore);
