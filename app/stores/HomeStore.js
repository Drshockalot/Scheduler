import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.raidweeks = [];
  }

  onLoadComponentDataSuccess(result) {
    this.raidweeks = result.data.raidweeks;
  }

  onLoadComponentDataFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onRestoreState(state) {
    for (var key in state) {
      this[key] = state[key];
    }
  }
}

export default alt.createStore(HomeStore);
