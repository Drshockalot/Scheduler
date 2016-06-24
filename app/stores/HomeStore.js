import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.raidweeks = [];
  }

  onLoadComponentDataSuccess(result) {
    this.raidweeks = result.raidweeks;
  }

  onLoadComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(HomeStore);
