import alt from '../alt';
import ProfileRostersActions from '../actions/ProfileRostersActions';

class ProfileRostersStore {
  constructor() {
    this.bindActions(ProfileRostersActions);
    this.characters = [];
  }

  onGetComponentDataSuccess(result) {
    this.characters = result.data.characters;
  }

  onGetComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onRestoreState(state) {
    for (var key in state) {
      this[key] = state[key];
    }
  }
}

export default alt.createStore(ProfileRostersStore);
