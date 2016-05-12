import alt from '../../alt';

class AdminSideNavActions {
  constructor() {
    this.generateActions(
      'redirects?'
    );
  }
}

export default alt.createActions(AdminSideNavActions);
