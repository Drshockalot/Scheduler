import alt from '../../alt'
import RosterManagementActions from '../../actions/admin/RosterManagementActions';

class RosterManagementStore {
  constructor() {
    this.bindActions(RosterManagementActions);
    this.rosterList = [];
    this.selectedRoster = '';
  }

  onGetAllRostersSuccess(result) {
    this.rosterList = result.data.rosters;
  }

  onGetAllRostersFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(RosterManagementStore);
