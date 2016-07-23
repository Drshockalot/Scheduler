import alt from '../../alt'
import RosterManagementActions from '../../actions/admin/RosterManagementActions';

class RosterManagementStore {
  constructor() {
    this.bindActions(RosterManagementActions);
    this.rosterList = [];
    this.selectedRoster = '';
    this.includedRosterCaracters = [];
    this.excludedRosterCharacters = [];
  }

  onGetAllRostersSuccess(result) {
    this.rosterList = result.data.rosters;
  }

  onGetAllRostersFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateSelectedRosterSuccess(result) {
    this.selectedRoster = result.data.roster.name;
    this.includedRosterCaracters = result.data.includedCharacters;
    this.excludedRosterCharacters = result.data.excludedCharacters;
  }

  onUpdateSelectedRosterFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onRemoveCharacterFromRosterSuccess(result) {
    toastr.success('Character removed from the ' + result.data.roster.name + ' roster', 'Success');
  }

  onRemoveCharacterFromRosterFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onAddCharacterToRosterSuccess(result) {
    toastr.success('Character added to the ' + result.data.roster.name + ' roster', 'Success');
  }

  onAddCharacterToRosterFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onRestoreState(state) {
    for (var key in state) {
      this[key] = state[key];
    }
  }
}

export default alt.createStore(RosterManagementStore);
