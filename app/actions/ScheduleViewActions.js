import alt from '../alt';
import {assign} from 'underscore';
import NavbarStore from '../stores/NavbarStore';

class ScheduleViewActions {
  constructor() {
    this.generateActions(
      'setPropValues',
      'setFilterType'
    );
  }
}

export default alt.createActions(ScheduleViewActions);
