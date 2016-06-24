import alt from '../alt';
import ScheduleViewActions from '../actions/ScheduleViewActions';

class ScheduleViewStore {
  constructor() {
    this.bindActions(ScheduleViewActions);
  }
}

export default alt.createStore(ScheduleViewStore);
