import alt from '../alt';
import ProfileCharactersActions from '../actions/ProfileCharactersActions';
import _ from 'underscore';

class ProfileCharactersStore {
  constructor() {
    this.bindActions(ProfileCharactersActions);
    this.retrievedCharacters = [];
    this.chosenCharacters = [];
  }

  onPopulateRetrievedCharactersSuccess(data) {
    this.retrievedCharacters = JSON.parse(data.data.characters);
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

  onGetChosenCharactersSuccess(characters) {
    this.chosenCharacters = _.sortBy(characters.data, 'rank').reverse();
  }

  onGetChosenCharactersFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onHandleMainRoleChange(value) {
    this.chosenCharacters[value[1]].main_role = value[0];
  }

  onHandleOffRoleChange(value) {
    this.chosenCharacters[value[1]].off_role = value[0];
  }

  onSaveChosenCharacterDetailsSuccess(value) {
    toastr.success(value.data.character.name + ' has been updated', 'Character Data Saved');
  }

  onSaveChosenCharacterDetailsFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onDeleteChosenCharacterSuccess(value) {
    toastr.success(value + ' has been deleted', 'Character Deleted');
  }

  onDeleteChosenCharacterFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onRetrieveAverageIlvlFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateCharacterIlvl(values) {
    this.chosenCharacters[values[1]].average_ilvl = values[0];
    toastr.success('Character ilvl has been updated', 'Character Confirmed');
  }

  onRestoreState(state) {
    for (var key in state) {
      this[key] = state[key];
    }
  }
}

export default alt.createStore(ProfileCharactersStore);
