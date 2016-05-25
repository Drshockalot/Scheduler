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

  onConfirmCharacterSuccess(result) {
    if (result.character) {
      toastr.success(result.data.character.name + 'is now a confirmed character', 'Character Confirmed');
    } else {
      toastr.warn(result.data.message, 'Character Unconfirmed');
    }
  }

  onConfirmCharacterFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateStoredCharactersSuccess(characters) {
    this.storedCharacters = characters.data;
  }

  onUpdateStoredCharactersFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ProfileStore);
