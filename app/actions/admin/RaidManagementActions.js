import alt from '../../alt';

class RaidManagementActions {
  constructor() {
    this.generateActions(
      'updateFormRaidName',
      'updateFormRaidDescription'
    );
  }
}

export default alt.createActions(RaidManagementActions);
