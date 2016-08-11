import alt from '../alt';
import {assign} from 'underscore';
import NavbarStore from '../stores/NavbarStore';

class SingleScheduleViewActions {
  constructor() {
    this.generateActions(
      'loadSingleScheduleSuccess',
      'loadSingleScheduleFailure',
      'loadUserCharactersSuccess',
      'loadUserCharactersFailure'
    );
  }

  loadSingleSchedule(scheduleId) {
    $.ajax({
      method: 'GET',
      url: '/api/schedule/single/' + scheduleId
    }).done((result) => {
      this.loadSingleScheduleSuccess(result);
    }).fail((jqXhr) => {
      this.loadSingleScheduleFailure(jqXhr);
    });
    return 0;
  }

  loadUserCharacters() {
    $.ajax({
      method: 'GET',
      url: '/api/character/user/' + encodeURIComponent(NavbarStore.getState().battletag)
    }).done((result) => {
      this.loadUserCharactersSuccess(result);
    }).fail((jqXhr) => {
      this.loadUserCharactersFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(SingleScheduleViewActions);
