import alt from '../../alt';

class RosterControlPanelActions {
  constructor() {
    this.generateActions(
      'updateCharacterClass',
      'updateCharacterName',
      'updateCharacterRole'
    );
  }
}

export default alt.createActions(RosterControlPanelActions);
