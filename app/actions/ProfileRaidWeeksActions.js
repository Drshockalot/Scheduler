import alt from '../alt';
import {assign} from 'underscore';
import NavbarStore from '../stores/NavbarStore';
import ProfileRaidWeeksStore from '../stores/ProfileRaidWeeksStore';
var _ = require('underscore');

class ProfileRaidWeeksActions {
  constructor() {
    this.generateActions(
      'getAllRaidWeekInfoSuccess',
      'getAllRaidWeekInfoFailure',
      'toggleUserAvailabilityDay',
      'saveUserAvailabilitySuccess',
      'saveUserAvailabilityFailure',
      'createUserAvailabilitySuccess',
      'createUserAvailabilityFailure',
      'restoreState',
      'updateUserAvailabilityNote'
    );
  }

  getAllRaidWeekInfo() {
    $.ajax({
      method: 'GET',
      url: '/api/raidweek/user/' + encodeURIComponent(NavbarStore.getState().battletag)
    }).done((result) => {
      this.getAllRaidWeekInfoSuccess(result);
    }).fail((jqXhr) => {
      this.getAllRaidWeekInfoFailure(jqXhr);
    });
    return 0;
  }

  createUserAvailability(raidweek) {
    raidweek.battletag = NavbarStore.getState().battletag;
    $.ajax({
      method: 'POST',
      url: '/api/raidweek/user',
      data: raidweek
    }).done((result) => {
      this.createUserAvailabilitySuccess(result);
    }).fail((jqXhr) => {
      this.createUserAvailabilityFailure(jqXhr);
    });
    return 0;
  }

  saveUserAvailability(ua) {
    ua.battletag = NavbarStore.getState().battletag;
    $.ajax({
      method: 'PUT',
      url: '/api/raidweek/user',
      data: ua
    }).done((result) => {
      this.saveUserAvailabilitySuccess(result);
    }).fail((jqXhr) => {
      this.saveUserAvailabilityFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(ProfileRaidWeeksActions);
