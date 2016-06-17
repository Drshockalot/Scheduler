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
      'addCharacterToRosterFailure',
      'setSelectedRosterName',
      'getSelectedRosterName'
    );
  }

  getAllRosters() {
    $.ajax({
      method: 'GET',
      url: '/api/roster/admin'
    }).done((result) => {
      this.getAllRostersSuccess(result);
      this.setSelectedRosterName(result.data.rosters[0].name);
      this.updateRosterListAfterCharacterChange(result.data.rosters[0].id);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.getAllRostersFailure(jqXhr);
    });
    return 0;
  }

  updateSelectedRoster(rosterName, rosterList) {
    $.ajax({
      method: 'GET',
      url: '/api/roster/admin/' + _.findWhere(rosterList, { name: rosterName}).id
    }).done((result) => {
      console.log(result);
      this.updateSelectedRosterSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.updateSelectedRosterFailure(jqXhr);
    });
    return 0;
  }

  updateRosterListAfterCharacterChange(rosterid) {
    $.ajax({
      method: 'GET',
      url: '/api/roster/admin/' + rosterid
    }).done((result) => {
      console.log(result);
      this.updateSelectedRosterSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.updateSelectedRosterFailure(jqXhr);
    });
    return 0;
  }

  removeCharacterFromRoster(characterid, rosterid) {
    $.ajax({
      method: 'PUT',
      url: '/api/roster/admin/unlink/' + characterid + '/' + rosterid
    }).done((result) => {
      console.log(result);
      this.removeCharacterFromRosterSuccess(result);
      this.updateRosterListAfterCharacterChange(rosterid);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.removeCharacterFromRosterFailure(jqXhr);
    });
    return 0;
  }

  addCharacterToRoster(characterid, rosterid) {
    $.ajax({
      method: 'PUT',
      url: '/api/roster/admin/link/' + characterid + '/' + rosterid
    }).done((result) => {
      console.log(result);
      this.addCharacterToRosterSuccess(result);
      this.updateRosterListAfterCharacterChange(rosterid);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.addCharacterToRosterFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(RosterManagementActions);
