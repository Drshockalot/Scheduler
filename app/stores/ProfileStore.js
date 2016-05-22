import alt from '../alt';
import ProfileActions from '../actions/ProfileActions';

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);
  }
}

export default alt.createStore(ProfileStore);
