import alt from '../alt';
import ScheduleViewActions from '../actions/ScheduleViewActions';

class ScheduleViewStore {
  constructor() {
    this.bindActions(ScheduleViewActions);
    this.requestedSchedule = 0;
    this.viewType = 0;
    this.filterType = 0;
  }

  onSetPropValues(values) {
    this.viewType = values[0];
    this.requestedSchedule = values[1];
  }

  onSetFilterType(value) {
    this.filterType = value;
  }
}

export default alt.createStore(ScheduleViewStore);
