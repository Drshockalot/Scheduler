import alt from '../alt';
import ProfileActions from '../actions/ProfileActions';

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);
    this.retrievedCharacters = null;
    this.storedCharacters = null;
    this.confirmedAlts = null;
    this.confirmedMain = null;
  }

  onPopulateRetrievedCharactersSuccess(data) {
    this.retrievedCharacters = data.characters;
  }

  onPopulateRetrievedCharactersFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ProfileStore);
