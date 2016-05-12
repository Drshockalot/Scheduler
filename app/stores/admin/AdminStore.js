import alt from '../../alt';
import AdminActions from '../../actions/admin/AdminActions';

class AdminStore {
  constructor() {
    this.bindActions(AdminActions);
  }
}

export default alt.createStore(AdminStore);
