import alt from '../alt';
import {assign} from 'underscore';
import NavbarStore from '../stores/NavbarStore';

class ProfileSchedulesActions {
  constructor() {
    this.generateActions(
      'restoreState',
      'loadComponentDataSuccess',
      'loadComponentDataFailure'
    );
  }

  loadComponentData() {
    $.ajax({
      method: 'GET',
      url: '/api/schedule/profile/' + encodeURIComponent(NavbarStore.getState().battletag)
    }).done((result) => {
      this.loadComponentDataSuccess(result);
    }).fail((jqXhr) => {
      this.loadComponentDataFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(ProfileSchedulesActions);
