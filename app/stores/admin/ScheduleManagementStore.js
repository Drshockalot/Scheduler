import alt from './../../alt';
import ScheduleManagementActions from './../../actions/admin/ScheduleManagementActions';

class ScheduleManagementStore {
  constructor() {
    this.bindActions(ScheduleManagementActions);
  }
}

export default alt.createStore(ScheduleManagementStore);
