import alt from '../alt';
import ProfileSchedulesActions from '../actions/ProfileSchedulesActions';

class ProfileSchedulesStore {
  constructor() {
    this.bindActions(ProfileSchedulesActions);
    this.user = null;
  }

  onRestoreState(state) {
    for (var key in state) {
      this[key] = state[key];
    }
  }

  onLoadComponentDataSuccess(result) {
    this.user = result.data.user;
  }

  onLoadComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ProfileSchedulesStore);
