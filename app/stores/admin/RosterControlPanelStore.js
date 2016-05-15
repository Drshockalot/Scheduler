import alt from '../../alt'
import RosterControlPanelActions from '../../actions/admin/RosterControlPanelActions';

class RosterControlPanelStore {
  constructor() {
    this.bindActions(RosterControlPanelActions);
    this.addCharacter_Name = '';
    this.addCharacter_Class = 'Death Knight';
    this.addCharacter_Role = 'Tank';
  }

  onUpdateCharacterName(e) {
    this.addCharacter_Name = e.target.value;
  }

  onUpdateCharacterClass(e) {
    this.addCharacter_Class = e.target.value;
  }

  onUpdateCharacterRole(e) {
    this.addCharacter_Role = e.target.value;
  }
}

export default alt.createStore(RosterControlPanelStore);
