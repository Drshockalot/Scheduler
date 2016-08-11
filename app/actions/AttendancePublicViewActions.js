import alt from '../alt';
import {assign} from 'underscore';
import NavbarStore from '../stores/NavbarStore';

class AttendancePublicViewActions {
  constructor() {
    this.generateActions(
      'restoreState',
      'loadComponentDataSuccess',
      'loadComponentDataFailure',
      'updateSelectRaid',
      'updateSelectRoster'
    );
  }

  loadComponentData() {
    $.ajax({
      method: 'GET',
      url: '/api/attendance/public'
    }).done((result) => {
      this.loadComponentDataSuccess(result);
    }).fail((jqXhr) => {
      this.loadComponentDataFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(AttendancePublicViewActions);
