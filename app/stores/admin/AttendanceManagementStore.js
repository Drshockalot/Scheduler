import alt from '../../alt';
import AttendanceManagementActions from '../../actions/admin/AttendanceManagementActions';
import _ from 'underscore';

class AttendanceManagementStore {
  constructor() {
    this.bindActions(AttendanceManagementActions);
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
    this.selectWeekday = '';
  }

  onLoadComponentDataSuccess(result) {
    this.raidweeks = result.data.raidweeks;
    this.selectRaidWeek = this.raidweeks[0].id;
    this.raids = result.data.raids;
    this.selectRaid = this.raids[0].id;
    this.rosters = result.data.rosters;
    this.selectRoster = this.rosters[0].id;

    for(var i = 0; i < this.rosters[0].characters.length; ++i) {
      this.rosterAttendanceModel[this.rosters[0].characters[i].main_role].push({name: this.rosters[0].characters[i].name, state: true});
    }
  }

  onLoadComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateSelectRaidWeek(value) {
    this.selectRaidWeek = value;
    this.selectWeekday = '';
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
      this.rosterAttendanceModel[roster.characters.main_role].push({name: roster.characters[i].name, state: true});
    }
  }

  onToggleCharacterState(values) {
    var characterAttendanceModel = _.findWhere(this.rosterAttendanceModel[values[1]], {name: values[0]});
    characterAttendanceModel.state = !characterAttendanceModel.state;
  }
}

export default alt.createStore(AttendanceManagementStore);
