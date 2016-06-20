import alt from '../alt';
import ProfileCharactersActions from '../actions/ProfileCharactersActions';

class ProfileCharactersStore {
  constructor() {
    this.bindActions(ProfileCharactersActions);
    this.retrievedCharacters = [];
    this.storedCharacters = [];
  }

  onPopulateRetrievedCharactersSuccess(data) {
    this.retrievedCharacters = data.characters;
  }

  onPopulateRetrievedCharactersFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onConfirmCharacterSuccess(result) {
    if (result.data.responseCode === 2) {
      toastr.success(result.data.character.name + ' is now a confirmed character', 'Character Confirmed');
    } else if (result.data.responseCode === 1) {
      toastr.warning(result.data.message, 'Character Unconfirmed');
    } else if (result.data.responseCode === 3) {
      toastr.success(result.data.character.name + ' ' + result.data.message, 'Character Confirmed');
    } else if (result.data.responseCode === 4) {
      toastr.warning(result.data.character.name + ' ' + result.data.message, 'Character Not Confirmed');
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
    toastr.success(value.data.character.name + ' has been updated', 'Character Data Saved');
  }

  onSaveStoredCharacterDetailsFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onDeleteStoredCharacterSuccess(value) {
    toastr.success(value + ' has been deleted', 'Character Deleted');
  }

  onDeleteStoredCharacterFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onRetrieveAverageIlvlFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateCharacterIlvl(values) {
    this.storedCharacters[values[1]].average_ilvl = values[0];
    toastr.success('Character ilvl has been updated', 'Character Confirmed');
  }
}

export default alt.createStore(ProfileCharactersStore);