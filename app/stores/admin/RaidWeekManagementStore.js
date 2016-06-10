import alt from './../../alt';
import RaidWeekManagementActions from './../../actions/admin/RaidWeekManagementActions';

class RaidWeekManagementStore {
  constructor() {
    this.bindActions(RaidWeekManagementActions);
    this.selectedRaidWeek = null;
  }

  onSelectedRaidWeekChanged(date) {
    this.selectedRaidWeek = date;
  }
}

export default alt.createStore(RaidWeekManagementStore);
