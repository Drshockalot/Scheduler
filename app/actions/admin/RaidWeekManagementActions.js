import alt from './../../alt';

class RaidWeekManagementActions {
  constructor() {
    this.generateActions(
      'selectedRaidWeekChanged'
    );
  }
}

export default alt.createActions(RaidWeekManagementActions);
