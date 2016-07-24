import alt from '../../alt';

var request = require('superagent');

var _ = require('underscore');

class AttendaceManagementActions {
  constructor() {
    this.generateActions(
      'updateViewMode'
    );
  }
}

export default alt.createActions(AttendaceManagementActions);
