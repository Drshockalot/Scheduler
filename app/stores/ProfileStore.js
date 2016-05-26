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
    this.storedCharacters[value[1]].main_role = value[0];
  }

  onHandleOffRoleChange(value) {
    this.storedCharacters[value[1]].off_role = value[0];
  }

  onSaveStoredCharacterDetailsSuccess(value) {
    toastr.success(value.data.character.name + 'has been updated', 'Character Data Saved');
  }

  onSaveStoredCharacterDetailsFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onDeleteStoredCharacterSuccess(value) {
    toastr.success(value + 'has been deleted', 'Character Deleted');
  }

  onDeleteStoredCharacterFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ProfileStore);
