import alt from './../../alt';
import CharacterManagementActions from './../../actions/admin/CharacterManagementActions';

class CharacterManagementStore {
  constructor() {
    this.bindActions(CharacterManagementActions);
    this.UserCharacterList = null;
  }

  onGetCharactersForConfirmationSuccess(result) {
    this.UserCharacterList = result.data.users;
  }

  onGetCharactersForConfirmationFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(CharacterManagementStore);
