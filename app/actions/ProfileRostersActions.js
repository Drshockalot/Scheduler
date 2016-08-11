import alt from '../alt';
import {assign} from 'underscore';
import NavbarStore from '../stores/NavbarStore';

class ProfileRostersActions {
  constructor() {
    this.generateActions(
      'getComponentDataSuccess',
      'getComponentDataFailure',
      'restoreState'
    );
  }

  getComponentData() {
    $.ajax({
      method: 'GET',
      url: '/api/roster/' + encodeURIComponent(NavbarStore.getState().battletag)
    }).done((result) => {
      this.getComponentDataSuccess(result);
    }).fail((jqXhr) => {
      this.getComponentDataFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(ProfileRostersActions);
