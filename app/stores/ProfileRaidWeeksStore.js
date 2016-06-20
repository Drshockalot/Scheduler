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
    // for(var obj in this.user_availability) {
    //   if(values[0] == obj.id) {
    //     obj[values[1]] = !obj[values[1]];
    //   }
    // }

    for(var i = 0; i < this.user_availability.length; ++i) {
      if(values[0] == this.user_availability[i].id) {
        this.user_availability[i][values[1]] = !this.user_availability[i][values[1]];
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