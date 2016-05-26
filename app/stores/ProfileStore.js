import alt from '../alt';
import ProfileActions from '../actions/ProfileActions';

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);
    this.retrievedCharacters = null;
    this.storedCharacters = [];
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
      toastr.warning(result.data.message, 'Character Unconfirmed');
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

  onHandleMainRoleChange(value) {
    console.log(value[0]);
    console.log(value[1]);
    console.log(this.storedCharacters[value[1]]);
    this.storedCharacters[value[1]].main_role = value[0];
  }

  onHandleOffRoleChange(value, index) {
    this.storedCharacters[index].off_role = value;
  }
}

export default alt.createStore(ProfileStore);
