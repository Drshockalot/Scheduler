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
      'DPS': [],
      'Tank': [],
      'Healer': []
    };
    this.selectRaidWeek = 0;
    this.selectRaid = 0;
    this.selectRoster = 0;
    this.selectWeekday = 'monday';
    this.uploadText = '';

    this.tankModel = [];
    this.healerModel = [];
    this.dpsModel = [];
  }

  onLoadComponentDataSuccess(result) {
    this.raidweeks = result.data.raidweeks;
    this.selectRaidWeek = this.raidweeks[0].id;
    this.raids = result.data.raids;
    this.selectRaid = this.raids[0].id;
    this.rosters = result.data.rosters;
    this.selectRoster = this.rosters[0].id;
    this.selectWeekday = 'monday';
    this.tankModel = [];
    this.healerModel = [];
    this.dpsModel = [];

    this.rosterAttendanceModel = {
      'DPS': [],
      'Tank': [],
      'Healer': []
    };

    var roster = _.findWhere(this.rosters, {id: Number(this.selectRoster)});

    for(var i = 0; i < roster.characters.length; i++) {
      if(roster.characters[i].main_role == 'Tank') {
        this.tankModel.push({name: roster.characters[i].name, state: true});
      }
    }

    for(var i = 0; i < roster.characters.length; i++) {
      if(roster.characters[i].main_role == 'Healer') {
        this.healerModel.push({name: roster.characters[i].name, state: true});
      }
    }

    for(var i = 0; i < roster.characters.length; i++) {
      if(roster.characters[i].main_role == 'DPS') {
        this.dpsModel.push({name: roster.characters[i].name, state: true});
      }
    }

    for(var i = 0; i < roster.characters.length; i++) {
      //this.rosterAttendanceModel[roster.characters[i].main_role].push({name: roster.characters[i].name, state: true});
      if(roster.characters[i].main_role == 'Tank') {
        this.rosterAttendanceModel['Tank'].push({name: roster.characters[i].name, state: true});
      }

      if(roster.characters[i].main_role == 'Healer') {
        this.rosterAttendanceModel['Healer'].push({name: roster.characters[i].name, state: true});
      }

      if(roster.characters[i].main_role == 'DPS') {
        this.rosterAttendanceModel['DPS'].push({name: roster.characters[i].name, state: true});
      }
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
      'DPS': [],
      'Tank': [],
      'Healer': []
    };

    var roster = _.findWhere(this.rosters, {id: value});
    for(var i = 0; i < roster.characters.length; i++) {
      this.rosterAttendanceModel[roster.characters[i].main_role].push({name: roster.characters[i].name, state: true});
    }
  }

  onToggleCharacterState(values) {
    var characterAttendanceModel = _.findWhere(this.rosterAttendanceModel[values[1]], {name: values[0]});
    characterAttendanceModel.state = !characterAttendanceModel.state;
  }

  onUploadAttendanceFromRosterFormSuccess(result) {
    toastr.success('Attendance logged', 'Success');
  }

  onUploadAttendanceFromRosterFormFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateUploadText(value) {
    this.uploadText = value;
  }

  onUploadRawTextSuccess(result) {
    toastr.success('Attendance logged', 'Success');
  }

  onUploadRawTextFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUploadFileSuccess(result) {
    toastr.success('Attendance logged', 'Success');
  }

  onUploadFileFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onRestoreState(state) {
    for (var key in state) {
      this[key] = state[key];
    }
  }
}

export default alt.createStore(AddAttendanceStore);
