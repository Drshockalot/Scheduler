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
      'createUserAvailabilityFailure'
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

  createUserAvailability(raidweek) {
    raidweek.battletag = NavbarStore.getState().battletag;
    $.ajax({
      method: 'POST',
      url: '/api/raidweek/user',
      data: raidweek
    }).done((result) => {
      console.log(result);
      this.createUserAvailabilitySuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.createUserAvailabilityFailure(jqXhr);
    });
  }

  saveUserAvailability(ua) {
    $.ajax({
      method: 'PUT',
      url: '/api/raidweek/user',
      data: ua
    }).done((result) => {
      console.log(result);
      this.saveUserAvailabilitySuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.saveUserAvailabilityFailure(jqXhr);
    });
  }
}

export default alt.createActions(ProfileRaidWeeksActions);
