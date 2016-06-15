import alt from '../alt';
import {assign} from 'underscore';
import NavbarStore from '../stores/NavbarStore';

class ProfileRaidWeeksActions {
  constructor() {
    this.generateActions(
      'getAllRaidWeekInfoSuccess',
      'getAllRaidWeekInfoFailure'
    );
  }

  getAllRaidWeekInfo() {
    $.ajax({
      method: 'GET',
      url: '/api/raidweek/user/' + encodeURIComponent(NavbarStore.getState().battletag)
    }).done((result) => {
      console.log(result);
      this.getAllRaidWeekInfoSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.getAllRaidWeekInfoFailure(jqXhr);
    });
  }
}

export default alt.createActions(ProfileRaidWeeksActions);
