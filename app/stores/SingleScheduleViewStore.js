import alt from '../alt';
import SingleScheduleViewActions from '../actions/SingleScheduleViewActions';

class SingleScheduleViewStore {
  constructor() {
    this.bindActions(SingleScheduleViewActions);
    this.schedule = {};
    this.characters = [];
  }

  onLoadSingleScheduleSuccess(result) {
    this.schedule = result.data.schedule;
  }

  onLoadSingleScheduleFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onLoadUserCharactersSuccess(result) {
    this.characters = result.data.characters;
  }

  onLoadUserCharactersFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(SingleScheduleViewStore);
