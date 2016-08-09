import alt from '../alt';
import ProfileRaidWeeksActions from '../actions/ProfileRaidWeeksActions';

class ProfileRaidWeeksStore {
  constructor() {
    this.bindActions(ProfileRaidWeeksActions);
    this.raidweeks = [];
    this.user_availability = [];
  }

  onGetAllRaidWeekInfoSuccess(result) {
    this.raidweeks = result.data.raidweeks;
    this.user_availability = result.data.user_availability;
  }

  onGetAllRaidWeekInfoFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onToggleUserAvailabilityDay(values) {
    for(var i = 0; i < this.user_availability.length; ++i) {
      if(values[0] == this.user_availability[i].id) {
        this.user_availability[i][values[1]] = !this.user_availability[i][values[1]];
      }
    }
  }

  onCreateUserAvailabilitySuccess(result) {
    this.user_availability = result.data.user_availability;
    toastr.success('Raid week availability created', 'Success');
  }

  onCreateUserAvailabilityFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onSaveUserAvailabilitySuccess(result) {
    this.user_availability = result.data.user_availability;
    toastr.success('Raid week availability updated', 'Success');
  }

  onSaveUserAvailabilityFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onRestoreState(state) {
    for (var key in state) {
      this[key] = state[key];
    }
  }

  onUdateUserAvailabilityNote(values) {
    for(var i = 0; i < this.user_availability.length; ++i) {
      if(values[0] == this.user_availability[i].id) {
        this.user_availability[i].user_note = values[1];
      }
    }
  }
}

export default alt.createStore(ProfileRaidWeeksStore);
