import alt from '../../alt'
import ViewRostersActions from '../../actions/admin/ViewRostersActions';

class ViewRostersStore {
  constructor() {
    this.bindActions(ViewRostersActions);
    this.rosterList = {};
  }

  onUpdateRosterListSuccess(data) {
    console.log(data);
    this.rosterList = data;
  }

  onUpdateRosterListFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ViewRostersStore);
