import alt from '../../alt'
import AdminSideNavActions from '../../actions/admin/AdminSideNavActions';

class AdminSideNavStore {
  constructor() {
    this.bindActions(AdminSideNavActions);
  }
}

export default alt.createStore(AdminSideNavStore);
