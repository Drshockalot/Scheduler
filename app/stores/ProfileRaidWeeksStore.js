import alt from '../alt';
import ProfileRaidWeeksActions from '../actions/ProfileRaidWeeksActions';

class ProfileRaidWeeksStore {
  constructor() {
    this.bindActions(ProfileRaidWeeksActions);
    this.raidweeks = [];
    this.userRaidweeks = [];
  }

  onGetAllRaidWeekInfoSuccess(result) {
    this.raidweeks = result.data.raidweeks;
  }

  onGetAllRaidWeekInfoFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ProfileRaidWeeksStore);
