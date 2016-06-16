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
    // var user_availability = _.findWhere(this.user_availability, {id: values[0]});
    // user_availability[day] = !user_availability[day];
    for(obj in this.user_availability) {
      if(values[0] == obj.id) {
        obj[day] = !obj[day];
      }
    }
  }

  onCreateUserAvailabilitySuccess(result) {
    this.user_availability = result.data.user_availability;
  }

  onCreateUserAvailabilityFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onSaveUserAvailabilitySuccess(result) {
    this.user_availability = result.data.user_availability;
  }

  onSaveUserAvailabilityFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ProfileRaidWeeksStore);
