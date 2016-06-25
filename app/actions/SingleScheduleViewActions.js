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
      console.log(result);
      this.loadSingleScheduleSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.loadSingleScheduleFailure(jqXhr);
    });
  }

  loadUserCharacters() {
    $.ajax({
      method: 'GET',
      url: '/api/character/user/' + encodeURIComponent(NavbarStore.getState().battletag)
    }).done((result) => {
      console.log(result);
      this.loadUserCharactersSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.loadUserCharactersFailure(jqXhr);
    });
  }
}

export default alt.createActions(SingleScheduleViewActions);
