import alt from './../../alt';
import CharacterManagementActions from './../../actions/admin/CharacterManagementActions';

class CharacterManagementStore {
  constructor() {
    this.bindActions(CharacterManagementActions);
  }
}
