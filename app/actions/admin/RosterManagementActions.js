import alt from '../../alt';

var _ = require('underscore');

class RosterManagementActions {
  constructor() {
    this.generateActions(
      'getAllRostersSuccess',
      'getAllRostersFailure',
      'updateSelectedRosterSuccess',
      'updateSelectedRosterFailure',
      'removeCharacterFromRosterSuccess',
      'removeCharacterFromRosterFailure',
      'addCharacterToRosterSuccess',
      'addCharacterToRosterFailure'
    );
  }

  getAllRosters() {
    $.ajax({
      method: 'GET',
      url: '/api/roster/admin'
    }).done((result) => {
      this.getAllRostersSuccess(result);
    }).fail((jqXhr) => {
      this.getAllRostersFailure(jqXhr);
    });
  }

  updateSelectedRoster(rosterName, rosterList) {
    $.ajax({
      method: 'GET',
      url: '/api/roster/admin/' + _.findWhere(rosterList, { name: rosterName}).id
    }).done((result) => {
      this.updateSelectedRosterSuccess(result);
    }).fail((jqXhr) => {
      this.updateSelectedRosterFailure(jqXhr);
    });
  }

  removeCharacterFromRoster(characterid, rosterid) {
    $.ajax({
      method: 'PUT',
      url: '/api/roster/admin/unlink/' + characterid + '/' + rosterid
    }).done((result) => {
      this.removeCharacterFromRosterSuccess(result);
    }).fail((jqXhr) => {
      this.removeCharacterFromRosterFailure(jqXhr);
    });
  }

  addCharacterToRoster(characterid, rosterid) {
    $.ajax({
      method: 'PUT',
      url: '/api/roster/admin/link/' + characterid + '/' + rosterid
    }).done((result) => {
      this.addCharacterToRosterSuccess(result);
    }).fail((jqXhr) => {
      this.addCharacterToRosterFailure(jqXhr);
    });
  }
}

export default alt.createActions(RosterManagementActions);
