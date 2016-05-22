import alt from '../alt';
import ProfileActions from '../actions/ProfileActions';

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);
    this.retreivedCharacters = null;
    this.storedCharacters = null;
  }

  onPopulateRetreivedCharacters(data) {
    this.retreivedCharacters = data;
  }
}

export default alt.createStore(ProfileStore);
