import alt from '../alt';
import ProfileSchedulesActions from '../actions/ProfileSchedulesActions';

class ProfileSchedulesStore {
  constructor() {
    this.bindActions(ProfileSchedulesActions);
  }
}

export default alt.createStore(ProfileSchedulesStore);
