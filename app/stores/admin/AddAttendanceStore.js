import alt from '../../alt';
import AddAttendanceActions from '../../actions/admin/AddAttendanceActions';
import _ from 'underscore';

class AddAttendanceStore {
  constructor() {
    this.bindActions(AddAttendanceActions);
    this.raidweeks = [];
    this.raids = [];
    this.rosters = [];
    this.rosterAttendanceModel = {
      'Tank': [],
      'Healer': [],
      'DPS': [],
      'Standby': []
    };
    this.selectRaidWeek = 0;
    this.selectRaid = 0;
    this.selectRoster = 0;
    this.selectWeekday = 'monday';
    this.uploadText = '';

    this.showConfirmUploadModal = false;
    this.attemptedUploadType = 0;

    this.uploadFile = null;

    this.confirmUploadDisabled = false;
  }

  onLoadComponentDataSuccess(result) {
    this.raidweeks = result.data.raidweeks;
    this.selectRaidWeek = this.raidweeks[0].id;
    this.raids = result.data.raids;
    this.selectRaid = this.raids[0].id;
    this.rosters = result.data.rosters;
    this.selectRoster = this.rosters[0].id;
    this.selectWeekday = 'monday';

    this.rosterAttendanceModel = {
      'Tank': [],
      'Healer': [],
      'DPS': [],
      'Standby': []
    };

    var roster = _.findWhere(this.rosters, {id: Number(this.selectRoster)});
    for(var i = 0; i < roster.characters.length; ++i) {
      this.rosterAttendanceModel[roster.characters[i].main_role].push({name: roster.characters[i].name, state: true});
    }
  }

  onLoadComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateSelectRaidWeek(value) {
    this.selectRaidWeek = value;
    this.selectWeekday = 'monday';
  }

  onUpdateSelectWeekday(value) {
    this.selectWeekday = value;
  }

  onUpdateSelectRaid(value) {
    this.selectRaid = value;
  }

  onUpdateSelectRoster(value) {
    this.selectRoster = value;
    this.rosterAttendanceModel = {
      'Tank': [],
      'Healer': [],
      'DPS': [],
      'Standby': []
    };

    var roster = _.findWhere(this.rosters, {id: value});
    for(var i = 0; i < roster.characters.length; ++i) {
      this.rosterAttendanceModel[roster.characters[i].main_role].push({name: roster.characters[i].name, state: true});
    }
  }

  onToggleCharacterState(values) {
    var characterAttendanceModel = _.findWhere(this.rosterAttendanceModel[values[1]], {name: values[0]});
    characterAttendanceModel.state = !characterAttendanceModel.state;
  }

  onUploadAttendanceFromRosterFormSuccess(result) {
    toastr.success('Attendance logged', 'Success');
    this.showConfirmUploadModal = false;
  }

  onUploadAttendanceFromRosterFormFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
    this.showConfirmUploadModal = false;
  }

  onUpdateUploadText(value) {
    this.uploadText = value;
    this.showConfirmUploadModal = false;
  }

  onUploadRawTextSuccess(result) {
    toastr.success('Attendance logged', 'Success');
    this.showConfirmUploadModal = false;
  }

  onUploadRawTextFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
    this.showConfirmUploadModal = false;
  }

  onUploadFileSuccess(result) {
    toastr.success('Attendance logged', 'Success');
    this.showConfirmUploadModal = false;
  }

  onUploadFileFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
    this.showConfirmUploadModal = false;
  }

  onRestoreState(state) {
    for (var key in state) {
      this[key] = state[key];
    }
  }

  onHideConfirmUploadModal() {
    this.showConfirmUploadModal = false;
    this.confirmUploadDisabled = false;
  }

  onConfirmFileUpload(file) {
    this.uploadFile = file;
    this.attemptedUploadType = 1;
    this.showConfirmUploadModal = true;
    this.confirmUploadDisabled = false;
  }

  onConfirmTextUpload() {
    this.attemptedUploadType = 2;
    this.showConfirmUploadModal = true;
    this.confirmUploadDisabled = false;
  }

  onConfirmRosterUpload() {
    this.attemptedUploadType = 3;
    this.showConfirmUploadModal = true;
    this.confirmUploadDisabled = false;
  }

  onDisableConfirmUploadButton() {
    this.confirmUploadDisabled = true;
  }
}

export default alt.createStore(AddAttendanceStore);
