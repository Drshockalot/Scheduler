import alt from '../alt';
import SingleScheduleViewActions from '../actions/SingleScheduleViewActions';

class SingleScheduleViewStore {
  constructor() {
    this.bindActions(SingleScheduleViewActions);
  }
}

export default alt.createStore(SingleScheduleViewStore);
