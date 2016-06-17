import alt from '../alt';
import {assign} from 'underscore';
import NavbarStore from '../stores/NavbarStore';

class ProfileRostersActions {
  constructor() {
    this.generateActions(
      'getComponentDataSuccess',
      'getComponentDataFailure'
    );
  }

  getComponentData() {
    $.ajax({
      method: 'GET',
      url: '/api/roster/' + encodeURIComponent(NavbarStore.getState().battletag)
    }).done((result) => {
      console.log(result);
      this.getComponentDataSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.getComponentDataFailure(jqXhr);
    });
  }
}

export default alt.createActions(ProfileRostersActions);
